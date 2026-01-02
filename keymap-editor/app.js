class KeymapEditor {
    constructor() {
        this.currentLayer = 0;
        this.selectedKey = null;
        this.selectedEncoder = null; // 'left', 'right', 'click'
        this.selectedJoystick = null; // 'up', 'down', 'left', 'right', 'click'
        this.keymap = this.initializeKeymap();
        this.encoderBindings = this.initializeEncoderBindings();
        this.joystickBindings = this.initializeJoystickBindings();
        this.physicalKeyMap = this.initializePhysicalKeyMap();
        
        this.init();
    }

    initializeKeymap() {
        const defaultKeymap = {
            0: [
                '&kp ESC', '&kp N1', '&kp N2', '&kp N3', '&kp N4', '&kp N5',
                '&kp N6', '&kp N7', '&kp N8', '&kp N9', '&kp N0', '&kp BSPC',
                '&kp TAB', '&kp Q', '&kp W', '&kp E', '&kp R', '&kp T',
                '&kp Y', '&kp U', '&kp I', '&kp O', '&kp P', '&kp BSLH',
                '&kp CAPS', '&kp A', '&kp S', '&kp D', '&kp F', '&kp G',
                '&kp H', '&kp J', '&kp K', '&kp L', '&kp SEMI', '&kp APOS',
                '&kp LSHFT', '&kp Z', '&kp X', '&kp C', '&kp V', '&kp B',
                '&kp N', '&kp M', '&kp COMMA', '&kp DOT', '&kp FSLH', '&kp ENTER',
                '&kp C_MUTE', '&kp LCTRL', '&kp LGUI', '&kp LALT', '&mo 1',
                '&kp SPACE', '&kp ENTER', '&mo 2', '&kp RALT', '&kp RCTRL'
            ],
            1: [
                '&kp GRAVE', '&kp F1', '&kp F2', '&kp F3', '&kp F4', '&kp F5',
                '&kp F6', '&kp F7', '&kp F8', '&kp F9', '&kp F10', '&trans',
                '&trans', '&kp GRAVE', '&mkp LCLK', '&mkp MCLK', '&mkp RCLK', '&mkp MB4',
                '&kp PG_UP', '&kp END', '&kp UP', '&kp HOME', '&kp MINUS', '&kp EQUAL',
                '&trans', '&kp TILDE', '&trans', '&trans', '&trans', '&mkp MB5',
                '&kp PG_DN', '&kp LEFT', '&kp DOWN', '&kp RIGHT', '&kp LBKT', '&kp RBKT',
                '&trans', '&rgb_ug RGB_OFF', '&rgb_ug RGB_ON', '&rgb_ug RGB_EFF', '&rgb_ug RGB_EFR', '&rgb_ug RGB_SPI',
                '&rgb_ug RGB_BRI', '&rgb_ug RGB_BRD', '&kp INSERT', '&kp F11', '&kp F12', '&trans',
                '&kp C_MUTE', '&trans', '&trans', '&trans', '&trans',
                '&trans', '&mkp LCLK', '&trans', '&trans', '&trans'
            ],
            2: [
                '&kp TILDE', '&bt BT_SEL 0', '&bt BT_SEL 1', '&bt BT_SEL 2', '&bt BT_SEL 3', '&bt BT_SEL 4',
                '&kp F6', '&kp F7', '&kp F8', '&kp F9', '&kp F10', '&trans',
                '&trans', '&bt BT_CLR', '&bt BT_CLR_ALL', '&trans', '&trans', '&trans',
                '&trans', '&trans', '&kp F11', '&kp F12', '&kp UNDER', '&kp PLUS',
                '&trans', '&out OUT_USB', '&out OUT_BLE', '&trans', '&trans', '&trans',
                '&trans', '&trans', '&trans', '&trans', '&kp LBRC', '&kp RBRC',
                '&trans', '&sys_reset', '&trans', '&bootloader', '&trans', '&trans',
                '&trans', '&trans', '&sys_reset', '&soft_off', '&bootloader', '&trans',
                '&trans', '&trans', '&trans', '&trans', '&trans',
                '&trans', '&mkp LCLK', '&trans', '&trans', '&trans'
            ],
            3: Array(58).fill('&trans'),
            4: Array(58).fill('&trans')
        };
        
        return defaultKeymap;
    }

    initializeEncoderBindings() {
        return {
            0: { up: '&kp C_VOL_UP', down: '&kp C_VOL_DN' },
            1: { up: '&msc SCRL_UP', down: '&msc SCRL_DOWN' },
            2: { up: '&msc SCRL_UP', down: '&msc SCRL_DOWN' },
            3: { up: '&msc SCRL_UP', down: '&msc SCRL_DOWN' },
            4: { up: '&msc SCRL_UP', down: '&msc SCRL_DOWN' }
        };
    }

    initializeJoystickBindings() {
        return {
            0: { up: '&kp UP_ARROW', down: '&kp DOWN_ARROW', left: '&kp LEFT_ARROW', right: '&kp RIGHT_ARROW', click: '&mkp LCLK' },
            1: { up: '&mmv MOVE_UP', down: '&mmv MOVE_DOWN', left: '&mmv MOVE_LEFT', right: '&mmv MOVE_RIGHT', click: '&mkp LCLK' },
            2: { up: '&mmv MOVE_UP', down: '&mmv MOVE_DOWN', left: '&mmv MOVE_LEFT', right: '&mmv MOVE_RIGHT', click: '&mkp LCLK' },
            3: { up: '&mmv MOVE_UP', down: '&mmv MOVE_DOWN', left: '&mmv MOVE_LEFT', right: '&mmv MOVE_RIGHT', click: '&mkp LCLK' },
            4: { up: '&mmv MOVE_UP', down: '&mmv MOVE_DOWN', left: '&mmv MOVE_LEFT', right: '&mmv MOVE_RIGHT', click: '&mkp LCLK' }
        };
    }

    initializePhysicalKeyMap() {
        // Mapeo estático de ZMK keycodes a event.code del navegador
        // Este mapeo se usa para generar dinámicamente el physicalKeyMap
        this.zmkToEventCode = {
            // Letras
            'A': 'KeyA', 'B': 'KeyB', 'C': 'KeyC', 'D': 'KeyD', 'E': 'KeyE', 'F': 'KeyF',
            'G': 'KeyG', 'H': 'KeyH', 'I': 'KeyI', 'J': 'KeyJ', 'K': 'KeyK', 'L': 'KeyL',
            'M': 'KeyM', 'N': 'KeyN', 'O': 'KeyO', 'P': 'KeyP', 'Q': 'KeyQ', 'R': 'KeyR',
            'S': 'KeyS', 'T': 'KeyT', 'U': 'KeyU', 'V': 'KeyV', 'W': 'KeyW', 'X': 'KeyX',
            'Y': 'KeyY', 'Z': 'KeyZ',
            'SEMI': 'Semicolon',  // Ñ en teclado español
            
            // Números
            'N0': 'Digit0', 'N1': 'Digit1', 'N2': 'Digit2', 'N3': 'Digit3', 'N4': 'Digit4',
            'N5': 'Digit5', 'N6': 'Digit6', 'N7': 'Digit7', 'N8': 'Digit8', 'N9': 'Digit9',
            
            // Teclas especiales
            'ESC': 'Escape', 'TAB': 'Tab', 'SPACE': 'Space', 'ENTER': 'Enter',
            'BSPC': 'Backspace', 'DEL': 'Delete',
            
            // Modificadores
            'LSHFT': 'ShiftLeft', 'RSHFT': 'ShiftRight',
            'LCTRL': 'ControlLeft', 'RCTRL': 'ControlRight',
            'LALT': 'AltLeft', 'RALT': 'AltRight',
            'LGUI': 'MetaLeft', 'RGUI': 'MetaRight',
            
            // Símbolos
            'MINUS': 'Minus', 'EQUAL': 'Equal', 'PLUS': 'Equal',
            'LBKT': 'BracketLeft', 'RBKT': 'BracketRight',
            'BSLH': 'Backslash', 'SEMI': 'Semicolon', 'APOS': 'Quote',
            'GRAVE': 'Backquote', 'COMMA': 'Comma', 'DOT': 'Period',
            'FSLH': 'Slash', 'QMARK': 'Slash',
            
            // Símbolos españoles con combinaciones
            'LS(COMMA)': 'Comma',  // Punto y coma en español (Shift+Coma)
            'LS(DOT)': 'Period',   // Dos puntos en español (Shift+Punto)
            'LS(RBKT)': 'BracketRight',  // Más + en español (Shift+])
            
            // Flechas
            'UP_ARROW': 'ArrowUp', 'DOWN_ARROW': 'ArrowDown',
            'LEFT_ARROW': 'ArrowLeft', 'RIGHT_ARROW': 'ArrowRight',
            'UP': 'ArrowUp', 'DOWN': 'ArrowDown',
            'LEFT': 'ArrowLeft', 'RIGHT': 'ArrowRight',
            
            // Funciones
            'F1': 'F1', 'F2': 'F2', 'F3': 'F3', 'F4': 'F4', 'F5': 'F5', 'F6': 'F6',
            'F7': 'F7', 'F8': 'F8', 'F9': 'F9', 'F10': 'F10', 'F11': 'F11', 'F12': 'F12',
            
            // Media
            'C_MUTE': 'AudioVolumeMute',
            'C_VOL_UP': 'AudioVolumeUp',
            'C_VOL_DN': 'AudioVolumeDown',
            'C_PP': 'MediaPlayPause',
            'C_NEXT': 'MediaTrackNext',
            'C_PREV': 'MediaTrackPrevious',
            
            // Otras
            'CAPS': 'CapsLock', 'HOME': 'Home', 'END': 'End',
            'PG_UP': 'PageUp', 'PG_DN': 'PageDown',
            'INSERT': 'Insert'
        };
        
        return this.generatePhysicalKeyMap();
    }
    
    generatePhysicalKeyMap() {
        // Generar el mapeo dinámicamente basándose en el keymap actual (capa 0)
        const physicalMap = {};
        
        this.keymap[0].forEach((binding, index) => {
            let zmkKey = null;
            
            // Extraer el keycode del binding
            // Casos: "&kp SPACE", "&kp LS(N7)", "&kp RA(APOS)", "&mo 1", etc.
            
            // Caso 1: &kp con modificador: &kp LS(N7) o &kp RA(APOS)
            const modMatch = binding.match(/&kp\s+(LS|RS|RA|LA|LC|RC|LG|RG)\((\w+)\)/);
            if (modMatch) {
                // Para combinaciones, usar la tecla base
                zmkKey = modMatch[2];
            } else {
                // Caso 2: &kp simple: &kp SPACE, &kp C_MUTE, etc.
                const simpleMatch = binding.match(/&kp\s+([\w_]+)/);
                if (simpleMatch) {
                    zmkKey = simpleMatch[1];
                }
            }
            
            if (zmkKey) {
                const eventCode = this.zmkToEventCode[zmkKey];
                
                if (eventCode) {
                    // Si ya existe este eventCode, no lo sobrescribimos
                    // (la primera ocurrencia tiene prioridad)
                    if (!physicalMap[eventCode]) {
                        physicalMap[eventCode] = index;
                    }
                }
            }
        });
        
        return physicalMap;
    }
    
    updatePhysicalKeyMap() {
        // Regenerar el mapeo cuando se importa un nuevo keymap
        this.physicalKeyMap = this.generatePhysicalKeyMap();
    }

    init() {
        this.renderKeyboard();
        this.attachEventListeners();
        this.attachEncoderJoystickListeners();
        this.updateDisplay();
    }

    renderKeyboard() {
        const leftKeyboard = document.getElementById('leftKeyboard');
        const rightKeyboard = document.getElementById('rightKeyboard');
        
        leftKeyboard.innerHTML = '';
        rightKeyboard.innerHTML = '';

        // Layout físico real: 4 filas de 6 teclas + 1 fila de 5 teclas por lado
        // Fila 0: índices 0-5 (izq), 6-11 (der)
        // Fila 1: índices 12-17 (izq), 18-23 (der)
        // Fila 2: índices 24-29 (izq), 30-35 (der)
        // Fila 3: índices 36-41 (izq), 42-47 (der)
        // Fila 4: índices 48-52 (izq), 53-57 (der)
        const leftKeys = [
            0, 1, 2, 3, 4, 5,      // Fila 0
            12, 13, 14, 15, 16, 17, // Fila 1
            24, 25, 26, 27, 28, 29, // Fila 2
            36, 37, 38, 39, 40, 41, // Fila 3
            48, 49, 50, 51, 52      // Fila 4 (5 teclas)
        ];
        const rightKeys = [
            6, 7, 8, 9, 10, 11,     // Fila 0
            18, 19, 20, 21, 22, 23, // Fila 1
            30, 31, 32, 33, 34, 35, // Fila 2
            42, 43, 44, 45, 46, 47, // Fila 3
            53, 54, 55, 56, 57      // Fila 4 (5 teclas)
        ];

        // Añadir botones de borrado de filas al inicio
        for (let row = 1; row <= 5; row++) {
            const rowBtn = this.createRowButton(row);
            leftKeyboard.appendChild(rowBtn);
        }

        leftKeys.forEach(keyIndex => {
            const key = this.createKeyElement(keyIndex);
            leftKeyboard.appendChild(key);
        });

        rightKeys.forEach(keyIndex => {
            const key = this.createKeyElement(keyIndex, 'right');
            rightKeyboard.appendChild(key);
        });

        // Añadir botones de borrado de columnas
        this.addColumnButtons(leftKeyboard, rightKeyboard);
    }

    createRowButton(row) {
        const btn = document.createElement('button');
        btn.className = 'row-btn';
        btn.dataset.row = row;
        btn.innerHTML = '×<br>→'; // Icono de borrado con flecha hacia la derecha
        
        // Posicionar el botón alineado con la fila
        const rowPositions = [
            { x: -60, y: 0 },   // Fila 1
            { x: -60, y: 60 },  // Fila 2
            { x: -60, y: 120 }, // Fila 3
            { x: -60, y: 180 }, // Fila 4
            { x: -60, y: 240 }  // Fila 5
        ];
        const pos = rowPositions[row - 1];
        btn.style.position = 'absolute';
        btn.style.left = `${pos.x}px`;
        btn.style.top = `${pos.y}px`;
        
        btn.addEventListener('click', () => {
            this.clearRow(row);
        });
        
        return btn;
    }

    addColumnButtons(leftKeyboard, rightKeyboard) {
        // Añadir botones de columnas para el teclado izquierdo (columnas 1-6)
        for (let col = 1; col <= 6; col++) {
            const btn = this.createColumnButton(col);
            leftKeyboard.appendChild(btn);
        }
        
        // Añadir botones de columnas para el teclado derecho (columnas 7-12)
        for (let col = 7; col <= 12; col++) {
            const btn = this.createColumnButton(col);
            rightKeyboard.appendChild(btn);
        }
    }

    createColumnButton(col) {
        const btn = document.createElement('button');
        btn.className = 'column-btn';
        btn.dataset.col = col;
        btn.innerHTML = '×<br>↓'; // Icono de borrado con flecha hacia abajo
        
        // Posicionar el botón alineado con la columna
        const colPositions = [
            { x: 0, y: -60 },   // Columna 1
            { x: 60, y: -60 },  // Columna 2
            { x: 120, y: -60 }, // Columna 3
            { x: 180, y: -60 }, // Columna 4
            { x: 240, y: -60 }, // Columna 5
            { x: 300, y: -60 }, // Columna 6
            { x: 0, y: -60 },   // Columna 7 (relativo al teclado derecho)
            { x: 60, y: -60 },  // Columna 8
            { x: 120, y: -60 }, // Columna 9
            { x: 180, y: -60 }, // Columna 10
            { x: 240, y: -60 }, // Columna 11
            { x: 300, y: -60 }  // Columna 12
        ];
        const pos = colPositions[col - 1];
        btn.style.position = 'absolute';
        btn.style.left = `${pos.x}px`;
        btn.style.top = `${pos.y}px`;
        
        btn.addEventListener('click', () => {
            this.clearColumn(col);
        });
        
        return btn;
    }

    createKeyElement(index, side) {
        const key = document.createElement('div');
        key.className = 'key';
        key.dataset.index = index;
        key.dataset.side = side;
        
        const position = this.getKeyPosition(index);
        key.style.left = `${position.x}px`;
        key.style.top = `${position.y}px`;
        
        const label = document.createElement('div');
        label.className = 'key-label';
        key.appendChild(label);
        
        key.addEventListener('click', () => {
            this.selectKey(index, side);
        });

        // Hacer la tecla droppable
        key.addEventListener('dragover', (e) => {
            e.preventDefault();
            key.classList.add('drag-over');
        });

        key.addEventListener('dragleave', () => {
            key.classList.remove('drag-over');
        });

        key.addEventListener('drop', (e) => {
            e.preventDefault();
            key.classList.remove('drag-over');
            
            const keycode = e.dataTransfer.getData('text/plain');
            if (keycode) {
                this.selectKey(index, side);
                this.setKeycode(keycode);
            }
        });
        
        return key;
    }

    getKeyPosition(index) {
        const keySize = 55;
        const positions = {
            // LADO IZQUIERDO
            // Fila 0 - Number row (índices 0-5)
            0: { x: 10, y: 10 },
            1: { x: 70, y: 10 },
            2: { x: 130, y: 0 },
            3: { x: 190, y: 0 },
            4: { x: 250, y: 5 },
            5: { x: 310, y: 10 },
            
            // Fila 1 - Top letter row (índices 12-17)
            12: { x: 10, y: 70 },
            13: { x: 70, y: 70 },
            14: { x: 130, y: 60 },
            15: { x: 190, y: 60 },
            16: { x: 250, y: 65 },
            17: { x: 310, y: 70 },
            
            // Fila 2 - Home row (índices 24-29)
            24: { x: 10, y: 130 },
            25: { x: 70, y: 130 },
            26: { x: 130, y: 120 },
            27: { x: 190, y: 120 },
            28: { x: 250, y: 125 },
            29: { x: 310, y: 130 },
            
            // Fila 3 - Bottom letter row (índices 36-41)
            36: { x: 10, y: 190 },
            37: { x: 70, y: 190 },
            38: { x: 130, y: 180 },
            39: { x: 190, y: 180 },
            40: { x: 250, y: 185 },
            41: { x: 310, y: 190 },
            
            // Fila 4 - Thumb cluster (índices 48-53, 6 teclas)
            48: { x: 70, y: 250 },   // C_MUTE
            49: { x: 130, y: 250 },   // LCTRL
            50: { x: 190, y: 250 },  // LGUI
            51: { x: 250, y: 250 },  // LALT
            52: { x: 320, y: 255 },  // mo 1
            
            // LADO DERECHO
            // Fila 0 - Number row (índices 6-11)
            6: { x: 10, y: 10 },
            7: { x: 70, y: 10 },
            8: { x: 130, y: 5 },
            9: { x: 190, y: 0 },
            10: { x: 250, y: 0 },
            11: { x: 310, y: 10 },
            
            // Fila 1 - Top letter row (índices 18-23)
            18: { x: 10, y: 70 },
            19: { x: 70, y: 70 },
            20: { x: 130, y: 65 },
            21: { x: 190, y: 60 },
            22: { x: 250, y: 60 },
            23: { x: 310, y: 70 },
            
            // Fila 2 - Home row (índices 30-35)
            30: { x: 10, y: 130 },
            31: { x: 70, y: 130 },
            32: { x: 130, y: 125 },
            33: { x: 190, y: 120 },
            34: { x: 250, y: 120 },
            35: { x: 310, y: 130 },
            
            // Fila 3 - Bottom letter row (índices 42-47)
            42: { x: 10, y: 190 },
            43: { x: 70, y: 190 },
            44: { x: 130, y: 185 },
            45: { x: 190, y: 180 },
            46: { x: 250, y: 180 },
            47: { x: 310, y: 190 },
            
            // Fila 4 - Thumb cluster (índices 54-59, 6 teclas)
            53: { x: 0, y: 265 },  // SPACE
            54: { x: 60, y: 265 },   // SPACE
            55: { x: 120, y: 255 },  // ENTER
            56: { x: 180, y: 250 },  // mo 2
            57: { x: 240, y: 250 }
        };
        
        return positions[index] || { x: 0, y: 0 };
    }

    selectKey(index) {
        this.selectedKey = index;
        this.selectedEncoder = null;
        this.selectedJoystick = null;
        
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.encoder-key').forEach(k => k.classList.remove('selected'));
        
        const keyElement = document.querySelector(`[data-index="${index}"]`);
        if (keyElement) {
            keyElement.classList.add('selected');
        }
        
        this.updateKeyInfo();
    }

    selectEncoder(direction) {
        this.selectedEncoder = direction;
        this.selectedKey = null;
        this.selectedJoystick = null;
        
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.encoder-key').forEach(k => k.classList.remove('selected'));
        
        const encoderElement = document.querySelector(`[data-key="encoder-${direction}"]`);
        if (encoderElement) {
            encoderElement.classList.add('selected');
        }
        
        this.updateKeyInfo();
    }

    selectJoystick(direction) {
        const joystickElement = document.querySelector(`[data-key="joystick-${direction}"]`);
        const virtualPosition = parseInt(joystickElement.dataset.position);
        
        if (virtualPosition === -1) {
            // Centro del joystick - no hacer nada
            return;
        }
        
        // Mapear posiciones virtuales a posiciones virtuales del keymap (índices 58-61)
        const positionMap = {
            100: 58,  // Joystick ↑ → Posición virtual 58
            101: 59,  // Joystick ↓ → Posición virtual 59
            102: 60,  // Joystick ← → Posición virtual 60
            103: 61   // Joystick → → Posición virtual 61
        };
        
        const realPosition = positionMap[virtualPosition];
        
        // Seleccionar la tecla real correspondiente
        this.selectedKey = realPosition;
        this.selectedEncoder = null;
        this.selectedJoystick = direction;
        
        // Actualizar selección visual
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.encoder-key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.joystick-key').forEach(k => k.classList.remove('selected'));
        
        const keyElement = document.querySelector(`[data-index="${realPosition}"]`);
        if (keyElement) {
            keyElement.classList.add('selected');
        }
        
        if (joystickElement) {
            joystickElement.classList.add('selected');
        }
        
        this.updateKeyInfo();
    }

    updateKeyInfo() {
        const infoDiv = document.getElementById('selectedKeyInfo');
        
        // Encoder seleccionado
        if (this.selectedEncoder !== null) {
            const direction = this.selectedEncoder === 'left' ? 'up' : (this.selectedEncoder === 'right' ? 'down' : 'click');
            let code = '';
            
            if (this.selectedEncoder === 'click') {
                code = '&mkp LCLK'; // El encoder click es fijo
                infoDiv.innerHTML = `
                    <p><strong>Elemento:</strong> Encoder Click</p>
                    <p><strong>Capa:</strong> ${this.currentLayer}</p>
                    <p><strong>Código:</strong></p>
                    <p style="font-family: monospace; background: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 5px;">${code}</p>
                    <p style="margin-top: 10px; color: #6c757d;"><em>El click del encoder es fijo</em></p>
                `;
            } else {
                code = this.encoderBindings[this.currentLayer][direction];
                const display = getKeycodeDisplay(code);
                infoDiv.innerHTML = `
                    <p><strong>Elemento:</strong> Encoder ${this.selectedEncoder === 'left' ? 'Izquierda' : 'Derecha'}</p>
                    <p><strong>Capa:</strong> ${this.currentLayer}</p>
                    <p><strong>Código actual:</strong></p>
                    <p style="font-family: monospace; background: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 5px;">${code}</p>
                    <p style="margin-top: 10px;"><strong>Display:</strong> ${display}</p>
                `;
            }
            return;
        }
        
        // Joystick seleccionado (pero realmente es una tecla)
        if (this.selectedJoystick !== null && this.selectedKey !== null) {
            const code = this.keymap[this.currentLayer][this.selectedKey];
            const display = getKeycodeDisplay(code);
            const directionNames = {
                'up': 'Arriba',
                'down': 'Abajo',
                'left': 'Izquierda',
                'right': 'Derecha',
                'click': 'Click'
            };
            
            infoDiv.innerHTML = `
                <p><strong>Elemento:</strong> Joystick ${directionNames[this.selectedJoystick]} (Pos ${this.selectedKey})</p>
                <p><strong>Capa:</strong> ${this.currentLayer}</p>
                <p><strong>Código actual:</strong></p>
                <p style="font-family: monospace; background: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 5px;">${code}</p>
                <p style="margin-top: 10px;"><strong>Display:</strong> ${display}</p>
            `;
            return;
        }
        
        // Tecla normal seleccionada
        if (this.selectedKey === null) {
            infoDiv.innerHTML = '<p class="placeholder">Haz clic en una tecla para editarla</p>';
            return;
        }
        
        const code = this.keymap[this.currentLayer][this.selectedKey];
        const display = getKeycodeDisplay(code);
        
        infoDiv.innerHTML = `
            <p><strong>Posición:</strong> ${this.selectedKey}</p>
            <p><strong>Capa:</strong> ${this.currentLayer}</p>
            <p><strong>Código actual:</strong></p>
            <p style="font-family: monospace; background: #e9ecef; padding: 10px; border-radius: 5px; margin-top: 5px;">${code}</p>
            <p style="margin-top: 10px;"><strong>Display:</strong> ${display}</p>
        `;
    }

    setKeycode(code) {
        // Asignar a encoder
        if (this.selectedEncoder !== null) {
            if (this.selectedEncoder === 'click') {
                alert('El click del encoder es fijo y no se puede cambiar');
                return;
            }
            const direction = this.selectedEncoder === 'left' ? 'up' : 'down';
            this.encoderBindings[this.currentLayer][direction] = code;
            this.updateDisplay();
            this.updateKeyInfo();
            return;
        }
        
        // Asignar a joystick (que en realidad es una tecla)
        if (this.selectedJoystick !== null && this.selectedKey !== null) {
            this.keymap[this.currentLayer][this.selectedKey] = code;
            this.updateDisplay();
            this.updateKeyInfo();
            return;
        }
        
        // Asignar a tecla normal
        if (this.selectedKey === null) {
            alert('Por favor, selecciona una tecla, encoder o joystick primero');
            return;
        }
        
        this.keymap[this.currentLayer][this.selectedKey] = code;
        this.updateDisplay();
        this.updateKeyInfo();
    }

    updateDisplay() {
        // Actualizar teclas normales
        document.querySelectorAll('.key').forEach(keyElement => {
            const index = parseInt(keyElement.dataset.index);
            const code = this.keymap[this.currentLayer][index];
            const display = getKeycodeDisplay(code);
            
            keyElement.querySelector('.key-label').textContent = display;
            
            if (code === '&trans') {
                keyElement.classList.add('transparent');
            } else {
                keyElement.classList.remove('transparent');
            }
        });
        
        // Actualizar encoder (solo las direcciones, no el click)
        const encoderBindings = this.encoderBindings[this.currentLayer];
        const encoderLeft = document.querySelector('[data-key="encoder-left"]');
        const encoderRight = document.querySelector('[data-key="encoder-right"]');
        
        if (encoderLeft) {
            encoderLeft.title = `Girar izquierda: ${getKeycodeDisplay(encoderBindings.up)}`;
        }
        if (encoderRight) {
            encoderRight.title = `Girar derecha: ${getKeycodeDisplay(encoderBindings.down)}`;
        }
        
        // Actualizar joystick tooltips con valores reales de las teclas (mapeando posiciones virtuales)
        const positionMap = {
            100: 58,  // Joystick ↑ → Posición virtual 58
            101: 59,  // Joystick ↓ → Posición virtual 59
            102: 60,  // Joystick ← → Posición virtual 60
            103: 61   // Joystick → → Posición virtual 61
        };
        
        const joystickUp = document.querySelector('[data-key="joystick-up"]');
        const joystickDown = document.querySelector('[data-key="joystick-down"]');
        const joystickLeft = document.querySelector('[data-key="joystick-left"]');
        const joystickRight = document.querySelector('[data-key="joystick-right"]');
        
        if (joystickUp) {
            const virtualPos = parseInt(joystickUp.dataset.position);
            const realPos = positionMap[virtualPos];
            const code = this.keymap[this.currentLayer][realPos];
            joystickUp.title = `Arriba (Pos ${realPos}): ${getKeycodeDisplay(code)}`;
        }
        if (joystickDown) {
            const virtualPos = parseInt(joystickDown.dataset.position);
            const realPos = positionMap[virtualPos];
            const code = this.keymap[this.currentLayer][realPos];
            joystickDown.title = `Abajo (Pos ${realPos}): ${getKeycodeDisplay(code)}`;
        }
        if (joystickLeft) {
            const virtualPos = parseInt(joystickLeft.dataset.position);
            const realPos = positionMap[virtualPos];
            const code = this.keymap[this.currentLayer][realPos];
            joystickLeft.title = `Izquierda (Pos ${realPos}): ${getKeycodeDisplay(code)}`;
        }
        if (joystickRight) {
            const virtualPos = parseInt(joystickRight.dataset.position);
            const realPos = positionMap[virtualPos];
            const code = this.keymap[this.currentLayer][realPos];
            joystickRight.title = `Derecha (Pos ${realPos}): ${getKeycodeDisplay(code)}`;
        }
    }

    switchLayer(layer) {
        this.currentLayer = layer;
        this.selectedKey = null;
        this.selectedEncoder = null;
        this.selectedJoystick = null;
        
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-layer="${layer}"]`).classList.add('active');
        
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.encoder-key').forEach(k => k.classList.remove('selected'));
        
        this.updateDisplay();
        this.updateKeyInfo();
    }

    switchTab(tabName) {
        // Ocultar todas las pestañas
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Desactivar todos los botones de pestaña
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activar la pestaña seleccionada
        document.getElementById(`tab-${tabName}`).classList.add('active');
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    }

    exportKeymap() {
        let output = `#define ZMK_POINTING_DEFAULT_MOVE_VAL 1200
#define ZMK_POINTING_DEFAULT_SCRL_VAL 25

#include <input/processors.dtsi>
#include <zephyr/dt-bindings/input/input-event-codes.h>
#include <behaviors.dtsi>
#include <dt-bindings/zmk/bt.h>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/outputs.h>
#include <dt-bindings/zmk/pointing.h>
#include <dt-bindings/zmk/rgb.h>

&mmv_input_listener { input-processors = <&zip_xy_scaler 2 1>; };
&msc_input_listener { input-processors = <&zip_scroll_scaler 2 1>; };

&msc {
    acceleration-exponent = <1>;
    time-to-max-speed-ms = <100>;
    delay-ms = <0>;
};

&mmv {
    time-to-max-speed-ms = <500>;
    acceleration-exponent = <1>;
    trigger-period-ms = <16>;
};

&soft_off { hold-time-ms = <2000>; };

/ {
    // NOTA: Esta exportación incluye todas las secciones necesarias:
    // - Configuración de pointing y soft_off
    // - Scroll encoder behaviors
    // - Combos (softoff)
    // - Macros (SHIFT_MCLK)
    // - Controles RGB manuales en Layer 1
    // NO eliminar ninguna sección al importar/exportar
    scroll_encoder: scroll_encoder {
        compatible = "zmk,behavior-sensor-rotate";
        #sensor-binding-cells = <0>;
        bindings = <&msc SCRL_DOWN>, <&msc SCRL_UP>;
        tap-ms = <100>;
    };

    behaviors {
    };

    combos {
        compatible = "zmk,combos";
        softoff {
            bindings = <&soft_off>;
            key-positions = <14 28 40>;
        };
    };

    macros {
        SHIFT_MCLK: SHIFT_MCLK {
            compatible = "zmk,behavior-macro";
            #binding-cells = <0>;
            bindings =
                <&macro_press>,
                <&kp LEFT_SHIFT>,
                <&macro_press>,
                <&mkp MB3>,
                <&macro_pause_for_release>,
                <&macro_release>,
                <&kp LEFT_SHIFT &mkp MB3>;
            label = "SHIFT_MCLK";
        };
    };

    keymap {
        compatible = "zmk,keymap";

`;

        for (let layer = 0; layer < 5; layer++) {
            const layerName = layer === 0 ? 'layer0' : `layer_${layer}`;
            const displayName = layer === 0 ? 'LAYER0' : `layer${layer}`;
            
            output += `        ${layerName} {\n`;
            output += `            bindings = <\n`;
            
            // Asegurar que la capa tenga exactamente 62 teclas (58 físicas + 4 virtuales del joystick)
            let keys = [...this.keymap[layer]];
            while (keys.length < 62) {
                keys.push('&trans');
            }
            keys = keys.slice(0, 62); // Asegurar que no haya más de 62
            
            // Mapear las 58 teclas a la matriz física de 64 posiciones
            // Layout físico: 13+13+13+13+12 = 64 posiciones
            // Filas 0-3: 6 teclas + &none (encoder) + 6 teclas = 13 posiciones
            // Fila 4: &none (encoder izq) + 5 teclas + &none (encoder der) + 5 teclas = 12 posiciones
            const exportKeys = [
                // Fila 0: teclas 0-5, tecla joystick (virtual 58), teclas 6-11
                keys[0], keys[1], keys[2], keys[3], keys[4], keys[5], keys[58] || '&none', keys[6], keys[7], keys[8], keys[9], keys[10], keys[11],
                // Fila 1: teclas 12-17, tecla joystick (virtual 59), teclas 18-23
                keys[12], keys[13], keys[14], keys[15], keys[16], keys[17], keys[59] || '&none', keys[18], keys[19], keys[20], keys[21], keys[22], keys[23],
                // Fila 2: teclas 24-29, tecla joystick (virtual 60), teclas 30-35
                keys[24], keys[25], keys[26], keys[27], keys[28], keys[29], keys[60] || '&none', keys[30], keys[31], keys[32], keys[33], keys[34], keys[35],
                // Fila 3: teclas 36-41, tecla joystick (virtual 61), teclas 42-47
                keys[36], keys[37], keys[38], keys[39], keys[40], keys[41], keys[61] || '&none', keys[42], keys[43], keys[44], keys[45], keys[46], keys[47],
                // Fila 4: &none (encoder izq), teclas 48-52, &none (encoder der), teclas 53-57
                '&none', keys[48], keys[49], keys[50], keys[51], keys[52], '&none', keys[53], keys[54], keys[55], keys[56], keys[57]
            ];
            
            const rows = [
                exportKeys.slice(0, 13).join('  '),   // Fila 0: 6 + &none + 6 = 13
                exportKeys.slice(13, 26).join('  '),  // Fila 1: 6 + &none + 6 = 13
                exportKeys.slice(26, 39).join('  '),  // Fila 2: 6 + &none + 6 = 13
                exportKeys.slice(39, 52).join('  '),  // Fila 3: 6 + &none + 6 = 13
                exportKeys.slice(52, 64).join('  ')   // Fila 4: &none + 5 + &none + 5 = 12
            ];
            
            rows.forEach(row => {
                output += `                ${row}\n`;
            });
            
            output += `            >;\n`;
            
            const encoder = this.encoderBindings[layer];
            const joystick = this.joystickBindings[layer];
            if (layer === 0) {
                output += `            sensor-bindings = <&inc_dec_kp ${encoder.up.replace('&kp ', '')} ${encoder.down.replace('&kp ', '')}>;\n`;
            } else {
                output += `            sensor-bindings = <&scroll_encoder>;\n`;
            }
            
            // Agregar joystick bindings como comentario para referencia
            output += `            // Joystick: UP=${joystick.up} DOWN=${joystick.down} LEFT=${joystick.left} RIGHT=${joystick.right} CLICK=${joystick.click}\n`;
            output += `        };\n\n`;
        }
        
        output += `    };
};
`;

        return output;
    }

    importKeymap(keymapText) {
        try {
            // Buscar el bloque keymap completo - capturar desde compatible hasta el final
            const keymapStartRegex = /keymap\s*{[\s\S]*?compatible\s*=\s*"zmk,keymap";/;
            const keymapStartMatch = keymapText.match(keymapStartRegex);
            
            if (!keymapStartMatch) {
                throw new Error('No se encontró el bloque keymap en el archivo');
            }
            
            // Extraer todo desde el inicio del keymap hasta el final
            const startIndex = keymapText.indexOf(keymapStartMatch[0]) + keymapStartMatch[0].length;
            const keymapContent = keymapText.substring(startIndex);
            
            // Encontrar el final del keymap (último };)
            const lastBraceIndex = keymapContent.lastIndexOf('};');
            const keymapBlock = keymapContent.substring(0, lastBraceIndex);
            
            if (!keymapBlock) {
                throw new Error('No se encontró el bloque keymap en el archivo');
            }
            
            console.log('Bloque keymap capturado, longitud:', keymapBlock.length);
            console.log('Primeros 200 caracteres del bloque:', keymapBlock.substring(0, 200));
            
            // Buscar todas las capas (layer0, layer_1, etc.)
            const layerBlockRegex = /(layer[_0-9]*)\s*{[\s\S]*?bindings\s*=\s*<([\s\S]*?)>;/g;
            const layerMatches = [...keymapBlock.matchAll(layerBlockRegex)];
            
            console.log('Capas encontradas:', layerMatches.length);
            
            // Mostrar detalles de cada capa encontrada
            layerMatches.forEach((match, index) => {
                console.log(`Capa ${index}: nombre="${match[1]}", longitud=${match[2].length}`);
            });
            
            if (layerMatches.length === 0) {
                throw new Error('No se encontraron capas en el keymap');
            }
            
            let layersImported = 0;
            
            layerMatches.forEach((match, index) => {
                if (index >= 5) return;
                
                const layerName = match[1];
                const bindingsText = match[2];
                
                // Mapear nombre de capa a índice del array
                let layerIndex;
                if (layerName === 'layer0') {
                    layerIndex = 0;
                } else if (layerName === 'layer_1') {
                    layerIndex = 1;
                } else if (layerName === 'layer_2') {
                    layerIndex = 2;
                } else if (layerName === 'layer_3') {
                    layerIndex = 3;
                } else if (layerName === 'layer_4') {
                    layerIndex = 4;
                } else {
                    console.log(`Capa no reconocida: ${layerName}, saltando...`);
                    return;
                }
                
                console.log(`Procesando ${layerName} -> índice ${layerIndex}...`);
                console.log(`Bindings (primeros 100 chars):`, bindingsText.substring(0, 100));
                
                // Extraer todos los keycodes completos usando un enfoque más robusto
                // Dividir por & y procesar cada parte individualmente
                const parts = bindingsText.split('&').filter(p => p.trim());
                let keys = [];
                
                parts.forEach(part => {
                    const trimmed = part.trim();
                    if (trimmed) {
                        // Reconstruir el keycode completo manteniendo todos los parámetros
                        const words = trimmed.split(/\s+/);
                        let keycode = '&' + words[0];
                        
                        // Agregar todos los parámetros restantes
                        for (let i = 1; i < words.length; i++) {
                            keycode += ' ' + words[i];
                        }
                        
                        keys.push(keycode);
                    }
                });
                
                console.log(`${layerName}: ${keys.length} teclas encontradas`);
                console.log(`Primeras 5 teclas:`, keys.slice(0, 5));
                
                if (keys.length > 0) {
                    // Si hay 64 teclas, procesar el formato exportado con joystick
                    // Formato exportado: 13+13+13+13+12 = 64 posiciones
                    // Posiciones joystick: 6, 19, 32, 45 (filas 0-3)
                    // Posiciones encoders: 52, 58 (fila 4)
                    if (keys.length === 64) {
                        console.log(`Formato exportado detectado. Total teclas: ${keys.length}`);
                        console.log(`Procesando posiciones de joystick y encoders...`);
                        
                        // Extraer valores del joystick de las posiciones 6, 19, 32, 45
                        const joystickValues = [
                            keys[6] || '&none',   // Joystick ↑
                            keys[19] || '&none',  // Joystick ↓
                            keys[32] || '&none',  // Joystick ←
                            keys[45] || '&none'   // Joystick →
                        ];
                        
                        // Eliminar posiciones de encoders (&none en fila 4)
                        const encoderPositions = [58, 52]; // Eliminar de atrás hacia adelante
                        encoderPositions.forEach(pos => {
                            if (keys[pos] && (keys[pos] === '&none' || keys[pos].includes('none'))) {
                                keys.splice(pos, 1);
                            }
                        });
                        
                        // Eliminar posiciones del joystick (6, 19, 32, 45) - de atrás hacia adelante
                        const joystickPositions = [45, 32, 19, 6];
                        joystickPositions.forEach(pos => {
                            keys.splice(pos, 1);
                        });
                        
                        console.log(`Joystick values:`, joystickValues);
                        console.log(`Teclas físicas restantes: ${keys.length}`);
                        
                        // Agregar valores del joystick al final (posiciones 58-61)
                        keys.push(...joystickValues);
                        console.log(`Array total con joystick: ${keys.length} teclas`);
                    }
                    
                    this.keymap[layerIndex] = keys.slice(0, 62);
                    
                    // Completar con &trans si faltan
                    while (this.keymap[layerIndex].length < 62) {
                        this.keymap[layerIndex].push('&trans');
                    }
                    layersImported++;
                }
            });
            
            // Importar encoder bindings si existen
            const encoderRegex = /sensor-bindings = <&inc_dec_kp\s+(\w+)\s+(\w+)>/;
            const encoderMatch = keymapText.match(encoderRegex);
            if (encoderMatch) {
                this.encoderBindings[0] = {
                    up: `&kp ${encoderMatch[1]}`,
                    down: `&kp ${encoderMatch[2]}`
                };
            }
            
            this.updateDisplay();
            this.updateKeyInfo();
            this.updatePhysicalKeyMap(); // Regenerar el mapeo de teclas físicas
            
            return {
                success: true,
                layersImported: layersImported,
                message: `✅ Importado exitosamente!\n\n📊 ${layersImported} capa(s) importada(s)\n🎹 ${layersImported * 58} teclas configuradas`
            };
        } catch (error) {
            return {
                success: false,
                message: '❌ Error al importar: ' + error.message
            };
        }
    }

    clearCurrentLayer() {
        const layerName = this.currentLayer === 0 ? 'Layer 0' : `Layer ${this.currentLayer}`;
        if (confirm(`¿Estás seguro de que quieres limpiar la ${layerName}?\n\nEsto asignará &none a todas las teclas de esta capa.`)) {
            // Asignar &none a todas las teclas de la capa actual
            this.keymap[this.currentLayer] = Array(58).fill('&none');
            this.selectedKey = null;
            this.updateDisplay();
            this.updateKeyInfo();
            
            // Mostrar mensaje de confirmación
            alert(`✅ ${layerName} limpiada correctamente.\n\nTodas las teclas ahora tienen &none.`);
        }
    }

    initializeSliders() {
        // Los botones ahora se crean dinámicamente en renderKeyboard()
        // Esta función ya no necesita inicializar eventos manualmente
        console.log('Botones de borrado integrados en el teclado');
    }
    
    clearRow(row) {
        const layerName = this.currentLayer === 0 ? 'Layer 0' : `Layer ${this.currentLayer}`;
        const startIndices = [0, 12, 24, 36, 48];
        const endIndices = [11, 23, 35, 47, 57];
        const rowIndex = row - 1;
        
        if (confirm(`¿Estás seguro de que quieres limpiar la Fila ${row} de ${layerName}?\n\nEsto asignará &none a las teclas ${startIndices[rowIndex]}-${endIndices[rowIndex]}.`)) {
            // Animación visual del botón
            const rowBtn = document.querySelector(`.row-btn[data-row="${row}"]`);
            if (rowBtn) {
                rowBtn.classList.add('active');
            }
            
            for (let i = startIndices[rowIndex]; i <= endIndices[rowIndex]; i++) {
                this.keymap[this.currentLayer][i] = '&none';
            }
            this.selectedKey = null;
            this.updateDisplay();
            this.updateKeyInfo();
            
            setTimeout(() => {
                if (rowBtn) {
                    rowBtn.classList.remove('active');
                }
            }, 300);
            
            // Mostrar mensaje de confirmación
            this.showNotification(`✅ Fila ${row} de ${layerName} limpiada correctamente.`);
        }
    }
    
    clearColumn(column) {
        const layerName = this.currentLayer === 0 ? 'Layer 0' : `Layer ${this.currentLayer}`;
        const columnIndices = [
            [0, 12, 24, 36, 48],  // Columna 1
            [1, 13, 25, 37, 49],  // Columna 2
            [2, 14, 26, 38, 50],  // Columna 3
            [3, 15, 27, 39, 51],  // Columna 4
            [4, 16, 28, 40, 52],  // Columna 5
            [5, 17, 29, 41, 53],  // Columna 6
            [6, 18, 30, 42, 54],  // Columna 7
            [7, 19, 31, 43, 55],  // Columna 8
            [8, 20, 32, 44, 56],  // Columna 9
            [9, 21, 33, 45, 57],  // Columna 10
            [10, 22, 34, 46],     // Columna 11
            [11, 23, 35, 47]      // Columna 12
        ];
        
        const colIndex = column - 1;
        const indices = columnIndices[colIndex];
        
        if (confirm(`¿Estás seguro de que quieres limpiar la Columna ${column} de ${layerName}?\n\nEsto asignará &none a las teclas: ${indices.join(', ')}.`)) {
            // Animación visual del botón
            const columnBtn = document.querySelector(`.column-btn[data-col="${column}"]`);
            if (columnBtn) {
                columnBtn.classList.add('active');
            }
            
            indices.forEach(index => {
                this.keymap[this.currentLayer][index] = '&none';
            });
            this.selectedKey = null;
            this.updateDisplay();
            this.updateKeyInfo();
            
            setTimeout(() => {
                if (columnBtn) {
                    columnBtn.classList.remove('active');
                }
            }, 300);
            
            // Mostrar mensaje de confirmación
            this.showNotification(`✅ Columna ${column} de ${layerName} limpiada correctamente.`);
        }
    }
    
    showNotification(message) {
        // Crear notificación temporal
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    reset() {
        if (confirm('¿Estás seguro de que quieres resetear el keymap a los valores por defecto?')) {
            this.keymap = this.initializeKeymap();
            this.encoderBindings = this.initializeEncoderBindings();
            this.joystickBindings = this.initializeJoystickBindings();
            this.selectedKey = null;
            this.updateDisplay();
            this.updateKeyInfo();
        }
    }

    attachEncoderJoystickListeners() {
        // Event listeners para el encoder
        const encoderLeft = document.querySelector('[data-key="encoder-left"]');
        const encoderRight = document.querySelector('[data-key="encoder-right"]');
        const encoderClick = document.querySelector('[data-key="encoder-click"]');
        
        if (encoderLeft) {
            encoderLeft.addEventListener('click', () => {
                this.selectEncoder('left');
            });
            
            // Drag and drop
            encoderLeft.addEventListener('dragover', (e) => {
                e.preventDefault();
                encoderLeft.classList.add('drag-over');
            });
            encoderLeft.addEventListener('dragleave', () => {
                encoderLeft.classList.remove('drag-over');
            });
            encoderLeft.addEventListener('drop', (e) => {
                e.preventDefault();
                encoderLeft.classList.remove('drag-over');
                const keycode = e.dataTransfer.getData('text/plain');
                if (keycode) {
                    this.selectEncoder('left');
                    this.setKeycode(keycode);
                }
            });
        }
        
        if (encoderRight) {
            encoderRight.addEventListener('click', () => {
                this.selectEncoder('right');
            });
            
            // Drag and drop
            encoderRight.addEventListener('dragover', (e) => {
                e.preventDefault();
                encoderRight.classList.add('drag-over');
            });
            encoderRight.addEventListener('dragleave', () => {
                encoderRight.classList.remove('drag-over');
            });
            encoderRight.addEventListener('drop', (e) => {
                e.preventDefault();
                encoderRight.classList.remove('drag-over');
                const keycode = e.dataTransfer.getData('text/plain');
                if (keycode) {
                    this.selectEncoder('right');
                    this.setKeycode(keycode);
                }
            });
        }
        
        if (encoderClick) {
            encoderClick.addEventListener('click', () => {
                this.selectEncoder('click');
            });
        }
        
        // Event listeners para el joystick
        const joystickDirections = ['up', 'down', 'left', 'right', 'click'];
        
        joystickDirections.forEach(direction => {
            const joystickElement = document.querySelector(`[data-key="joystick-${direction}"]`);
            
            if (joystickElement) {
                joystickElement.addEventListener('click', () => {
                    this.selectJoystick(direction);
                });
                
                // Drag and drop
                joystickElement.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    joystickElement.classList.add('drag-over');
                });
                joystickElement.addEventListener('dragleave', () => {
                    joystickElement.classList.remove('drag-over');
                });
                joystickElement.addEventListener('drop', (e) => {
                    e.preventDefault();
                    joystickElement.classList.remove('drag-over');
                    const keycode = e.dataTransfer.getData('text/plain');
                    if (keycode) {
                        this.selectJoystick(direction);
                        this.setKeycode(keycode);
                    }
                });
            }
        });
    }

    attachEventListeners() {
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const layer = parseInt(btn.dataset.layer);
                this.switchLayer(layer);
            });
        });

        document.getElementById('exportBtn').addEventListener('click', async () => {
            await this.saveKeymapToFile();
        });

        document.getElementById('importFileBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const text = await file.text();
                    const result = this.importKeymap(text);
                    alert(result.message);
                    e.target.value = ''; // Reset input
                } catch (error) {
                    alert('❌ Error al leer el archivo: ' + error.message);
                }
            }
        });

        document.getElementById('importTextBtn').addEventListener('click', () => {
            this.showModal('Importar Keymap', `
                <p>Pega el contenido de tu archivo .keymap:</p>
                <textarea id="importText" placeholder="Pega aquí el contenido del archivo .keymap..."></textarea>
                <button class="btn btn-primary" onclick="editor.importFromModal()">Importar</button>
            `);
        });

        document.getElementById('clearLayerBtn').addEventListener('click', () => {
            this.clearCurrentLayer();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });

        // Inicializar sliders interactivos
        this.initializeSliders();

        const searchInput = document.getElementById('keycodeSearch');
        const resultsDiv = document.getElementById('keycodeResults');
        
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            const results = searchKeycodes(query);
            
            resultsDiv.innerHTML = '';
            
            results.slice(0, 20).forEach(result => {
                const item = document.createElement('div');
                item.className = 'keycode-item';
                item.innerHTML = `
                    <div class="keycode-name">${result.key}</div>
                    <div class="keycode-desc">${result.desc}</div>
                `;
                item.addEventListener('click', () => {
                    this.setKeycode(result.code);
                    searchInput.value = '';
                    resultsDiv.innerHTML = '';
                });
                resultsDiv.appendChild(item);
            });
        });

        // Manejadores de pestañas
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Manejadores de botones de keycodes
        document.querySelectorAll('.keycode-btn').forEach(btn => {
            // Click para asignar
            btn.addEventListener('click', () => {
                const code = btn.dataset.code;
                this.setKeycode(code);
            });

            // Drag and drop
            btn.setAttribute('draggable', 'true');
            
            btn.addEventListener('dragstart', (e) => {
                const code = btn.dataset.code;
                e.dataTransfer.setData('text/plain', code);
                e.dataTransfer.effectAllowed = 'copy';
                btn.classList.add('dragging');
            });

            btn.addEventListener('dragend', () => {
                btn.classList.remove('dragging');
            });
        });

        const modal = document.getElementById('modal');
        const closeBtn = document.querySelector('.close');
        
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Detección de teclas físicas
        // NOTA: Con teclados personalizados como el Sofle, esto detecta el keycode asignado,
        // no la posición física real. Puede iluminar teclas incorrectas si tienes
        // el mismo keycode asignado en múltiples posiciones.
        
        document.addEventListener('keydown', (e) => {
            this.handlePhysicalKeyPress(e);
        });

        document.addEventListener('keyup', (e) => {
            this.handlePhysicalKeyRelease(e);
        });
    }

    handlePhysicalKeyPress(event) {
        event.preventDefault();
        
        // Buscar el keycode que corresponde a la tecla presionada
        const pressedKeyIndex = this.physicalKeyMap[event.code];
        
        if (pressedKeyIndex === undefined) {
            return;
        }
        
        // Obtener el keycode asignado a esa posición en la capa actual
        const keycode = this.keymap[this.currentLayer][pressedKeyIndex];
        
        if (!keycode) {
            return;
        }
        
        // Iluminar TODAS las teclas que tengan el mismo keycode en la capa actual
        this.keymap[this.currentLayer].forEach((code, index) => {
            if (code === keycode) {
                const keyElement = document.querySelector(`[data-index="${index}"]`);
                if (keyElement) {
                    keyElement.classList.add('pressed');
                }
            }
        });
    }

    handlePhysicalKeyRelease(event) {
        const pressedKeyIndex = this.physicalKeyMap[event.code];
        
        if (pressedKeyIndex === undefined) {
            return;
        }
        
        // Obtener el keycode asignado a esa posición
        const keycode = this.keymap[this.currentLayer][pressedKeyIndex];
        
        if (!keycode) {
            return;
        }
        
        // Apagar TODAS las teclas que tengan el mismo keycode
        this.keymap[this.currentLayer].forEach((code, index) => {
            if (code === keycode) {
                const keyElement = document.querySelector(`[data-index="${index}"]`);
                if (keyElement) {
                    setTimeout(() => {
                        keyElement.classList.remove('pressed');
                    }, 150);
                }
            }
        });
    }

    showModal(title, content) {
        const modal = document.getElementById('modal');
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalBody').innerHTML = content;
        modal.style.display = 'block';
    }

    importFromModal() {
        const text = document.getElementById('importText').value;
        if (text.trim()) {
            const result = this.importKeymap(text);
            if (result.success) {
                document.getElementById('modal').style.display = 'none';
                alert(result.message);
            } else {
                alert(result.message);
            }
        } else {
            alert('Por favor, pega el contenido del keymap');
        }
    }

    async saveKeymapToFile() {
        const keymapContent = this.exportKeymap();
        const filename = 'eyelash_sofle.keymap';
        
        // Primero mostrar el modal con instrucciones
        this.showModal('Guardar Keymap', `
            <div style="text-align: left;">
                <h3>💾 Guardando keymap...</h3>
                
                <div style="display: flex; gap: 10px; margin: 20px 0;">
                    <button class="btn btn-primary" id="downloadFileBtn" style="flex: 1;">
                        💾 Descargar Archivo
                    </button>
                </div>
                
                <hr style="margin: 20px 0;">
                
                <h4>🔧 ¿Cómo actualizar tu firmware?</h4>
                
                <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0;">
                    <h5 style="margin: 0 0 10px 0; color: #1976d2;">📋 PREREQUISITOS:</h5>
                    <ul style="margin: 0; padding-left: 20px;">
                        <li>Tener <strong>Git</strong> instalado</li>
                        <li>Tener acceso al repositorio <strong>RobertoPeralCastro/zmk-sofle</strong></li>
                        <li>Tener <strong>GitHub CLI</strong> o acceso con token</li>
                    </ul>
                </div>
                
                <h5 style="color: #2e7d32;">🚀 PASO 1: Clonar el repositorio</h5>
                <div style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-family: monospace; margin: 10px 0; user-select: all;">
                    git clone https://github.com/RobertoPeralCastro/zmk-sofle.git<br>
                    cd zmk-sofle
                </div>
                
                <h5 style="color: #2e7d32;">📁 PASO 2: Reemplazar el keymap</h5>
                <ol style="line-height: 1.6; margin: 10px 0;">
                    <li>Descarga el archivo con el botón de arriba</li>
                    <li>Si existe <code>config/eyelash_sofle.keymap</code>, haz backup:</li>
                </ol>
                <div style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-family: monospace; margin: 10px 0; user-select: all;">
                    cp config/eyelash_sofle.keymap config/eyelash_sofle_backup.keymap
                </div>
                <ol start="3" style="line-height: 1.6; margin: 10px 0;">
                    <li>Mueve tu archivo descargado a <code>config/eyelash_sofle.keymap</code></li>
                </ol>
                
                <h5 style="color: #2e7d32;">⬆️ PASO 3: Subir cambios</h5>
                <div style="background: #f5f5f5; padding: 12px; border-radius: 6px; font-family: monospace; margin: 10px 0; user-select: all;">
                    git add config/eyelash_sofle.keymap<br>
                    git commit -m "Update keymap configuration"<br>
                    git push origin main
                </div>
                
                <h5 style="color: #2e7d32;">🔥 PASO 4: Generar firmware</h5>
                <p>GitHub Actions construirá automáticamente tu firmware y generará el archivo UF2.</p>
                <ul style="line-height: 1.6;">
                    <li>Ve a <strong>Actions</strong> en GitHub</li>
                    <li>Espera a que termine el <strong>build</strong></li>
                    <li>Descarga el archivo <strong>.uf2</strong> desde los artifacts</li>
                </ul>
                
                <h5 style="color: #d32f2f;">📱 PASO 5: Flashear teclado</h5>
                <ol style="line-height: 1.6;">
                    <li>Pon tu Sofle en <strong>modo bootloader</strong> (botón reset)</li>
                    <li>Conéctalo via USB - aparecerá como unidad <strong>ZMK-DFU</strong></li>
                    <li>Arrastra el archivo <strong>.uf2</strong> a esa unidad</li>
                    <li>El teclado reiniciará con tu nuevo keymap</li>
                </ol>
                
                <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
                    <strong>💡 TIP:</strong> Guarda este archivo .keymap como backup. Si necesitas hacer cambios, solo repite los pasos 2-5.
                </div>
            </div>
        `);

        // Añadir event listeners después de mostrar el modal
        setTimeout(() => {
            document.getElementById('downloadFileBtn').addEventListener('click', () => {
                this.downloadKeymap(keymapContent, filename);
                const btn = document.getElementById('downloadFileBtn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Descargado!';
                btn.style.background = '#28a745';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 2000);
            });
        }, 100);
    }

    downloadKeymap(content, filename) {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

const editor = new KeymapEditor();
