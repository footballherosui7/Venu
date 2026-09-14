# VENU Alpha 0.9

## Starten

1. ZIP vollständig entpacken.
2. Im Ordner Venu die Datei VENU_0_9.html mit Chrome oder Edge öffnen.
3. Im Menü muss ALPHA 0.9 stehen.
4. Eine neue Welt erstellen. Survival beginnt mit vollständig leerem Inventar.
5. Nach dem Laden ins Spielfeld klicken.

Singleplayer benötigt keine Installation. Alle Skripte, Texturen und die Grafikbibliothek sind in der HTML Datei enthalten. Die Dateien im Ordner src sind der bearbeitbare Quellcode.

Die neuen Grafiken erscheinen auch in vorhandenen Welten. Die Weltgeneration bleibt auf Stand 0.8. Ältere Landschaften werden beim Laden erhalten. Datei und Serveradresse haben jeweils eigenen Browserspeicher.

## Neu in 0.9

Alle Inventargrafiken wurden ersetzt. Blöcke zeigen jetzt texturierte Würfel mit beleuchteter Oberseite und dunkler Seitenfläche. Spitzhacken, Äxte, Schwerter und Schaufeln besitzen eigene Silhouetten. Holz, Stein, Eisen, Diamant und Xyther haben unterscheidbare Materialfarben. Goldbarren sind golden, Eisenbarren silbern. Xytherkristalle sind violette Kristallspitzen statt einer zweiten Diamantgrafik.

Die Welttexturen haben jetzt 32 × 32 statt 16 × 16 Pixel pro Fläche. Holz zeigt Rinde und Jahresringe, die Werkbank ihr Raster und Werkzeugseiten. Erzadern, Tiefenschiefer, Sand, Eis, Blätter und Portalblöcke haben eigene Details. Welt und Inventar verwenden denselben Texturzeichner. Die Grafiken wurden eigens für VENU erstellt.

Die Symbole gelten im Inventar, in der Schnellleiste, beim Crafting, im Rezeptbuch, am Mauszeiger und in der Hand. Grafikvorschau.png zeigt alle 58 sammelbaren Blöcke und Gegenstände. Zum Erstellen der Grafiken aus dem Quellcode nach npm install den Befehl npm run art verwenden. Zum Spielen ist das nicht erforderlich.

WLAN bleibt auf Port 8088. Vor dem Start das alte Serverfenster schließen. Alle Spieler öffnen die neue Version 0.9 vom selben Server. Die vorhandene Firewallfreigabe für Port 8088 bleibt verwendbar.

## Bereits enthalten aus 0.8

Neue Welten können **50.000 × 50.000 Blöcke** groß sein. Die Höhe bleibt 192. Auf beiden waagerechten Achsen reicht die Welt von minus 25.000 bis 24.999. Im Auswahlmenü bleibt zusätzlich eine kompakte Welt mit 1000 × 1000 verfügbar. Vorhandene Welten behalten ihre bisherige Größe.

Die Welt erzeugt nur die gerade benötigten Spalten und Grafikabschnitte. Es werden keine 50.000 × 50.000 Spalten gleichzeitig im Arbeitsspeicher angelegt. Die Sichtweite bleibt eine eigene Einstellung. Entfernte Bauten werden gespeichert und beim Wiederbesuch aufgebaut. Außerhalb des Startgebiets verteilen sich Wälder, Meere, Küsten, Wüsten und weitere Landschaften über größere Klimaregionen.

Die Karte besitzt Ausschnitte von 512 Blöcken, 4096 Blöcken und der ganzen Welt. Gib einen Namen ein und klicke in die Karte, um einen Ort zu markieren. Bis zu acht Markierungen bleiben im Einzelspielerspielstand erhalten. Deine zuletzt gesetzte Markierung in der aktuellen Dimension zeigt im Spiel Entfernung und Koordinaten. Im Multiplayer gelten Markierungen für die laufende Verbindung.

Es gibt dreizehn Arten von Geräuschen: Schritte, Abbauen, Setzen, Treffer, Schaden, Aufsammeln, Crafting, Essen, Heiltränke, Portale, Bosswarnungen, Sieg und Wasserbewegung. Holz, Stein und weiche Böden klingen bei Schritten und Abbau unterschiedlich. Die Sounds werden lokal erzeugt und benötigen keine Downloads. Die Lautstärke folgt dem Regler in den Einstellungen. Der Browser aktiviert Ton nach deinem ersten Klick ins Spiel.

Start_Venu.bat prüft nun die Dateien und die Node Version. Ein bereits laufender Server wird erkannt. Die neue Verbindungsseite zeigt die Adressen für Freunde. Auf dem Server PC startet sie automatisch. Vollständige Schritte und Fehlerhilfe stehen in WLAN_ANLEITUNG.txt.

## Was aus 0.7 erhalten bleibt

Die Oberwelt erhält eine neue Höhlenverteilung. Breite Kammern, hohe Schächte, flachere Gewölbe und natürliche Verbindungen werden abhängig vom Seed gemischt. Der absteigende Höhleneingang nahe dem Start verändert seine Lage ebenfalls. Die Weltkarte zeigt diesen tatsächlichen Eingang. Die alten festen Höhlenkoordinaten gelten für neue Welten nicht mehr.

Unter Höhe 52 liegt Tiefenschiefer. Er ist langsamer abzubauen als normaler Stein. Darin liegen eigene dunkle Varianten von Kohle, Eisen, Gold und Diamanterz. Die Erzverteilung ist seltener als in Version 0.6. Diamanten liegen unter Höhe 32 und benötigen eine Eisenspitzhacke.

Null liegt jetzt unter einer geschlossenen Felsdecke. Vom Eingangsgewölbe führt ein breiter unterirdischer Gang zur Bosskrypta bei X 0, Y 39, Z minus 70. Die Dimension hat schwarzen Stein, weitere unterirdische Hohlräume und einen dunklen Himmel außerhalb des Gesteins.

Feindliche Mobs fliehen nach einem Treffer nicht mehr wie Tiere. Xytherwächter greifen im Nahkampf häufiger an. Mobs können auf erreichbaren Böden unter der Erde laufen. Nachtläufer lassen Kohle statt fertiger Eisenbarren fallen. Die Gegner besitzen weiterhin einfache Wegsuche.

## Vom leeren Inventar zur Ausrüstung

1. Sechs Stammblöcke mit gedrückter linker Maustaste abbauen und ihre Beute aufsammeln.
2. Mit E das Inventar öffnen. Vier Holzblöcke im Quadrat ergeben eine Werkbank. Vier Bretter gehen ebenfalls.
3. Im Rezeptbuch ein Rezept wählen und Herstellen drücken. Das Ergebnis kommt ins Inventar. Das Rezeptbuch zeigt fehlende Zutaten.
4. Restliches Holz zu Brettern und Bretter zu Stöcken verarbeiten.
5. Die Werkbank in der Schnellleiste auswählen und mit Rechtsklick setzen. Noch einmal auf die gesetzte Werkbank rechts klicken: Jetzt ist das Raster 3 × 3 groß.
6. Holzspitzhacke herstellen, Stein abbauen und zur Steinspitzhacke aufsteigen. Eisen im Ofen zu Barren verarbeiten und eine Eisenspitzhacke herstellen.

Das Inventar hat 2 × 2 Crafting, die Werkbank 3 × 3. Linksklick nimmt einen Stapel, Rechtsklick verteilt einzelne Zutaten. Beim Schließen kommen übrige Zutaten zurück. Mit Shift und Klick bindest du einen Gegenstand an den ausgewählten Platz der Schnellleiste.

Werkzeuge haben Haltbarkeit. Acht Steine außen im großen Raster ergeben einen Ofen. Eisen und Gold werden mit Kohle geschmolzen. Schmelzen ist in diesem Prototyp sofortig.

| Rohstoff | Voraussetzung |
| --- | --- |
| Kohle | Holzspitzhacke oder besser |
| Eisen | Steinspitzhacke oder besser |
| Gold | Eisenspitzhacke oder besser |
| Diamant | Eisenspitzhacke oder besser, unter Höhe 32 |
| Obsidian | Diamantspitzhacke |
| Xytherkristall | Eisenspitzhacke oder besser, in Xyther |

Die dunklen Erzvarianten liefern dieselben Rohstoffe wie ihre normalen Varianten. Tiefenschiefer zählt beim Abbau als harter Stein und liefert Stein für Werkzeuge und Öfen.

## Der Weg nach Xyther und Null

1. Neun Diamanten im großen Raster ergeben einen Diamantblock. Sammle insgesamt 90 Diamanten für zehn Blöcke.
2. Baue einen senkrechten Diamantrahmen, außen vier Blöcke breit und fünf hoch. Die vier Ecken bleiben frei, innen bleibt eine Öffnung von 2 × 3.
3. Rechtsklick auf den vollständigen Rahmen aktiviert das Xytherportal. Hineinspringen führt nach Xyther.
4. Besiege dort acht Xytherwächter. Jeder gibt genau einen Xyshard und zwei Xytherkristalle.
5. Acht Xyshards an den Rand des großen Craftingrasters legen, Mitte frei. Daraus entsteht der Nullkompass.
6. Durch das Rückportal in die Oberwelt zurückkehren. Den Nullkompass auswählen und seiner Nadel folgen. Er zeigt Richtung, Entfernung und Zielkoordinaten der Nullruine.
7. Rechtsklick mit dem Kompass auf den dunklen Nullrahmen öffnet das Portal. Der Kompass bleibt erhalten.
8. Das Portal betreten und im unterirdischen Nullgewölbe zur Bosskrypta gehen.

Ein normales Rückportal am Eingang von Null bleibt verfügbar, falls du weitere Ausrüstung holen möchtest. Dieses Portal beendet das Spiel nicht. Zwischen Dimensionsreisen liegen vier Sekunden Schutz gegen sofortiges Zurückreisen.

## Der Endboss: Nullarchon

Der Nullarchon besitzt im Einzelspieler 900 Lebenspunkte und drei Phasen. Seine Angriffe werden mit sinkender Gesundheit schneller und gefährlicher. Die Lebensanzeige und der aktuelle Kampfhinweis stehen oben im Bild.

Während er sich bewegt, reduziert seine Rüstung deinen Schaden. Nach einem großen Angriff ist er für kurze Zeit verwundbar. Dieses Zeitfenster erkennst du am Hinweis, dass seine Rüstung offen ist.

Ein roter Warnkreis markiert einen bevorstehenden Flächenangriff. Verlasse den Kreis, bevor er auslöst. Ab der zweiten Phase erscheinen außerdem größere helle Ringe. Ihnen kannst du ausweichen oder rechtzeitig hoch genug springen. In der dritten Phase werden die Warnzeiten kürzer und die Flächenangriffe stärker.

Bereite ein Diamantschwert oder Xytherschwert, Nahrung und Heiltränke vor. Zwei Xytherkristalle über einem Stock ergeben ein Xytherschwert. Für zwei Heiltränke lege oben einen Apfel und einen Xytherkristall, darunter links einen weiteren Apfel. Jeder Trank heilt acht Lebenspunkte. Zwischen zwei Tränken liegen sieben Sekunden. Das Rezeptbuch zeigt das Muster.

Die Bosskrypta ist gegen Abbauen und Platzieren geschützt. Du kannst den Boss nicht mit einer Blocksperre festsetzen. Verlässt du die Arena für zwölf Sekunden, beginnt ein nicht besiegter Boss wieder mit voller Gesundheit. Im Einzelspieler setzt auch dein Tod einen laufenden Bosskampf zurück. Außerhalb der Krypta bleibt das übliche Bauen möglich.

## Das flache Siegesportal

In der Krypta liegt ein Portal direkt im Boden. Sein Außenmaß ist 5 × 5 Blöcke. Die vier Ecken enthalten keine Rahmenblöcke. Der Rahmen hat zwölf Blöcke und umschließt neun Felder, also genau 3 × 3.

Vor dem Sieg sind diese neun Felder dunkel versiegelt. Erst wenn der Nullarchon besiegt ist, leuchten sie auf. Gehe auf die leuchtende Fläche. Du kehrst in die Oberwelt zurück und erhältst den Siegesbildschirm mit deiner aktiven Spielzeit.

Danach kannst du weiterspielen. Inventar, Bauten, der besiegte Boss und das offene Portal bleiben gespeichert. Das gewöhnliche Rückportal zählt nicht als Sieg.

## Ziel für die Spieldauer

Das Ziel für einen guten Survivalspieler ist ungefähr eine Stunde bis zum Abschluss. Dafür sind Ressourcenbeschaffung, seltenere Diamantadern, die acht Wächter, Ausrüstung und der Bosskampf auf einen längeren Ablauf ausgelegt. Es gibt keine künstliche Mindestspielzeit oder Warteuhr vor dem Sieg.

| Abschnitt | Planwert für die Abstimmung |
| --- | --- |
| Werkbank, Nahrung, Stein und Eisen | 10 bis 15 Minuten |
| Tiefe Höhlen, Diamanten und Portal | 20 bis 30 Minuten |
| Xyther, Wächter und Ausrüstung | 10 bis 15 Minuten |
| Nullkrypta und Bosskampf | 5 bis 10 Minuten |

Diese Werte sind Entwicklungsziele, keine gemessenen Durchlaufzeiten. Ein kompletter manueller Survivaldurchlauf steht aus. Seed, Spielweise und Erfahrung können die Dauer deutlich verändern. Kreativmodus und gemeinsames Spielen lassen sich damit nicht vergleichen. Die Version erzwingt keine Stunde.

## Steuerung und Welt

| Eingabe | Aktion |
| --- | --- |
| WASD und Maus | Bewegen und umsehen |
| Leertaste | Springen oder im Wasser steigen |
| Shift | Sprinten oder im Wasser sinken |
| Linksklick halten | Abbauen oder kämpfen |
| Rechtsklick | Setzen, Werkbank öffnen, Essen, Heiltrank oder Portal aktivieren |
| E oder C | Inventar |
| M | Weltkarte |
| 1 bis 9 oder Mausrad | Schnellleiste |
| Q | Gegenstand fallen lassen |
| F im Kreativmodus | Fliegen |
| Escape | Pause |

Neue große Welten sind 50.000 × 50.000 × 192 Blöcke groß. Kompakte Welten mit 1000 × 1000 sind weiter verfügbar. Die Umgebung wird abschnittsweise geladen. Es gibt unter anderem Wald, Wüste, Ozean, Gebirge, Schneetaiga, Eisberge, Badlands und Sumpf. Wasser und Lava sind feste Volumen und fließen noch nicht. Hunger, Lava, Stürze, Ertrinken und Gegner können Schaden verursachen. Nach dem Tod bleibt das Inventar erhalten.

## Multiplayer

Lies zuerst WLAN_ANLEITUNG.txt. Freunde öffnen die angezeigte Netzwerkadresse des Server PCs und benötigen selbst keine Installation. Die Adresse localhost funktioniert nur auf dem Server PC. Das schwarze Serverfenster bleibt während des Spielens offen.

Falls die Windows Firewall blockiert, kann WLAN_Freigeben.bat per Rechtsklick als Administrator ausgeführt werden. Diese Datei erlaubt ausschließlich TCP 8088 im privaten Netzwerk aus dem lokalen Subnetz. WLAN_Freigabe_entfernen.bat nimmt die Regel wieder zurück. Diese beiden Dateien werden nicht automatisch ausgeführt. Für ein eigenes Heimnetz muss das private Netzwerkprofil eingestellt sein.


Für Multiplayer Start_Venu.bat unter Windows oder Start_Venu.command unter macOS öffnen. Node.js ab Version 20 ist erforderlich. Alternativ im Projektordner node server.js ausführen. Der Server zeigt die Adresse mit Port 8088 an. Bis zu acht Spieler im selben Netzwerk können über einen Raumcode beitreten. Alle verwenden die vom selben Server ausgelieferte Version 0.9.

Gegner, Bossgesundheit, Warnflächen und der offene Siegesrahmen werden gemeinsam vom Server verwaltet. Alle Spieler im Raum sehen denselben besiegten Boss und können anschließend das Portal nutzen. Andere Dimensionen bleiben getrennt. Der Server speichert Raumcodes, Bauten und Bosszustand alle 15 Sekunden sowie beim normalen Beenden mit Strg und C in data/rooms.json.

Persönliche Multiplayerinventare sind weiterhin an die aktuelle Verbindung gebunden. Nach Serverneustart oder neuem Beitritt werden sie nicht als Benutzerkonto wiederhergestellt. Spielerhandel, PvP und gemeinsame abgelegte Beute fehlen. Bewegung und Inventar werden teilweise vom Client übernommen. Der Server ist für gemeinsames Spielen im eigenen Netzwerk gedacht.

## Entwicklung und Prüfstand

npm run check prüft Weltmerkmale, Rezepte, Portalbedingungen, den Boss und den HTTP Server. Nach npm install prüft npm run check:ui die tatsächlichen Oberflächenaktionen mit einem ersetzten Grafikrenderer. npm run build erzeugt die einzelne HTML Datei. npm run check:standalone prüft deren Start.

Die Grafik und die Bildrate wurden hier nicht manuell geprüft. Ein automatisierter Test ersetzt keinen echten einstündigen Spieldurchlauf. Einzelheiten und Testaufbauten stehen in PRUEFBERICHT.md.

Die enthaltene Three.js Bibliothek steht unter der MIT Lizenz. Die Lizenz liegt im Ordner vendor. Die Grafiken stammen aus diesem Projekt.
