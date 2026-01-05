#pragma once

#define ZMK_BEHAVIOR_DYN_KP_LABEL "dyn_kp"

#define ZMK_BEHAVIOR_DYN_KP_BINDING(_index) \
    { \
        .behavior_dev = ZMK_BEHAVIOR_DYN_KP_LABEL, \
        .param1 = (_index), \
    }

// Dynamic keymap behavior definitions
// Fixed header syntax - no trailing backslash