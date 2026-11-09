@echo off
title Subir a GitHub - Gestion de Contactos
echo ========================================================
echo   Subiendo Gestion de Contactos a GitHub
echo   Repositorio: https://github.com/uriartecindy6-hub/gestion-contactos.git
echo ========================================================
echo.
set "PATH=%LOCALAPPDATA%\Programs\git\cmd;%LOCALAPPDATA%\Programs\git\ucrt64\bin;%PATH%"
cd /d "c:\Gestion-contactos"

echo Ejecutando: git push -u origin main
echo (Si es la primera vez, se abrira una ventana de GitHub para iniciar sesion)
echo.
git push -u origin main

echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo   [EXITO] Proyecto subido exitosamente a GitHub!
    echo ========================================================
) else (
    echo ========================================================
    echo   [AVISO] No se pudo completar el push automaticamente.
    echo   Asegurate de haber iniciado sesion o usa un Token de GitHub.
    echo ========================================================
)
echo.
pause
