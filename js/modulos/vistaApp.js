import { VISTA_APP_MODALES, VISTA_APP_PANTALLA_INICIAL, VISTA_APP_PANTALLAS, VISTA_APP_REGLAS, VISTA_APP_ROLES, crearDatosIniciales, leerDato, asignarDato } from './vistaAppDatos.js';
import { renderizarPantalla, renderizarModalVistaApp } from './vistaAppRender.js';

var DURACION_PANTALLA = 360;
var DURACION_MODAL = 200;

export function inicializarVistaApp() {
  var raiz = document.querySelector('[data-vista-app]');
  var escenario = document.querySelector('[data-vista-app-escenario]');

  if (!raiz || !escenario) return;

  var estado = {
    pantalla: VISTA_APP_PANTALLA_INICIAL,
    modal: null,
    rol: 'estudiante',
    datos: crearDatosIniciales()
  };

  var historial = [];
  var temporizador = null;
  var movimientoReducido = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;

  var destinosPorRol = {
    estudiante: {
      home: 'dashboard-estudiante',
      perfil: 'perfil-estudiante',
      mapa: 'ubicacion-manual',
      reportes: 'mis-reportes-activos',
      tickets: 'mis-reportes-activos',
      reportar: 'escaner-qr'
    },
    docente: {
      home: 'dashboard-docente',
      perfil: 'perfil-docente',
      mapa: 'ubicacion-manual',
      reportes: 'mis-reportes-activos',
      tickets: 'mis-reportes-activos',
      reportar: 'escaner-qr'
    },
    soporte: {
      home: 'dashboard-soporte',
      perfil: 'perfil-soporte',
      mapa: 'mapa-operativo',
      reportes: 'lista-tickets',
      tickets: 'lista-tickets',
      reportar: 'lista-tickets'
    }
  };

  var aliasDirectos = {
    home: true,
    perfil: true,
    mapa: true,
    reportes: true,
    tickets: true,
    reportar: true
  };

  function sinAnimacion() {
    return !!(movimientoReducido && movimientoReducido.matches);
  }

  function rolValido(rol) {
    return VISTA_APP_ROLES.some(function (item) {
      return item.id === rol;
    });
  }

  function destinoPorRol(alias) {
    var rol = rolValido(estado.rol) ? estado.rol : 'estudiante';
    return destinosPorRol[rol][alias] || destinosPorRol[rol].home;
  }

  function resolverDestino(destino) {
    if (!destino) return null;

    if (aliasDirectos[destino]) {
      return destinoPorRol(destino);
    }

    if (destino === 'dashboard-estudiante' && estado.rol !== 'estudiante') {
      return destinoPorRol('home');
    }

    if (destino === 'perfil-estudiante' && estado.rol !== 'estudiante') {
      return destinoPorRol('perfil');
    }

    if (destino === 'mis-reportes-activos' && estado.rol === 'soporte') {
      return destinoPorRol('tickets');
    }

    if (destino === 'ubicacion-manual' && estado.rol === 'soporte') {
      return destinoPorRol('mapa');
    }

    return destino;
  }

  function aplicarPreset(preset) {
    Object.keys(preset).forEach(function (clave) {
      var valor = preset[clave];
      estado.datos[clave] = valor && typeof valor === 'object' ? JSON.parse(JSON.stringify(valor)) : valor;
    });
  }

  function resolverAlias(id) {
    var saltos = 0;
    var pantalla = VISTA_APP_PANTALLAS[id];
    while (pantalla && pantalla.alias && saltos < 3) {
      if (pantalla.preset) aplicarPreset(pantalla.preset);
      id = pantalla.alias;
      pantalla = VISTA_APP_PANTALLAS[id];
      saltos += 1;
    }
    return id;
  }

  function usuarioPermitido(usuario) {
    return usuario === 'general' || usuario === 'shared' || usuario === estado.rol;
  }

  function puedeAbrirPantalla(destino) {
    var pantalla = VISTA_APP_PANTALLAS[destino];
    return !!pantalla && usuarioPermitido(pantalla.usuario);
  }

  function puedeAbrirModal(destino) {
    var modal = VISTA_APP_MODALES[destino];
    return !!modal && usuarioPermitido(modal.usuario);
  }

  function destinoSeguro(destino) {
    var resuelto = resolverDestino(destino);

    if (VISTA_APP_PANTALLAS[resuelto]) {
      resuelto = resolverAlias(resuelto);
    }

    if (VISTA_APP_PANTALLAS[resuelto] && puedeAbrirPantalla(resuelto)) {
      return resuelto;
    }

    if (VISTA_APP_MODALES[resuelto] && puedeAbrirModal(resuelto)) {
      return resuelto;
    }

    if (VISTA_APP_PANTALLAS[resuelto]) {
      return destinoPorRol('home');
    }

    return null;
  }

  function ajustarEscala() {
    var viewport = escenario.parentElement;
    if (!viewport) return;

    var escala = Math.min(
      viewport.clientWidth / 393,
      viewport.clientHeight / 852
    );

    var anchoEscalado = 393 * escala;
    var altoEscalado = 852 * escala;

    escenario.style.transform = 'scale(' + escala + ')';
    escenario.style.left = ((viewport.clientWidth - anchoEscalado) / 2) + 'px';
    escenario.style.top = ((viewport.clientHeight - altoEscalado) / 2) + 'px';
  }

  function nodoDesdeHtml(html) {
    var temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.firstElementChild;
  }

  function cancelarTemporizador() {
    if (temporizador) {
      clearTimeout(temporizador);
      temporizador = null;
    }
  }

  function limpiarTransicionPendiente() {
    var salientes = escenario.querySelectorAll('[data-vista-saliente]');
    for (var i = 0; i < salientes.length; i++) {
      salientes[i].parentNode.removeChild(salientes[i]);
    }
    var actual = escenario.querySelector('.vistaAppScreen');
    if (actual) {
      actual.classList.remove('vistaAppScreen--entraDer', 'vistaAppScreen--entraIzq', 'vistaAppScreen--fadeIn');
    }
  }

  function ponerOverlay() {
    var previo = escenario.querySelector('.vistaAppOverlay');
    if (previo) previo.parentNode.removeChild(previo);

    var overlay = nodoDesdeHtml(renderizarModalVistaApp(estado));
    if (overlay) escenario.appendChild(overlay);
  }

  function quitarOverlay(inmediato) {
    var overlay = escenario.querySelector('.vistaAppOverlay');
    if (!overlay) return;

    if (inmediato || sinAnimacion()) {
      overlay.parentNode.removeChild(overlay);
      return;
    }

    overlay.classList.add('vistaAppOverlay--cierra');
    setTimeout(function () {
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, DURACION_MODAL);
  }

  function pintarPantalla(transicion) {
    limpiarTransicionPendiente();
    quitarOverlay(true);

    var anterior = escenario.querySelector('.vistaAppScreen');
    var nueva = nodoDesdeHtml(renderizarPantalla(estado));

    if (!anterior || !transicion || sinAnimacion()) {
      escenario.innerHTML = '';
      escenario.appendChild(nueva);
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
      escenario.appendChild(nueva);
      setTimeout(function () {
        if (anterior.parentNode) anterior.parentNode.removeChild(anterior);
        nueva.classList.remove('vistaAppScreen--entraDer', 'vistaAppScreen--entraIzq', 'vistaAppScreen--fadeIn');
      }, DURACION_PANTALLA);
    }

    if (estado.modal) ponerOverlay();
    ajustarEscala();
  }

  function inferirTransicion(objetivo) {
    if (historial.length && historial[historial.length - 1] === objetivo) return 'atras';
    return 'adelante';
  }

  function navegar(destino, opciones) {
    opciones = opciones || {};
    cancelarTemporizador();

    var objetivo = destinoSeguro(destino);
    if (!objetivo) return;

    if (VISTA_APP_PANTALLAS[objetivo]) {
      if (estado.pantalla === 'escaner-qr' && objetivo !== 'escaner-qr') {
        estado.datos.qrDetectado = false;
      }

      if (objetivo === estado.pantalla) {
        estado.modal = null;
        pintarPantalla(null);
        return;
      }

      var transicion = opciones.transicion || inferirTransicion(objetivo);
      if (transicion === 'atras') {
        historial.pop();
      } else {
        historial.push(estado.pantalla);
        if (historial.length > 40) historial.shift();
      }

      estado.pantalla = objetivo;
      estado.modal = null;
      pintarPantalla(transicion);
      return;
    }

    if (VISTA_APP_MODALES[objetivo]) {
      estado.modal = objetivo;
      ponerOverlay();
    }
  }

  function continuarPorRol() {
    var rol = VISTA_APP_ROLES.find(function (item) {
      return item.id === estado.rol;
    });

    navegar(rol ? rol.destino : 'dashboard-estudiante');
  }

  function cerrarSesion() {
    estado.pantalla = VISTA_APP_PANTALLA_INICIAL;
    estado.modal = null;
    estado.rol = 'estudiante';
    estado.datos = crearDatosIniciales();
    historial = [];
    cancelarTemporizador();
    pintarPantalla('fade');
  }

  function simularEscaneo() {
    cancelarTemporizador();
    estado.datos.qrDetectado = true;
    pintarPantalla(null);
    temporizador = setTimeout(function () {
      temporizador = null;
      estado.datos.qrDetectado = false;
      estado.datos.evidencia = true;
      navegar('registrar-reporte');
    }, 950);
  }

  function validarIr(control) {
    var campos = (control.getAttribute('data-vista-campos') || '').split(',');
    var destino = control.getAttribute('data-vista-destino');
    var faltantes = [];

    campos.forEach(function (ruta) {
      var valor = leerDato(estado.datos, ruta);
      if (valor == null || String(valor).trim() === '') faltantes.push(ruta);
    });

    if (faltantes.length) {
      faltantes.forEach(function (ruta) {
        estado.datos.requeridos[ruta] = true;
      });
      pintarPantalla(null);
      return;
    }

    campos.forEach(function (ruta) {
      delete estado.datos.requeridos[ruta];
    });
    navegar(destino);
  }

  function actualizarHabilitados() {
    var botones = escenario.querySelectorAll('[data-vista-habilita-con]');
    for (var i = 0; i < botones.length; i++) {
      var regla = VISTA_APP_REGLAS[botones[i].getAttribute('data-vista-habilita-con')];
      if (regla) botones[i].disabled = !regla(estado.datos);
    }
  }

  function filtrarListaEnVivo() {
    var lista = escenario.querySelector('.vistaAppLista[data-vista-filtrable]');
    if (!lista) return;

    var busqueda = String(leerDato(estado.datos, 'campos.buscar') || '').toLowerCase().trim();
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

  function quitarErrorCampo(input, ruta) {
    if (!estado.datos.requeridos[ruta]) return;
    delete estado.datos.requeridos[ruta];
    var wrapper = input.closest('.vistaAppField');
    if (wrapper) {
      wrapper.classList.remove('vistaAppField--error');
      var error = wrapper.querySelector('.vistaAppFieldError');
      if (error) error.parentNode.removeChild(error);
    }
  }

  raiz.addEventListener('click', function (evento) {
    var control = evento.target.closest('[data-vista-accion]');
    if (!control || !raiz.contains(control)) return;

    var accion = control.getAttribute('data-vista-accion');
    var destino = control.getAttribute('data-vista-destino');

    if (accion === 'cerrar-modal') {
      if (control.classList.contains('vistaAppOverlay') && evento.target !== control) return;
      estado.modal = null;
      quitarOverlay();
      return;
    }

    if (accion === 'pantalla' || accion === 'modal') {
      if (accion === 'modal' && destino === 'modal-qr-no-reconocido' && estado.datos.qrDetectado) return;
      var transicion = control.getAttribute('data-vista-transicion') ||
        (control.getAttribute('data-vista-direccion') === 'atras' ? 'atras' : undefined);
      navegar(destino, { transicion: transicion });
      return;
    }

    if (accion === 'rol') {
      estado.rol = rolValido(destino) ? destino : 'estudiante';
      pintarPantalla(null);
      return;
    }

    if (accion === 'continuar-rol') {
      continuarPorRol();
      return;
    }

    if (accion === 'logout') {
      cerrarSesion();
      return;
    }

    if (accion === 'toggle') {
      var campoToggle = control.getAttribute('data-vista-campo');
      asignarDato(estado.datos, campoToggle, !leerDato(estado.datos, campoToggle));
      pintarPantalla(null);
      return;
    }

    if (accion === 'toggle-clave') {
      var rutaClave = control.getAttribute('data-vista-campo');
      estado.datos.clavesVisibles[rutaClave] = !estado.datos.clavesVisibles[rutaClave];
      pintarPantalla(null);
      return;
    }

    if (accion === 'seleccion') {
      var campoSeleccion = control.getAttribute('data-vista-campo');
      var valorSeleccion = control.getAttribute('data-vista-valor');
      var valorNumero = Number(valorSeleccion);
      asignarDato(estado.datos, campoSeleccion, isNaN(valorNumero) || String(valorNumero) !== valorSeleccion ? valorSeleccion : valorNumero);

      var destinoSeleccion = control.getAttribute('data-vista-destino');
      var modalSeleccion = control.getAttribute('data-vista-modal');

      if (destinoSeleccion) {
        navegar(destinoSeleccion, {
          transicion: control.getAttribute('data-vista-direccion') === 'atras' ? 'atras' : undefined
        });
        return;
      }

      pintarPantalla(null);
      if (modalSeleccion) navegar(modalSeleccion);
      return;
    }

    if (accion === 'escanear') {
      simularEscaneo();
      return;
    }

    if (accion === 'validar-ir') {
      validarIr(control);
    }
  });

  raiz.addEventListener('input', function (evento) {
    var input = evento.target;
    var ruta = input.getAttribute ? input.getAttribute('data-vista-campo') : null;
    if (!ruta) return;

    asignarDato(estado.datos, ruta, input.value);
    quitarErrorCampo(input, ruta);
    actualizarHabilitados();
    filtrarListaEnVivo();
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && estado.modal) {
      estado.modal = null;
      quitarOverlay();
    }
  });

  window.addEventListener('resize', ajustarEscala);

  if (typeof ResizeObserver !== 'undefined') {
    var observador = new ResizeObserver(ajustarEscala);
    observador.observe(escenario.parentElement);
  }

  pintarPantalla(null);
}
