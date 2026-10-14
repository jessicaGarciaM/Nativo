# NATIVO — BUILT NATURALLY.

Sitio web estático completo, basado en la propuesta visual aprobada: gimnasio real, atleta protagonista, creatina y manifiesto natural.

## Subir a GitHub (sin instalar nada)

1. Descarga y descomprime **NATIVO_FINAL_GITHUB.zip**.
2. Abre tu repositorio `Nativo` en GitHub.
3. Desde **Add file / Agregar archivo → Upload files / Cargar archivos** arrastra **el contenido de la carpeta**, no la carpeta exterior ni el ZIP. Mantén la subcarpeta `assets`.
4. Deben quedar `index.html`, `styles.css`, `script.js`, `README.md` y `.nojekyll` en la **raíz** y todas las imágenes dentro de **assets/**.
5. Si GitHub muestra conflictos con nombres existentes, reemplaza los archivos correspondientes. Borra archivos antiguos traducidos como `índice.html`, `estilos.css` y otros HTML alternativos si no los necesitas.
6. Haz **Commit changes / Confirmar cambios**.
7. En **Settings → Pages**, elige **Deploy from a branch**, `main` (o tu rama principal) y `/ (root)`.
8. Abre `https://TU-USUARIO.github.io/Nativo/` y fuerza recarga con Ctrl+Shift+R (en móvil, nueva pestaña privada).

## Estructura

```
index.html
styles.css
script.js
.nojekyll
README.md
assets/
  atleta-hero.webp
  atleta-fuerza.webp
  atleta-espalda.webp
  atleta-natural.webp
  atleta-polea.webp
  atleta-cable.webp
  producto-concepto.webp
  creatine-pack.webp
  creatine-scoop.webp
  discos-gym.webp
  comida-real.webp
  food.webp
  gear.webp
  workout.webp
  favicon.svg
```

## Qué funciona

- Menú móvil, búsqueda de contenidos y navegación por secciones.
- Carrusel horizontal de historias.
- Entradas educativas emergentes y manifiesto desplegable.
- Carrito de **demostración** con cantidad guardada localmente en el navegador.
- Animaciones al entrar en pantalla, efecto de ratón, barra de avance, cinta horizontal e interacciones; respeta la preferencia de movimiento reducido.
- Diseño responsive para móvil y desktop.

## Antes de lanzar una tienda real

- **No hay pagos, inventario, checkout ni almacenamiento de suscriptores.** GitHub Pages sirve aquí como vista previa del prototipo, no como alojamiento para operar una tienda comercial.
- Los envases de suplemento son **renders conceptuales**; etiqueta, especificaciones, pureza y permisos deben comprobarse antes de vender.
- No se muestran testimonios ficticios como reales. Las tarjetas de historias son editoriales.
- Solicita permiso comercial para usar las fotos del atleta y confirma la disponibilidad y registro de NATIVO como marca.
- Para vender de verdad: conectar tienda/checkout, controles de privacidad, avisos legales, políticas de envío y un hosting comercial compatible.

## Modificar textos, fotos y estilos

- Edición de textos y secciones: `index.html`.
- Colores y diseño: variables al inicio de `styles.css`.
- Interacciones: `script.js`.
- Cambia imágenes conservando nombres y rutas dentro de `assets/` o actualiza los `src` en `index.html`.

Este proyecto fue preparado para su uso como **prototipo** de NATIVO.


## Mejoras versión V4
- Portada con imagen completa (object-fit: contain) y fondo cinematográfico difuminado que cubre los márgenes.
- Composición de portada adaptada para celular: fotografía arriba, texto debajo.
- Animación de apertura, progresión por capítulos, botones con reflejo y ripple, tarjetas 3D sutiles en computadoras, entradas con desenfoque y parallax suave.
- Todas las animaciones respetan la preferencia de accesibilidad de movimiento reducido.
- Subir TODO el contenido de esta carpeta a la raíz de GitHub. Borrar versiones antiguas de los tres archivos principales para evitar mezclas.
