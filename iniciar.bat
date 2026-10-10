@echo off
title Sistema de Gestion de Contactos
echo ========================================================
echo   Iniciando Sistema de Gestion de Contactos
echo ========================================================

set "PATH=%LOCALAPPDATA%\Programs\nodejs;%PATH%"

echo Verificando Node.js...
node -v
if errorlevel 1 (
    echo [ERROR] Node.js no esta disponible en el sistema.
    pause
    exit /b 1
)

echo Iniciando backend y frontend...
node dev.js
pause
