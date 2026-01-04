# SPDX-License-Identifier: MIT

# Add behavior source
zephyr_library_named(dyn_kp)
zephyr_library_sources_named(dyn_kp behaviors/dynamic_keymap.c)

# Install headers for ZMK build system
zephyr_library_include_directories(dyn_kp .)
