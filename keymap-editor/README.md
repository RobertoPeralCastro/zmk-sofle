# 🎹 Sofle Keymap Editor

Editor visual web para configurar los keymaps de tu teclado Sofle con firmware ZMK.

## 🚀 Características

- **Editor Visual**: Interfaz gráfica intuitiva que representa tu teclado Sofle
- **5 Capas**: Edita todas las capas de tu keymap (Layer 0-4)
- **Búsqueda de Keycodes**: Encuentra rápidamente cualquier keycode de ZMK
- **Acciones Rápidas**: Botones para los keycodes más comunes
- **Importar/Exportar**: Lee y genera archivos `.keymap` compatibles con ZMK
- **Encoder Support**: Configura las acciones del encoder rotatorio
- **Responsive**: Funciona en desktop y móvil

## 📦 Uso

### Abrir el Editor

1. Abre el archivo `index.html` en tu navegador web
2. No requiere instalación ni servidor web

### Editar Keymaps

1. **Seleccionar Capa**: Haz clic en los botones "Layer 0-4" en la parte superior
2. **Seleccionar Tecla**: Haz clic en cualquier tecla del teclado visual
3. **Asignar Keycode**: 
   - Usa el buscador para encontrar el keycode deseado
   - O usa los botones de "Acciones Rápidas"
   - Haz clic en el resultado para asignarlo

### Importar Keymap Existente

1. Haz clic en "📥 Importar"
2. Pega el contenido de tu archivo `eyelash_sofle.keymap`
3. Haz clic en "Importar"

### Exportar Keymap

1. Haz clic en "💾 Exportar .keymap"
2. Copia el código generado
3. Guárdalo como `eyelash_sofle.keymap` en tu carpeta `config/`

## 🎨 Keycodes Soportados

### Letras y Números
- A-Z, 0-9

### Modificadores
- LSHIFT, RSHIFT, LCTRL, RCTRL, LALT, RALT, LGUI, RGUI

### Navegación
- Flechas (UP, DOWN, LEFT, RIGHT)
- HOME, END, PGUP, PGDN

### Funciones
- F1-F12

### Media
- MUTE, VOLU, VOLD, PLAY, NEXT, PREV

### Bluetooth
- BT0-BT4 (selección de perfil)
- BTCLR (limpiar perfil actual)
- BTCLRA (limpiar todos los perfiles)

### RGB
- RGBON, RGBOFF, RGBTOG
- RGBBRI, RGBBRD (brillo)
- RGBEFF, RGBEFR (efectos)

### Mouse
- MCLK, RCLK, MMCLK (clicks)
- MB4, MB5 (botones adicionales)
- MMVU, MMVD, MMVL, MMVR (movimiento)
- MSCU, MSCD (scroll)

### Capas
- MO1-MO4 (momentáneo)
- TO1-TO4 (cambiar a)
- TG1-TG4 (alternar)

### Sistema
- RESET (reinicio)
- BOOT (bootloader)
- SOFTOFF (apagado suave)
- TRANS (transparente)
- NONE (sin acción)

## 🔧 Estructura de Archivos

```
keymap-editor/
├── index.html      # Interfaz principal
├── styles.css      # Estilos y diseño
├── keycodes.js     # Biblioteca de keycodes ZMK
├── app.js          # Lógica del editor
└── README.md       # Esta documentación
```

## 💡 Consejos

1. **Teclas Transparentes**: Usa `TRANS` para que una tecla use la función de la capa inferior
2. **Teclas Sin Acción**: Usa `NONE` para desactivar completamente una tecla
3. **Capas Momentáneas**: `MO(n)` activa la capa mientras mantienes presionada la tecla
4. **Guardar Frecuentemente**: Exporta tu keymap regularmente para no perder cambios

## 🐛 Solución de Problemas

### El keymap no se importa correctamente
- Asegúrate de copiar TODO el contenido del archivo `.keymap`
- Verifica que el formato sea válido

### Una tecla no funciona como esperaba
- Revisa que el keycode sea correcto en la documentación de ZMK
- Verifica que no haya conflictos con otras capas

### El archivo exportado no compila
- Asegúrate de que todos los keycodes sean válidos
- Revisa la sintaxis en la documentación oficial de ZMK

## 📚 Recursos

- [Documentación ZMK](https://zmk.dev/)
- [Lista completa de Keycodes](https://zmk.dev/docs/codes)
- [Behaviors de ZMK](https://zmk.dev/docs/behaviors)

## 🤝 Contribuir

Este editor es de código abierto. Siéntete libre de:
- Reportar bugs
- Sugerir mejoras
- Añadir nuevos keycodes
- Mejorar la interfaz

## 📄 Licencia

MIT License - Úsalo libremente para tu teclado Sofle

---

**Nota**: Este editor genera archivos compatibles con el firmware ZMK para el teclado Eyelash Sofle. Asegúrate de probar tu configuración antes de usarla como tu keymap principal.
