const ZMK_KEYCODES = {
    // Letras
    'A': { code: '&kp A', desc: 'Letra A' },
    'B': { code: '&kp B', desc: 'Letra B' },
    'C': { code: '&kp C', desc: 'Letra C' },
    'D': { code: '&kp D', desc: 'Letra D' },
    'E': { code: '&kp E', desc: 'Letra E' },
    'F': { code: '&kp F', desc: 'Letra F' },
    'G': { code: '&kp G', desc: 'Letra G' },
    'H': { code: '&kp H', desc: 'Letra H' },
    'I': { code: '&kp I', desc: 'Letra I' },
    'J': { code: '&kp J', desc: 'Letra J' },
    'K': { code: '&kp K', desc: 'Letra K' },
    'L': { code: '&kp L', desc: 'Letra L' },
    'M': { code: '&kp M', desc: 'Letra M' },
    'N': { code: '&kp N', desc: 'Letra N' },
    'O': { code: '&kp O', desc: 'Letra O' },
    'P': { code: '&kp P', desc: 'Letra P' },
    'Q': { code: '&kp Q', desc: 'Letra Q' },
    'R': { code: '&kp R', desc: 'Letra R' },
    'S': { code: '&kp S', desc: 'Letra S' },
    'T': { code: '&kp T', desc: 'Letra T' },
    'U': { code: '&kp U', desc: 'Letra U' },
    'V': { code: '&kp V', desc: 'Letra V' },
    'W': { code: '&kp W', desc: 'Letra W' },
    'X': { code: '&kp X', desc: 'Letra X' },
    'Y': { code: '&kp Y', desc: 'Letra Y' },
    'Z': { code: '&kp Z', desc: 'Letra Z' },
    'Ñ': { code: '&kp SEMI', desc: 'Letra Ñ' },

    // Números
    '0': { code: '&kp N0', desc: 'Número 0' },
    '1': { code: '&kp N1', desc: 'Número 1' },
    '2': { code: '&kp N2', desc: 'Número 2' },
    '3': { code: '&kp N3', desc: 'Número 3' },
    '4': { code: '&kp N4', desc: 'Número 4' },
    '5': { code: '&kp N5', desc: 'Número 5' },
    '6': { code: '&kp N6', desc: 'Número 6' },
    '7': { code: '&kp N7', desc: 'Número 7' },
    '8': { code: '&kp N8', desc: 'Número 8' },
    '9': { code: '&kp N9', desc: 'Número 9' },

    // Teclas de función
    'F1': { code: '&kp F1', desc: 'Función F1' },
    'F2': { code: '&kp F2', desc: 'Función F2' },
    'F3': { code: '&kp F3', desc: 'Función F3' },
    'F4': { code: '&kp F4', desc: 'Función F4' },
    'F5': { code: '&kp F5', desc: 'Función F5' },
    'F6': { code: '&kp F6', desc: 'Función F6' },
    'F7': { code: '&kp F7', desc: 'Función F7' },
    'F8': { code: '&kp F8', desc: 'Función F8' },
    'F9': { code: '&kp F9', desc: 'Función F9' },
    'F10': { code: '&kp F10', desc: 'Función F10' },
    'F11': { code: '&kp F11', desc: 'Función F11' },
    'F12': { code: '&kp F12', desc: 'Función F12' },

    // Modificadores
    'LSHIFT': { code: '&kp LSHFT', desc: 'Shift izquierdo' },
    'RSHIFT': { code: '&kp RSHFT', desc: 'Shift derecho' },
    'LCTRL': { code: '&kp LCTRL', desc: 'Control izquierdo' },
    'RCTRL': { code: '&kp RCTRL', desc: 'Control derecho' },
    'LALT': { code: '&kp LALT', desc: 'Alt izquierdo' },
    'RALT': { code: '&kp RALT', desc: 'Alt derecho' },
    'LGUI': { code: '&kp LGUI', desc: 'GUI/Win izquierdo' },
    'RGUI': { code: '&kp RGUI', desc: 'GUI/Win derecho' },

    // Navegación
    'UP': { code: '&kp UP', desc: 'Flecha arriba' },
    'DOWN': { code: '&kp DOWN', desc: 'Flecha abajo' },
    'LEFT': { code: '&kp LEFT', desc: 'Flecha izquierda' },
    'RIGHT': { code: '&kp RIGHT', desc: 'Flecha derecha' },
    'HOME': { code: '&kp HOME', desc: 'Inicio' },
    'END': { code: '&kp END', desc: 'Fin' },
    'PGUP': { code: '&kp PG_UP', desc: 'Página arriba' },
    'PGDN': { code: '&kp PG_DN', desc: 'Página abajo' },

    // Edición
    'ENTER': { code: '&kp ENTER', desc: 'Enter' },
    'ESC': { code: '&kp ESC', desc: 'Escape' },
    'BSPC': { code: '&kp BSPC', desc: 'Backspace' },
    'DEL': { code: '&kp DEL', desc: 'Delete' },
    'TAB': { code: '&kp TAB', desc: 'Tab' },
    'SPACE': { code: '&kp SPACE', desc: 'Espacio' },
    'INSERT': { code: '&kp INSERT', desc: 'Insert' },

    // Símbolos
    'MINUS': { code: '&kp MINUS', desc: 'Guión -' },
    'EQUAL': { code: '&kp EQUAL', desc: 'Igual =' },
    'LBKT': { code: '&kp LBKT', desc: 'Corchete izq [' },
    'RBKT': { code: '&kp RBKT', desc: 'Corchete der ]' },
    'LBRC': { code: '&kp LBRC', desc: 'Llave izq {' },
    'RBRC': { code: '&kp RBRC', desc: 'Llave der }' },
    'LPAR': { code: '&kp LPAR', desc: 'Paréntesis izq (' },
    'RPAR': { code: '&kp RPAR', desc: 'Paréntesis der )' },
    'BSLH': { code: '&kp BSLH', desc: 'Barra invertida \\' },
    'PIPE': { code: '&kp PIPE', desc: 'Barra vertical |' },
    'SEMI': { code: '&kp SEMI', desc: 'Punto y coma ;' },
    'COLON': { code: '&kp COLON', desc: 'Dos puntos :' },
    'APOS': { code: '&kp APOS', desc: 'Apóstrofe \'' },
    'DQT': { code: '&kp DQT', desc: 'Comillas dobles "' },
    'GRAVE': { code: '&kp GRAVE', desc: 'Acento grave `' },
    'COMMA': { code: '&kp COMMA', desc: 'Coma ,' },
    'DOT': { code: '&kp DOT', desc: 'Punto .' },
    'FSLH': { code: '&kp FSLH', desc: 'Barra /' },
    'QMARK': { code: '&kp QMARK', desc: 'Interrogación ?' },
    'EXCL': { code: '&kp EXCL', desc: 'Exclamación !' },
    'AT': { code: '&kp AT', desc: 'Arroba @' },
    'HASH': { code: '&kp HASH', desc: 'Almohadilla #' },
    'DLLR': { code: '&kp DLLR', desc: 'Dólar $' },
    'PRCNT': { code: '&kp PRCNT', desc: 'Porcentaje %' },
    'CARET': { code: '&kp CARET', desc: 'Acento circunflejo ^' },
    'AMPS': { code: '&kp AMPS', desc: 'Ampersand &' },
    'STAR': { code: '&kp STAR', desc: 'Asterisco *' },
    'UNDER': { code: '&kp UNDER', desc: 'Guión bajo _' },
    'PLUS': { code: '&kp PLUS', desc: 'Más +' },
    'LT': { code: '&kp LT', desc: 'Menor que <' },
    'GT': { code: '&kp GT', desc: 'Mayor que >' },
    'TILDE': { code: '&kp TILDE', desc: 'Tilde ~' },

    // Símbolos específicos teclado español
    'ES_SLASH': { code: '&kp LS(N7)', desc: 'Barra / (español)' },
    'ES_LPAR': { code: '&kp LS(N8)', desc: 'Paréntesis ( (español)' },
    'ES_RPAR': { code: '&kp LS(N9)', desc: 'Paréntesis ) (español)' },
    'ES_EQUAL': { code: '&kp LS(N0)', desc: 'Igual = (español)' },
    'ES_QMARK': { code: '&kp LS(APOS)', desc: 'Interrogación ? (español)' },
    'ES_EXCL': { code: '&kp LS(N1)', desc: 'Exclamación ! (español)' },
    'ES_DQUOT': { code: '&kp LS(N2)', desc: 'Comillas " (español)' },
    'ES_HASH': { code: '&kp RA(N3)', desc: 'Almohadilla # (español)' },
    'ES_DLLR': { code: '&kp LS(N4)', desc: 'Dólar $ (español)' },
    'ES_PRCNT': { code: '&kp LS(N5)', desc: 'Porcentaje % (español)' },
    'ES_AMPS': { code: '&kp LS(N6)', desc: 'Ampersand & (español)' },
    'ES_UNDER': { code: '&kp LS(MINUS)', desc: 'Guión bajo _ (español)' },
    'ES_LBRC': { code: '&kp RA(APOS)', desc: 'Llave { (español)' },
    'ES_RBRC': { code: '&kp RA(RBKT)', desc: 'Llave } (español)' },
    'ES_LBKT': { code: '&kp RA(GRAVE)', desc: 'Corchete [ (español)' },
    'ES_RBKT': { code: '&kp RA(PLUS)', desc: 'Corchete ] (español)' },
    'ES_PIPE': { code: '&kp RA(N1)', desc: 'Barra vertical | (español)' },
    'ES_AT': { code: '&kp RA(N2)', desc: 'Arroba @ (español)' },
    'ES_BSLH': { code: '&kp RA(GRAVE)', desc: 'Barra invertida \\ (español)' },
    'ES_TILDE': { code: '&kp RA(N4)', desc: 'Tilde ~ (español)' },
    'ES_EURO': { code: '&kp RA(N5)', desc: 'Euro € (español)' },

    // Caps/Locks
    'CAPS': { code: '&kp CAPS', desc: 'Bloq Mayús' },
    'NUMLK': { code: '&kp KP_NUM', desc: 'Bloq Num' },
    'SLCK': { code: '&kp SLCK', desc: 'Bloq Despl' },

    // Media
    'MUTE': { code: '&kp C_MUTE', desc: 'Silenciar' },
    'VOLU': { code: '&kp C_VOL_UP', desc: 'Volumen +' },
    'VOLD': { code: '&kp C_VOL_DN', desc: 'Volumen -' },
    'PLAY': { code: '&kp C_PP', desc: 'Play/Pausa' },
    'NEXT': { code: '&kp C_NEXT', desc: 'Siguiente' },
    'PREV': { code: '&kp C_PREV', desc: 'Anterior' },

    // Bluetooth
    'BT0': { code: '&bt BT_SEL 0', desc: 'Bluetooth perfil 0' },
    'BT1': { code: '&bt BT_SEL 1', desc: 'Bluetooth perfil 1' },
    'BT2': { code: '&bt BT_SEL 2', desc: 'Bluetooth perfil 2' },
    'BT3': { code: '&bt BT_SEL 3', desc: 'Bluetooth perfil 3' },
    'BT4': { code: '&bt BT_SEL 4', desc: 'Bluetooth perfil 4' },
    'BTCLR': { code: '&bt BT_CLR', desc: 'Limpiar perfil BT actual' },
    'BTCLRA': { code: '&bt BT_CLR_ALL', desc: 'Limpiar todos los perfiles BT' },

    // Output
    'OUTUSB': { code: '&out OUT_USB', desc: 'Salida USB' },
    'OUTBLE': { code: '&out OUT_BLE', desc: 'Salida Bluetooth' },
    'OUTTOG': { code: '&out OUT_TOG', desc: 'Alternar salida' },

    // RGB
    'RGBON': { code: '&rgb_ug RGB_ON', desc: 'RGB encender' },
    'RGBOFF': { code: '&rgb_ug RGB_OFF', desc: 'RGB apagar' },
    'RGBTOG': { code: '&rgb_ug RGB_TOG', desc: 'RGB alternar' },
    'RGBBRI': { code: '&rgb_ug RGB_BRI', desc: 'RGB brillo +' },
    'RGBBRD': { code: '&rgb_ug RGB_BRD', desc: 'RGB brillo -' },
    'RGBEFF': { code: '&rgb_ug RGB_EFF', desc: 'RGB efecto siguiente' },
    'RGBEFR': { code: '&rgb_ug RGB_EFR', desc: 'RGB efecto anterior' },
    'RGBSPI': { code: '&rgb_ug RGB_SPI', desc: 'RGB velocidad +' },
    'RGBSPD': { code: '&rgb_ug RGB_SPD', desc: 'RGB velocidad -' },
    'RGBHUI': { code: '&rgb_ug RGB_HUI', desc: 'RGB matiz +' },
    'RGBHUD': { code: '&rgb_ug RGB_HUD', desc: 'RGB matiz -' },
    'RGBSAI': { code: '&rgb_ug RGB_SAI', desc: 'RGB saturación +' },
    'RGBSAD': { code: '&rgb_ug RGB_SAD', desc: 'RGB saturación -' },

    // RGB Colores fijos (sólidos)
    'RGBRED': { code: '&rgb_ug RGB_COLOR_HSV(0, 100, 100)', desc: 'RGB Rojo sólido' },
    'RGBGREEN': { code: '&rgb_ug RGB_COLOR_HSV(120, 100, 100)', desc: 'RGB Verde sólido' },
    'RGBBLUE': { code: '&rgb_ug RGB_COLOR_HSV(240, 100, 100)', desc: 'RGB Azul sólido' },
    'RGBYELLOW': { code: '&rgb_ug RGB_COLOR_HSV(60, 100, 100)', desc: 'RGB Amarillo sólido' },
    'RGBMAGENTA': { code: '&rgb_ug RGB_COLOR_HSV(300, 100, 100)', desc: 'RGB Magenta sólido' },
    'RGBCYAN': { code: '&rgb_ug RGB_COLOR_HSV(180, 100, 100)', desc: 'RGB Cian sólido' },
    'RGBORANGE': { code: '&rgb_ug RGB_COLOR_HSV(30, 100, 100)', desc: 'RGB Naranja sólido' },
    'RGBPURPLE': { code: '&rgb_ug RGB_COLOR_HSV(270, 100, 100)', desc: 'RGB Púrpura sólido' },
    'RGBWHITE': { code: '&rgb_ug RGB_COLOR_HSV(0, 0, 100)', desc: 'RGB Blanco sólido' },
    'RGBPINK': { code: '&rgb_ug RGB_COLOR_HSV(330, 100, 100)', desc: 'RGB Rosa sólido' },

    // Mouse
    'MCLK': { code: '&mkp LCLK', desc: 'Click izquierdo' },
    'RCLK': { code: '&mkp RCLK', desc: 'Click derecho' },
    'MMCLK': { code: '&mkp MCLK', desc: 'Click medio' },
    'MB4': { code: '&mkp MB4', desc: 'Botón mouse 4' },
    'MB5': { code: '&mkp MB5', desc: 'Botón mouse 5' },
    'MMVU': { code: '&mmv MOVE_UP', desc: 'Mouse arriba' },
    'MMVD': { code: '&mmv MOVE_DOWN', desc: 'Mouse abajo' },
    'MMVL': { code: '&mmv MOVE_LEFT', desc: 'Mouse izquierda' },
    'MMVR': { code: '&mmv MOVE_RIGHT', desc: 'Mouse derecha' },
    'MSCU': { code: '&msc SCRL_UP', desc: 'Scroll arriba' },
    'MSCD': { code: '&msc SCRL_DOWN', desc: 'Scroll abajo' },

    // Layers
    'MO1': { code: '&mo 1', desc: 'Momentáneo capa 1' },
    'MO2': { code: '&mo 2', desc: 'Momentáneo capa 2' },
    'MO3': { code: '&mo 3', desc: 'Momentáneo capa 3' },
    'MO4': { code: '&mo 4', desc: 'Momentáneo capa 4' },
    'TO1': { code: '&to 1', desc: 'Cambiar a capa 1' },
    'TO2': { code: '&to 2', desc: 'Cambiar a capa 2' },
    'TO3': { code: '&to 3', desc: 'Cambiar a capa 3' },
    'TO4': { code: '&to 4', desc: 'Cambiar a capa 4' },
    'TG1': { code: '&tog 1', desc: 'Alternar capa 1' },
    'TG2': { code: '&tog 2', desc: 'Alternar capa 2' },
    'TG3': { code: '&tog 3', desc: 'Alternar capa 3' },
    'TG4': { code: '&tog 4', desc: 'Alternar capa 4' },

    // Sistema
    'RESET': { code: '&sys_reset', desc: 'Reset del sistema' },
    'BOOT': { code: '&bootloader', desc: 'Modo bootloader' },
    'SOFTOFF': { code: '&soft_off', desc: 'Apagado suave' },
    'TRANS': { code: '&trans', desc: 'Transparente (usa capa inferior)' },
    'NONE': { code: '&none', desc: 'Sin acción' },
};

function searchKeycodes(query) {
    if (!query) return [];
    
    query = query.toLowerCase();
    const results = [];
    
    for (const [key, value] of Object.entries(ZMK_KEYCODES)) {
        const keyLower = key.toLowerCase();
        const descLower = value.desc.toLowerCase();
        const codeLower = value.code.toLowerCase();
        
        if (keyLower.includes(query) || descLower.includes(query) || codeLower.includes(query)) {
            results.push({
                key: key,
                code: value.code,
                desc: value.desc
            });
        }
    }
    
    return results;
}

function getKeycodeDisplay(code) {
    for (const [key, value] of Object.entries(ZMK_KEYCODES)) {
        if (value.code === code) {
            return key;
        }
    }
    
    const match = code.match(/&kp ([A-Z0-9_]+)/);
    if (match) return match[1];
    
    const moMatch = code.match(/&mo (\d+)/);
    if (moMatch) return `MO(${moMatch[1]})`;
    
    const toMatch = code.match(/&to (\d+)/);
    if (toMatch) return `TO(${toMatch[1]})`;
    
    if (code === '&trans') return 'TRANS';
    if (code === '&none') return 'NONE';
    
    return code.replace('&', '').substring(0, 8);
}
