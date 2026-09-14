# Prüfung VENU Alpha 0.9

## Grafikprüfung in 0.9

art.mjs prüft alle 58 sammelbaren Symbole auf unterschiedliche Bilddaten, gültige PNGs, 96 × 96 Pixel, sichtbare Silhouetten und transparente Ränder. Eisen und Gold, Diamant und Xytherkristall sowie alle Spitzhacken und Schwerter müssen unterscheidbar sein. Alle 129 Atlasflächen werden pixelgenau mit dem gemeinsamen Texturzeichner verglichen. UV Grenzen und Oberseitenzuordnung werden geprüft. Die Werkzeugbilder entsprechen exakt dem editierbaren SVG Quellcode.

Grafikvorschau.png wurde visuell geprüft. Sie zeigt die tatsächlichen Inventarbilder. Der Starttest prüft eingebettete Grafiken im Rezeptbuch. Der Grafikrenderer im Oberflächen und Dateistarttest wird ersetzt; eine echte WebGL Darstellung im Browser wurde hier nicht visuell geprüft.

Die Weltgeneration bleibt in dieser Grafikversion auf Stand 8. Server und Client verwenden gemeinsam Protokoll 9, damit ein noch laufender älterer Server nicht versehentlich die alten Grafiken ausliefert. Port 8088 bleibt unverändert.

## Übernommene Prüfungen aus Version 0.8

large_world.mjs prüft die tatsächlichen Weltgrenzen minus 25.000 und 24.999, Spaltenindizes oberhalb von 2 hoch 31, Bauten an beiden Rändern, gespeicherte Änderungen bei weit entfernten Koordinaten und eine begrenzte Zahl geladener Spalten. Die dichten alten Weltarrays bleiben deaktiviert. Die Prüfung findet mehrere Biome außerhalb des Startgebiets.

Die dreizehn Soundvarianten erzeugen endliche Audiosignale mit messbarer Energie und ohne übersteuerte Samples. Unterschiedliche Materialgeräusche, stumme Lautstärke und das Freigeben von Stimmen werden geprüft. Eine manuelle Hörprobe auf dem Zielgerät steht aus.

lan.mjs startet den tatsächlichen Server über den neuen Node Starthelfer, erkennt einen bereits laufenden Server, ruft die Verbindungsseite ab und verbindet zwei HTTP Teilnehmer. Ein Spieler bei X 18.000 wird ungekürzt übertragen, und dortige Bauten bleiben gespeichert. Die Auswahl und Priorisierung von WLAN Adressen wird mit Netzwerkadaptertestdaten geprüft.

Das Testsystem sperrt das Auslesen seiner Hardwareadressen. Die beiden HTTP Teilnehmer wurden deshalb über Loopback verbunden. Es gab keinen Zugriff auf zwei echte WLAN Geräte. Windows BAT und die Windows Firewallbefehle wurden nicht ausgeführt. Die BAT Dateien sind für Windows mit CRLF Zeilenenden verpackt. Die Einschränkung ist in der Anleitung angegeben.

Der Oberflächentest prüft zusätzlich Kartenzoom, eine benannte Markierung, ihre Anzeige im Spiel und das Speichern der Markierung. Der direkte Dateistart prüft die neue 50.000er Standardwelt. Die bisherigen Craftingprüfungen verwenden die weiterhin angebotene kompakte Welt.

## Welt und Fortschritt

Der Test endgame.mjs prüft unterschiedliche Kammern und Eingangspositionen bei zwei Seeds. Eine vergleichbare Stichprobe verwendet in alter und neuer Generation denselben Seed und dieselben Koordinaten. In dieser Stichprobe wurden 6374 Erzblöcke in Version 0.6 und 3700 Erzblöcke in Version 0.7 gefunden. Bei Diamanten waren es 214 gegenüber 84. Zusätzlich wurden 20072 Tiefenschieferblöcke und 3615 freie Höhlenfelder in der neuen Probe gefunden. Diese Stichprobe ist kein weltweiter Durchschnitt.

Werkzeuganforderungen, längere Abbauzeit im Tiefenschiefer und Beute aus dunklen Erzvarianten werden geprüft. Die Höhlendecke über der Nullarena und ihr begehbarer Boden sind an generierten Blockwerten geprüft.

## Boss und Siegesportal

Das horizontale Portal besitzt zwölf Rahmenblöcke ohne vier Ecken und neun innere Felder. Vor dem Tod des Bosses ist es gesperrt. Danach öffnen alle neun Felder. Ein normales Rückportal ist kein Spielabschluss.

Der Funktionstest prüft den reduzierten Schaden gegen die Rüstung und vollen Schaden im Erholungsfenster, drei Gesundheitsphasen, das Vermeiden eines Warnbereichs und Schaden innerhalb eines Warnbereichs. Er prüft einen gespeicherten laufenden Kampf, den dauerhaft besiegten Boss, die geschützte Arena und die serverseitige Ablehnung eines zu frühen Abschlusses.

## Tatsächliche Oberfläche

Der Oberflächentest verwendet Happy DOM und die tatsächlichen Spielmodule. Nur der WebGL Renderer wird ersetzt. Die 2D Texturen werden mit einer Canvasimplementierung erzeugt.

Der Test startet leer, baut natürliche Bäume ab, sammelt Beute, craftet eine Werkbank und eine Spitzhacke, baut anvisierten Naturstein ab und testet Inventar, Lavaschaden, Weltkarte und Speichern. Er prüft Xytherreisen, acht physisch aufgehobene Xyshards, das Kompassrezept, die Portalaktivierung und getrennte Bauten in drei Dimensionen.

Für die neue Bossprüfung wird der Spieler in die Krypta gesetzt. Der Boss wird tatsächlich anvisiert und mit der Spielaktion getroffen. Für diesen abschließenden Treffer wird sein Zustand als Testaufbau auf zwölf Lebenspunkte und Erholung gesetzt; das Xytherschwert wird dem Testinventar hinzugefügt. Der Test prüft den gespeicherten Tod, das Betreten des Bodenportals, die Rückkehr, den Siegesbildschirm, das Weiterspielen und den gespeicherten Abschluss. Die vollständigen Phasenregeln werden separat geprüft.

Diese Testaufbauten sind keine manuell erspielten Survivaldurchläufe.

## Multiplayer

Zwei simulierte Teilnehmer verwenden den tatsächlichen HTTP Server. Geprüft werden gemeinsame Gegner, Treffer und Beute ohne doppelte Vergabe, Portalaktivierung, getrennte Dimensionen, Rückreisen, Raumdaten nach Serverneustart und die Nichtauslieferung der gespeicherten Raumdatei über HTTP.

Die Bossprüfung verwendet einen gespeicherten Zustand mit zwölf verbleibenden Lebenspunkten, um den abschließenden HTTP Test kurz zu halten. Beide Teilnehmer sehen den Tod und dieselben neun offenen Felder. Der Abschluss und ein weiterer Serverneustart erhalten den besiegten Boss und das Portal.

## Grenzen

Eine echte WebGL Sichtprüfung, eine gemessene Bildrate und ein Test mit zwei echten PCs stehen aus. Der verfügbare Browser hat den lokalen Dateizugriff zuvor abgewiesen. Diese Sperre wird nicht umgangen.

Eine Stunde Spielzeit ist ein Ziel der Abstimmung. Die automatisierten Prüfungen belegen seltenere Rohstoffe und die korrekten Spielbedingungen, nicht eine garantierte Durchlaufdauer. Ein vollständiger manueller Survivaltest mit gemessenen Abschnittszeiten steht aus.

Multiplayerinventare sind nicht dauerhaft an Konten gebunden. Flüssigkeiten fließen nicht. Mobs verwenden einfache Wegsuche. Diese Grenzen sind in der Anleitung beschrieben.
