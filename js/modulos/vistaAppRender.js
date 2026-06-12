import { VISTA_APP_MODALES, VISTA_APP_PANTALLAS, VISTA_APP_ROLES } from './vistaAppDatos.js';

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
  eye: '<svg class="vistaAppSvg" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="3"/></svg>'
};

function textoSeguro(valor) {
  return String(valor == null ? '' : valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function accionAtributos(item) {
  if (!item || item.disabled) return '';

  if (item.role) {
    return ' data-vista-accion="rol" data-vista-destino="' + textoSeguro(item.role) + '"';
  }
  if (item.continuarRol) {
    return ' data-vista-accion="continuar-rol"';
  }
  if (item.modal) {
    return ' data-vista-accion="modal" data-vista-destino="' + textoSeguro(item.modal) + '"';
  }
  if (item.to) {
    return ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item.to) + '"';
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
  var disabled = item.disabled ? ' disabled' : '';
  var contenido = item.icono ? '<span class="vistaAppBotonIcon">' + icono(item.icono) + '</span>' : '';
  contenido += '<span>' + textoSeguro(item.texto) + '</span>';
  return '<button class="' + clases + '"' + accionAtributos(item) + disabled + '>' + contenido + '</button>';
}

function header(pantalla) {
  var data = pantalla.header;
  if (!data) return '';

  if (data.tipo === 'rojo') {
    var clase = 'vistaAppHeaderRojo' + (data.compacto ? ' vistaAppHeaderRojo--docente' : '');
    var prompt = data.prompt ? '<div class="vistaAppSpacer16"></div><h3 class="vistaAppTitulo">' + textoSeguro(data.prompt) + '</h3>' : '';
    var notificacion = data.notificaciones
      ? '<button class="vistaAppIconBtn vistaAppNotificacion" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(data.notificaciones) + '" aria-label="Ver notificaciones">' + icono('bell') + '</button>'
      : '';
    return '' +
      '<header class="' + clase + '">' +
        '<div class="vistaAppHeaderFila">' +
          '<div class="vistaAppPerfilMini">' +
            '<div class="vistaAppAvatar">' + icono(data.icono || 'u') + '</div>' +
            '<div><span class="vistaAppLabel">' + textoSeguro(data.label || 'CampusLink') + '</span>' +
            '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(data.titulo) + '</h3></div>' +
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
          '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(data.titulo) + '</h3>' +
          '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>' +
        '</div>' +
      '</header>';
  }

  var izquierda = data.volver ? botonIcono('chevron-left', data.volver, 'Volver') : '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>';
  var derecha = '<span class="vistaAppIconBtn vistaAppIconBtn--claro" aria-hidden="true"></span>';
  if (data.accionDerecha) {
    derecha = '<button class="vistaAppBoton vistaAppBoton--texto"' + accionAtributos(data.accionDerecha) + '>' + textoSeguro(data.accionDerecha.texto) + '</button>';
  }
  return '' +
    '<header class="vistaAppHeaderClaro">' +
      '<div class="vistaAppHeaderFila">' +
        izquierda +
        '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + textoSeguro(data.titulo) + '</h3>' +
        derecha +
      '</div>' +
    '</header>';
}

function botonIcono(nombreIcono, destino, label) {
  return '<button class="vistaAppIconBtn vistaAppIconBtn--claro" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(destino) + '" aria-label="' + textoSeguro(label) + '">' + icono(nombreIcono) + '</button>';
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
      var attrs = item[3] ? ' data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(item[3]) + '"' : ' disabled';
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
    return '<h3 class="vistaAppTitulo vistaAppTitulo--chico' + (block.centro ? ' vistaAppTitulo--centro' : '') + '">' + textoSeguro(block.texto) + '</h3>';
  }
  if (block.tipo === 'text') {
    var clase = 'vistaAppTexto' + (block.chico ? ' vistaAppTexto--chico' : '') + (block.centro ? ' vistaAppTexto--centro' : '') + (block.claro ? ' vistaAppTexto--muted' : '');
    return '<p class="' + clase + '">' + textoSeguro(block.texto) + '</p>';
  }
  if (block.tipo === 'pill') {
    return '<div class="vistaAppBadge vistaAppBadge--azul" style="margin-inline:auto;">' + textoSeguro(block.texto) + '</div>';
  }
  if (block.tipo === 'alertBanner') {
    return card({ titulo: block.titulo, texto: block.texto, icono: 'check', badge: 'Resuelto', to: block.to, accent: true });
  }
  if (block.tipo === 'successInline') {
    return '<div class="vistaAppCard ' + (block.danger ? 'vistaAppCard--danger' : 'vistaAppCard--accent') + '">' +
      '<span class="vistaAppBadge">' + textoSeguro(block.badge || 'Prioritario') + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(block.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(block.texto) + '</p>' +
    '</div>';
  }
  if (block.tipo === 'card') return card(block);
  if (block.tipo === 'gridCards') {
    return '<div class="vistaAppGrid2">' + block.items.map(function (item) {
      return card({ titulo: item.titulo, icono: item.icono, to: item.to, compacto: true });
    }).join('') + '</div>';
  }
  if (block.tipo === 'metrics') return metrics(block.items);
  if (block.tipo === 'dataCard') return dataCard(block);
  if (block.tipo === 'timeline') return timeline(block.items);
  if (block.tipo === 'buttonGroup') {
    return '<div style="display:grid;gap:8px;">' + block.items.map(boton).join('') + '</div>';
  }
  if (block.tipo === 'inputs') return inputs(block.fields);
  if (block.tipo === 'selectRow') return selectRow(block.items);
  if (block.tipo === 'options') return options(block.items);
  if (block.tipo === 'categoryGrid') return categoryGrid(block.items);
  if (block.tipo === 'upload') return upload(block);
  if (block.tipo === 'segmented') return segmented(block);
  if (block.tipo === 'reportCards') return reportCards(block.items);
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
  var badge = block.badge ? '<span class="vistaAppBadge">' + textoSeguro(block.badge) + '</span>' : '';
  var link = block.link ? '<span class="vistaAppTexto vistaAppTexto--chico" style="color:#E30613;font-weight:700;">' + textoSeguro(block.link) + '</span>' : '';
  var icon = block.icono ? '<span class="vistaAppCardIcon ' + (block.accent ? 'vistaAppCardIcon--rojo' : '') + '">' + icono(block.icono) + '</span>' : '';
  var contenido = '<div style="display:grid;gap:6px;min-width:0;flex:1;">' +
    badge +
    '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(block.titulo) + '</h3>' +
    (block.texto ? '<p class="vistaAppTexto">' + textoSeguro(block.texto) + '</p>' : '') +
    link +
  '</div>';

  if (block.compacto) {
    clase = 'vistaAppCard';
    contenido = icon + '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + textoSeguro(block.titulo) + '</h3>';
  } else {
    contenido = icon + contenido;
  }

  return '<' + tag + ' class="' + clase + '"' + attrs + '>' + contenido + '</' + tag + '>';
}

function metrics(items) {
  return '<div class="vistaAppGrid3">' + items.map(function (item) {
    var color = item[2] ? '#E30613' : (item[3] === 'verde' ? '#00A63E' : '#1F2933');
    return '<div class="vistaAppCard vistaAppMetric">' +
      '<strong class="vistaAppMetricNumero" style="color:' + color + ';">' + textoSeguro(item[0]) + '</strong>' +
      '<span class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(item[1]) + '</span>' +
    '</div>';
  }).join('') + '</div>';
}

function dataCard(block) {
  var titulo = block.titulo ? '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(block.titulo) + '</h3>' : '';
  var badge = block.badge ? '<span class="vistaAppBadge ' + (block.badge === 'Recibido' || block.badge === 'En proceso' ? 'vistaAppBadge--azul' : '') + '">' + textoSeguro(block.badge) + '</span>' : '';
  var rows = (block.rows || []).map(function (row) {
    return '<div class="vistaAppDataRow"><span class="vistaAppDataLabel">' + textoSeguro(row[0]) + '</span><strong class="vistaAppDataValue">' + textoSeguro(row[1]) + '</strong></div>';
  }).join('');
  return '<div class="vistaAppCard">' + badge + titulo + '<div class="vistaAppDataList">' + rows + '</div></div>';
}

function timeline(items) {
  return '<div class="vistaAppCard"><div class="vistaAppTimeline">' + items.map(function (item) {
    var dotClass = item[3] ? 'vistaAppDot' : 'vistaAppDot vistaAppDot--gris';
    return '<div class="vistaAppTimelineItem"><span class="' + dotClass + '">' + (item[3] ? icono('check') : '') + '</span><div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(item[0]) + '</h4>' +
      (item[1] ? '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(item[1]) + '</p>' : '') +
      (item[2] ? '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(item[2]) + '</p>' : '') +
    '</div></div>';
  }).join('') + '</div></div>';
}

function inputs(fields) {
  return '<div style="display:grid;gap:10px;">' + fields.map(function (field) {
    return '<label class="vistaAppField"><span class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(field[0]) + '</span><span class="vistaAppInput">' + textoSeguro(field[1]) + '</span></label>';
  }).join('') + '</div>';
}

function authFields(fields) {
  return '<div class="vistaAppAuthFields">' + fields.map(function (field) {
    return '<label class="vistaAppAuthField">' +
      '<span>' + textoSeguro(field[0]) + '</span>' +
      '<span class="vistaAppInput vistaAppInput--auth">' + textoSeguro(field[1]) + '</span>' +
    '</label>';
  }).join('') + '</div>';
}

function selectRow(items) {
  return '<div class="vistaAppSelectRow">' + items.map(function (item) {
    return '<div class="vistaAppInput" style="display:grid;gap:0;"><span class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(item[0]) + '</span><strong>' + textoSeguro(item[1]) + '</strong></div>';
  }).join('') + '</div>';
}

function options(items) {
  return '<div style="display:grid;gap:8px;">' + items.map(function (item) {
    return '<button class="vistaAppOption ' + (item.active ? 'vistaAppOption--active' : '') + '"' + accionAtributos(item) + '><span>' + textoSeguro(item.texto) + '</span><span class="vistaAppOptionIcon">' + (item.active ? icono('check') : icono('chevron')) + '</span></button>';
  }).join('') + '</div>';
}

function categoryGrid(items) {
  return '<div class="vistaAppCategoriaGrid">' + items.map(function (item) {
    var data = typeof item === 'string' ? { texto: item } : item;
    return '<button class="vistaAppCategoria"' + accionAtributos(data) + '>' + textoSeguro(data.texto) + '</button>';
  }).join('') + '</div>';
}

function upload(block) {
  var tag = block.to || block.modal ? 'button' : 'div';
  return '<' + tag + ' class="vistaAppUpload"' + accionAtributos(block) + '><span>' + textoSeguro(block.texto) + '</span></' + tag + '>';
}

function segmented(block) {
  return '<div class="vistaAppSegmented">' + block.items.map(function (item) {
    return '<button class="' + (item.texto === block.active ? 'estaActivo' : '') + '"' + accionAtributos(item) + '>' + textoSeguro(item.texto) + '</button>';
  }).join('') + '</div>';
}

function reportCards(items) {
  return '<div style="display:grid;gap:12px;">' + items.map(function (item) {
    return card({
      titulo: item.id,
      texto: item.categoria + ' · ' + item.lugar,
      badge: item.estado,
      to: item.to,
      icono: 'doc'
    });
  }).join('') + '</div>';
}

function scanner(block) {
  return '<button class="vistaAppScanner" data-vista-accion="modal" data-vista-destino="' + textoSeguro(block.modal) + '">' +
    '<div class="vistaAppScannerArea"><span class="vistaAppScannerStatus">QR detectado<br>correctamente</span></div>' +
  '</button>';
}

function sos(block) {
  return '<button class="vistaAppSos ' + (block.docente ? 'vistaAppSos--docente' : '') + '"' + accionAtributos(block) + '>' +
    '<span class="vistaAppSosIcon">!</span><span class="vistaAppSosTexto">' + textoSeguro(block.texto) + '</span>' +
  '</button>';
}

function profile(block) {
  return '<div class="vistaAppCard vistaAppCard--row">' +
    '<span class="vistaAppAvatar vistaAppAvatar--gris">' + textoSeguro(block.initials) + '</span>' +
    '<div><h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(block.nombre) + '</h3>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(block.rol) + '</p>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(block.email) + '</p></div>' +
  '</div>';
}

function list(items) {
  return '<div style="display:grid;gap:12px;">' + items.map(function (item) {
    return '<div class="vistaAppCard"><p class="vistaAppTexto">' + textoSeguro(item[0]) + '</p><span class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(item[1]) + '</span></div>';
  }).join('') + '</div>';
}

function rating(block) {
  var stars = block.selected ? '★★★★★' : '☆ ☆ ☆ ☆ ☆';
  return '<button class="vistaAppRating" ' + accionAtributos(block) + ' aria-label="Seleccionar calificación">' + textoSeguro(stars) + '</button>';
}

function map(block) {
  return '<div class="vistaAppMap">' +
    '<div class="vistaAppBuilding" style="left:34px;top:86px;">Pab A</div>' +
    '<div class="vistaAppBuilding" style="left:180px;top:96px;">Pab B</div>' +
    '<button class="vistaAppMarker" style="left:235px;top:170px;" data-vista-accion="pantalla" data-vista-destino="mapa-operativo-seleccion">2</button>' +
    (block.selected ? '<div class="vistaAppBuilding" style="left:158px;top:235px;border-color:#E30613;">Aula B-301</div>' : '') +
  '</div>';
}

function legend(items) {
  return '<div class="vistaAppGrid2">' + items.map(function (item) {
    return '<span class="vistaAppBadge vistaAppBadge--gris">' + textoSeguro(item) + '</span>';
  }).join('') + '</div>';
}

function mapSheet(block) {
  return '<div class="vistaAppCard vistaAppCard--danger">' +
    '<span class="vistaAppBadge">' + textoSeguro(block.badge) + '</span>' +
    '<h3 class="vistaAppTitulo vistaAppTitulo--chico">' + textoSeguro(block.titulo) + '</h3>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + textoSeguro(block.texto) + '</p>' +
    boton({ texto: 'Ver ficha técnica', to: block.to, variante: 'primario' }) +
  '</div>';
}

function renderAuth(pantalla) {
  var data = pantalla.auth;
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppAuth vistaAppAuth--login">' +
      '<div class="vistaAppAuthTop">' +
        '<div class="vistaAppLogoApp"><img src="recursos/logo/favicon.png" alt=""></div>' +
        '<div><h3 class="vistaAppMarcaTitulo">' + textoSeguro(data.titulo) + '</h3><h4 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + textoSeguro(data.subtitulo) + '</h4></div>' +
        '<p class="vistaAppTexto vistaAppTexto--centro">' + textoSeguro(data.descripcion) + '</p>' +
      '</div>' +
      '<div class="vistaAppAuthActions">' + boton({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'vistaAppBoton--alto' }) + '<button class="vistaAppBoton vistaAppBoton--texto">' + textoSeguro(data.enlace) + '</button></div>' +
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
          '<div class="vistaAppAuthBrand"><h3 class="vistaAppMarcaTitulo">' + textoSeguro(data.titulo) + '</h3><h4 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro">' + textoSeguro(data.subtitulo) + '</h4></div>' +
          '<p class="vistaAppTexto vistaAppTexto--centro">' + textoSeguro(data.descripcion) + '</p>' +
        '</div>' +
        authFields(data.fields) +
      '</div>' +
      '<div class="vistaAppAuthActions vistaAppAuthActions--data">' +
        boton({ texto: data.boton.texto, to: data.boton.to, variante: 'primario', clase: 'vistaAppBoton--alto' }) +
        data.accionesExtra.map(function (item) { return boton({ texto: item.texto, to: item.to, variante: 'texto' }); }).join('') +
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
      '<div class="vistaAppSpacer16"></div>' +
      '<p class="vistaAppTexto">Usaremos esta información para mostrarte funciones relevantes.</p>' +
      '<div class="vistaAppSpacer32"></div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">Sede principal</h4>' +
      '<div class="vistaAppSpacer12"></div>' +
      options([{ texto: 'Monterrico', active: true }, { texto: 'San Isidro' }, { texto: 'Villa' }, { texto: 'San Miguel' }]) +
      '<div class="vistaAppSpacer32"></div>' +
      '<h4 class="vistaAppTitulo vistaAppTitulo--chico">Tu rol</h4>' +
      '<div class="vistaAppSpacer12"></div>' +
      '<div style="display:grid;gap:8px;">' + VISTA_APP_ROLES.map(function (rol) {
        return '<button class="vistaAppOption ' + (rol.id === rolActivo ? 'vistaAppOption--active' : '') + '" data-vista-accion="rol" data-vista-destino="' + textoSeguro(rol.id) + '"><span>' + textoSeguro(rol.etiqueta) + '</span><span class="vistaAppOptionIcon">' + (rol.id === rolActivo ? icono('check') : '') + '</span></button>';
      }).join('') + '</div>' +
      '<div class="vistaAppSpacer32"></div>' +
      boton({ texto: 'Continuar', continuarRol: true, variante: 'primario', clase: 'vistaAppBoton--alto' }) +
    '</div></div>' +
  '</div>';
}

function renderStandard(pantalla, estado) {
  var style = ' style="background:' + textoSeguro(pantalla.fondo) + ';"';
  var hasHeader = !!pantalla.header;
  return '<div class="vistaAppScreen"' + style + ' data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppScroll">' +
      header(pantalla) +
      '<main class="vistaAppInner ' + (!hasHeader ? 'vistaAppInner--top' : '') + '">' + renderBloques(pantalla.blocks, estado) + '</main>' +
    '</div>' +
    tabbar(pantalla.tabbar, estado) +
  '</div>';
}

function renderSuccess(pantalla, estado) {
  var data = pantalla.success;
  return '<div class="vistaAppScreen" data-vista-pantalla="' + textoSeguro(pantalla.id) + '">' +
    '<div class="vistaAppSuccess">' +
      '<div style="display:grid;place-items:center;gap:16px;width:100%;">' +
        '<span class="vistaAppSuccessIcon">' + icono(data.icono || 'check') + '</span>' +
        '<h3 class="vistaAppTitulo">' + textoSeguro(data.titulo) + '</h3>' +
        '<p class="vistaAppTexto vistaAppTexto--centro">' + textoSeguro(data.texto) + '</p>' +
        (data.rows ? dataCard({ rows: data.rows }) : '') +
        (data.nota ? '<p class="vistaAppTexto vistaAppTexto--chico vistaAppTexto--centro">' + textoSeguro(data.nota) + '</p>' : '') +
      '</div>' +
      '<div style="display:grid;gap:8px;width:100%;margin-top:auto;">' + (data.botones || []).map(boton).join('') + '</div>' +
    '</div>' +
    tabbar(pantalla.tabbar, estado) +
  '</div>';
}

export function renderizarVistaApp(estado) {
  var pantalla = VISTA_APP_PANTALLAS[estado.pantalla] || VISTA_APP_PANTALLAS.login;
  var html;

  if (pantalla.template === 'auth') html = renderAuth(pantalla);
  else if (pantalla.template === 'authForm') html = renderAuthForm(pantalla);
  else if (pantalla.template === 'register') html = renderRegister(pantalla);
  else if (pantalla.template === 'config') html = renderConfig(pantalla, estado);
  else if (pantalla.template === 'success') html = renderSuccess(pantalla, estado);
  else html = renderStandard(pantalla, estado);

  if (estado.modal && VISTA_APP_MODALES[estado.modal]) {
    html += renderModal(VISTA_APP_MODALES[estado.modal]);
  }

  return html;
}

function renderModal(data) {
  return '<div class="vistaAppOverlay" role="dialog" aria-modal="true" aria-labelledby="vistaAppModalTitulo">' +
    '<div class="vistaAppModal">' +
      '<span class="vistaAppModalIcon">' + icono(data.icono || 'alert') + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro" id="vistaAppModalTitulo">' + textoSeguro(data.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--centro">' + textoSeguro(data.texto) + '</p>' +
      '<div class="vistaAppModalActions">' + data.acciones.map(function (accion, indice) {
        var variante = indice === data.acciones.length - 1 ? 'primario' : 'secundario';
        return boton({ texto: accion.control, tipo: accion.tipo, destino: accion.destino, variante: variante });
      }).join('') + '</div>' +
    '</div>' +
  '</div>';
}
