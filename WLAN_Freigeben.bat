@echo off
setlocal
net session >nul 2>nul
if errorlevel 1 (
  echo Bitte Rechtsklick auf WLAN_Freigeben.bat und Als Administrator ausfuehren.
  pause
  exit /b 1
)
echo VENU erlaubt eingehende Verbindungen auf TCP Port 8088.
echo Die Freigabe gilt nur fuer private Netzwerke und das lokale Subnetz.
netsh advfirewall firewall delete rule name="VENU 0.9 WLAN TCP 8088" >nul 2>nul
netsh advfirewall firewall add rule name="VENU 0.9 WLAN TCP 8088" dir=in action=allow protocol=TCP localport=8088 profile=private remoteip=localsubnet
if errorlevel 1 (echo Die Freigabe konnte nicht eingerichtet werden.) else (echo Fertig. Start_Venu.bat oeffnen und die WLAN Adresse teilen.)
pause
