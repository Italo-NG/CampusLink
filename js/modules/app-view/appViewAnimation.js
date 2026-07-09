import { renderScreen, renderAppViewModal } from './render/index.js';

var SCREEN_DURATION = 360;
var MODAL_DURATION = 200;

export function noAnimation(ctx) {
  return !!(ctx.movimientoReducido && ctx.movimientoReducido.matches);
}

export function adjustScale(ctx) {
  var viewport = ctx.escenario.parentElement;
  if (!viewport) return;

  var scale = Math.min(
    viewport.clientWidth / 393,
    viewport.clientHeight / 852
  );

  var scaledWidth = 393 * scale;
  var scaledHeight = 852 * scale;

  ctx.escenario.style.transform = 'scale(' + scale + ')';
  ctx.escenario.style.left = ((viewport.clientWidth - scaledWidth) / 2) + 'px';
  ctx.escenario.style.top = ((viewport.clientHeight - scaledHeight) / 2) + 'px';
}

export function nodeFromHtml(html) {
  var temp = document.createElement('div');
  temp.innerHTML = html;
  return temp.firstElementChild;
}

export function cancelTimer(ctx) {
  if (ctx.temporizador) {
    clearTimeout(ctx.temporizador);
    ctx.temporizador = null;
  }
}

export function clearPendingTransition(ctx) {
  var exiting = ctx.escenario.querySelectorAll('[data-view-exiting]');
  for (var i = 0; i < exiting.length; i++) {
    exiting[i].parentNode.removeChild(exiting[i]);
  }
  var current = ctx.escenario.querySelector('.appViewScreen');
  if (current) {
    current.classList.remove('appViewScreen--enterRight', 'appViewScreen--enterLeft', 'appViewScreen--fadeIn');
  }
}

export function showOverlay(ctx) {
  var previous = ctx.escenario.querySelector('.appViewOverlay');
  if (previous) previous.parentNode.removeChild(previous);

  var overlay = nodeFromHtml(renderAppViewModal(ctx.estado));
  if (overlay) ctx.escenario.appendChild(overlay);
}

export function hideOverlay(ctx, immediate) {
  var overlay = ctx.escenario.querySelector('.appViewOverlay');
  if (!overlay) return;

  if (immediate || noAnimation(ctx)) {
    overlay.parentNode.removeChild(overlay);
    return;
  }

  overlay.classList.add('appViewOverlay--closing');
  setTimeout(function () {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, MODAL_DURATION);
}

export function paintScreen(ctx, transition) {
  clearPendingTransition(ctx);
  hideOverlay(ctx, true);

  var previousScreen = ctx.escenario.querySelector('.appViewScreen');
  var nextScreen = nodeFromHtml(renderScreen(ctx.estado));

  if (!previousScreen || !transition || noAnimation(ctx)) {
    ctx.escenario.innerHTML = '';
    ctx.escenario.appendChild(nextScreen);
  } else {
    previousScreen.setAttribute('data-view-exiting', '1');
    if (transition === 'atras') {
      previousScreen.classList.add('appViewScreen--exitRight');
      nextScreen.classList.add('appViewScreen--enterLeft');
    } else if (transition === 'fade') {
      previousScreen.classList.add('appViewScreen--fadeOut');
      nextScreen.classList.add('appViewScreen--fadeIn');
    } else {
      previousScreen.classList.add('appViewScreen--exitLeft');
      nextScreen.classList.add('appViewScreen--enterRight');
    }
    ctx.escenario.appendChild(nextScreen);
    setTimeout(function () {
      if (previousScreen.parentNode) previousScreen.parentNode.removeChild(previousScreen);
      nextScreen.classList.remove('appViewScreen--enterRight', 'appViewScreen--enterLeft', 'appViewScreen--fadeIn');
    }, SCREEN_DURATION);
  }

  if (ctx.estado.modal) showOverlay(ctx);
  adjustScale(ctx);
}
