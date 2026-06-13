import { asignarDato, leerDato, VISTA_APP_REGLAS } from './datos/index.js';
import { reiniciarEstado, rolValido } from './vistaAppEstado.js';
import { ajustarEscala, cancelarTemporizador, pintarPantalla, quitarOverlay } from './vistaAppAnimacion.js';
import { continuarPorRol, navegar } from './vistaAppNavegacion.js';

function cerrarSesion(ctx) {
  reiniciarEstado(ctx);
  cancelarTemporizador(ctx);
  pintarPantalla(ctx, 'fade');
}

function simularEscaneo(ctx) {
  cancelarTemporizador(ctx);
  ctx.estado.datos.qrDetectado = true;
  pintarPantalla(ctx, null);
  ctx.temporizador = setTimeout(function () {
    ctx.temporizador = null;
    ctx.estado.datos.qrDetectado = false;
    ctx.estado.datos.evidencia = true;
    navegar(ctx, 'registrar-reporte');
  }, 950);
}

function validarIr(ctx, control) {
  var campos = (control.getAttribute('data-vista-campos') || '').split(',');
  var destino = control.getAttribute('data-vista-destino');
  var faltantes = [];

  campos.forEach(function (ruta) {
    var valor = leerDato(ctx.estado.datos, ruta);
    if (valor == null || String(valor).trim() === '') faltantes.push(ruta);
  });

  if (faltantes.length) {
    faltantes.forEach(function (ruta) {
      ctx.estado.datos.requeridos[ruta] = true;
    });
    pintarPantalla(ctx, null);
    return;
  }

  campos.forEach(function (ruta) {
    delete ctx.estado.datos.requeridos[ruta];
  });
  navegar(ctx, destino);
}

function actualizarHabilitados(ctx) {
  var botones = ctx.escenario.querySelectorAll('[data-vista-habilita-con]');
  for (var i = 0; i < botones.length; i++) {
    var regla = VISTA_APP_REGLAS[botones[i].getAttribute('data-vista-habilita-con')];
    if (regla) botones[i].disabled = !regla(ctx.estado.datos);
  }
}

function filtrarListaEnVivo(ctx) {
  var lista = ctx.escenario.querySelector('.vistaAppLista[data-vista-filtrable]');
  if (!lista) return;

  var busqueda = String(leerDato(ctx.estado.datos, 'campos.buscar') || '').toLowerCase().trim();
  var items = lista.querySelectorAll('.vistaAppListaItem');
  var visibles = 0;

  for (var i = 0; i < items.length; i++) {
    var pasaFiltros = items[i].getAttribute('data-vista-filtro') === '1';
    var texto = items[i].getAttribute('data-vista-texto') || '';
    var visible = pasaFiltros && (!busqueda || texto.indexOf(busqueda) !== -1);
    items[i].classList.toggle('vistaAppOculto', !visible);
    if (visible) visibles += 1;
  }

  var vacio = lista.querySelector('.vistaAppVacio');
  if (vacio) vacio.classList.toggle('vistaAppOculto', visibles > 0);
}

function quitarErrorCampo(ctx, input, ruta) {
  if (!ctx.estado.datos.requeridos[ruta]) return;
  delete ctx.estado.datos.requeridos[ruta];
  var wrapper = input.closest('.vistaAppField');
  if (wrapper) {
    wrapper.classList.remove('vistaAppField--error');
    var error = wrapper.querySelector('.vistaAppFieldError');
    if (error) error.parentNode.removeChild(error);
  }
}

export function conectarEventos(ctx) {
  ctx.raiz.addEventListener('click', function (evento) {
    var control = evento.target.closest('[data-vista-accion]');
    if (!control || !ctx.raiz.contains(control)) return;

    var accion = control.getAttribute('data-vista-accion');
    var destino = control.getAttribute('data-vista-destino');

    if (accion === 'cerrar-modal') {
      if (control.classList.contains('vistaAppOverlay') && evento.target !== control) return;
      ctx.estado.modal = null;
      quitarOverlay(ctx);
      return;
    }

    if (accion === 'pantalla' || accion === 'modal') {
      if (accion === 'modal' && destino === 'modal-qr-no-reconocido' && ctx.estado.datos.qrDetectado) return;
      var transicion = control.getAttribute('data-vista-transicion') ||
        (control.getAttribute('data-vista-direccion') === 'atras' ? 'atras' : undefined);
      navegar(ctx, destino, { transicion: transicion });
      return;
    }

    if (accion === 'rol') {
      ctx.estado.rol = rolValido(destino) ? destino : 'estudiante';
      pintarPantalla(ctx, null);
      return;
    }

    if (accion === 'continuar-rol') {
      continuarPorRol(ctx);
      return;
    }

    if (accion === 'logout') {
      cerrarSesion(ctx);
      return;
    }

    if (accion === 'toggle') {
      var campoToggle = control.getAttribute('data-vista-campo');
      asignarDato(ctx.estado.datos, campoToggle, !leerDato(ctx.estado.datos, campoToggle));
      pintarPantalla(ctx, null);
      return;
    }

    if (accion === 'toggle-clave') {
      var rutaClave = control.getAttribute('data-vista-campo');
      ctx.estado.datos.clavesVisibles[rutaClave] = !ctx.estado.datos.clavesVisibles[rutaClave];
      pintarPantalla(ctx, null);
      return;
    }

    if (accion === 'seleccion') {
      var campoSeleccion = control.getAttribute('data-vista-campo');
      var valorSeleccion = control.getAttribute('data-vista-valor');
      var valorNumero = Number(valorSeleccion);
      asignarDato(ctx.estado.datos, campoSeleccion, isNaN(valorNumero) || String(valorNumero) !== valorSeleccion ? valorSeleccion : valorNumero);

      var destinoSeleccion = control.getAttribute('data-vista-destino');
      var modalSeleccion = control.getAttribute('data-vista-modal');

      if (destinoSeleccion) {
        navegar(ctx, destinoSeleccion, {
          transicion: control.getAttribute('data-vista-direccion') === 'atras' ? 'atras' : undefined
        });
        return;
      }

      pintarPantalla(ctx, null);
      if (modalSeleccion) navegar(ctx, modalSeleccion);
      return;
    }

    if (accion === 'escanear') {
      simularEscaneo(ctx);
      return;
    }

    if (accion === 'validar-ir') {
      validarIr(ctx, control);
    }
  });

  ctx.raiz.addEventListener('input', function (evento) {
    var input = evento.target;
    var ruta = input.getAttribute ? input.getAttribute('data-vista-campo') : null;
    if (!ruta) return;

    asignarDato(ctx.estado.datos, ruta, input.value);
    quitarErrorCampo(ctx, input, ruta);
    actualizarHabilitados(ctx);
    filtrarListaEnVivo(ctx);
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && ctx.estado.modal) {
      ctx.estado.modal = null;
      quitarOverlay(ctx);
    }
  });

  window.addEventListener('resize', function () {
    ajustarEscala(ctx);
  });

  if (typeof ResizeObserver !== 'undefined') {
    var observador = new ResizeObserver(function () {
      ajustarEscala(ctx);
    });
    observador.observe(ctx.escenario.parentElement);
  }
}
