import { VISTA_APP_MODALES, VISTA_APP_PANTALLAS, VISTA_APP_REGLAS, VISTA_APP_ROLES, leerDato } from './vistaAppDatos.js';

var ICONOS = {
  home: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
  u: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-4 4.1-6 8-6s6.6 2 8 6"/></svg>',
  user: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.4-4 4.1-6 8-6s6.6 2 8 6"/></svg>',
  qr: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z"/><path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z"/></svg>',
  doc: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  map: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18 3 21V6l6-3 6 3 6-3v15l-6 3z"/><path d="M9 3v15M15 6v15"/></svg>',
  scan: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4v3M17 3h3v3M7 21H4v-3M17 21h3v-3"/><path d="M8 12h8"/></svg>',
  list: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h12M8 12h12M8 18h12"/><path d="M4 6h.01M4 12h.01M4 18h.01"/></svg>',
  bars: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
  bell: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9a6 6 0 0 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9"/><path d="M10 21h4"/></svg>',
  alert: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>',
  '!': '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/></svg>',
  check: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7"/></svg>',
  chevron: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  'chevron-left': '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
  logout: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 5H5v14h5"/><path d="M14 8l4 4-4 4M18 12H9"/></svg>',
  eye: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></svg>',
  'eye-off': '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16"/><path d="M10.6 6.3A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17.5 17.5 0 0 1-3 3.5M6.6 6.8A16.7 16.7 0 0 0 2.5 12s3.5 6 9.5 6a9.6 9.6 0 0 0 4.3-1"/></svg>',
  teclado: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01M11 10h.01M15 10h.01M7 14h10"/></svg>',
  candado: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0"/></svg>',
  imagen: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m5 18 5-5 3 3 3-3 3 3"/></svg>',
  camara: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3l2-2.5h4L16 7h3a2 2 0 0 1 2 2z"/><circle cx="12" cy="13.5" r="3.4"/></svg>',
  x: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  lupa: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></svg>',
  pausa: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14"/></svg>',
  estrella: '<svg class="vistaAppSvg vistaAppSvgEstrella" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.4l2.7 5.4 6 .9-4.3 4.2 1 6-5.4-2.9-5.4 2.9 1-6-4.3-4.2 6-.9z"/></svg>',
  pin: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  chat: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-8 8H4l2.5-3A8 8 0 1 1 21 12z"/></svg>',
  monitor: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="1.5"/><path d="M9 21h6M12 17v4"/></svg>',
  mueble: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4"/><path d="M5 12a2 2 0 0 1 2 2v2h10v-2a2 2 0 0 1 2-2"/><path d="M7 16v3M17 16v3"/></svg>',
  wifi: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
  electrico: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  limpieza: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 3.5 13.7 10.3 20.5 12 13.7 13.7 12 20.5 10.3 13.7 3.5 12 10.3 10.3"/></svg>',
  audio: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
  info: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></svg>',
  reloj: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  triangulo: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z"/><path d="M12 10v4M12 17.5h.01"/></svg>',
  proyector: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="9" rx="2"/><circle cx="15.5" cy="12.5" r="2.4"/><path d="M6.5 12.5h3M7 20l1.5-3M17 20l-1.5-3M7 8l1-2.5M12 8l1-2.5"/></svg>',
  otro: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg>'
};

var ICONO_CATEGORIA = {
  Multimedia: 'monitor',
  Mobiliario: 'mueble',
  Internet: 'wifi',
  'Eléctrico': 'electrico',
  Limpieza: 'limpieza',
  Proyector: 'monitor',
  'PC del aula': 'monitor',
  Audio: 'audio'
};

var estadoRender = null;

function textoSeguro(valor) {
  return String(valor == null ? '' : valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function plantilla(valor) {
  var texto = String(valor == null ? '' : valor);
  if (texto.indexOf('{') === -1) return texto;

  var datos = estadoRender ? estadoRender.datos : null;
  if (!datos) return texto;

  return texto
    .replace(/\{sede\}/g, datos.sede || 'Monterrico')
    .replace(/\{categoria\}/g, datos.categoria || 'Limpieza')
    .replace(/\{descripcion\}/g, datos.descripcion || 'Derramaron gaseosa en el aula')
    .replace(/\{evidencia\}/g, datos.evidencia ? 'Imagen cargada correctamente' : 'Sin evidencia adjunta')
    .replace(/\{problema\}/g, datos.problema || 'Proyector')
    .replace(/\{motivoReapertura\}/g, datos.motivoReapertura || 'El proyector volvió a fallar después de la atención.')
    .replace(/\{ubicacion\}/g, (datos.sede || 'Monterrico') + ' · Pabellón B · Aula B-301');
}

function t(valor) {
  return textoSeguro(plantilla(valor));
}

function slugCampo(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function accionAtributos(item) {
  if (!item || item.disabled) return '';

  if (item.role) {
    return ' data-vista-accion="rol" data-vista-destino="' + textoSeguro(item.role) + '"';
  }
  if (item.continuarRol) {
    return ' data-vista-accion="continuar-rol"';
  }
  if (item.accion === 'escanear') {
    return ' data-vista-accion="escanear"';
  }
  if (item.validar) {
    return ' data-vista-accion="validar-ir" data-vista-campos="' + textoSeguro(item.validar) + '" data-vista-destino="' + textoSeguro(item.to) + '"';
  }
  if (item.modal) {
    return ' data-vista-accion="modal" data-vista-destino="' + textoSeguro(item.modal) + '"';
  }
  if (item.to) {
    return ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item.to) + '"' + (item.atras ? ' data-vista-direccion="atras"' : '');
  }
  if (item.tipo === 'cerrar') {
    return ' data-vista-accion="cerrar-modal"';
  }
  if (item.tipo === 'logout') {
    return ' data-vista-accion="logout"';
  }
  if (item.tipo === 'modal') {
    return ' data-vista-accion="modal" data-vista-destino="' + textoSeguro(item.destino) + '"';
  }
  if (item.tipo === 'pantalla') {
    return ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item.destino) + '"';
  }
  return '';
}

function icono(nombre) {
  return ICONOS[nombre] || ICONOS.alert;
}

function boton(item) {
  var variante = item.variante || 'secundario';
  var clases = 'vistaAppBoton vistaAppBoton--' + variante + (item.clase ? ' ' + item.clase : '');
  var atributos = accionAtributos(item);
  var disabled = item.disabled ? ' disabled' : '';

  if (item.habilitaCon) {
    atributos += ' data-vista-habilita-con="' + textoSeguro(item.habilitaCon) + '"';
    var regla = VISTA_APP_REGLAS[item.habilitaCon];
    if (regla && !regla(estadoRender.datos)) disabled = ' disabled';
  }

  var contenido = item.icono ? '<span class="vistaAppBotonIcon">' + icono(item.icono) + '</span>' : '';
  if (item.destacado) {
    contenido += '<span class="vistaAppBotonNormal">' + t(item.texto) + '</span> <strong class="vistaAppBotonDestacado">' + t(item.destacado) + '</strong>';
  } else {
    contenido += '<span>' + t(item.texto) + '</span>';
  }
  return '<button class="' + clases + '"' + atributos + disabled + '>' + contenido + '</button>';
}

function header(pantalla) {
  var data = pantalla.header;
  if (!data) return '';

  if (data.tipo === 'rojo') {
    var clase = 'vistaAppHeaderRojo' + (data.compacto ? ' vistaAppHeaderRojo--docente' : '');
    var prompt = data.prompt ? '<div class="vistaAppSpacer16"></div><h3 class="vistaAppTitulo">' + t(data.prompt) + '</h3>' : '';
    var notificacion = data.notificaciones
      ? '<button class="vistaAppIconBtn vistaAppNotificacion" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(data.notificaciones) + '" aria-label="Ver notificaciones">' + icono('bell') + '</button>'
      : '';
    return '' +
      '<header class="' + clase + '">' +
        '<div class="vistaAppHeaderFila">' +
          '<div class="vistaAppPerfilMini">' +
            '<div class="vistaAppAvatar">' + icono(data.icono || 'u') + '</div>' +
            '<div><span class="vistaAppLabel">' + t(data.label || 'CampusLink') + '</span>' +
            '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(data.titulo) + '</h3></div>' +
          '</div>' +
          notificacion +
        '</div>' +
        prompt +
      '</header>';
  }

  if (data.tipo === 'oscuro') {
    return '' +
      '<header class="vistaAppHeaderOscuro">' +
          '<div class="vistaAppHeaderFila">' +
          botonIcono('chevron-left', data.volver, 'Volver') +
          '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(data.titulo) + '</h3>' +
          '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>' +
        '</div>' +
      '</header>';
  }

  var izquierda = data.volver ? botonIcono('chevron-left', data.volver, 'Volver') : '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>';
  var derecha = '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>';
  if (data.accionDerecha) {
    derecha = '<button class="vistaAppBoton vistaAppBoton--texto vistaAppBoton--header"' + accionAtributos(data.accionDerecha) + '>' + t(data.accionDerecha.texto) + '</button>';
  }
  return '' +
    '<header class="vistaAppHeaderClaro">' +
      '<div class="vistaAppHeaderFila">' +
        izquierda +
        '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + t(data.titulo) + '</h3>' +
        derecha +
      '</div>' +
    '</header>';
}

function botonIcono(nombreIcono, destino, label) {
  return '<button class="vistaAppIconBtn vistaAppIconBtn--claro" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(destino) + '" data-vista-direccion="atras" aria-label="' + textoSeguro(label) + '">' + icono(nombreIcono) + '</button>';
}

function tabbar(data, estado) {
  if (!data) return '';

  var rolActivo = estado.rol || 'estudiante';
  var tipo = rolActivo === 'soporte' ? 'support' : 'student';
  var items;
  if (tipo === 'support') {
    items = [
      ['inicio', 'home', 'Inicio', 'home'],
      ['mapa', 'map', 'Mapa', 'mapa'],
      ['tickets', 'list', 'Tickets', 'tickets'],
      ['perfil', 'user', 'Perfil', 'perfil']
    ];
  } else {
    items = [
      ['inicio', 'home', 'Inicio', 'home'],
      ['mapa', 'map', 'Mapa', 'mapa'],
      ['reportar', 'qr', 'Reportar', 'reportar'],
      ['reportes', 'doc', 'Reportes', 'reportes'],
      ['perfil', 'user', 'Perfil', 'perfil']
    ];
  }

  return '<nav class="vistaAppTabbar vistaAppTabbar--' + tipo + '" aria-label="Navegación del prototipo">' +
    items.map(function (item) {
      var clase = 'vistaAppTab' + (item[0] === data.activo ? ' vistaAppTab--active' : '');
      var attrs = item[3] ? ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item[3]) + '" data-vista-transicion="fade"' : ' disabled';
      return '<button class="' + clase + '"' + attrs + '><span class="vistaAppTabIcon">' + icono(item[1]) + '</span><span>' + textoSeguro(item[2]) + '</span></button>';
    }).join('') +
  '</nav>';
}

function renderBloques(blocks, estado) {
  return (blocks || []).map(function (block) {
    return renderBloque(block, estado);
  }).join('');
}

function renderBloque(block, estado) {
  if (!block) return '';

  if (block.tipo === 'spacer') {
    return '<div class="vistaAppSpacer' + textoSeguro(block.size) + '"></div>';
  }
  if (block.tipo === 'title') {
    return '<h3 class="vistaAppTitulo vistaAppTitulo--chico' + (block.centro ? ' vistaAppTitulo--centro' : '') + '">' + t(block.texto) + '</h3>';
  }
  if (block.tipo === 'text') {
    var clase = 'vistaAppTexto' + (block.chico ? ' vistaAppTexto--chico' : '') + (block.centro ? ' vistaAppTexto--centro' : '') + (block.claro ? ' vistaAppTexto--muted' : '');
    return '<p class="' + clase + '">' + t(block.texto) + '</p>';
  }
  if (block.tipo === 'pill') {
    return '<div class="vistaAppBadge vistaAppBadge--azul vistaAppBadge--centrado"><span class="vistaAppPillIcono">' + icono('info') + '</span>' + t(block.texto) + '</div>';
  }
  if (block.tipo === 'hero') {
    return '<div class="vistaAppHero">' +
      '<span class="vistaAppHeroIcono">' + icono(block.icono || 'triangulo') + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--centro">' + t(block.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--centro">' + t(block.texto) + '</p>' +
    '</div>';
  }
  if (block.tipo === 'slaCard') {
    var filasSla = (block.items || []).map(function (item) {
      return '<div class="vistaAppResumenFila">' +
        '<span class="vistaAppSlaIcono">' + icono(item.icono || 'info') + '</span>' +
        '<div class="vistaAppResumenCuerpo">' +
          '<span class="vistaAppFieldCajaLabel">' + t(item.etiqueta) + '</span>' +
          '<strong class="vistaAppResumenValor">' + t(item.valor) + '</strong>' +
        '</div>' +
      '</div>';
    }).join('');
    var estadoSla = block.estado
      ? '<div class="vistaAppSlaEstado"><span class="vistaAppSlaPunto" aria-hidden="true"></span>' + t(block.estado) + '</div>'
      : '';
    return '<div class="vistaAppCard vistaAppSla">' +
      '<div class="vistaAppSlaCabecera">' +
        '<strong class="vistaAppSlaEtiqueta">' + t(block.etiqueta) + '</strong>' +
        '<span class="vistaAppBadge"><span class="vistaAppPillIcono">' + icono('reloj') + '</span>' + t(block.badge) + '</span>' +
      '</div>' +
      '<div class="vistaAppSlaCuerpo">' + filasSla + estadoSla + '</div>' +
    '</div>';
  }
  if (block.tipo === 'problemGrid') {
    var datosProblema = estadoRender.datos;
    return '<div class="vistaAppProblemas">' + block.items.map(function (item) {
      var activa = block.campo && leerDato(datosProblema, block.campo) === item.texto;
      var attrs = block.campo
        ? ' data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(block.campo) + '" data-vista-valor="' + textoSeguro(item.texto) + '"' + (item.modal ? ' data-vista-modal="' + textoSeguro(item.modal) + '"' : '')
        : accionAtributos(item);
      return '<button class="vistaAppCard vistaAppProblema' + (activa ? ' vistaAppProblema--activa' : '') + '"' + attrs + '>' +
        '<span class="vistaAppProblemaIcono vistaAppProblemaIcono--' + textoSeguro(item.tinte || 'rojo') + '">' + icono(item.icono || 'alert') + '</span>' +
        '<span class="vistaAppProblemaTexto">' + t(item.texto) + '</span>' +
      '</button>';
    }).join('') + '</div>';
  }
  if (block.tipo === 'alertBanner') {
    return card({ titulo: block.titulo, texto: block.texto, icono: 'check', badge: 'Resuelto', to: block.to, accent: true });
  }
  if (block.tipo === 'successInline') {
    return '<div class="vistaAppCard ' + (block.danger ? 'vistaAppCard--danger' : 'vistaAppCard--accent') + '">' +
      '<span class="vistaAppBadge">' + t(block.badge || 'Prioritario') + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--chico">' + t(block.texto) + '</p>' +
    '</div>';
  }
  if (block.tipo === 'card') return card(block);
  if (block.tipo === 'gridCards') {
    return '<div class="vistaAppGrid2">' + block.items.map(function (item) {
      return card({ titulo: item.titulo, icono: item.icono, to: item.to, compacto: true });
    }).join('') + '</div>';
  }
  if (block.tipo === 'metrics') return metrics(block.items);
  if (block.tipo === 'alertaCard') return alertaCard(block);
  if (block.tipo === 'filterChips') return filterChips(block);
  if (block.tipo === 'ticketCards') return ticketCards(block);
  if (block.tipo === 'fichaCabecera') return fichaCabecera(block);
  if (block.tipo === 'fotoCard') return fotoCard(block);
  if (block.tipo === 'dataCard') return dataCard(block);
  if (block.tipo === 'banda') return banda(block);
  if (block.tipo === 'resumenCard') return resumenCard(block);
  if (block.tipo === 'locationCard') return locationCard(block);
  if (block.tipo === 'timeline') return timeline(block.items);
  if (block.tipo === 'buttonGroup') {
    return '<div class="vistaAppBotonera">' + block.items.map(boton).join('') + '</div>';
  }
  if (block.tipo === 'inputs') return inputs(block.fields);
  if (block.tipo === 'selectRow') return selectRow(block.items);
  if (block.tipo === 'options') return options(block);
  if (block.tipo === 'categoryGrid') return categoryGrid(block);
  if (block.tipo === 'upload') return upload(block);
  if (block.tipo === 'segmented') return segmented(block);
  if (block.tipo === 'reportCards') return reportCards(block);
  if (block.tipo === 'checkRow') return checkRow(block);
  if (block.tipo === 'scanner') return scanner(block);
  if (block.tipo === 'bottomPanel') return '<div class="vistaAppBottomPanel">' + renderBloques(block.blocks, estado) + '</div>';
  if (block.tipo === 'sos') return sos(block);
  if (block.tipo === 'profile') return profile(block);
  if (block.tipo === 'list') return list(block.items);
  if (block.tipo === 'rating') return rating(block);
  if (block.tipo === 'map') return map(block);
  if (block.tipo === 'legend') return legend(block.items);
  if (block.tipo === 'mapSheet') return mapSheet(block);

  return '';
}

function card(block) {
  var tag = block.to || block.modal ? 'button' : 'div';
  var clase = 'vistaAppCard' + (block.texto || block.link ? ' vistaAppCard--row' : '') + (block.accent ? ' vistaAppCard--accent' : '') + (block.danger ? ' vistaAppCard--danger' : '');
  var attrs = accionAtributos(block);
  var badge = block.badge ? '<span class="vistaAppBadge' + claseBadge(block.badge) + '">' + t(block.badge) + '</span>' : '';
  var link = block.link ? '<span class="vistaAppTexto vistaAppTexto--chico vistaAppCardLink">' + t(block.link) + '</span>' : '';
  var icon = block.icono ? '<span class="vistaAppCardIcon ' + (block.accent ? 'vistaAppCardIcon--rojo' : '') + '">' + icono(block.icono) + '</span>' : '';
  var contenido = '<div class="vistaAppCardCuerpo">' +
    badge +
    '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.titulo) + '</h3>' +
    (block.texto ? '<p class="vistaAppTexto">' + t(block.texto) + '</p>' : '') +
    link +
  '</div>';

  if (block.compacto) {
    clase = 'vistaAppCard';
    contenido = icon + '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + t(block.titulo) + '</h3>';
  } else {
    contenido = icon + contenido;
  }

  return '<' + tag + ' class="' + clase + '"' + attrs + '>' + contenido + '</' + tag + '>';
}

function claseBadge(texto) {
  if (texto === 'Recibido' || texto === 'Pendiente' || texto === 'Reabierto') return ' vistaAppBadge--azul';
  if (texto === 'En proceso' || texto === 'En atención') return ' vistaAppBadge--ambar';
  if (texto === 'Resuelto') return ' vistaAppBadge--verde';
  if (texto === 'Cancelado' || texto === 'Normal' || texto === 'Asignado' || texto === 'Pausado') return ' vistaAppBadge--gris';
  return '';
}

function metrics(items) {
  return '<div class="vistaAppGrid3">' + items.map(function (item) {
    var clase = item[2] ? ' vistaAppMetricNumero--rojo' : (item[3] === 'verde' ? ' vistaAppMetricNumero--verde' : '');
    return '<div class="vistaAppCard vistaAppMetric' + (item[2] ? ' vistaAppMetric--activa' : '') + '">' +
      '<strong class="vistaAppMetricNumero' + clase + '">' + t(item[0]) + '</strong>' +
      '<span class="vistaAppTexto vistaAppTexto--chico">' + t(item[1]) + '</span>' +
    '</div>';
  }).join('') + '</div>';
}

function alertaCard(block) {
  return '<button class="vistaAppCard vistaAppAlerta" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(block.to) + '">' +
    '<div class="vistaAppAlertaCabecera">' +
      '<span class="vistaAppAlertaIcono">' + icono('alert') + '</span>' +
      '<h3 class="vistaAppAlertaTitulo">' + t(block.titulo) + '</h3>' +
    '</div>' +
    '<p class="vistaAppTexto">' + t(block.texto) + '</p>' +
    '<div class="vistaAppAlertaPie">' +
      '<span class="vistaAppBadge">' + t(block.badge) + '</span>' +
      '<span class="vistaAppCardLink vistaAppTexto--chico">' + t(block.link) + '</span>' +
    '</div>' +
  '</button>';
}

function filterChips(block) {
  var datos = estadoRender.datos;
  return '<div class="vistaAppFiltros">' + block.items.map(function (texto) {
    var activa = leerDato(datos, block.campo) === texto;
    return '<button class="vistaAppChip vistaAppChip--filtro' + (activa ? ' vistaAppChip--activa' : '') + '" data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(block.campo) + '" data-vista-valor="' + textoSeguro(texto) + '">' + t(texto) + '</button>';
  }).join('') + '</div>';
}

function ticketCards(block) {
  var datos = estadoRender.datos;
  var filtro = datos.filtroTickets || 'Todas';
  var busqueda = String(leerDato(datos, 'campos.buscar') || '').toLowerCase().trim();
  var visibles = 0;

  var html = block.items.map(function (item) {
    var contenido = (item.id + ' ' + item.titulo + ' ' + item.lugar + ' ' + item.estadoTexto).toLowerCase();
    var pasaFiltros = filtro === 'Todas' || (item.etiquetas || []).indexOf(filtro) !== -1;
    var visible = pasaFiltros && (!busqueda || contenido.indexOf(busqueda) !== -1);
    if (visible) visibles += 1;

    var tarjeta = '<button class="vistaAppCard vistaAppTicketSoporte' + (item.prioridad ? ' vistaAppCard--danger' : '') + '" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item.to) + '">' +
      '<div class="vistaAppTicketSoporteFila">' +
        '<span class="vistaAppTicketId">' + t(item.id) + '</span>' +
        '<span class="vistaAppBadge' + claseBadge(item.badge) + '">' + t(item.badge) + '</span>' +
      '</div>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(item.titulo) + '</h3>' +
      '<p class="vistaAppTicketLugar"><span class="vistaAppTicketPin">' + icono('pin') + '</span>' + t(item.lugar) + '</p>' +
      '<div class="vistaAppTicketSoportePie">' +
        '<span class="vistaAppTexto vistaAppTexto--chico">Estado: ' + t(item.estadoTexto) + '</span>' +
        '<span class="vistaAppCardLink vistaAppTexto--chico">Ver ficha →</span>' +
      '</div>' +
    '</button>';

    return '<div class="vistaAppListaItem' + (visible ? '' : ' vistaAppOculto') + '" data-vista-filtro="' + (pasaFiltros ? '1' : '0') + '" data-vista-texto="' + textoSeguro(contenido) + '">' + tarjeta + '</div>';
  }).join('');

  html += '<div class="vistaAppVacio' + (visibles > 0 ? ' vistaAppOculto' : '') + '">' +
    '<span class="vistaAppVacioIcono">' + icono('lupa') + '</span>' +
    '<p class="vistaAppTexto vistaAppTexto--centro">No hay tickets que coincidan con tu búsqueda.</p>' +
  '</div>';

  return '<div class="vistaAppLista" data-vista-filtrable="1">' + html + '</div>';
}

function fichaCabecera(block) {
  return '<div class="vistaAppFichaCabecera">' +
    '<span class="vistaAppFichaChip">' + t(block.id) + '</span>' +
    '<span class="vistaAppBadge vistaAppBadge--suaveRojo">' + t(block.badge) + '</span>' +
  '</div>';
}

function fotoCard(block) {
  return '<div class="vistaAppCard">' +
    '<h3 class="vistaAppCardTituloCaps">' + t(block.titulo) + '</h3>' +
    '<div class="vistaAppFotoFila">' +
      '<span class="vistaAppFotoCuadro" aria-hidden="true"></span>' +
      '<span class="vistaAppTexto">' + t(block.texto) + '</span>' +
    '</div>' +
  '</div>';
}

function dataCard(block) {
  var titulo = '';
  if (block.titulo) {
    titulo = block.caps
      ? '<h3 class="vistaAppCardTituloCaps">' + t(block.titulo) + '</h3>'
      : '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.titulo) + '</h3>';
  }
  var badge = block.badge ? '<span class="vistaAppBadge' + claseBadge(block.badge) + '">' + t(block.badge) + '</span>' : '';
  var rows = (block.rows || []).map(function (row) {
    var data = Array.isArray(row) ? { etiqueta: row[0], valor: row[1] } : row;
    var derecha;
    if (data.badge) {
      derecha = '<span class="vistaAppDataDerecha"><span class="vistaAppBadge' + claseBadge(data.badge) + '">' + t(data.badge) + '</span></span>';
    } else {
      var flecha = data.flecha ? '<span class="vistaAppDataFlecha">' + icono('chevron') + '</span>' : '';
      derecha = '<span class="vistaAppDataDerecha"><strong class="vistaAppDataValue">' + t(data.valor) + '</strong>' + flecha + '</span>';
    }

    if (data.to) {
      return '<button class="vistaAppDataRow vistaAppDataRow--link" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(data.to) + '"><span class="vistaAppDataLabel">' + t(data.etiqueta) + '</span>' + derecha + '</button>';
    }
    return '<div class="vistaAppDataRow"><span class="vistaAppDataLabel">' + t(data.etiqueta) + '</span>' + derecha + '</div>';
  }).join('');
  return '<div class="vistaAppCard">' + badge + titulo + '<div class="vistaAppDataList">' + rows + '</div></div>';
}

function banda(block) {
  var tono = '';
  if (block.tono === 'gris') tono = ' vistaAppBanda--gris';
  if (block.tono === 'azul') tono = ' vistaAppBanda--azul';
  return '<div class="vistaAppBanda' + tono + '">' + t(block.texto) + '</div>';
}

function resumenCard(block) {
  var filas = (block.items || []).map(function (item) {
    var tono = item.tono === 'rojo' ? ' vistaAppResumenIcono--rojo' : '';
    var contenido = '<span class="vistaAppFieldCajaLabel">' + t(item.etiqueta) + '</span>';
    if (item.imagen) {
      contenido += estadoRender.datos.evidencia
        ? '<span class="vistaAppResumenImagen">' + icono('imagen') + '</span>'
        : '<strong class="vistaAppResumenValor">Sin evidencia adjunta</strong>';
    } else {
      contenido += '<strong class="vistaAppResumenValor">' + t(item.valor) + '</strong>';
    }
    return '<div class="vistaAppResumenFila">' +
      '<span class="vistaAppResumenIcono' + tono + '">' + icono(item.icono || 'doc') + '</span>' +
      '<div class="vistaAppResumenCuerpo">' + contenido + '</div>' +
    '</div>';
  }).join('');
  return '<div class="vistaAppCard vistaAppResumen">' + filas + '</div>';
}

function locationCard(block) {
  var columnas = (block.columnas || []).map(function (col) {
    return '<div class="vistaAppUbicacionCol"><span class="vistaAppDataLabel">' + t(col[0]) + '</span><strong class="vistaAppUbicacionValor">' + t(col[1]) + '</strong></div>';
  }).join('');
  var banda = block.verificada
    ? '<div class="vistaAppUbicacionBadge"><span class="vistaAppUbicacionCandado">' + icono('candado') + '</span>' + t(block.verificada === true ? 'Ubicación verificada por QR' : block.verificada) + '</div>'
    : '';
  return '<div class="vistaAppCard vistaAppUbicacion"><div class="vistaAppUbicacionCols">' + columnas + '</div>' + banda + '</div>';
}

function timeline(items) {
  return '<div class="vistaAppCard"><div class="vistaAppTimeline">' + items.map(function (item) {
    var dotClass = item[3] ? 'vistaAppDot' : 'vistaAppDot vistaAppDot--gris';
    if (item[4] === 'pulso') dotClass += ' vistaAppDot--pulso';
    return '<div class="vistaAppTimelineItem"><span class="' + dotClass + '">' + (item[3] ? icono('check') : '') + '</span><div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">' + t(item[0]) + '</h4>' +
      (item[1] ? '<p class="vistaAppTexto vistaAppTexto--chico">' + t(item[1]) + '</p>' : '') +
      (item[2] ? '<p class="vistaAppTexto vistaAppTexto--chico">' + t(item[2]) + '</p>' : '') +
    '</div></div>';
  }).join('') + '</div></div>';
}

function normalizarCampo(field) {
  if (Array.isArray(field)) {
    return { etiqueta: field[0], placeholder: field[1] || '' };
  }
  return field;
}

function autoTipoCampo(field) {
  if (field.tipo) return field.tipo;
  var etiqueta = field.etiqueta || '';
  if (etiqueta.indexOf('ontraseña') !== -1) return 'clave';
  if (etiqueta.indexOf('orreo') !== -1) return 'correo';
  if (etiqueta.indexOf('Buscar') === 0) return 'busqueda';
  return 'texto';
}

function campoInput(fieldRaw, claseExtra) {
  var field = normalizarCampo(fieldRaw);
  var ruta = field.campo || 'campos.' + slugCampo(field.etiqueta);
  var tipo = autoTipoCampo(field);
  var datos = estadoRender.datos;

  var valor = leerDato(datos, ruta);
  if (valor == null) valor = field.valor || '';

  var requerido = !!datos.requeridos[ruta];
  var atributosComunes = ' data-vista-campo="' + textoSeguro(ruta) + '" placeholder="' + textoSeguro(field.placeholder || '') + '"';
  var control;

  if (field.dentro) {
    var visibleDentro = !!datos.clavesVisibles[ruta];
    var ojo = tipo === 'clave'
      ? '<button class="vistaAppInputOjo" type="button" data-vista-accion="toggle-clave" data-vista-campo="' + textoSeguro(ruta) + '" aria-label="Mostrar u ocultar contraseña">' + icono(visibleDentro ? 'eye-off' : 'eye') + '</button>'
      : '';
    var tipoDentro = tipo === 'clave' ? (visibleDentro ? 'text' : 'password') : (tipo === 'correo' ? 'email' : 'text');
    var errorDentro = requerido && field.mensajeRequerido
      ? '<span class="vistaAppFieldError">' + t(field.mensajeRequerido) + '</span>'
      : '';
    return '<label class="vistaAppField vistaAppFieldCaja' + (requerido ? ' vistaAppField--error' : '') + '" data-vista-field="' + textoSeguro(ruta) + '">' +
      '<span class="vistaAppFieldCajaLabel">' + t(field.etiqueta) + '</span>' +
      '<input class="vistaAppInputPlano" type="' + tipoDentro + '" value="' + textoSeguro(valor) + '"' + atributosComunes + ' />' +
      ojo +
      errorDentro +
    '</label>';
  }

  if (field.multilinea) {
    control = '<textarea class="vistaAppInput vistaAppInput--area' + (claseExtra || '') + '" rows="' + (field.filas || 3) + '"' + atributosComunes + '>' + textoSeguro(valor) + '</textarea>';
  } else if (tipo === 'clave') {
    var visible = !!datos.clavesVisibles[ruta];
    control = '<span class="vistaAppInputGrupo">' +
      '<input class="vistaAppInput' + (claseExtra || '') + '" type="' + (visible ? 'text' : 'password') + '" value="' + textoSeguro(valor) + '"' + atributosComunes + ' />' +
      '<button class="vistaAppInputOjo" type="button" data-vista-accion="toggle-clave" data-vista-campo="' + textoSeguro(ruta) + '" aria-label="Mostrar u ocultar contraseña">' + icono(visible ? 'eye-off' : 'eye') + '</button>' +
    '</span>';
  } else if (tipo === 'busqueda') {
    return '<label class="vistaAppBuscador">' +
      '<span class="vistaAppBuscadorLupa">' + icono('lupa') + '</span>' +
      '<input class="vistaAppInput vistaAppInput--busqueda" type="search" value="' + textoSeguro(valor) + '"' + atributosComunes + ' aria-label="' + textoSeguro(field.etiqueta) + '" />' +
    '</label>';
  } else {
    var tipoHtml = tipo === 'correo' ? 'email' : 'text';
    control = '<input class="vistaAppInput' + (claseExtra || '') + '" type="' + tipoHtml + '" value="' + textoSeguro(valor) + '"' + atributosComunes + ' />';
  }

  var error = requerido && field.mensajeRequerido
    ? '<span class="vistaAppFieldError">' + t(field.mensajeRequerido) + '</span>'
    : '';

  return '<label class="vistaAppField' + (requerido ? ' vistaAppField--error' : '') + '" data-vista-field="' + textoSeguro(ruta) + '">' +
    '<span class="vistaAppFieldLabel' + (field.suave ? ' vistaAppFieldLabel--suave' : '') + '">' + t(field.etiqueta) + '</span>' +
    control +
    error +
  '</label>';
}

function inputs(fields) {
  return '<div class="vistaAppCampos">' + fields.map(function (field) {
    return campoInput(field, '');
  }).join('') + '</div>';
}

function authFields(fields) {
  return '<div class="vistaAppAuthFields">' + fields.map(function (field) {
    return campoInput(field, ' vistaAppInput--auth');
  }).join('') + '</div>';
}

function selectRow(items) {
  return '<div class="vistaAppSelectRow">' + items.map(function (item) {
    var data = Array.isArray(item) ? { etiqueta: item[0], valor: item[1] } : item;
    var clase = 'vistaAppFieldCaja vistaAppFieldCaja--select' + (data.activo ? ' vistaAppFieldCaja--activa' : '');
    return '<div class="' + clase + '"><span class="vistaAppFieldCajaLabel">' + t(data.etiqueta) + '</span><strong class="vistaAppFieldCajaValor">' + t(data.valor) + '</strong></div>';
  }).join('') + '</div>';
}

function options(block) {
  var campo = block.campo || null;
  var datos = estadoRender.datos;

  var filas = block.items.map(function (item) {
    var activa = campo ? leerDato(datos, campo) === item.texto : !!item.active;
    var attrs;
    if (campo) {
      attrs = ' data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(campo) + '" data-vista-valor="' + textoSeguro(item.texto) + '"';
      if (item.to || block.to) attrs += ' data-vista-destino="' + textoSeguro(item.to || block.to) + '" data-vista-direccion="atras"';
    } else {
      attrs = accionAtributos(item);
    }
    var iconoDerecha = activa ? icono('check') : (block.flecha ? icono('chevron') : '');

    if (block.agrupado) {
      return '<button class="vistaAppOpcionFila' + (activa ? ' vistaAppOpcionFila--activa' : '') + '"' + attrs + '><span>' + t(item.texto) + '</span><span class="vistaAppOptionIcon">' + iconoDerecha + '</span></button>';
    }
    return '<button class="vistaAppOption ' + (activa ? 'vistaAppOption--active' : '') + '"' + attrs + '><span>' + t(item.texto) + '</span><span class="vistaAppOptionIcon">' + iconoDerecha + '</span></button>';
  }).join('');

  if (block.agrupado) {
    return '<div class="vistaAppCard vistaAppOpcionesGrupo">' + filas + '</div>';
  }
  return '<div class="vistaAppBotonera">' + filas + '</div>';
}

function categoryGrid(block) {
  var campo = block.campo || null;
  var datos = estadoRender.datos;
  return '<div class="vistaAppChips">' + block.items.map(function (item) {
    var data = typeof item === 'string' ? { texto: item } : item;
    var activa = campo ? leerDato(datos, campo) === data.texto : false;
    var attrs;
    if (campo) {
      attrs = ' data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(campo) + '" data-vista-valor="' + textoSeguro(data.texto) + '"';
      if (data.modal) attrs += ' data-vista-modal="' + textoSeguro(data.modal) + '"';
      if (data.to) attrs += ' data-vista-destino="' + textoSeguro(data.to) + '"';
    } else {
      attrs = accionAtributos(data);
    }
    return '<button class="vistaAppChip' + (activa ? ' vistaAppChip--activa' : '') + '"' + attrs + '>' + t(data.texto) + '</button>';
  }).join('') + '</div>';
}

function upload(block) {
  if (!block.campo) {
    var tag = block.to || block.modal ? 'button' : 'div';
    return '<' + tag + ' class="vistaAppUpload"' + accionAtributos(block) + '><span class="vistaAppUploadIcono">' + icono(block.icono || 'camara') + '</span><span>' + t(block.texto) + '</span></' + tag + '>';
  }

  var datos = estadoRender.datos;
  var cargada = !!leerDato(datos, block.campo);
  var texto = cargada ? (block.textoCargada || 'Imagen cargada correctamente') : (block.texto || 'Agregar foto');
  return '<button class="vistaAppUpload vistaAppUpload--campo' + (cargada ? ' vistaAppUpload--cargada' : '') + '" data-vista-accion="toggle" data-vista-campo="' + textoSeguro(block.campo) + '">' +
    '<span class="vistaAppUploadIcono">' + icono(cargada ? 'imagen' : 'camara') + '</span>' +
    '<span class="vistaAppUploadTexto">' + t(texto) + '</span>' +
    (cargada ? '<span class="vistaAppUploadQuitar" aria-hidden="true">' + icono('x') + '</span>' : '') +
  '</button>';
}

function segmented(block) {
  var datos = estadoRender.datos;
  return '<div class="vistaAppSegmented">' + block.items.map(function (item) {
    var activa = block.campo ? leerDato(datos, block.campo) === item.texto : item.texto === block.active;
    var attrs;
    if (block.campo) {
      attrs = ' data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(block.campo) + '" data-vista-valor="' + textoSeguro(item.texto) + '"';
    } else {
      attrs = accionAtributos(item);
    }
    return '<button class="' + (activa ? 'estaActivo' : '') + '"' + attrs + '>' + t(item.texto) + '</button>';
  }).join('') + '</div>';
}

function reportCards(block) {
  var items = Array.isArray(block) ? block : block.items;

  var html = items.map(function (item) {
    var tag = item.to ? 'button' : 'div';
    var attrs = item.to ? ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item.to) + '"' : '';
    return '<' + tag + ' class="vistaAppCard vistaAppTicket"' + attrs + '>' +
      '<span class="vistaAppCardIcon">' + icono(ICONO_CATEGORIA[item.categoria] || 'doc') + '</span>' +
      '<div class="vistaAppTicketCuerpo">' +
        '<span class="vistaAppTicketId">' + t(item.id) + '</span>' +
        '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(item.categoria) + '</h3>' +
        '<p class="vistaAppTexto vistaAppTexto--chico">' + t(item.lugar) + '</p>' +
      '</div>' +
      '<span class="vistaAppBadge' + claseBadge(item.estado) + '">' + t(item.estado) + '</span>' +
    '</' + tag + '>';
  }).join('');

  return '<div class="vistaAppLista">' + html + '</div>';
}

function checkRow(block) {
  var datos = estadoRender.datos;
  var activo = !!leerDato(datos, block.campo);
  return '<button class="vistaAppCheckRow' + (activo ? ' vistaAppCheckRow--activo' : '') + '" data-vista-accion="toggle" data-vista-campo="' + textoSeguro(block.campo) + '" role="checkbox" aria-checked="' + (activo ? 'true' : 'false') + '">' +
    '<span class="vistaAppCheck">' + (activo ? icono('check') : '') + '</span>' +
    '<span>' + t(block.texto) + '</span>' +
  '</button>';
}

function scanner(block) {
  var datos = estadoRender.datos;
  var detectado = !!datos.qrDetectado;
  var estadoTexto = detectado ? 'QR detectado<br>correctamente' : 'Buscando código QR…';
  return '<div class="vistaAppScanner">' +
    '<button class="vistaAppScannerArea' + (detectado ? ' vistaAppScannerArea--ok' : '') + '" data-vista-accion="modal" data-vista-destino="' + textoSeguro(block.modal) + '" aria-label="Área de escaneo">' +
      (detectado ? '' : '<span class="vistaAppScannerLinea" aria-hidden="true"></span>') +
      '<span class="vistaAppScannerStatus' + (detectado ? ' vistaAppScannerStatus--ok' : '') + '">' + estadoTexto + '</span>' +
    '</button>' +
  '</div>';
}

function sos(block) {
  return '<button class="vistaAppSos ' + (block.docente ? 'vistaAppSos--docente' : '') + '"' + accionAtributos(block) + '>' +
    '<span class="vistaAppSosIcon">!</span><span class="vistaAppSosTexto">' + t(block.texto) + '</span>' +
  '</button>';
}

function profile(block) {
  return '<div class="vistaAppCard vistaAppCard--row">' +
    '<span class="vistaAppAvatar vistaAppAvatar--gris">' + t(block.initials) + '</span>' +
    '<div><h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.nombre) + '</h3>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + t(block.rol) + '</p>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + t(block.email) + '</p></div>' +
  '</div>';
}

function list(items) {
  return '<div class="vistaAppLista">' + items.map(function (item) {
    return '<div class="vistaAppCard"><p class="vistaAppTexto">' + t(item[0]) + '</p><span class="vistaAppTexto vistaAppTexto--chico">' + t(item[1]) + '</span></div>';
  }).join('') + '</div>';
}

function rating(block) {
  var datos = estadoRender.datos;
  var seleccion = datos.rating || 0;
  var estrellas = [1, 2, 3, 4, 5].map(function (valor) {
    var activa = valor <= seleccion;
    return '<button class="vistaAppEstrella' + (activa ? ' vistaAppEstrella--activa' : '') + '" data-vista-accion="seleccion" data-vista-campo="rating" data-vista-valor="' + valor + '" aria-label="Calificar con ' + valor + (valor === 1 ? ' estrella' : ' estrellas') + '">' + icono('estrella') + '</button>';
  }).join('');
  return '<div class="vistaAppRating" role="radiogroup" aria-label="Calificación de la atención">' + estrellas + '</div>';
}

var COLORES_LEYENDA = {
  Prioritario: 'rojo',
  Asignado: 'azul',
  'En atención': 'ambar',
  Resuelto: 'verde'
};

function map(block) {
  var leyenda = block.leyenda
    ? '<div class="vistaAppLeyenda">' + (block.leyenda || []).map(function (item) {
        return '<span class="vistaAppLeyendaFila"><i class="vistaAppLeyendaPunto vistaAppLeyendaPunto--' + textoSeguro(COLORES_LEYENDA[item] || 'gris') + '"></i>' + t(item) + '</span>';
      }).join('') + '</div>'
    : '';

  return '<div class="vistaAppMap">' +
    '<span class="vistaAppMapCalle vistaAppMapCalle--v" aria-hidden="true"></span>' +
    '<span class="vistaAppMapCalle vistaAppMapCalle--h" aria-hidden="true"></span>' +
    '<div class="vistaAppEdificio vistaAppEdificio--a">' +
      '<span class="vistaAppPinMapa vistaAppPinMapa--azul">2</span>' +
      '<span class="vistaAppEdificioNombre">Pab A</span>' +
    '</div>' +
    '<button class="vistaAppEdificio vistaAppEdificio--b" data-vista-accion="pantalla" data-vista-destino="mapa-operativo-seleccion" aria-label="Ver incidencia prioritaria del pabellón B">' +
      '<span class="vistaAppPinMapa vistaAppPinMapa--rojo">!</span>' +
      '<span class="vistaAppEdificioNombre">Pab B</span>' +
    '</button>' +
    leyenda +
  '</div>';
}

function legend(items) {
  return '<div class="vistaAppGrid2">' + items.map(function (item) {
    return '<span class="vistaAppBadge vistaAppBadge--gris">' + t(item) + '</span>';
  }).join('') + '</div>';
}

function mapSheet(block) {
  return '<div class="vistaAppCard vistaAppMapSheet">' +
    '<div class="vistaAppMapSheetCabecera">' +
      '<span class="vistaAppBadge">' + t(block.badge) + '</span>' +
      '<button class="vistaAppMapSheetCerrar" data-vista-accion="pantalla" data-vista-destino="mapa-operativo" data-vista-direccion="atras" aria-label="Cerrar detalle">' + icono('x') + '</button>' +
    '</div>' +
    '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.titulo) + '</h3>' +
    '<p class="vistaAppTicketLugar"><span class="vistaAppTicketPin">' + icono('pin') + '</span>' + t(block.texto) + '</p>' +
    boton({ texto: 'Ver ficha técnica', to: block.to, variante: 'primario' }) +
  '</div>';
}

function renderAuth(pantalla) {
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

function renderAuthForm(pantalla) {
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

function renderRegister(pantalla) {
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

function renderConfig(pantalla, estado) {
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

function renderStandard(pantalla, estado) {
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

function renderSuccess(pantalla, estado) {
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
  estadoRender = estado;
  var pantalla = VISTA_APP_PANTALLAS[estado.pantalla] || VISTA_APP_PANTALLAS.login;

  if (pantalla.template === 'auth') return renderAuth(pantalla);
  if (pantalla.template === 'authForm') return renderAuthForm(pantalla);
  if (pantalla.template === 'register') return renderRegister(pantalla);
  if (pantalla.template === 'config') return renderConfig(pantalla, estado);
  if (pantalla.template === 'success') return renderSuccess(pantalla, estado);
  return renderStandard(pantalla, estado);
}

export function renderizarModalVistaApp(estado) {
  estadoRender = estado;
  var data = estado.modal ? VISTA_APP_MODALES[estado.modal] : null;
  if (!data) return '';

  var acciones = data.acciones.slice().reverse();
  return '<div class="vistaAppOverlay" data-vista-accion="cerrar-modal" role="dialog" aria-modal="true" aria-labelledby="vistaAppModalTitulo">' +
    '<div class="vistaAppModal">' +
      '<span class="vistaAppModalIcon">' + icono(data.icono === '!' ? 'alert' : (data.icono || 'alert')) + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro" id="vistaAppModalTitulo">' + t(data.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.texto) + '</p>' +
      '<div class="vistaAppModalActions">' + acciones.map(function (accion, indice) {
        var clase = 'vistaAppModalAccion' + (indice === 0 ? ' vistaAppModalAccion--destacada' : '');
        return '<button class="' + clase + '"' + accionAtributos(accion) + '>' + t(accion.control) + '</button>';
      }).join('') + '</div>' +
    '</div>' +
  '</div>';
}
