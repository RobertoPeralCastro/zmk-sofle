#!/usr/bin/env python3
"""
Script para generar firmware base universal Sofle Dynamic
Genera archivos .uf2 para todas las variantes compatibles
"""

import os
import subprocess
import json
from pathlib import Path

class FirmwareBuilder:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.build_dir = self.base_dir / "build"
        self.output_dir = self.base_dir / "releases" / "firmware"
        
        # Variantes soportadas
        self.variants = {
            "eyelash_sofle_left": {
                "board": "nice_nano_v2",
                "shield": "eyelash_sofle_left",
                "cmake_args": [
                    "-DSHIELD=nice_view",
                    "-DZMK_EXTRA_MODULES={}".format(str(self.base_dir))
                ]
            },
            "eyelash_sofle_right": {
                "board": "nice_nano_v2", 
                "shield": "eyelash_sofle_right",
                "cmake_args": [
                    "-DSHIELD=nice_view",
                    "-DZMK_EXTRA_MODULES={}".format(str(self.base_dir))
                ]
            },
            "eyelash_sofle_left_studio": {
                "board": "nice_nano_v2",
                "shield": "eyelash_sofle_left", 
                "cmake_args": [
                    "-DSHIELD=nice_view",
                    "-DSNIPPET=studio-rpc-usb-uart",
                    "-DCONFIG_ZMK_STUDIO=y",
                    "-DCONFIG_ZMK_STUDIO_LOCKING=n",
                    "-DZMK_EXTRA_MODULES={}".format(str(self.base_dir))
                ]
            },
            "eyelash_sofle_right_studio": {
                "board": "nice_nano_v2",
                "shield": "eyelash_sofle_right",
                "cmake_args": [
                    "-DSHIELD=nice_view", 
                    "-DSNIPPET=studio-rpc-usb-uart",
                    "-DCONFIG_ZMK_STUDIO=y",
                    "-DCONFIG_ZMK_STUDIO_LOCKING=n",
                    "-DZMK_EXTRA_MODULES={}".format(str(self.base_dir))
                ]
            }
        }
        
        # Crear directorios
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.build_dir.mkdir(exist_ok=True)
    
    def run_command(self, cmd, cwd=None):
        """Ejecuta un comando y retorna el resultado"""
        print(f"🔨 Ejecutando: {' '.join(cmd)}")
        try:
            result = subprocess.run(
                cmd, 
                cwd=cwd or self.base_dir,
                capture_output=True, 
                text=True, 
                check=True
            )
            return result.stdout
        except subprocess.CalledProcessError as e:
            print(f"❌ Error: {e}")
            print(f"Stdout: {e.stdout}")
            print(f"Stderr: {e.stderr}")
            return None
    
    def clean_build(self, variant_name):
        """Limpia el directorio de build"""
        variant_build_dir = self.build_dir / variant_name
        if variant_build_dir.exists():
            import shutil
            shutil.rmtree(variant_build_dir)
            print(f"🧹 Limpiado: {variant_build_dir}")
    
    def build_variant(self, variant_name, config):
        """Construye una variante específica"""
        print(f"\n🚀 Construyendo variante: {variant_name}")
        
        # Limpiar build anterior
        self.clean_build(variant_name)
        
        # Preparar comandos cmake
        cmake_args = [
            "-G", "Ninja",
            "-DBOARD={}".format(config["board"]),
            "-DSHIELD={}".format(config["shield"]),
            "-DZMK_CONFIG={}".format(str(self.base_dir / "config")),
            "-B", str(self.build_dir / variant_name),
            "-S", "zmk/app"
        ]
        
        # Añadir argumentos adicionales
        cmake_args.extend(config["cmake_args"])
        
        # Ejecutar cmake configure
        if not self.run_command(["west", "build", "cmake"] + cmake_args):
            return False
        
        # Ejecutar cmake build
        if not self.run_command(["west", "build"], cwd=str(self.build_dir / variant_name)):
            return False
        
        # Buscar archivo .uf2 generado
        variant_build_dir = self.build_dir / variant_name
        uf2_files = list(variant_build_dir.rglob("*.uf2"))
        
        if not uf2_files:
            print(f"❌ No se encontró archivo .uf2 para {variant_name}")
            return False
        
        # Copiar archivo .uf2 al directorio de salida
        uf2_source = uf2_files[0]
        uf2_dest = self.output_dir / f"{variant_name}.uf2"
        
        import shutil
        shutil.copy2(uf2_source, uf2_dest)
        print(f"✅ Firmware generado: {uf2_dest}")
        
        return True
    
    def generate_manifest(self):
        """Genera un manifest con información de las variantes"""
        manifest = {
            "version": "1.0.0",
            "name": "Sofle Dynamic Firmware",
            "description": "Firmware base universal con teclas totalmente configurables",
            "variants": {},
            "compatibility": {
                "mcu": ["nice_nano_v2"],
                "shield": ["nice_view"],
                "keyboard": ["sofle", "sofle_choc", "sofle矮轴"]
            },
            "features": [
                "dynamic_keymap",
                "zmk_studio", 
                "settings_runtime",
                "rgb_underglow",
                "encoder_support",
                "split_keyboard"
            ]
        }
        
        for variant_name, config in self.variants.items():
            manifest["variants"][variant_name] = {
                "board": config["board"],
                "shield": config["shield"],
                "file": f"{variant_name}.uf2",
                "studio": "studio" in variant_name,
                "description": self._get_variant_description(variant_name)
            }
        
        manifest_file = self.output_dir / "manifest.json"
        with open(manifest_file, 'w') as f:
            json.dump(manifest, f, indent=2)
        
        print(f"📋 Manifest generado: {manifest_file}")
    
    def _get_variant_description(self, variant_name):
        """Obtiene descripción de la variante"""
        descriptions = {
            "eyelash_sofle_left": "Lado izquierdo - Firmware base dinámico",
            "eyelash_sofle_right": "Lado derecho - Firmware base dinámico", 
            "eyelash_sofle_left_studio": "Lado izquierdo - Con soporte ZMK Studio",
            "eyelash_sofle_right_studio": "Lado derecho - Con soporte ZMK Studio"
        }
        return descriptions.get(variant_name, "Variante de firmware")
    
    def build_all(self):
        """Construye todas las variantes"""
        print("🏗️  Iniciando construcción de firmware base Sofle Dynamic")
        print("=" * 60)
        
        success_count = 0
        total_count = len(self.variants)
        
        for variant_name, config in self.variants.items():
            if self.build_variant(variant_name, config):
                success_count += 1
            else:
                print(f"❌ Falló construcción de: {variant_name}")
        
        print("\n" + "=" * 60)
        print(f"📊 Resultados: {success_count}/{total_count} variantes exitosas")
        
        if success_count == total_count:
            # Generar manifest
            self.generate_manifest()
            
            # Generar README de release
            self.generate_release_readme()
            
            print("🎉 ¡Todos los firmwares generados exitosamente!")
            print(f"📁 Directorio de salida: {self.output_dir}")
        else:
            print("⚠️  Algunas variantes fallaron. Revisa los logs.")
    
    def generate_release_readme(self):
        """Genera README para el release"""
        readme_content = f"""# Sofle Dynamic Firmware - Release {self.get_version()}

## 📦 Archivos incluidos

### Firmware Base
- `eyelash_sofle_left.uf2` - Lado izquierdo estándar
- `eyelash_sofle_right.uf2` - Lado derecho estándar

### Firmware con ZMK Studio
- `eyelash_sofle_left_studio.uf2` - Lado izquierdo con Studio
- `eyelash_sofle_right_studio.uf2` - Lado derecho con Studio

## 🚀 Instalación Rápida

1. **Descarga los archivos .uf2** de esta release
2. **Entra en modo bootloader** (botón reset + USB)
3. **Arrastra el archivo .uf2** correspondiente a cada lado
4. **¡Listo!** Configura tus teclas con ZMK Studio

## 📋 Manifest

Información detallada en `manifest.json`

## 📚 Documentación completa

Ver `DYNAMIC_FIRMWARE.md` para instrucciones detalladas.

---

**⚡ Tu Sofle ahora es completamente configurable via USB!**
"""
        
        readme_file = self.output_dir / "README.md"
        with open(readme_file, 'w') as f:
            f.write(readme_content)
        
        print(f"📖 README de release generado: {readme_file}")
    
    def get_version(self):
        """Obtiene versión del module.yaml"""
        try:
            with open(self.base_dir / "module.yaml") as f:
                content = f.read()
                for line in content.split('\n'):
                    if 'version:' in line:
                        return line.split(':')[1].strip()
        except:
            pass
        return "1.0.0"

def main():
    """Función principal"""
    builder = FirmwareBuilder()
    builder.build_all()

if __name__ == "__main__":
    main()
