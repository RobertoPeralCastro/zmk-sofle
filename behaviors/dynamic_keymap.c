#include <zmk/behavior.h>
#include <zmk/keymap.h>
#include <zmk/settings.h>
#include <zmk/hid.h>

// Dynamic keymap behavior
static uint32_t dynamic_keys[128] = {0}; // Support up to 128 keys

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
