# Add custom behaviors
zmk_library(
  behaviors/dynamic_keymap.c
)

# Install headers
install(
  FILES 
    behaviors/dynamic_keymap.h
    behaviors/zmk,behavior-dyn-kp.yaml
  DESTINATION include/behaviors
)
