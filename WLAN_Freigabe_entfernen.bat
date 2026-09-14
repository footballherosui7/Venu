@echo off
net session >nul 2>nul
if errorlevel 1 (
  echo Bitte diese Datei per Rechtsklick als Administrator ausfuehren.
  pause
  exit /b 1
)
netsh advfirewall firewall delete rule name="VENU 0.9 WLAN TCP 8088"
pause
