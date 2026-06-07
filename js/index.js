// Punto de entrada: importa los modulos y ejecuta sus funciones de inicializacion.
// Al cargarse con <script type="module">, el DOM ya esta listo cuando esto corre.
import { inicializarMenu } from './modulos/menu.js';
import { inicializarComoFunciona } from './modulos/comoFunciona.js';

inicializarMenu();
inicializarComoFunciona();
