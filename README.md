# CampusLink

Landing estática de **CampusLink** (Montimin), hecha con HTML, CSS y JavaScript, sin frameworks ni dependencias.

## Estructura del proyecto

```
index.html               Página principal
css/
  base.css               Reset y estilos globales (html, body, tipografía, enlaces, botones)
  layout.css             Contenedores, secciones y estructura general
  components.css         Navbar, botones, formularios y elementos reutilizables
  pages.css              Estilos específicos de cada sección de la landing
  responsive.css         Media queries (desktop, tablet y móvil)
js/
  index.js               Punto de entrada: importa e inicializa los módulos
  modulos/
    menu.js              Menú móvil (abrir / cerrar)
    comoFunciona.js      Rotación de la sección "Cómo funciona"
recursos/
  imagenes/              Imágenes de la landing
  logo/                  Logos y favicon
```

Los CSS se cargan en este orden: `base` → `layout` → `components` → `pages` → `responsive`.

## Cómo abrir el proyecto

El proyecto usa **ES Modules** (`<script type="module">`), por lo que debe servirse por HTTP. No lo abras con doble clic (`file://`) porque los módulos no cargarán.

1. Abre la carpeta en Visual Studio Code.
2. Instala la extensión **Live Server**.
3. Click derecho en `index.html` → **Open with Live Server**.
4. Se abrirá en `http://127.0.0.1:5500/` (o un puerto similar).
