# NATIVO — BUILT NATURALLY.

Página web original de una sola página. No requiere React, npm, Node ni contratar hosting para verla localmente. El proyecto puede alojarse en GitHub como repositorio de código, usarse en GitHub Pages **solo como prototipo informativo**, y desplegarse en un hosting comercial apropiado al iniciar ventas.

## 1. Ver la página

Abre `index.html` en Chrome, Edge o Firefox. Para probar envío de formularios o compartir una URL pública, publícala en GitHub Pages.

## 2. Publicar prototipo en GitHub Pages

1. Inicia sesión en [github.com](https://github.com/) y presiona **New repository**.
2. Escribe, por ejemplo, `nativo-web`. Selecciona **Public** y crea el repositorio.
3. Usa **Add file → Upload files** y sube los archivos de esta carpeta **sin meterlos en otra carpeta**. Deben quedar en la raíz del repositorio `index.html`, `styles.css`, `script.js`, `README.md` y el directorio `assets/`.
4. Pulsa **Commit changes**.
5. En tu repositorio entra a **Settings → Pages**.
6. En **Build and deployment**, escoge **Deploy from a branch**. Selecciona `main` y `/ (root)`, y guarda.
7. GitHub publicará el **prototipo informativo** en una dirección como `https://TU-USUARIO.github.io/nativo-web/` (suele tardar unos minutos).

Guía oficial: https://docs.github.com/es/pages/getting-started-with-github-pages/creating-a-github-pages-site

**Importante:** GitHub Pages **prohíbe alojar un negocio o sitio de comercio electrónico**. Úsalo para revisar el prototipo (ventas desactivadas); cuando quieras operar NATIVO comercialmente, conserva el código en GitHub y publícalo en un hosting apto para un negocio. Consulta la [política oficial](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits). Todos los recursos de esta web usan rutas relativas y pueden desplegarse también en otros hostings.

## 3. Usar GitHub + hosting para la web comercial

Puedes conservar este mismo repositorio GitHub como fuente y conectar un servicio que admita sitios comerciales, por ejemplo **Netlify**, **Cloudflare Pages** o un proveedor equivalente compatible con tu actividad. En un despliegue de HTML estático, define como directorio de publicación la **raíz** del proyecto y deja vacío el comando de compilación; comprueba los ajustes concretos de tu proveedor.

El checkout por WhatsApp integrado es solo coordinación manual: para cobros con tarjeta e inventario real, necesitarás una plataforma de ecommerce o un backend. Verifica términos del proveedor, aspectos legales y capacidad del sitio antes de publicar.

## 4. Cambios rápidos

- **Textos y secciones:** edita `index.html`.
- **Colores, espacios y diseño:** edita `styles.css`; los colores principales están al principio (`:root`).
- **Precio, carrito, WhatsApp y newsletter:** edita el bloque `SITE_CONFIG` al principio de `script.js`.
- **Fotografías:** reemplaza las imágenes de `assets/` conservando sus nombres, o cambia los `src` del HTML.

### Activar pedidos por WhatsApp

En `script.js`:

```js
const SITE_CONFIG = {
  brand: "NATIVO",
  productName: "Creatina monohidratada 300 g",
  priceMXN: 399,            // Actualiza con tu PRECIO REAL
  salesEnabled: true,      // Primero verifica inventario y condiciones
  whatsappNumber: "523312345678", // REEMPLAZA por tu número real
  formspreeEndpoint: "",   // Si quieres captar correos
  contactEmail: ""
};
```

Con esto, el botón de producto añade unidades al carrito; se calculan cantidades y subtotal, se conserva el carrito al recargar y el botón **Pedir por WhatsApp** abre un mensaje con el pedido. **No cobra**, no confirma existencias ni genera una orden de pago. Si necesitas checkout con tarjeta, necesitas conectar una plataforma de comercio electrónico y cumplir sus requisitos.

### Activar el formulario para recibir correos

1. Crea una cuenta en [formspree.io](https://formspree.io/) o un servicio de formularios compatible.
2. Crea un formulario y copia su endpoint (ej. `https://formspree.io/f/xxxxxxxx`).
3. Pégalo en `formspreeEndpoint` de `script.js`.
4. **Antes de activarlo, publica tu aviso de privacidad real** y deja claro para qué usarás los correos. Configura el consentimiento que corresponda.

Si `formspreeEndpoint` está vacío, la web **no envía ni almacena correos**: avisa claramente que el formulario es una demostración.

## 5. Elementos ya incluidos

- Diseño responsive (celular, tablet y escritorio)
- Identidad NATIVO: verde oliva, hueso, carbón y tipografía editorial
- Hero y manifiesto "BUILT NATURALLY / SIN ATAJOS"
- Presentación de la creatina 300 g y 60 porciones
- Movimiento sutil, animaciones al hacer scroll y compatibilidad con `prefers-reduced-motion`
- Navegación móvil desplegable y enlaces a secciones
- Carrusel de comunidad, con historias **todavía por documentar**
- 4 artículos que se abren en ventana emergente
- Carrito funcional una vez habilitadas las ventas; pedido por WhatsApp configurable
- Formulario de novedades conectable a Formspree
- SEO básico, favicon, accesibilidad y sin dependencias externas

## 6. Pendientes esenciales antes de abrir el negocio

1. **Fotografías:** las imágenes en `assets/` son *recortes de las ilustraciones conceptuales compartidas durante el diseño*. Son maquetas, no fotos de producto ni testimonios auténticos. Cámbialas por fotografía original del producto, de la comunidad y de personas con autorización de uso.
2. **Marca:** verifica disponibilidad de NATIVO y elementos de identidad ante el IMPI. Evita poner ® en materiales definitivos sin registro correspondiente.
3. **Producto:** confirma laboratorio, certificado de análisis por lote, pureza, cantidad, ingredientes, rotulado, advertencias y documentación regulatoria aplicable en México. Los textos del prototipo son aspiracionales y no certificaciones.
4. **Catálogo y precio:** actualmente solo se presenta la creatina; otras líneas no se ofrecen a la venta. El precio de `399` en código es **solo un ejemplo**, oculto mientras `salesEnabled` sea `false`.
5. **Legales:** prepara aviso de privacidad, términos, políticas de envío/devolución e información del proveedor antes de aceptar datos o pagos.
6. **Compra real:** si luego quieres pagos en línea, utiliza Shopify, WooCommerce u otra integración de comercio adecuada. GitHub Pages no tiene backend.
7. **Dominio:** opcionalmente configura un dominio propio desde **Settings → Pages → Custom domain** en GitHub.

## 7. Estructura del proyecto

```
NATIVO_GitHub/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── hero-woman.webp
    ├── creatine-pack.webp
    └── ...otras imágenes de concepto
```

## 8. Seguridad y privacidad

Esta demo no contiene contraseñas, no acepta tarjetas y no transmite correos sin configurar un servicio de formularios. Recuerda que cualquier ajuste colocado en `script.js` será público porque el navegador descarga ese archivo; **nunca escribas claves privadas o tokens secretos ahí**.

© NATIVO — propuesta digital de marca en desarrollo.
