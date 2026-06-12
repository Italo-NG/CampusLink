import { VISTA_APP_MEDIDAS, VISTA_APP_MODALES, VISTA_APP_PANTALLA_INICIAL, VISTA_APP_PANTALLAS, VISTA_APP_ROLES } from './vistaAppDatos.js';
import { renderizarVistaApp } from './vistaAppRender.js';

export function inicializarVistaApp() {
  var raiz = document.querySelector('[data-vista-app]');
  var escenario = document.querySelector('[data-vista-app-escenario]');

  if (!raiz || !escenario) return;

  var estado = {
    pantalla: VISTA_APP_PANTALLA_INICIAL,
    modal: null,
    rol: 'estudiante'
  };

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
      viewport.clientWidth / VISTA_APP_MEDIDAS.ancho,
      viewport.clientHeight / VISTA_APP_MEDIDAS.alto
    );

    var anchoEscalado = VISTA_APP_MEDIDAS.ancho * escala;
    var altoEscalado = VISTA_APP_MEDIDAS.alto * escala;

    escenario.style.transform = 'scale(' + escala + ')';
    escenario.style.left = ((viewport.clientWidth - anchoEscalado) / 2) + 'px';
    escenario.style.top = ((viewport.clientHeight - altoEscalado) / 2) + 'px';
  }

  function pintar() {
    escenario.innerHTML = renderizarVistaApp(estado);
    ajustarEscala();
  }

  function navegar(destino) {
    var objetivo = destinoSeguro(destino);
    if (!objetivo) return;

    if (VISTA_APP_PANTALLAS[objetivo]) {
      estado.pantalla = objetivo;
      estado.modal = null;
      pintar();
      return;
    }

    if (VISTA_APP_MODALES[objetivo]) {
      estado.modal = objetivo;
      pintar();
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
    pintar();
  }

  raiz.addEventListener('click', function (evento) {
    var control = evento.target.closest('[data-vista-accion]');
    if (!control || !raiz.contains(control)) return;

    var accion = control.getAttribute('data-vista-accion');
    var destino = control.getAttribute('data-vista-destino');

    if (accion === 'pantalla') {
      navegar(destino);
    }

    if (accion === 'modal') {
      navegar(destino);
    }

    if (accion === 'cerrar-modal') {
      estado.modal = null;
      pintar();
    }

    if (accion === 'rol') {
      estado.rol = rolValido(destino) ? destino : 'estudiante';
      pintar();
    }

    if (accion === 'continuar-rol') {
      continuarPorRol();
    }

    if (accion === 'logout') {
      cerrarSesion();
    }
  });

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape' && estado.modal) {
      estado.modal = null;
      pintar();
    }
  });

  window.addEventListener('resize', ajustarEscala);

  if (typeof ResizeObserver !== 'undefined') {
    var observador = new ResizeObserver(ajustarEscala);
    observador.observe(escenario.parentElement);
  }

  pintar();
}
