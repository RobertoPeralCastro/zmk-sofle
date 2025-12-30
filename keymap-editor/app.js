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
                '&kp C_MUTE', '&kp LCTRL', '&kp LGUI', '&kp LALT', '&mo 1', '&kp SPACE',
                '&kp SPACE', '&kp ENTER', '&mo 2', '&kp RALT', '&kp RCTRL', '&kp DEL'
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
                '&kp C_MUTE', '&trans', '&trans', '&trans', '&trans', '&trans',
                '&trans', '&mkp LCLK', '&trans', '&trans', '&trans', '&trans'
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
                '&trans', '&trans', '&trans', '&trans', '&trans', '&trans',
                '&trans', '&mkp LCLK', '&trans', '&trans', '&trans', '&trans'
            ],
            3: Array(60).fill('&trans'),
            4: Array(60).fill('&trans')
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
            48, 49, 50, 51, 52, 53  // Fila 4 (6 teclas)
        ];
        const rightKeys = [
            6, 7, 8, 9, 10, 11,     // Fila 0
            18, 19, 20, 21, 22, 23, // Fila 1
            30, 31, 32, 33, 34, 35, // Fila 2
            42, 43, 44, 45, 46, 47, // Fila 3
            54, 55, 56, 57, 58, 59  // Fila 4 (6 teclas)
        ];

        leftKeys.forEach(keyIndex => {
            const key = this.createKeyElement(keyIndex);
            leftKeyboard.appendChild(key);
        });

        rightKeys.forEach(keyIndex => {
            const key = this.createKeyElement(keyIndex, 'right');
            rightKeyboard.appendChild(key);
        });
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
            48: { x: 10, y: 250 },   // C_MUTE
            49: { x: 70, y: 250 },   // LCTRL
            50: { x: 130, y: 250 },  // LGUI
            51: { x: 190, y: 250 },  // LALT
            52: { x: 250, y: 255 },  // mo 1
            53: { x: 310, y: 265 },  // SPACE
            
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
            54: { x: 50, y: 265 },   // SPACE
            55: { x: 110, y: 255 },  // ENTER
            56: { x: 170, y: 250 },  // mo 2
            57: { x: 230, y: 250 },  // RALT
            58: { x: 290, y: 250 },  // RCTRL
            59: { x: 350, y: 250 }   // DEL
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
        this.selectedJoystick = direction;
        this.selectedKey = null;
        this.selectedEncoder = null;
        
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        document.querySelectorAll('.encoder-key').forEach(k => k.classList.remove('selected'));
        
        const joystickElement = document.querySelector(`[data-key="joystick-${direction}"]`);
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
        
        // Joystick seleccionado
        if (this.selectedJoystick !== null) {
            const code = this.joystickBindings[this.currentLayer][this.selectedJoystick];
            const display = getKeycodeDisplay(code);
            const directionNames = {
                'up': 'Arriba',
                'down': 'Abajo',
                'left': 'Izquierda',
                'right': 'Derecha',
                'click': 'Click'
            };
            
            infoDiv.innerHTML = `
                <p><strong>Elemento:</strong> Joystick ${directionNames[this.selectedJoystick]}</p>
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
        
        // Asignar a joystick
        if (this.selectedJoystick !== null) {
            this.joystickBindings[this.currentLayer][this.selectedJoystick] = code;
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
        
        // Actualizar joystick
        const joystickBindings = this.joystickBindings[this.currentLayer];
        const joystickUp = document.querySelector('[data-key="joystick-up"]');
        const joystickDown = document.querySelector('[data-key="joystick-down"]');
        const joystickLeft = document.querySelector('[data-key="joystick-left"]');
        const joystickRight = document.querySelector('[data-key="joystick-right"]');
        const joystickClick = document.querySelector('[data-key="joystick-click"]');
        
        if (joystickUp) joystickUp.title = `Arriba: ${getKeycodeDisplay(joystickBindings.up)}`;
        if (joystickDown) joystickDown.title = `Abajo: ${getKeycodeDisplay(joystickBindings.down)}`;
        if (joystickLeft) joystickLeft.title = `Izquierda: ${getKeycodeDisplay(joystickBindings.left)}`;
        if (joystickRight) joystickRight.title = `Derecha: ${getKeycodeDisplay(joystickBindings.right)}`;
        if (joystickClick) joystickClick.title = `Click: ${getKeycodeDisplay(joystickBindings.click)}`;
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
            
            // Asegurar que la capa tenga exactamente 60 teclas (sin encoders)
            let keys = [...this.keymap[layer]];
            while (keys.length < 60) {
                keys.push('&trans');
            }
            keys = keys.slice(0, 60); // Asegurar que no haya más de 60
            
            // Mapear las 60 teclas a la matriz física de 64 posiciones
            // La matriz física tiene col 6 reservada (encoder) en todas las filas
            // Filas 0-3: col 0-5, 7-13 = 13 posiciones (falta col 6)
            // Fila 4: col 0-5, 7-12 = 13 posiciones (falta col 6)
            const exportKeys = [
                // Fila 0: teclas 0-5, &none (col 6), teclas 6-11 (col 7-12 y col 13)
                ...keys.slice(0, 6), '&none', ...keys.slice(6, 12),
                // Fila 1: teclas 12-17, &none (col 6), teclas 18-23 (col 7-12 y col 13)
                ...keys.slice(12, 18), '&none', ...keys.slice(18, 24),
                // Fila 2: teclas 24-29, &none (col 6), teclas 30-35 (col 7-12 y col 13)
                ...keys.slice(24, 30), '&none', ...keys.slice(30, 36),
                // Fila 3: teclas 36-41, &none (col 6), teclas 42-47 (col 7-12 y col 13)
                ...keys.slice(36, 42), '&none', ...keys.slice(42, 48),
                // Fila 4: teclas 48-53, &none (col 6), teclas 54-59 (col 7-12)
                ...keys.slice(48, 54), '&none', ...keys.slice(54, 60)
            ];
            
            const rows = [
                exportKeys.slice(0, 13).join('  '),   // Fila 0: 6 + &none + 6 = 13
                exportKeys.slice(13, 26).join('  '),  // Fila 1: 6 + &none + 6 = 13
                exportKeys.slice(26, 39).join('  '),  // Fila 2: 6 + &none + 6 = 13
                exportKeys.slice(39, 52).join('  '),  // Fila 3: 6 + &none + 6 = 13
                exportKeys.slice(52, 65).join('  ')   // Fila 4: 6 + &none + 6 = 13
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
            // Buscar el bloque keymap completo
            const keymapBlockRegex = /keymap\s*{[\s\S]*?compatible\s*=\s*"zmk,keymap";([\s\S]*?)};/;
            const keymapBlock = keymapText.match(keymapBlockRegex);
            
            if (!keymapBlock) {
                throw new Error('No se encontró el bloque keymap en el archivo');
            }
            
            // Buscar todas las capas (layer0, layer_1, etc.)
            const layerBlockRegex = /(layer[_0-9]*)\s*{[\s\S]*?bindings\s*=\s*<([\s\S]*?)>;/g;
            const layerMatches = [...keymapBlock[1].matchAll(layerBlockRegex)];
            
            console.log('Capas encontradas:', layerMatches.length);
            
            if (layerMatches.length === 0) {
                throw new Error('No se encontraron capas en el keymap');
            }
            
            let layersImported = 0;
            
            layerMatches.forEach((match, index) => {
                if (index >= 5) return;
                
                const layerName = match[1];
                const bindingsText = match[2];
                
                console.log(`Procesando ${layerName}...`);
                console.log(`Bindings (primeros 100 chars):`, bindingsText.substring(0, 100));
                
                // Extraer todos los keycodes completos
                // Formato: &behavior PARAM1 PARAM2 o &behavior PARAM o &behavior PARAM(ARG) o &none
                // Mejorado para capturar también paréntesis en modificadores como LS(N7), RA(APOS)
                const keyRegex = /&[\w_]+(?:\s+[\w_]+(?:\([^)]+\))?)*(?:\s+[\w_]+(?:\([^)]+\))?)*/g;
                let keys = bindingsText.match(keyRegex) || [];
                
                // Limpiar cada keycode (eliminar espacios extra al final)
                keys = keys.map(k => k.trim());
                
                // Si no encuentra nada con el regex anterior, intentar otro enfoque
                if (keys.length === 0) {
                    // Dividir por & y reconstruir
                    const parts = bindingsText.split('&').filter(p => p.trim());
                    keys = parts.map(p => '&' + p.trim().split(/\s+/).slice(0, 3).join(' '));
                }
                
                console.log(`${layerName}: ${keys.length} teclas encontradas`);
                console.log(`Primeras 5 teclas:`, keys.slice(0, 5));
                
                if (keys.length > 0) {
                    // Si hay más de 60 teclas, eliminar las posiciones de los encoders (&none)
                    // Formato exportado: 13 posiciones por fila 0-4 = 65 total
                    // Posiciones &none (col 6): 6, 19, 32, 45, 58
                    if (keys.length === 65) {
                        console.log(`Formato con encoders detectado. Total teclas: ${keys.length}`);
                        console.log(`Verificando posiciones de encoder...`);
                        
                        // Verificar que las posiciones esperadas contengan &none
                        const encoderPositions = [6, 19, 32, 45, 58];
                        const hasEncoders = encoderPositions.every(pos => 
                            keys[pos] && (keys[pos] === '&none' || keys[pos].includes('none'))
                        );
                        
                        if (hasEncoders) {
                            console.log(`Encoders (&none) encontrados en posiciones correctas`);
                            // Eliminar de atrás hacia adelante para no alterar índices
                            keys.splice(58, 1); // Fila 4
                            keys.splice(45, 1); // Fila 3
                            keys.splice(32, 1); // Fila 2
                            keys.splice(19, 1); // Fila 1
                            keys.splice(6, 1);  // Fila 0
                            console.log(`Encoders eliminados. Teclas restantes: ${keys.length}`);
                        } else {
                            console.log(`No se encontraron &none en las posiciones esperadas`);
                        }
                    }
                    
                    this.keymap[index] = keys.slice(0, 60);
                    
                    // Completar con &trans si faltan
                    while (this.keymap[index].length < 60) {
                        this.keymap[index].push('&trans');
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
                message: `✅ Importado exitosamente!\n\n📊 ${layersImported} capa(s) importada(s)\n🎹 ${layersImported * 60} teclas configuradas`
            };
        } catch (error) {
            return {
                success: false,
                message: '❌ Error al importar: ' + error.message
            };
        }
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

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });

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
        const configPathAbsolute = 'c:\\Users\\rosli\\sofle\\zmk-sofle\\config';
        const configPathDisplay = configPathAbsolute.replace(/\\\\/g, '\\');
        
        // Primero mostrar el modal con instrucciones
        this.showModal('Guardar Keymap', `
            <div style="text-align: left;">
                <h3>💾 Guardando keymap...</h3>
                
                <p><strong>📁 Guarda el archivo en esta carpeta:</strong></p>
                <div id="pathDisplay" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; font-family: monospace; word-break: break-all; user-select: all; cursor: pointer;">
                    ${configPathDisplay}
                </div>
                <p style="font-size: 0.9rem; color: #6c757d; margin-top: -5px;">👆 Haz clic en la ruta para copiarla</p>
                
                <div style="display: flex; gap: 10px; margin: 20px 0;">
                    <button class="btn btn-primary" id="copyPathBtn" style="flex: 1;">
                        📋 Copiar Ruta
                    </button>
                    <button class="btn btn-secondary" id="downloadFileBtn" style="flex: 1;">
                        💾 Descargar Archivo
                    </button>
                </div>
                
                <hr style="margin: 20px 0;">
                
                <h4>⚠️ Pasos a seguir:</h4>
                <ol style="line-height: 1.8;">
                    <li><strong>Copia la ruta</strong> haciendo clic en el botón o en el texto</li>
                    <li><strong>Descarga el archivo</strong> con el botón de arriba</li>
                    <li><strong>Abre el Explorador</strong> (Win + E)</li>
                    <li><strong>Pega la ruta</strong> en la barra de direcciones (Ctrl + V) y Enter</li>
                    <li><strong>Si existe archivo anterior</strong>, renómbralo como backup (ej: eyelash_sofle_backup.keymap)</li>
                    <li><strong>Mueve el archivo descargado</strong> a esa carpeta</li>
                    <li><strong>Commit y push</strong> a GitHub para generar el UF2</li>
                </ol>
            </div>
        `);

        // Añadir event listeners después de mostrar el modal
        setTimeout(() => {
            // Click en el pathDisplay para copiar
            document.getElementById('pathDisplay').addEventListener('click', () => {
                navigator.clipboard.writeText(configPathDisplay).then(() => {
                    const pathDiv = document.getElementById('pathDisplay');
                    pathDiv.style.background = '#d4edda';
                    pathDiv.style.borderColor = '#28a745';
                    setTimeout(() => {
                        pathDiv.style.background = '#f8f9fa';
                        pathDiv.style.borderColor = '';
                    }, 1000);
                });
            });
            
            // Botón de copiar ruta
            document.getElementById('copyPathBtn').addEventListener('click', () => {
                navigator.clipboard.writeText(configPathDisplay).then(() => {
                    const btn = document.getElementById('copyPathBtn');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '✅ Ruta Copiada!';
                    btn.style.background = '#28a745';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                });
            });

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
