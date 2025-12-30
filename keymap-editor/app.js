class KeymapEditor {
    constructor() {
        this.currentLayer = 0;
        this.selectedKey = null;
        this.keymap = this.initializeKeymap();
        this.encoderBindings = this.initializeEncoderBindings();
        this.physicalKeyMap = this.initializePhysicalKeyMap();
        
        this.init();
    }

    initializeKeymap() {
        const defaultKeymap = {
            0: [
                '&kp ESC', '&kp N1', '&kp N2', '&kp N3', '&kp N4', '&kp N5', '&kp UP_ARROW',
                '&kp N6', '&kp N7', '&kp N8', '&kp N9', '&kp N0', '&kp BSPC',
                '&kp TAB', '&kp Q', '&kp W', '&kp E', '&kp R', '&kp T', '&kp DOWN_ARROW',
                '&kp Y', '&kp U', '&kp I', '&kp O', '&kp P', '&kp BSLH',
                '&kp CAPS', '&kp A', '&kp S', '&kp D', '&kp F', '&kp G', '&kp LEFT_ARROW',
                '&kp H', '&kp J', '&kp K', '&kp L', '&kp SEMI', '&kp APOS',
                '&kp LSHFT', '&kp Z', '&kp X', '&kp C', '&kp V', '&kp B', '&kp RIGHT_ARROW',
                '&kp N', '&kp M', '&kp COMMA', '&kp DOT', '&kp FSLH', '&kp ENTER',
                '&kp C_MUTE', '&kp LCTRL', '&kp LGUI', '&kp LALT', '&mo 1', '&kp SPACE',
                '&kp ENTER', '&kp SPACE', '&kp ENTER', '&mo 2', '&kp RSHFT', '&kp DEL'
            ],
            1: [
                '&kp GRAVE', '&kp F1', '&kp F2', '&kp F3', '&kp F4', '&kp F5', '&mmv MOVE_UP',
                '&kp F6', '&kp F7', '&kp F8', '&kp F9', '&kp F10', '&trans',
                '&trans', '&kp GRAVE', '&mkp LCLK', '&mkp MCLK', '&mkp RCLK', '&mkp MB4', '&mmv MOVE_DOWN',
                '&kp PG_UP', '&kp END', '&kp UP', '&kp HOME', '&kp MINUS', '&kp EQUAL',
                '&trans', '&kp TILDE', '&trans', '&trans', '&trans', '&mkp MB5', '&mmv MOVE_LEFT',
                '&kp PG_DN', '&kp LEFT', '&kp DOWN', '&kp RIGHT', '&kp LBKT', '&kp RBKT',
                '&trans', '&rgb_ug RGB_OFF', '&rgb_ug RGB_ON', '&rgb_ug RGB_EFF', '&rgb_ug RGB_EFR', '&rgb_ug RGB_SPI', '&mmv MOVE_RIGHT',
                '&rgb_ug RGB_BRI', '&rgb_ug RGB_BRD', '&kp INSERT', '&kp F11', '&kp F12', '&trans',
                '&kp C_MUTE', '&trans', '&trans', '&trans', '&trans', '&trans',
                '&mkp LCLK', '&trans', '&trans', '&trans', '&trans', '&trans'
            ],
            2: [
                '&kp TILDE', '&bt BT_SEL 0', '&bt BT_SEL 1', '&bt BT_SEL 2', '&bt BT_SEL 3', '&bt BT_SEL 4', '&mmv MOVE_UP',
                '&kp F6', '&kp F7', '&kp F8', '&kp F9', '&kp F10', '&trans',
                '&trans', '&bt BT_CLR', '&bt BT_CLR_ALL', '&trans', '&trans', '&trans', '&mmv MOVE_DOWN',
                '&trans', '&trans', '&kp F11', '&kp F12', '&kp UNDER', '&kp PLUS',
                '&trans', '&out OUT_USB', '&out OUT_BLE', '&trans', '&trans', '&trans', '&mmv MOVE_LEFT',
                '&trans', '&trans', '&trans', '&trans', '&kp LBRC', '&kp RBRC',
                '&trans', '&sys_reset', '&trans', '&bootloader', '&trans', '&trans', '&mmv MOVE_RIGHT',
                '&trans', '&trans', '&sys_reset', '&soft_off', '&bootloader', '&trans',
                '&trans', '&trans', '&trans', '&trans', '&trans', '&trans',
                '&mkp LCLK', '&trans', '&trans', '&trans', '&trans', '&trans'
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

    initializePhysicalKeyMap() {
        return {
            'Escape': 0, 'Digit1': 1, 'Digit2': 2, 'Digit3': 3, 'Digit4': 4, 'Digit5': 5,
            'Digit6': 7, 'Digit7': 8, 'Digit8': 9, 'Digit9': 10, 'Digit0': 11, 'Backspace': 12,
            'Tab': 13, 'KeyQ': 14, 'KeyW': 15, 'KeyE': 16, 'KeyR': 17, 'KeyT': 18,
            'KeyY': 20, 'KeyU': 21, 'KeyI': 22, 'KeyO': 23, 'KeyP': 24, 'Backslash': 25,
            'CapsLock': 26, 'KeyA': 27, 'KeyS': 28, 'KeyD': 29, 'KeyF': 30, 'KeyG': 31,
            'KeyH': 33, 'KeyJ': 34, 'KeyK': 35, 'KeyL': 36, 'Semicolon': 37, 'Quote': 38,
            'ShiftLeft': 39, 'KeyZ': 40, 'KeyX': 41, 'KeyC': 42, 'KeyV': 43, 'KeyB': 44,
            'KeyN': 46, 'KeyM': 47, 'Comma': 48, 'Period': 49, 'Slash': 50, 'Enter': 51,
            'ControlLeft': 53, 'MetaLeft': 54, 'AltLeft': 55, 'Space': 57,
            'ShiftRight': 60, 'Delete': 61,
            'ArrowUp': 6, 'ArrowDown': 19, 'ArrowLeft': 32, 'ArrowRight': 45
        };
    }

    init() {
        this.renderKeyboard();
        this.attachEventListeners();
        this.updateDisplay();
    }

    renderKeyboard() {
        const leftKeyboard = document.getElementById('leftKeyboard');
        const rightKeyboard = document.getElementById('rightKeyboard');
        
        leftKeyboard.innerHTML = '';
        rightKeyboard.innerHTML = '';

        const leftKeys = [0, 1, 2, 3, 4, 5, 6, 13, 14, 15, 16, 17, 18, 19, 26, 27, 28, 29, 30, 31, 32, 39, 40, 41, 42, 43, 44, 45, 52, 53, 54, 55, 56, 57];
        const rightKeys = [7, 8, 9, 10, 11, 12, 20, 21, 22, 23, 24, 25, 33, 34, 35, 36, 37, 38, 46, 47, 48, 49, 50, 51, 58, 59, 60, 61, 62];

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
            // Row 0 - Number row (left side)
            0: { x: 10, y: 10 },
            1: { x: 70, y: 10 },
            2: { x: 130, y: 0 },
            3: { x: 190, y: 0 },
            4: { x: 250, y: 5 },
            5: { x: 310, y: 10 },
            6: { x: 370, y: 15 },
            
            // Row 0 - Number row (right side)
            7: { x: 10, y: 15 },
            8: { x: 70, y: 10 },
            9: { x: 130, y: 5 },
            10: { x: 190, y: 0 },
            11: { x: 250, y: 0 },
            12: { x: 310, y: 10 },
            
            // Row 1 - Top letter row (left side)
            13: { x: 10, y: 70 },
            14: { x: 70, y: 70 },
            15: { x: 130, y: 60 },
            16: { x: 190, y: 60 },
            17: { x: 250, y: 65 },
            18: { x: 310, y: 70 },
            19: { x: 370, y: 75 },
            
            // Row 1 - Top letter row (right side)
            20: { x: 10, y: 75 },
            21: { x: 70, y: 70 },
            22: { x: 130, y: 65 },
            23: { x: 190, y: 60 },
            24: { x: 250, y: 60 },
            25: { x: 310, y: 70 },
            
            // Row 2 - Home row (left side)
            26: { x: 10, y: 130 },
            27: { x: 70, y: 130 },
            28: { x: 130, y: 120 },
            29: { x: 190, y: 120 },
            30: { x: 250, y: 125 },
            31: { x: 310, y: 130 },
            32: { x: 370, y: 135 },
            
            // Row 2 - Home row (right side)
            33: { x: 10, y: 135 },
            34: { x: 70, y: 130 },
            35: { x: 130, y: 125 },
            36: { x: 190, y: 120 },
            37: { x: 250, y: 120 },
            38: { x: 310, y: 130 },
            
            // Row 3 - Bottom letter row (left side)
            39: { x: 10, y: 190 },
            40: { x: 70, y: 190 },
            41: { x: 130, y: 180 },
            42: { x: 190, y: 180 },
            43: { x: 250, y: 185 },
            44: { x: 310, y: 190 },
            45: { x: 370, y: 195 },
            
            // Row 3 - Bottom letter row (right side)
            46: { x: 10, y: 195 },
            47: { x: 70, y: 190 },
            48: { x: 130, y: 185 },
            49: { x: 190, y: 180 },
            50: { x: 250, y: 180 },
            51: { x: 310, y: 190 },
            
            // Row 4 - Thumb cluster and bottom row (left side)
            52: { x: 370, y: 240 },
            53: { x: 130, y: 250 },
            54: { x: 190, y: 250 },
            55: { x: 250, y: 255 },
            56: { x: 295, y: 265 },
            57: { x: 340, y: 275 },
            
            // Row 4 - Thumb cluster and bottom row (right side)
            58: { x: 40, y: 275 },
            59: { x: 85, y: 265 },
            60: { x: 130, y: 255 },
            61: { x: 190, y: 250 },
            62: { x: 250, y: 250 }
        };
        
        return positions[index] || { x: 0, y: 0 };
    }

    selectKey(index) {
        this.selectedKey = index;
        
        document.querySelectorAll('.key').forEach(k => k.classList.remove('selected'));
        const keyElement = document.querySelector(`[data-index="${index}"]`);
        if (keyElement) {
            keyElement.classList.add('selected');
        }
        
        this.updateKeyInfo();
    }

    updateKeyInfo() {
        const infoDiv = document.getElementById('selectedKeyInfo');
        
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
        if (this.selectedKey === null) {
            alert('Por favor, selecciona una tecla primero');
            return;
        }
        
        this.keymap[this.currentLayer][this.selectedKey] = code;
        this.updateDisplay();
        this.updateKeyInfo();
    }

    updateDisplay() {
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
    }

    switchLayer(layer) {
        this.currentLayer = layer;
        this.selectedKey = null;
        
        document.querySelectorAll('.layer-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-layer="${layer}"]`).classList.add('active');
        
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
            
            const keys = this.keymap[layer];
            const rows = [
                keys.slice(0, 13).join('  '),
                keys.slice(13, 26).join('  '),
                keys.slice(26, 39).join('  '),
                keys.slice(39, 52).join('  '),
                keys.slice(52, 63).join('  ')
            ];
            
            rows.forEach(row => {
                output += `${row}\n`;
            });
            
            output += `            >;\n\n`;
            
            const encoder = this.encoderBindings[layer];
            if (layer === 0) {
                output += `            sensor-bindings = <&inc_dec_kp ${encoder.up.replace('&kp ', '')} ${encoder.down.replace('&kp ', '')}>;\n`;
            } else {
                output += `            sensor-bindings = <&scroll_encoder>;\n`;
            }
            
            output += `            display-name = "${displayName}";\n`;
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
                // Formato: &behavior PARAM1 PARAM2 o &behavior PARAM o &behavior
                const keyRegex = /&[\w_]+(?:\s+[\w_]+)*(?=\s+&|\s*$|\s*\n)/g;
                let keys = bindingsText.match(keyRegex) || [];
                
                // Si no encuentra nada con el regex anterior, intentar otro enfoque
                if (keys.length === 0) {
                    // Dividir por & y reconstruir
                    const parts = bindingsText.split('&').filter(p => p.trim());
                    keys = parts.map(p => '&' + p.trim().split(/\s+/).slice(0, 3).join(' '));
                }
                
                console.log(`${layerName}: ${keys.length} teclas encontradas`);
                console.log(`Primeras 5 teclas:`, keys.slice(0, 5));
                
                if (keys.length > 0) {
                    this.keymap[index] = keys.slice(0, 63);
                    
                    // Completar con &trans si faltan
                    while (this.keymap[index].length < 63) {
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
            
            return {
                success: true,
                layersImported: layersImported,
                message: `✅ Importado exitosamente!\n\n📊 ${layersImported} capa(s) importada(s)\n🎹 ${layersImported * 63} teclas configuradas`
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
            this.selectedKey = null;
            this.updateDisplay();
            this.updateKeyInfo();
        }
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

        document.addEventListener('keydown', (e) => {
            this.handlePhysicalKeyPress(e);
        });

        document.addEventListener('keyup', (e) => {
            this.handlePhysicalKeyRelease(e);
        });
    }

    handlePhysicalKeyPress(event) {
        const keyIndex = this.physicalKeyMap[event.code];
        
        if (keyIndex !== undefined) {
            event.preventDefault();
            
            const keyElement = document.querySelector(`[data-index="${keyIndex}"]`);
            if (keyElement) {
                keyElement.classList.add('pressed');
            }
        }
    }

    handlePhysicalKeyRelease(event) {
        const keyIndex = this.physicalKeyMap[event.code];
        
        if (keyIndex !== undefined) {
            const keyElement = document.querySelector(`[data-index="${keyIndex}"]`);
            if (keyElement) {
                setTimeout(() => {
                    keyElement.classList.remove('pressed');
                }, 150);
            }
        }
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
        
        // Primero mostrar el modal con instrucciones
        this.showModal('Guardar Keymap', `
            <div style="text-align: left;">
                <h3>💾 Guardando keymap...</h3>
                
                <p><strong>📁 Guarda el archivo en esta carpeta:</strong></p>
                <div id="pathDisplay" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 10px 0; font-family: monospace; word-break: break-all; user-select: all; cursor: pointer;" onclick="navigator.clipboard.writeText('${configPathAbsolute}').then(() => { this.style.background = '#d4edda'; setTimeout(() => this.style.background = '#f8f9fa', 1000); })">
                    ${configPathAbsolute}
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
            document.getElementById('copyPathBtn').addEventListener('click', () => {
                navigator.clipboard.writeText(configPathAbsolute).then(() => {
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
