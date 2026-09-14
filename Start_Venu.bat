@echo off
setlocal
chcp 65001 >nul
title VENU 0.9 WLAN Server
cd /d "%~dp0"
if not exist "server.js" (
  echo Bitte die gesamte ZIP zuerst entpacken.
  echo Start_Venu.bat muss neben server.js liegen.
  pause
  exit /b 1
)
set "VENU_NODE=node"
if exist "%~dp0runtime\node.exe" set "VENU_NODE=%~dp0runtime\node.exe"
"%VENU_NODE%" --version >nul 2>nul
if errorlevel 1 (
  if exist "%ProgramFiles%\nodejs\node.exe" (
    set "VENU_NODE=%ProgramFiles%\nodejs\node.exe"
  ) else (
    echo Node.js fehlt. Installiere Node.js LTS von https://nodejs.org
    echo Danach diese BAT Datei erneut oeffnen.
    echo Freunde brauchen nur ihren Browser, kein Node.js.
    pause
    exit /b 1
  )
)
"%VENU_NODE%" scripts\start.mjs
if errorlevel 1 (
  echo.
  echo Der Start ist fehlgeschlagen. Die Ursache steht oben.
  echo Hinweise findest du in WLAN_ANLEITUNG.txt.
)
pause
