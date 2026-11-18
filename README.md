# Sauri para Mac

Sauri graba tus reuniones desde una pestaña de Chrome, reconoce quién habló y te deja un resumen en borrador para revisar. Todo se procesa en tu Mac.

Este repositorio solo sirve para descargar la app.

## Qué necesitas

Un Mac con chip Apple (M1 o posterior) y macOS 14 o posterior.

## Descargar

Entra a la [última versión](https://github.com/lufermalgo/sauri-app/releases/latest) y descarga el archivo `Sauri-<versión>-mac-arm64.dmg`.

Si quieres comprobar que el archivo llegó completo, abre Terminal y compara el resultado de `shasum -a 256` con el archivo `.sha256` que está junto a él.

## Cómo abrirla la primera vez

Sauri todavía no está verificado por Apple. Por eso, la primera vez macOS te pide confirmar que quieres abrirlo. Solo lo haces una vez.

1. **Arrastra Sauri a Aplicaciones.** Haz doble clic en el archivo que descargaste. En la ventana que se abre, arrastra el ícono de Sauri a la carpeta Aplicaciones.
2. **Intenta abrirla.** Abre Sauri desde la carpeta Aplicaciones. macOS te avisa que no puede comprobar la app y no la abre todavía. Cierra el aviso, sin mover Sauri a la Papelera.
3. **Ve a Privacidad y seguridad.** Abre el menú Apple (arriba a la izquierda) y elige «Configuración del Sistema». En algunos Mac se llama «Ajustes del Sistema». En la barra lateral, haz clic en «Privacidad y seguridad» y baja hasta la parte «Seguridad».
4. **Haz clic en «Abrir de todos modos».** En algunos Mac dice «Abrir igualmente». Si macOS te vuelve a preguntar, elige la misma opción. El botón aparece durante cerca de una hora después del paso 2; si ya no está, repite ese paso.
5. **Confirma con tu contraseña.** Escribe la contraseña con la que entras a tu Mac y haz clic en «OK». Desde ahora abres Sauri con doble clic como cualquier otra app.

Después, Sauri busca versiones nuevas aquí mismo y te pregunta antes de instalarlas.

## Extensión de Chrome

La extensión para grabar reuniones se publicará en Chrome Web Store. Mientras tanto puedes subir grabaciones desde la app.

## Desinstalar

Abre Sauri y, en su menú, elige «Desinstalar Sauri…». Te pregunta aparte qué hacer con tus carpetas de grabaciones; si no eliges nada, se conservan.

## Licencias

Cada versión incluye `THIRD_PARTY_NOTICES.md` con los componentes de terceros y sus licencias, y el código fuente de FFmpeg (LGPL-2.1) con el que se construyeron los programas `ffmpeg` y `ffprobe` de la app.

---

**English:** Sauri records meetings from a Chrome tab, tells who spoke and drafts a summary, all on your Mac (Apple silicon, macOS 14+). Download the `.dmg` from the [latest release](https://github.com/lufermalgo/sauri-app/releases/latest). Sauri is not notarized by Apple: on first launch, try to open it, then go to System Settings → Privacy & Security and click «Open Anyway».
