import { setData, readData, APP_VIEW_RULES } from './data/index.js';
import { resetState, isValidRole } from './appViewState.js';
import { adjustScale, cancelTimer, paintScreen, hideOverlay } from './appViewAnimation.js';
import { continueByRole, navigate } from './appViewNavigation.js';

function closeSession(ctx) {
  resetState(ctx);
  cancelTimer(ctx);
  paintScreen(ctx, 'fade');
}

function simulateScan(ctx) {
  cancelTimer(ctx);
  ctx.estado.datos.qrDetectado = true;
  paintScreen(ctx, null);
  ctx.temporizador = setTimeout(function () {
    ctx.temporizador = null;
    ctx.estado.datos.qrDetectado = false;
    ctx.estado.datos.evidencia = true;
    navigate(ctx, 'register-report');
  }, 950);
}

function validateAndGo(ctx, control) {
  var fields = (control.getAttribute('data-view-fields') || '').split(',');
  var target = control.getAttribute('data-view-target');
  var missing = [];

  fields.forEach(function (path) {
    var value = readData(ctx.estado.datos, path);
    if (value == null || String(value).trim() === '') missing.push(path);
  });

  if (missing.length) {
    missing.forEach(function (path) {
      ctx.estado.datos.requeridos[path] = true;
    });
    paintScreen(ctx, null);
    return;
  }

  fields.forEach(function (path) {
    delete ctx.estado.datos.requeridos[path];
  });
  navigate(ctx, target);
}

function updateEnabled(ctx) {
  var buttons = ctx.escenario.querySelectorAll('[data-view-enables-with]');
  for (var i = 0; i < buttons.length; i++) {
    var rule = APP_VIEW_RULES[buttons[i].getAttribute('data-view-enables-with')];
    if (rule) buttons[i].disabled = !rule(ctx.estado.datos);
  }
}

function filterListLive(ctx) {
  var list = ctx.escenario.querySelector('.appViewList[data-view-filterable]');
  if (!list) return;

  var search = String(readData(ctx.estado.datos, 'campos.buscar') || '').toLowerCase().trim();
  var items = list.querySelectorAll('.appViewListItem');
  var visibleCount = 0;

  for (var i = 0; i < items.length; i++) {
    var passesFilter = items[i].getAttribute('data-view-filter') === '1';
    var text = items[i].getAttribute('data-view-text') || '';
    var visible = passesFilter && (!search || text.indexOf(search) !== -1);
    items[i].classList.toggle('appViewHidden', !visible);
    if (visible) visibleCount += 1;
  }

  var empty = list.querySelector('.appViewEmpty');
  if (empty) empty.classList.toggle('appViewHidden', visibleCount > 0);
}

function clearFieldError(ctx, input, path) {
  if (!ctx.estado.datos.requeridos[path]) return;
  delete ctx.estado.datos.requeridos[path];
  var wrapper = input.closest('.appViewField');
  if (wrapper) {
    wrapper.classList.remove('appViewField--error');
    var error = wrapper.querySelector('.appViewFieldError');
    if (error) error.parentNode.removeChild(error);
  }
}

export function wireEvents(ctx) {
  ctx.raiz.addEventListener('click', function (event) {
    var control = event.target.closest('[data-view-action]');
    if (!control || !ctx.raiz.contains(control)) return;

    var action = control.getAttribute('data-view-action');
    var target = control.getAttribute('data-view-target');

    if (action === 'cerrar-modal') {
      if (control.classList.contains('appViewOverlay') && event.target !== control) return;
      ctx.estado.modal = null;
      hideOverlay(ctx);
      return;
    }

    if (action === 'pantalla' || action === 'modal') {
      if (action === 'modal' && target === 'modal-qr-not-recognized' && ctx.estado.datos.qrDetectado) return;
      var transition = control.getAttribute('data-view-transition') ||
        (control.getAttribute('data-view-direction') === 'atras' ? 'atras' : undefined);
      navigate(ctx, target, { transicion: transition });
      return;
    }

    if (action === 'rol') {
      ctx.estado.rol = isValidRole(target) ? target : 'estudiante';
      paintScreen(ctx, null);
      return;
    }

    if (action === 'continuar-rol') {
      continueByRole(ctx);
      return;
    }

    if (action === 'logout') {
      closeSession(ctx);
      return;
    }

    if (action === 'toggle') {
      var toggleField = control.getAttribute('data-view-field');
      setData(ctx.estado.datos, toggleField, !readData(ctx.estado.datos, toggleField));
      paintScreen(ctx, null);
      return;
    }

    if (action === 'toggle-clave') {
      var passwordPath = control.getAttribute('data-view-field');
      ctx.estado.datos.clavesVisibles[passwordPath] = !ctx.estado.datos.clavesVisibles[passwordPath];
      paintScreen(ctx, null);
      return;
    }

    if (action === 'seleccion') {
      var selectField = control.getAttribute('data-view-field');
      var selectValue = control.getAttribute('data-view-value');
      var numberValue = Number(selectValue);
      setData(ctx.estado.datos, selectField, isNaN(numberValue) || String(numberValue) !== selectValue ? selectValue : numberValue);

      var selectTarget = control.getAttribute('data-view-target');
      var selectModal = control.getAttribute('data-view-modal');

      if (selectTarget) {
        navigate(ctx, selectTarget, {
          transicion: control.getAttribute('data-view-direction') === 'atras' ? 'atras' : undefined
        });
        return;
      }

      paintScreen(ctx, null);
      if (selectModal) navigate(ctx, selectModal);
      return;
    }

    if (action === 'escanear') {
      simulateScan(ctx);
      return;
    }

    if (action === 'validar-ir') {
      validateAndGo(ctx, control);
    }
  });

  ctx.raiz.addEventListener('input', function (event) {
    var input = event.target;
    var path = input.getAttribute ? input.getAttribute('data-view-field') : null;
    if (!path) return;

    setData(ctx.estado.datos, path, input.value);
    clearFieldError(ctx, input, path);
    updateEnabled(ctx);
    filterListLive(ctx);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && ctx.estado.modal) {
      ctx.estado.modal = null;
      hideOverlay(ctx);
    }
  });

  window.addEventListener('resize', function () {
    adjustScale(ctx);
  });

  if (typeof ResizeObserver !== 'undefined') {
    var observer = new ResizeObserver(function () {
      adjustScale(ctx);
    });
    observer.observe(ctx.escenario.parentElement);
  }
}
