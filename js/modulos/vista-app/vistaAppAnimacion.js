// vista-app/vistaAppAnimacion.js — pintar pantallas, overlays, escala y respeto a prefers-reduced-motion
import { renderizarPantalla, renderizarModalVistaApp } from './render/index.js';

var DURACION_PANTALLA = 360;
var DURACION_MODAL = 200;

export function sinAnimacion(ctx) {
  return !!(ctx.movimientoReducido && ctx.movimientoReducido.matches);
}

export function ajustarEscala(ctx) {
  var viewport = ctx.escenario.parentElement;
  if (!viewport) return;

  var escala = Math.min(
    viewport.clientWidth / 393,
    viewport.clientHeight / 852
  );

  var anchoEscalado = 393 * escala;
  var altoEscalado = 852 * escala;

  ctx.escenario.style.transform = 'scale(' + escala + ')';
  ctx.escenario.style.left = ((viewport.clientWidth - anchoEscalado) / 2) + 'px';
  ctx.escenario.style.top = ((viewport.clientHeight - altoEscalado) / 2) + 'px';
}

export function nodoDesdeHtml(html) {
  var temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export function cancelarTemporizador(ctx) {
  if (ctx.temporizador) {
    clearTimeout(ctx.temporizador);
    ctx.temporizador = null;
  }
}

export function limpiarTransicionPendiente(ctx) {
  var salientes = ctx.escenario.querySelectorAll('[data-vista-saliente]');
  for (var i = 0; i < salientes.length; i++) {
    salientes[i].parentNode.removeChild(salientes[i]);
  }
  var actual = ctx.escenario.querySelector('.vistaAppScreen');
  if (actual) {
    actual.classList.remove('vistaAppScreen--entraDer', 'vistaAppScreen--entraIzq', 'vistaAppScreen--fadeIn');
  }
}

export function ponerOverlay(ctx) {
  var previo = ctx.escenario.querySelector('.vistaAppOverlay');
  if (previo) previo.parentNode.removeChild(previo);

  var overlay = nodoDesdeHtml(renderizarModalVistaApp(ctx.estado));
  if (overlay) ctx.escenario.appendChild(overlay);
}

export function quitarOverlay(ctx, inmediato) {
  var overlay = ctx.escenario.querySelector('.vistaAppOverlay');
  if (!overlay) return;

  if (inmediato || sinAnimacion(ctx)) {
    overlay.parentNode.removeChild(overlay);
    return;
  }

  overlay.classList.add('vistaAppOverlay--cierra');
  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, DURACION_MODAL);
}

export function pintarPantalla(ctx, transicion) {
  limpiarTransicionPendiente(ctx);
  quitarOverlay(ctx, true);

  var anterior = ctx.escenario.querySelector('.vistaAppScreen');
  var nueva = nodoDesdeHtml(renderizarPantalla(ctx.estado));

  if (!anterior || !transicion || sinAnimacion(ctx)) {
    ctx.escenario.innerHTML = '';
    ctx.escenario.appendChild(nueva);
  } else {
    anterior.setAttribute('data-vista-saliente', '1');
    if (transicion === 'atras') {
      anterior.classList.add('vistaAppScreen--saleDer');
      nueva.classList.add('vistaAppScreen--entraIzq');
    } else if (transicion === 'fade') {
      anterior.classList.add('vistaAppScreen--fadeOut');
      nueva.classList.add('vistaAppScreen--fadeIn');
    } else {
      anterior.classList.add('vistaAppScreen--saleIzq');
      nueva.classList.add('vistaAppScreen--entraDer');
    }
    ctx.escenario.appendChild(nueva);
    setTimeout(function () {
      if (anterior.parentNode) anterior.parentNode.removeChild(anterior);
      nueva.classList.remove('vistaAppScreen--entraDer', 'vistaAppScreen--entraIzq', 'vistaAppScreen--fadeIn');
    }, DURACION_PANTALLA);
  }

  if (ctx.estado.modal) ponerOverlay(ctx);
  ajustarEscala(ctx);
}
