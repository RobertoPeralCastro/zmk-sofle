# Script para compilar ZMK localmente usando Docker
# Uso: .\build-local.ps1

Write-Host "🔨 Compilando firmware ZMK localmente..." -ForegroundColor Cyan

# Verificar si Docker está corriendo
Write-Host "🐳 Verificando Docker..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✅ Docker está corriendo" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker no está corriendo. Por favor:" -ForegroundColor Red
    Write-Host "   1. Inicia Docker Desktop" -ForegroundColor White
    Write-Host "   2. Espera a que esté listo" -ForegroundColor White
    Write-Host "   3. Ejecuta este script de nuevo" -ForegroundColor White
    exit 1
}

# Crear directorio de salida si no existe
if (-not (Test-Path ".\build")) {
    New-Item -ItemType Directory -Path ".\build" | Out-Null
}

# Compilar para el lado izquierdo (con ZMK Studio)
Write-Host "`n📦 Compilando lado izquierdo (eyelash_sofle_left)..." -ForegroundColor Yellow
docker run --rm `
    -v "${PWD}:/workspace" `
    -w /workspace `
    zmkfirmware/zmk-build-arm:stable `
    bash -c "west init -l config; west update; west build -s zmk/app -b nice_nano_v2 -d build/left -- -DSHIELD=eyelash_sofle_left -DCONFIG_ZMK_STUDIO=y; cp build/left/zephyr/zmk.uf2 build/eyelash_sofle_left.uf2"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Lado izquierdo compilado: build/eyelash_sofle_left.uf2" -ForegroundColor Green
} else {
    Write-Host "❌ Error compilando lado izquierdo" -ForegroundColor Red
    exit 1
}

# Compilar para el lado derecho
Write-Host "`n📦 Compilando lado derecho (eyelash_sofle_right)..." -ForegroundColor Yellow
docker run --rm `
    -v "${PWD}:/workspace" `
    -w /workspace `
    zmkfirmware/zmk-build-arm:stable `
    bash -c "west build -s zmk/app -b nice_nano_v2 -d build/right -- -DSHIELD=eyelash_sofle_right; cp build/right/zephyr/zmk.uf2 build/eyelash_sofle_right.uf2"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Lado derecho compilado: build/eyelash_sofle_right.uf2" -ForegroundColor Green
} else {
    Write-Host "❌ Error compilando lado derecho" -ForegroundColor Red
    exit 1
}

Write-Host "`n🎉 ¡Compilación completada!" -ForegroundColor Green
Write-Host "📁 Archivos generados en la carpeta 'build/':" -ForegroundColor Cyan
Write-Host "   - eyelash_sofle_left.uf2" -ForegroundColor White
Write-Host "   - eyelash_sofle_right.uf2" -ForegroundColor White
Write-Host "`n💡 Para flashear:" -ForegroundColor Yellow
Write-Host "   1. Conecta el Sofle en modo bootloader (doble reset)" -ForegroundColor White
Write-Host "   2. Copia el archivo .uf2 correspondiente a la unidad que aparece" -ForegroundColor White
