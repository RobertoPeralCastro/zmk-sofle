#include <zmk/behavior.h>
#include <zmk/keymap.h>
#include <zmk/settings.h>
#include <zmk/hid.h>
#include <zmk/keys.h>
#include <zephyr/device.h>
#include <zephyr/kernel.h>
#include <zephyr/logging/log.h>
#include <string.h>
#include <stdlib.h>

LOG_MODULE_REGISTER(dyn_kp, 3);  // Increased from 4 to 3 for more verbose logging

// Helper function to convert key name to HID usage
static uint32_t key_name_to_hid_usage(const char *key_name) {
    // Handle KC_ format (from editor)
    if (strncmp(key_name, "KC_", 3) == 0) {
        const char *key = key_name + 3; // Skip "KC_"
        
        // Letters
        if (strcmp(key, "A") == 0) return 0x04;
        if (strcmp(key, "B") == 0) return 0x05;
        if (strcmp(key, "C") == 0) return 0x06;
        if (strcmp(key, "D") == 0) return 0x07;
        if (strcmp(key, "E") == 0) return 0x08;
        if (strcmp(key, "F") == 0) return 0x09;
        if (strcmp(key, "G") == 0) return 0x0A;
        if (strcmp(key, "H") == 0) return 0x0B;
        if (strcmp(key, "I") == 0) return 0x0C;
        if (strcmp(key, "J") == 0) return 0x0D;
        if (strcmp(key, "K") == 0) return 0x0E;
        if (strcmp(key, "L") == 0) return 0x0F;
        if (strcmp(key, "M") == 0) return 0x10;
        if (strcmp(key, "N") == 0) return 0x11;
        if (strcmp(key, "O") == 0) return 0x12;
        if (strcmp(key, "P") == 0) return 0x13;
        if (strcmp(key, "Q") == 0) return 0x14;
        if (strcmp(key, "R") == 0) return 0x15;
        if (strcmp(key, "S") == 0) return 0x16;
        if (strcmp(key, "T") == 0) return 0x17;
        if (strcmp(key, "U") == 0) return 0x18;
        if (strcmp(key, "V") == 0) return 0x19;
        if (strcmp(key, "W") == 0) return 0x1A;
        if (strcmp(key, "X") == 0) return 0x1B;
        if (strcmp(key, "Y") == 0) return 0x1C;
        if (strcmp(key, "Z") == 0) return 0x1D;
        
        // Numbers
        if (strcmp(key, "N1") == 0) return 0x1E;
        if (strcmp(key, "N2") == 0) return 0x1F;
        if (strcmp(key, "N3") == 0) return 0x20;
        if (strcmp(key, "N4") == 0) return 0x21;
        if (strcmp(key, "N5") == 0) return 0x22;
        if (strcmp(key, "N6") == 0) return 0x23;
        if (strcmp(key, "N7") == 0) return 0x24;
        if (strcmp(key, "N8") == 0) return 0x25;
        if (strcmp(key, "N9") == 0) return 0x26;
        if (strcmp(key, "N0") == 0) return 0x27;
        
        // Special keys
        if (strcmp(key, "ENTER") == 0) return 0x28;
        if (strcmp(key, "ESC") == 0) return 0x29;
        if (strcmp(key, "BSPC") == 0) return 0x2A;
        if (strcmp(key, "TAB") == 0) return 0x2B;
        if (strcmp(key, "SPACE") == 0) return 0x2C;
        if (strcmp(key, "CAPS") == 0) return 0x39;
        if (strcmp(key, "LSHFT") == 0) return 0xE1;
        if (strcmp(key, "LCTRL") == 0) return 0xE0;
        if (strcmp(key, "LALT") == 0) return 0xE2;
        if (strcmp(key, "LGUI") == 0) return 0xE3;
        if (strcmp(key, "RSHFT") == 0) return 0xE5;
        if (strcmp(key, "RCTRL") == 0) return 0xE4;
        if (strcmp(key, "RALT") == 0) return 0xE6;
        if (strcmp(key, "RGUI") == 0) return 0xE7;
    }
    
    // Handle direct key names (without KC_ prefix)
    // Map common key names to HID usage values
    if (strcmp(key_name, "A") == 0) return 0x04;
    if (strcmp(key_name, "B") == 0) return 0x05;
    if (strcmp(key_name, "C") == 0) return 0x06;
    if (strcmp(key_name, "D") == 0) return 0x07;
    if (strcmp(key_name, "E") == 0) return 0x08;
    if (strcmp(key_name, "F") == 0) return 0x09;
    if (strcmp(key_name, "G") == 0) return 0x0A;
    if (strcmp(key_name, "H") == 0) return 0x0B;
    if (strcmp(key_name, "I") == 0) return 0x0C;
    if (strcmp(key_name, "J") == 0) return 0x0D;
    if (strcmp(key_name, "K") == 0) return 0x0E;
    if (strcmp(key_name, "L") == 0) return 0x0F;
    if (strcmp(key_name, "M") == 0) return 0x10;
    if (strcmp(key_name, "N") == 0) return 0x11;
    if (strcmp(key_name, "O") == 0) return 0x12;
    if (strcmp(key_name, "P") == 0) return 0x13;
    if (strcmp(key_name, "Q") == 0) return 0x14;
    if (strcmp(key_name, "R") == 0) return 0x15;
    if (strcmp(key_name, "S") == 0) return 0x16;
    if (strcmp(key_name, "T") == 0) return 0x17;
    if (strcmp(key_name, "U") == 0) return 0x18;
    if (strcmp(key_name, "V") == 0) return 0x19;
    if (strcmp(key_name, "W") == 0) return 0x1A;
    if (strcmp(key_name, "X") == 0) return 0x1B;
    if (strcmp(key_name, "Y") == 0) return 0x1C;
    if (strcmp(key_name, "Z") == 0) return 0x1D;
    
    // Numbers
    if (strcmp(key_name, "N1") == 0) return 0x1E;
    if (strcmp(key_name, "N2") == 0) return 0x1F;
    if (strcmp(key_name, "N3") == 0) return 0x20;
    if (strcmp(key_name, "N4") == 0) return 0x21;
    if (strcmp(key_name, "N5") == 0) return 0x22;
    if (strcmp(key_name, "N6") == 0) return 0x23;
    if (strcmp(key_name, "N7") == 0) return 0x24;
    if (strcmp(key_name, "N8") == 0) return 0x25;
    if (strcmp(key_name, "N9") == 0) return 0x26;
    if (strcmp(key_name, "N0") == 0) return 0x27;
    
    // Special keys
    if (strcmp(key_name, "ENTER") == 0) return 0x28;
    if (strcmp(key_name, "ESC") == 0) return 0x29;
    if (strcmp(key_name, "BSPC") == 0) return 0x2A;
    if (strcmp(key_name, "TAB") == 0) return 0x2B;
    if (strcmp(key_name, "SPACE") == 0) return 0x2C;
    if (strcmp(key_name, "CAPS") == 0) return 0x39;
    if (strcmp(key_name, "LSHFT") == 0) return 0xE1;
    if (strcmp(key_name, "LCTRL") == 0) return 0xE0;
    if (strcmp(key_name, "LALT") == 0) return 0xE2;
    if (strcmp(key_name, "LGUI") == 0) return 0xE3;
    if (strcmp(key_name, "RSHFT") == 0) return 0xE5;
    if (strcmp(key_name, "RCTRL") == 0) return 0xE4;
    if (strcmp(key_name, "RALT") == 0) return 0xE6;
    if (strcmp(key_name, "RGUI") == 0) return 0xE7;
    
    return 0; // Unknown key
}

// Helper function to parse &kp format
static uint32_t parse_keycode_value(const char *value_str) {
    // Check if it's a hex value (direct HID usage)
    if (strncmp(value_str, "0x", 2) == 0) {
        return (uint32_t)strtol(value_str, NULL, 16);
    }
    
    // Check if it's a decimal number
    if (value_str[0] >= '0' && value_str[0] <= '9') {
        return (uint32_t)strtol(value_str, NULL, 10);
    }
    
    // Check if it's &kp format
    if (strncmp(value_str, "&kp ", 4) == 0) {
        const char *key_name = value_str + 4; // Skip "&kp "
        return key_name_to_hid_usage(key_name);
    }
    
    // Check if it's just a key name
    return key_name_to_hid_usage(value_str);
}

// Dynamic keymap behavior with default keycodes
static uint32_t dynamic_keys[128] = {
    // Row 0 - Function row
    0x29, 0x3A, 0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x2A,
    // Row 1 - QWERTY row
    0x2B, 0x04, 0x1A, 0x08, 0x15, 0x17, 0x1C, 0x18, 0x0C, 0x12, 0x13, 0x0F, 0x10, 0x32,
    // Row 2 - ASDF row
    0x39, 0x14, 0x16, 0x07, 0x09, 0x0B, 0x0D, 0x0E, 0x11, 0x34, 0x33, 0x36,
    // Row 3 - ZXCV row
    0xE1, 0x1D, 0x1B, 0x06, 0x19, 0x05, 0x11, 0x10, 0x37, 0x38, 0x35, 0x2C, 0x28,
    // Row 4 - Modifiers
    0x00, 0xF2, 0xE0, 0xE3, 0xE2, 0x01, 0x00, 0x2C, 0x28, 0x02, 0xE6, 0xE4
}; // Default keycodes (HID usage values)

// Settings handler for dynamic keys
static int dynamic_key_settings_set(const char *name, size_t len, settings_read_cb read_cb, void *cb_arg) {
    const char *next;
    
    if (settings_name_steq(name, "key_", &next) && next) {
        // Parse key index from name (e.g., "key_15" -> 15)
        char *endptr;
        long key_index = strtol(next, &endptr, 10);
        
        if (*endptr == '\0' && key_index >= 0 && key_index < 128) {
            // Read the keycode value as string
            char value_str[32];
            ssize_t value_len = read_cb(cb_arg, value_str, sizeof(value_str) - 1);
            
            if (value_len > 0) {
                value_str[value_len] = '\0'; // Null terminate
                
                // Parse the keycode value (supports &kp format, hex, decimal, and key names)
                uint32_t keycode = parse_keycode_value(value_str);
                
                dynamic_keys[key_index] = keycode;
                LOG_INF("Updated dynamic key %ld from '%s' to 0x%04X", key_index, value_str, keycode);
                return 0;
            }
        }
    }
    
    return -ENOENT;
}

static struct settings_handler dynamic_key_settings_handler = {
    .name = "dynamic_keymap",  // Changed to match the editor's path
    .h_set = dynamic_key_settings_set,
};

// Dynamic key behavior
static int behavior_dyn_kp_init(const struct device *dev) {
    settings_register(&dynamic_key_settings_handler);
    LOG_INF("Dynamic keymap behavior initialized");
    return 0;
}

static int behavior_dyn_kp_keymap_binding_binding_pressed(struct zmk_behavior_binding *binding,
                                                         struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    
    // Get the parameter (key index)
    uint32_t key_index = binding->param1;
    
    LOG_INF("dyn_kp pressed: key_index=%u", key_index);
    
    if (key_index >= 128) {
        LOG_WRN("Invalid key index: %u", key_index);
        return -EINVAL;
    }
    
    // Get the dynamic keycode
    uint32_t keycode = dynamic_keys[key_index];
    
    LOG_INF("dyn_kp key %u: keycode=0x%04X", key_index, keycode);
    
    if (keycode == 0) {
        // No keycode set, do nothing
        LOG_DBG("No keycode set for key %u", key_index);
        return ZMK_BEHAVIOR_OPAQUE;
    }
    
    LOG_DBG("Pressing key %u with keycode 0x%04X", key_index, keycode);
    
    // Convert keycode to HID usage and press
    struct zmk_keycode_event keycode_event = {
        .key = keycode,
        .pressed = true,
        .timestamp = k_uptime_get(),
    };
    
    int result = zmk_keymap_send_keycode_event(&keycode_event);
    LOG_INF("dyn_kp send result: %d", result);
    return result;
}

static int behavior_dyn_kp_keymap_binding_binding_released(struct zmk_behavior_binding *binding,
                                                           struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    
    // Get the parameter (key index)
    uint32_t key_index = binding->param1;
    
    if (key_index >= 128) {
        LOG_WRN("Invalid key index: %u", key_index);
        return -EINVAL;
    }
    
    // Get the dynamic keycode
    uint32_t keycode = dynamic_keys[key_index];
    
    if (keycode == 0) {
        // No keycode set, do nothing
        LOG_DBG("No keycode set for key %u", key_index);
        return ZMK_BEHAVIOR_OPAQUE;
    }
    
    LOG_DBG("Releasing key %u with keycode 0x%04X", key_index, keycode);
    
    // Convert keycode to HID usage and release
    struct zmk_keycode_event keycode_event = {
        .key = keycode,
        .pressed = false,
        .timestamp = k_uptime_get(),
    };
    
    return zmk_keymap_send_keycode_event(&keycode_event);
}

static const struct behavior_driver_api behavior_dyn_kp_driver_api = {
    .binding_pressed = behavior_dyn_kp_keymap_binding_binding_pressed,
    .binding_released = behavior_dyn_kp_keymap_binding_binding_released,
};

#define DT_DRV_COMPAT zmk_behavior_dyn_kp

#define ZMK_BEHAVIOR_DYN_KP_INST(n) \
    DEVICE_DT_INST_DEFINE(n, behavior_dyn_kp_init, NULL, NULL, NULL, \
                         APPLICATION, CONFIG_KERNEL_INIT_PRIORITY_DEFAULT, \
                         &behavior_dyn_kp_driver_api);

DT_INST_FOREACH_STATUS_OKAY(ZMK_BEHAVIOR_DYN_KP_INST)
