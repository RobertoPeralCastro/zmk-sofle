#include <zmk/behavior.h>
#include <zmk/keymap.h>
#include <zmk/settings.h>
#include <zmk/hid.h>

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
            // Read the keycode value
            uint32_t keycode;
            if (read_cb(cb_arg, &keycode, sizeof(keycode)) == sizeof(keycode)) {
                dynamic_keys[key_index] = keycode;
                return 0;
            }
        }
    }
    
    return -ENOENT;
}

static struct settings_handler dynamic_key_settings_handler = {
    .name = "dynamic_keymap",
    .h_set = dynamic_key_settings_set,
};

// Dynamic key behavior
static int behavior_dyn_kp_init(const struct device *dev) {
    settings_register(&dynamic_key_settings_handler);
    return 0;
}

static int behavior_dyn_kp_keymap_binding_binding_pressed(struct zmk_behavior_binding *binding,
                                                         struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    
    // Get the parameter (key index)
    uint32_t key_index = binding->param1;
    
    if (key_index >= 128) {
        return -EINVAL;
    }
    
    // Get the dynamic keycode
    uint32_t keycode = dynamic_keys[key_index];
    
    if (keycode == 0) {
        // No keycode set, do nothing
        return ZMK_BEHAVIOR_OPAQUE;
    }
    
    // Convert keycode to HID usage and press
    struct zmk_keycode_event keycode_event = {
        .key = keycode,
        .pressed = true,
        .timestamp = k_uptime_get(),
    };
    
    return zmk_keymap_send_keycode_event(&keycode_event);
}

static int behavior_dyn_kp_keymap_binding_binding_released(struct zmk_behavior_binding *binding,
                                                           struct zmk_behavior_binding_event event) {
    const struct device *dev = zmk_behavior_get_binding(binding->behavior_dev);
    
    // Get the parameter (key index)
    uint32_t key_index = binding->param1;
    
    if (key_index >= 128) {
        return -EINVAL;
    }
    
    // Get the dynamic keycode
    uint32_t keycode = dynamic_keys[key_index];
    
    if (keycode == 0) {
        // No keycode set, do nothing
        return ZMK_BEHAVIOR_OPAQUE;
    }
    
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
