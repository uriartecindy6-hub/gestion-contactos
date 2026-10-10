Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "  Iniciando Sistema de Gestión de Contactos" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$env:Path = "$env:LOCALAPPDATA\Programs\nodejs;$env:Path"

node dev.js
