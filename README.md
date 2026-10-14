# NATIVO — REDISEÑO GYM / BUILT NATURALLY

Sitio web estático completo para la marca NATIVO. Incluye diseño adaptable, menú, carrusel, artículos en ventanas, animaciones, carrito demostrativo, formulario configurable y fotografías de referencia proporcionadas por la usuaria.

## Publicarlo desde GitHub web

1. Descarga y descomprime `NATIVO_Redisenio_GitHub.zip`.
2. Abre tu repositorio de GitHub y entra en la rama `main` (aunque Chrome traduzca su nombre, el valor técnico suele ser `main`).
3. Sube **index.html, styles.css, script.js, .nojekyll y la carpeta assets completa** a la raíz del repositorio usando Add file → Upload files. Si ya existen archivos con esos nombres, reemplázalos editándolos/confirmando el cambio o usa el proceso de carga del repositorio, verificando que los archivos viejos estén sustituidos.
4. En Settings → Pages selecciona `Deploy from a branch`, `main`, `/(root)`.
5. Tu enlace típico será `https://TUUSUARIO.github.io/Nativo/` (cuidado con mayúsculas).

## Configuración

En `script.js` modifica el objeto `SITE_CONFIG`: `priceMXN` de ejemplo, `salesEnabled:false` hasta que el producto esté disponible, `whatsappNumber` para pedidos y `formspreeEndpoint` para suscripciones reales. La web no procesa pagos ni guarda emails por sí sola.

## Antes del lanzamiento comercial

- Las fotos compartidas deben tener autorización de uso comercial de su autor y de la persona fotografiada. Algunas contienen ropa y nombres de otras marcas; reemplázalas por sesiones originales NATIVO con permisos antes de publicar una campaña comercial.
- El producto es un prototipo: no afirmar pureza o certificaciones sin análisis de lote. Los documentales y testimonios aún no son historias verificadas y se presentan como proyectos en preparación.
- Un sitio estático alojado en GitHub Pages debe usarse como **demo/portafolio**, no como tienda comercial; para vender usa otro alojamiento con infraestructura de comercio adecuada.

La identidad visual está codificada en `styles.css`. No hay dependencias ni frameworks; todos los archivos funcionan localmente.
