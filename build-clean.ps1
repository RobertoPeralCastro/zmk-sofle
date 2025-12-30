# Script para limpiar el workspace de ZMK antes de compilar
Write-Host "🧹 Limpiando workspace de ZMK..." -ForegroundColor Cyan

$dirsToRemove = @('.west', 'zmk', 'zephyr', 'modules', 'tools', 'build', 'eyelash_sofle')

foreach ($dir in $dirsToRemove) {
    if (Test-Path $dir) {
        Write-Host "  Eliminando $dir..." -ForegroundColor Yellow
        try {
            Remove-Item -Path $dir -Recurse -Force -ErrorAction Stop
            Write-Host "  ✅ $dir eliminado" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠️ No se pudo eliminar $dir completamente, continuando..." -ForegroundColor Yellow
        }
    }
}

Write-Host "`n✅ Limpieza completada" -ForegroundColor Green
Write-Host "💡 Ahora puedes ejecutar: .\build-local.ps1" -ForegroundColor Cyan
