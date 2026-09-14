import {lanAddresses} from './src/network.js';
import {RoomSimulation} from './src/room_simulation.js';
import { createServer } from "node:http";
import { readFile, stat, writeFile, mkdir, rename } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { networkInterfaces, platform } from "node:os";
import { execFile } from "node:child_process";
import { randomBytes, randomUUID } from "node:crypto";

const ROOT = resolve(fileURLToPath(new URL(".", import.meta.url)));
const PORT = Number(process.env.PORT) || 8088;
const rooms = new Map();
const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff"
  });
  response.end(JSON.stringify(value));
}

async function readJson(request) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 128000) {
        rejectBody(new Error("Anfrage ist zu groß"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolveBody(body ? JSON.parse(body) : {});
      } catch {
        rejectBody(new Error("Ungültige Daten"));
      }
    });
    request.on("error", rejectBody);
  });
}

function cleanName(value) {
  return String(value || "VenuPlayer")
    .replace(/[^a-zA-Z0-9ÄÖÜäöüß_ ]/g, "")
    .trim()
    .slice(0, 16) || "VenuPlayer";
}

function cleanCode(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z2-9]/g, "").slice(0, 6);
}

function makeCode() {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const bytes = randomBytes(5);
    let code = "";
    for (let index = 0; index < 5; index += 1) {
      code += alphabet[bytes[index] % alphabet.length];
    }
    if (!rooms.has(code)) return code;
  }
  return randomUUID().replaceAll("-", "").slice(0, 6).toUpperCase();
}

function makePlayer(name) {
  const colors = [0x8dd44e, 0x54b6e8, 0xf2a444, 0xb476e8, 0xeb6d70, 0x62d2b5];
  return {
    id: randomUUID(),
    token: randomUUID(),
    name: cleanName(name),
    color: colors[Math.floor(Math.random() * colors.length)],
    state: { x: 0.5, y: 111.02, z: 0.5, yaw: 0,dimension:'overworld' },
    loot:{},damage:0,seen:new Set(),
    lastSeen: Date.now()
  };
}

function publicSession(room, player) {
  room.sim.get('overworld');
  return {
    roomCode: room.code,
    seed: room.seed,
    worldSize:room.worldSize||50000,
    protocol:9,
    playerId: player.id,
    token: player.token,
    revision: room.revision,
    changes: [...room.changes.values()].filter(c=>(c.dimension||'overworld')==='overworld')
  };
}

function findSession(body) {
  const code = cleanCode(body.roomCode);
  const room = rooms.get(code);
  if (!room) return { error: "Dieser Raum existiert nicht mehr." };
  const player = room.players.get(String(body.playerId || ""));
  if (!player || player.token !== body.token) return { error: "Die Spielverbindung ist ungültig." };
  player.lastSeen = Date.now();
  return { room, player };
}

function cleanPlayerState(state, fallback) {
  const safe = { ...fallback };
  for (const key of ["x", "y", "z", "yaw"]) {
    if (Number.isFinite(state?.[key])) safe[key] = key==='yaw'?Number(state[key]):key==='y'?Math.max(0,Math.min(192,Number(state[key]))):Math.max(-25000, Math.min(24999.99,Number(state[key])));
  }
  return safe;
}

function applyActions(room, actions,player) {
  for (const action of Array.isArray(actions) ? actions.slice(0, 40) : []) {
    if(action.id&&player.seen.has(action.id))continue;
    if(action.id){player.seen.add(action.id);if(player.seen.size>2000)player.seen.delete(player.seen.values().next().value);}
    const dimension=player.state.dimension||'overworld';
    if(action.dimension&&action.dimension!==dimension)continue;
    if(action.kind==='portal'){room.sim.portal(dimension,action.frame,action.tool);continue;}
    if(action.kind==='attack'){room.sim.attack(player,action);continue;}
    const x = Math.trunc(action?.x);
    const y = Math.trunc(action?.y);
    const z = Math.trunc(action?.z);
    const type = Math.trunc(action?.type);
    if (
      !Number.isFinite(x) ||
      !Number.isFinite(y) ||
      !Number.isFinite(z) ||
      !Number.isFinite(type) ||
      x < -(room.worldSize||50000)/2 || x >= (room.worldSize||50000)/2 ||
      z < -(room.worldSize||50000)/2 || z >= (room.worldSize||50000)/2 ||
      y < 1 ||
      y > 191 ||
      type < 0 ||
      type > 39 || [14,15,21,33,34].includes(type)
    ) continue;
    room.sim.block(dimension,x,y,z,type);
  }
}

async function handleApi(request, response, url) {
  if(request.method==='GET'&&url.pathname==='/api/network'){sendJson(response,200,{version:'0.9',port:PORT,addresses:networkDetails()});return true;}
  if (request.method === "GET" && url.pathname === "/api/ping") {
    sendJson(response, 200, { ok: true, service: "VENU", protocol:9, rooms: rooms.size });
    return true;
  }

  if (request.method !== "POST") return false;
  const body = await readJson(request);

  if (url.pathname === "/api/room/create") {
    const code = makeCode();
    const room = {
      code,
      seed: randomBytes(8).toString("hex"),
      createdAt: Date.now(),
      revision: 0,
      worldSize:50000,
      players: new Map(),
      changes: new Map()
    };
    room.sim=new RoomSimulation(room);
    const player = makePlayer(body.name);
    room.players.set(player.id, player);
    rooms.set(code, room);
    sendJson(response, 201, publicSession(room, player));
    return true;
  }

  if (url.pathname === "/api/room/join") {
    const code = cleanCode(body.roomCode);
    const room = rooms.get(code);
    if (!room) {
      sendJson(response, 404, { error: "Raumcode nicht gefunden." });
      return true;
    }
    if ([...room.players.values()].filter(p=>Date.now()-p.lastSeen<20000).length >= 8) {
      sendJson(response, 409, { error: "Der Raum ist bereits voll." });
      return true;
    }
    const player = makePlayer(body.name);
    room.players.set(player.id, player);
    sendJson(response, 200, publicSession(room, player));
    return true;
  }

  if (url.pathname === "/api/room/sync") {
    const session = findSession(body);
    if (session.error) {
      sendJson(response, 401, session);
      return true;
    }
    const { room, player } = session;
    player.state = cleanPlayerState(body.state, player.state);
    applyActions(room, body.actions,player);
    const since = Math.max(0, Math.trunc(body.since) || 0);
    const changes = [...room.changes.values()].filter((change) => change.revision > since&&(change.dimension||'overworld')===(player.state.dimension||'overworld'));
    const players = [...room.players.values()]
      .filter((other) => other.id !== player.id&&Date.now()-other.lastSeen<20000&&other.state.dimension===player.state.dimension)
      .map((other) => ({
        id: other.id,
        name: other.name,
        color: other.color,
        ...other.state
      }));
    sendJson(response, 200, { revision: room.revision, players, changes, mobs:room.sim.get(player.state.dimension).creatures.serialize(),boss:room.sim.get(player.state.dimension).boss.snapshot(),completed:!!player.completed,loot:player.loot,damage:player.damage,elapsed:room.sim.elapsed,playerCount:[...room.players.values()].filter(p=>Date.now()-p.lastSeen<20000).length });
    return true;
  }

  if(url.pathname==='/api/room/travel'){
    const session=findSession(body);if(session.error){sendJson(response,401,session);return true;}
    session.player.state=cleanPlayerState(body.state,session.player.state);
    sendJson(response,200,session.room.sim.travel(session.player,body.target));return true;
  }
  if (url.pathname === "/api/room/leave") {
    const session = findSession(body);
    if (!session.error) {
      session.room.players.delete(session.player.id);
      // Keep the room available for rejoining until the server stops.
    }
    sendJson(response, 200, { ok: true });
    return true;
  }

  return false;
}

async function serveStatic(response, url) {
  const requested = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
  if(requested.startsWith('/data/')||requested.includes('/.')){response.writeHead(403);response.end('Forbidden');return;}
  const path = resolve(ROOT, requested.replace(/^\/+/, ""));
  if (path !== ROOT && !path.startsWith(ROOT + sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const info = await stat(path);
    const filePath = info.isDirectory() ? resolve(path, "index.html") : path;
    const data = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
      "Cache-Control": extname(filePath) === ".html" ? "no-store" : "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer"
    });
    response.end(data);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Datei nicht gefunden");
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", "http://localhost");
  try {
    if (url.pathname.startsWith("/api/")) {
      const handled = await handleApi(request, response, url);
      if (!handled) sendJson(response, 404, { error: "Schnittstelle nicht gefunden." });
      return;
    }
    await serveStatic(response, url);
  } catch (error) {
    sendJson(response, 400, { error: error.message || "Anfrage fehlgeschlagen." });
  }
});

setInterval(() => {
  const now = Date.now();
  for (const [code, room] of rooms) {
    for (const [id, player] of room.players) {
      if (now - player.lastSeen > 600000) room.players.delete(id);
    }

  }
}, 10000).unref();

const DATA=process.env.VENU_DATA_DIR||resolve(ROOT,'data');
let saveChain=Promise.resolve();
function saveRooms(){saveChain=saveChain.catch(()=>{}).then(async()=>{const rows=[...rooms.values()].map(r=>({code:r.code,seed:r.seed,worldSize:r.worldSize||50000,createdAt:r.createdAt,revision:r.revision,changes:[...r.changes.values()],simulation:r.sim.snapshot()}));await mkdir(DATA,{recursive:true});await writeFile(resolve(DATA,'rooms.tmp'),JSON.stringify(rows));await rename(resolve(DATA,'rooms.tmp'),resolve(DATA,'rooms.json'));});return saveChain;}
try{const rows=JSON.parse(await readFile(resolve(DATA,'rooms.json'),'utf8'));for(const row of rows){const room={...row,worldSize:row.worldSize||1000,players:new Map(),changes:new Map(row.changes.map(c=>[(c.dimension||'overworld')+','+c.x+','+c.y+','+c.z,c]))};room.sim=new RoomSimulation(room,row.simulation);rooms.set(room.code,room);}}catch(error){if(error.code!=='ENOENT')console.warn('Raumspeicher konnte nicht geladen werden:',error.message);}
setInterval(()=>{for(const room of rooms.values())room.sim.tick(.1);},100).unref();
let saving=false;setInterval(async()=>{if(saving)return;saving=true;try{await saveRooms();}catch(e){console.error('Raumspeichern fehlgeschlagen:',e.message);}finally{saving=false;}},15000).unref();
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,async()=>{try{await saveRooms();}finally{process.exit(0);}});

function networkDetails(){try{return lanAddresses(networkInterfaces(),PORT);}catch{return [];}}
function localAddresses() {
  const addresses = [];
  try {
    for (const list of Object.values(networkInterfaces())) {
      for (const entry of list || []) {
        if (entry.family === "IPv4" && !entry.internal) addresses.push("http://" + entry.address + ":" + PORT);
      }
    }
  } catch {
    return addresses;
  }
  return addresses;
}

function openBrowser(url) {
  if (process.env.VENU_NO_OPEN === "1") return;
  const os = platform();
  if (os === "win32") execFile("cmd", ["/c", "start", "", url], () => {});
  else if (os === "darwin") execFile("open", [url], () => {});
  else execFile("xdg-open", [url], () => {});
}

server.on('error', error => {
  console.error(error.code === 'EADDRINUSE' ? 'Port ' + PORT + ' ist belegt. Schließe zuerst das Serverfenster der alten VENU Version und starte Alpha 0.9 erneut.' : error.message);
  process.exitCode = 1;
});
server.listen(PORT, "0.0.0.0", () => {
  const local = "http://localhost:" + PORT;
  console.log("");
  console.log("VENU Alpha 0.9 läuft jetzt");
  console.log("Auf diesem PC: " + local);
  for (const address of localAddresses()) console.log("Im selben WLAN: " + address);
  console.log("");
  console.log("Dieses Fenster geöffnet lassen. Mit Strg und C beendest du den Server.");
  setTimeout(() => openBrowser(local + "/wlan.html"), 500);
});
