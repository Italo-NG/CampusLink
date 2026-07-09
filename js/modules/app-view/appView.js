import { createContext } from './appViewState.js';
import { wireEvents } from './appViewEvents.js';
import { paintScreen } from './appViewAnimation.js';

export function initAppView() {
  var raiz = document.querySelector('[data-app-view]');
  var escenario = document.querySelector('[data-app-view-stage]');

  if (!raiz || !escenario) return;

  var ctx = createContext(raiz, escenario);

  wireEvents(ctx);
  paintScreen(ctx, null);

  window.addEventListener('campuslink:lang', function () {
    paintScreen(ctx, null);
  });
}
