# Sofle Dynamic Firmware - Firmware Base Universal

## 🚀 ¿Qué es esto?

Este es un **firmware base universal** para el teclado Sofle que permite la configuración completa de todas las teclas a través de USB, sin necesidad de recompilar.

### ✨ Características principales

- **66 teclas totalmente configurables** via USB
- **2 encoder bindings configurables** 
- **5 capas adicionales** predefinidas (Funciones, Bluetooth, Configuración, RGB, Transparente)
- **Capa estática de respaldo** con el layout original
- **Compatible con ZMK Studio** para configuración visual
- **Settings runtime** para persistencia de configuración

---

## 🎯 Compatibilidad

### Hardware Soportado

| Teclado | MCU/Chip | Versiones | Shields |
|---------|----------|-----------|---------|
| **Sofle** | Nice!Nano v2 | Todas | nice_view |
| **Sofle Choc** | Nice!Nano v2 | Todas | nice_view |
| **Sofle矮轴** | Nice!Nano v2 | Todas | nice_view |

### Requisitos mínimos

- **MCU**: Nice!Nano v2 (nRF52840)
- **Shield**: nice_view (con pantalla OLED)
- **Encoder**: EC11 (soportado pero opcional)
- **Split**: Conexión USB en lado izquierdo recomendada

---

## 📦 Instalación

### 1. Descargar el firmware base

Descarga los archivos `.uf2` precompilados desde la sección [Releases](https://github.com/RobertoPeralCastro/zmk-sofle/releases):

- `eyelash_sofle_left.uf2` - Lado izquierdo
- `eyelash_sofle_right.uf2` - Lado derecho

### 2. Flashear el firmware

1. **Conectar el teclado en modo bootloader**:
   - Mantén presionado el botón reset mientras conectas USB
   - O usa el combo: `Q + S + Z` (mantener 2 segundos) para soft-off, luego reset

2. **Arrastrar archivos .uf2**:
   - Aparecerá una unidad USB llamada `NICENANO`
   - Arrastra `eyelash_sofle_left.uf2` al lado izquierdo
   - Arrastra `eyelash_sofle_right.uf2` al lado derecho

### 3. Verificar instalación

El teclado iniciará con **teclas dinámicas configurables**. Todas las teclas estarán en modo `&dyn_kp` listas para configuración.

---

## ⚙️ Configuración

### Método 1: ZMK Studio (Recomendado)

1. **Conectar via USB** al lado izquierdo
2. **Abrir ZMK Studio** en tu navegador
3. **Configurar teclas individualmente**:
   - Haz clic en cualquier tecla
   - Selecciona el keycode deseado
   - La configuración se guarda automáticamente

### Método 2: Settings API

Para configuración programática:

```json
{
  "dyn_kp/key_0": "&kp A",
  "dyn_kp/key_1": "&kp S", 
  "dyn_kp/key_2": "&kp D",
  "dyn_kp/key_64": "&msc SCRL_UP",
  "dyn_kp/key_65": "&msc SCRL_DN"
}
```

### Método 3: CLI Commands

```bash
# Configurar tecla específica
echo "dyn_kp/key_0=&kp A" > /path/to/settings

# Configurar encoder
echo "dyn_kp/key_64=&msc SCRL_UP" > /path/to/settings
```

---

## 🎮 Capas Disponibles

### Layer 0 (Default) - Dynamic Layer
- **66 teclas**: `&dyn_kp 0-65` (totalmente configurables)
- **2 encoders**: `&dyn_kp 64-65` (configurables)

### Layer Static - Respaldo Original
- Layout QWERTY completo fijo
- Encoder con volumen
- Acceso via `&mo 5` (si se configura)

### Layer 1 - Funciones
- F1-F12, multimedia
- Navegación (HOME, END, PGUP/PGDN)
- Mouse buttons

### Layer 2 - Bluetooth & Config
- Emparejamiento Bluetooth
- Salidas USB/BLE
- Reset y bootloader

### Layer 3 - RGB & Efectos
- Control RGB underglow
- Efectos y brillo
- Encendido/apagado

### Layer 4 - Transparente
- Para combos personalizados
- Overlays de keymap

---

## 🔧 Mapeo de Teclas Dinámicas

### Teclas Físicas (0-63)

| Índice | Posición | Índice | Posición |
|--------|----------|--------|----------|
| 0-12   | Fila superior izquierda | 13-25 | Fila superior derecha |
| 26-38  | Fila media izquierda | 39-51 | Fila media derecha |
| 52-63  | Fila inferior izquierda | | |

### Encoders (64-65)

| Índice | Función | Default |
|--------|---------|---------|
| 64     | Encoder CW | Configurable |
| 65     | Encoder CCW | Configurable |

---

## 💾 Persistencia de Configuración

La configuración se guarda automáticamente en la memoria flash del MCU:

- **Settings Runtime**: Activado por defecto
- **Persistencia**: Los cambios sobreviven a reinicios
- **Backup**: Se recomienda exportar configuración personalizada

### Exportar configuración

```bash
# Exportar todos los settings
zmk settings export > my_keymap.json

# Importar configuración
zmk settings import < my_keymap.json
```

---

## 🚨 Troubleshooting

### Teclas no responden
1. Verifica que el firmware está correctamente flasheado
2. Revisa conexión USB (lado izquierdo)
3. Intenta resetear: `Q + S + Z` (2 segundos) + reset

### Configuración no se guarda
1. Asegúrate que `CONFIG_SETTINGS_RUNTIME=y` está activado
2. Verifica espacio en memoria flash
3. Reintenta la configuración

### Encoder no funciona
1. Revisa conexiones físicas del encoder
2. Configura `dyn_kp/key_64` y `dyn_kp/key_65`
3. Verifica que el encoder esté conectado al pin correcto

---

## 🔄 Actualización del Firmware

Para actualizar a versiones futuras:

1. **Exportar configuración actual**:
   ```bash
   zmk settings export > backup.json
   ```

2. **Flashear nuevo firmware** (sigue pasos de instalación)

3. **Restaurar configuración**:
   ```bash
   zmk settings import < backup.json
   ```

---

## 🤝 Contribuciones

- **Reportar bugs**: Issues en GitHub
- **Sugerencias**: Discussions en GitHub  
- **Patches**: Pull Requests bienvenidas

---

## 📄 Licencia

MIT License - Ver archivo LICENSE para detalles

---

## 📞 Soporte

- **Email**: 380465425@qq.com
- **GitHub Issues**: [Reportar problema](https://github.com/RobertoPeralCastro/zmk-sofle/issues)
- **Discussions**: [Comunidad](https://github.com/RobertoPeralCastro/zmk-sofle/discussions)

---

**⚡ ¡Listo para usar! Tu Sofle ahora es completamente configurable via USB!**
