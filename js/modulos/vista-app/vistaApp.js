// vista-app/vistaApp.js — inicializa el demo: crea el contexto, conecta eventos y pinta la primera pantalla
import { crearContexto } from './vistaAppEstado.js';
import { conectarEventos } from './vistaAppEventos.js';
import { pintarPantalla } from './vistaAppAnimacion.js';

export function inicializarVistaApp() {
  var raiz = document.querySelector('[data-vista-app]');
  var escenario = document.querySelector('[data-vista-app-escenario]');

  if (!raiz || !escenario) return;

  var ctx = crearContexto(raiz, escenario);

  conectarEventos(ctx);
  pintarPantalla(ctx, null);
}
