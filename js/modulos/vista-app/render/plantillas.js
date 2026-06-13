import { icono, ICONOS } from './iconos.js';
import { t, textoSeguro, boton, fijarEstadoRender } from './helpers.js';
import { header, tabbar, botonIcono, renderBloques } from './bloques.js';
import { dataCard } from './bloquesContenido.js';
import { authFields, selectRow, options } from './bloquesFormulario.js';
import { VISTA_APP_PANTALLAS, VISTA_APP_ROLES } from '../datos/index.js';

export function renderAuth(pantalla) {
  var data = pantalla.auth;
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppAuth vistaAppAuth--login">' +
      '<div class="vistaAppAuthTop">' +
        '<div class="vistaAppLogoApp"><img src="recursos/logo/favicon.png" alt=""></div>' +
        '<div><h3 class="vistaAppMarcaTitulo">' + t(data.titulo) + '</h3><h4 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + t(data.subtitulo) + '</h4></div>' +
        '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.descripcion) + '</p>' +
      '</div>' +
      '<div class="vistaAppAuthActions">' + boton({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'vistaAppBoton--alto' }) + '<button class="vistaAppBoton vistaAppBoton--texto">' + t(data.enlace) + '</button></div>' +
    '</div>' +
  '</div>';
}

export function renderAuthForm(pantalla) {
  var data = pantalla.auth;
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppAuth vistaAppAuth--data">' +
      '<div class="vistaAppAuthContent">' +
        '<div class="vistaAppAuthTop vistaAppAuthTop--data">' +
          '<div class="vistaAppLogoApp"><img src="recursos/logo/favicon.png" alt=""></div>' +
          '<div class="vistaAppAuthBrand"><h3 class="vistaAppMarcaTitulo">' + t(data.titulo) + '</h3><h4 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + t(data.subtitulo) + '</h4></div>' +
          '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.descripcion) + '</p>' +
        '</div>' +
        authFields(data.fields) +
        (data.enlaceIntermedio ? '<button class="vistaAppBoton vistaAppBoton--texto">' + t(data.enlaceIntermedio) + '</button>' : '') +
      '</div>' +
      '<div class="vistaAppAuthActions vistaAppAuthActions--data">' +
        boton({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'vistaAppBoton--alto' }) +
        data.accionesExtra.map(function (item) {
          return boton({ texto: item.texto, destacado: item.destacado, to: item.to, variante: 'texto' });
        }).join('') +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderRegister(pantalla) {
  var formGroups = pantalla.blocks.filter(function (block) {
    return block.tipo === 'inputs' || block.tipo === 'selectRow';
  });
  var actionBlock = pantalla.blocks.find(function (block) {
    return block.tipo === 'buttonGroup';
  });

  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppRegister">' +
      '<header class="vistaAppRegisterHeader">' +
        botonIcono('chevron-left', 'login-datos', 'Volver') +
        '<h3 class="vistaAppTitulo">Crear cuenta</h3>' +
        '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>' +
      '</header>' +
      '<main class="vistaAppRegisterBody">' +
        '<section class="vistaAppRegisterIntro">' +
          '<h4 class="vistaAppTitulo vistaAppTitulo--chico">Únete a CampusLink</h4>' +
          '<p class="vistaAppTexto">Crea tu cuenta institucional para reportar incidencias y revisar su atención.</p>' +
        '</section>' +
        '<div class="vistaAppRegisterForm">' + formGroups.map(function (block) {
          if (block.tipo === 'inputs') return authFields(block.fields);
          return selectRow(block.items);
        }).join('') + '</div>' +
      '</main>' +
      '<div class="vistaAppRegisterActions">' +
        (actionBlock ? actionBlock.items.map(function (item, indice) {
          return boton({
            texto: item.texto,
            destacado: item.destacado,
            to: item.to,
            variante: item.variante,
            clase: indice === 0 ? 'vistaAppBoton--alto' : ''
          });
        }).join('') : '') +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderConfig(pantalla, estado) {
  var rolActivo = estado.rol || 'estudiante';
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppScroll"><div class="vistaAppInner vistaAppInner--top">' +
      '<h3 class="vistaAppTitulo">Configura tu experiencia</h3>' +
      '<p class="vistaAppTexto">Usaremos esta información para mostrarte funciones relevantes.</p>' +
      '<div class="vistaAppSpacer8"></div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">Sede principal</h4>' +
      options({ campo: 'sede', items: [{ texto: 'Monterrico' }, { texto: 'San Isidro' }, { texto: 'Villa' }, { texto: 'San Miguel' }] }) +
      '<div class="vistaAppSpacer8"></div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">Tu rol</h4>' +
      '<div class="vistaAppBotonera">' + VISTA_APP_ROLES.map(function (rol) {
        return '<button class="vistaAppOption ' + (rol.id === rolActivo ? 'vistaAppOption--active' : '') + '" data-vista-accion="rol" data-vista-destino="' + textoSeguro(rol.id) + '"><span>' + textoSeguro(rol.etiqueta) + '</span><span class="vistaAppOptionIcon">' + (rol.id === rolActivo ? icono('check') : '') + '</span></button>';
      }).join('') + '</div>' +
      '<div class="vistaAppSpacer8"></div>' +
      boton({ texto: 'Continuar', continuarRol: true, variante: 'primario', clase: 'vistaAppBoton--alto' }) +
    '</div></div>' +
  '</div>';
}

export function renderStandard(pantalla, estado) {
  var style = ' style="background:' + textoSeguro(pantalla.fondo) + ';"';
  var hasHeader = !!pantalla.header;
  var claseInner = 'vistaAppInner' + (!hasHeader ? ' vistaAppInner--top' : '') +
    (pantalla.cta ? (pantalla.tabbar ? ' vistaAppInner--conCtaTabbar' : ' vistaAppInner--conCta') : '');
  var cta = pantalla.cta
    ? '<div class="vistaAppCtaBar' + (pantalla.tabbar ? ' vistaAppCtaBar--sobreTabbar' : '') + '">' + pantalla.cta.items.map(boton).join('') + '</div>'
    : '';
  return '<div class="vistaAppScreen"' + style + ' data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppScroll">' +
      header(pantalla) +
      '<main class="' + claseInner + '">' + renderBloques(pantalla.blocks, estado) + '</main>' +
    '</div>' +
    cta +
    tabbar(pantalla.tabbar, estado) +
  '</div>';
}

export function renderSuccess(pantalla, estado) {
  var data = pantalla.success;
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppSuccess">' +
      '<div class="vistaAppSuccessCuerpo">' +
        '<span class="vistaAppSuccessIcon">' + (data.icono ? (ICONOS[data.icono] ? icono(data.icono) : '<span class="vistaAppSuccessTextoIcono">' + t(data.icono) + '</span>') : icono('check')) + '</span>' +
        '<h3 class="vistaAppTitulo">' + t(data.titulo) + '</h3>' +
        '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.texto) + '</p>' +
        (data.rows ? dataCard({ rows: data.rows }) : '') +
        (data.nota ? '<p class="vistaAppTexto vistaAppTexto--chico vistaAppTexto--centro">' + t(data.nota) + '</p>' : '') +
      '</div>' +
      '<div class="vistaAppSuccessAcciones">' + (data.botones || []).map(boton).join('') + '</div>' +
    '</div>' +
    tabbar(pantalla.tabbar, estado) +
  '</div>';
}

export function renderizarPantalla(estado) {
  fijarEstadoRender(estado);
  var pantalla = VISTA_APP_PANTALLAS[estado.pantalla] || VISTA_APP_PANTALLAS.login;

  if (pantalla.template === 'auth') return renderAuth(pantalla);
  if (pantalla.template === 'authForm') return renderAuthForm(pantalla);
  if (pantalla.template === 'register') return renderRegister(pantalla);
  if (pantalla.template === 'config') return renderConfig(pantalla, estado);
  if (pantalla.template === 'success') return renderSuccess(pantalla, estado);
  return renderStandard(pantalla, estado);
}
