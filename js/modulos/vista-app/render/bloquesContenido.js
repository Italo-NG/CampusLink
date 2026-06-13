// vista-app/render/bloquesContenido.js — bloques de presentacion (cards, listas, timeline, metricas, mapa)
import { icono, ICONO_CATEGORIA, COLORES_LEYENDA } from './iconos.js';
import { t, textoSeguro, accionAtributos, boton, obtenerDatos } from './helpers.js';
import { leerDato } from '../datos/index.js';

export function card(block) {
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

export function claseBadge(texto) {
  if (texto === 'Recibido' || texto === 'Pendiente' || texto === 'Reabierto') return ' vistaAppBadge--azul';
  if (texto === 'En proceso' || texto === 'En atención') return ' vistaAppBadge--ambar';
  if (texto === 'Resuelto') return ' vistaAppBadge--verde';
  if (texto === 'Cancelado' || texto === 'Normal' || texto === 'Asignado' || texto === 'Pausado') return ' vistaAppBadge--gris';
  return '';
}

export function metrics(items) {
  return '<div class="vistaAppGrid3">' + items.map(function (item) {
    var clase = item[2] ? ' vistaAppMetricNumero--rojo' : (item[3] === 'verde' ? ' vistaAppMetricNumero--verde' : '');
    return '<div class="vistaAppCard vistaAppMetric' + (item[2] ? ' vistaAppMetric--activa' : '') + '">' +
      '<strong class="vistaAppMetricNumero' + clase + '">' + t(item[0]) + '</strong>' +
      '<span class="vistaAppTexto vistaAppTexto--chico">' + t(item[1]) + '</span>' +
    '</div>';
  }).join('') + '</div>';
}

export function alertaCard(block) {
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

export function filterChips(block) {
  var datos = obtenerDatos();
  return '<div class="vistaAppFiltros">' + block.items.map(function (texto) {
    var activa = leerDato(datos, block.campo) === texto;
    return '<button class="vistaAppChip vistaAppChip--filtro' + (activa ? ' vistaAppChip--activa' : '') + '" data-vista-accion="seleccion" data-vista-campo="' + textoSeguro(block.campo) + '" data-vista-valor="' + textoSeguro(texto) + '">' + t(texto) + '</button>';
  }).join('') + '</div>';
}

export function ticketCards(block) {
  var datos = obtenerDatos();
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

export function fichaCabecera(block) {
  return '<div class="vistaAppFichaCabecera">' +
    '<span class="vistaAppFichaChip">' + t(block.id) + '</span>' +
    '<span class="vistaAppBadge vistaAppBadge--suaveRojo">' + t(block.badge) + '</span>' +
  '</div>';
}

export function fotoCard(block) {
  return '<div class="vistaAppCard">' +
    '<h3 class="vistaAppCardTituloCaps">' + t(block.titulo) + '</h3>' +
    '<div class="vistaAppFotoFila">' +
      '<span class="vistaAppFotoCuadro" aria-hidden="true"></span>' +
      '<span class="vistaAppTexto">' + t(block.texto) + '</span>' +
    '</div>' +
  '</div>';
}

export function dataCard(block) {
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

export function banda(block) {
  var tono = '';
  if (block.tono === 'gris') tono = ' vistaAppBanda--gris';
  if (block.tono === 'azul') tono = ' vistaAppBanda--azul';
  return '<div class="vistaAppBanda' + tono + '">' + t(block.texto) + '</div>';
}

export function resumenCard(block) {
  var filas = (block.items || []).map(function (item) {
    var tono = item.tono === 'rojo' ? ' vistaAppResumenIcono--rojo' : '';
    var contenido = '<span class="vistaAppFieldCajaLabel">' + t(item.etiqueta) + '</span>';
    if (item.imagen) {
      contenido += obtenerDatos().evidencia
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

export function locationCard(block) {
  var columnas = (block.columnas || []).map(function (col) {
    return '<div class="vistaAppUbicacionCol"><span class="vistaAppDataLabel">' + t(col[0]) + '</span><strong class="vistaAppUbicacionValor">' + t(col[1]) + '</strong></div>';
  }).join('');
  var banda = block.verificada
    ? '<div class="vistaAppUbicacionBadge"><span class="vistaAppUbicacionCandado">' + icono('candado') + '</span>' + t(block.verificada === true ? 'Ubicación verificada por QR' : block.verificada) + '</div>'
    : '';
  return '<div class="vistaAppCard vistaAppUbicacion"><div class="vistaAppUbicacionCols">' + columnas + '</div>' + banda + '</div>';
}

export function timeline(items) {
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
export function reportCards(block) {
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
export function scanner(block) {
  var datos = obtenerDatos();
  var detectado = !!datos.qrDetectado;
  var estadoTexto = detectado ? 'QR detectado<br>correctamente' : 'Buscando código QR…';
  return '<div class="vistaAppScanner">' +
    '<button class="vistaAppScannerArea' + (detectado ? ' vistaAppScannerArea--ok' : '') + '" data-vista-accion="modal" data-vista-destino="' + textoSeguro(block.modal) + '" aria-label="Área de escaneo">' +
      (detectado ? '' : '<span class="vistaAppScannerLinea" aria-hidden="true"></span>') +
      '<span class="vistaAppScannerStatus' + (detectado ? ' vistaAppScannerStatus--ok' : '') + '">' + estadoTexto + '</span>' +
    '</button>' +
  '</div>';
}
export function sos(block) {
  return '<button class="vistaAppSos ' + (block.docente ? 'vistaAppSos--docente' : '') + '"' + accionAtributos(block) + '>' +
    '<span class="vistaAppSosIcon">!</span><span class="vistaAppSosTexto">' + t(block.texto) + '</span>' +
  '</button>';
}
export function profile(block) {
  return '<div class="vistaAppCard vistaAppCard--row">' +
    '<span class="vistaAppAvatar vistaAppAvatar--gris">' + t(block.initials) + '</span>' +
    '<div><h3 class="vistaAppTitulo vistaAppTitulo--chico">' + t(block.nombre) + '</h3>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + t(block.rol) + '</p>' +
    '<p class="vistaAppTexto vistaAppTexto--chico">' + t(block.email) + '</p></div>' +
  '</div>';
}
export function list(items) {
  return '<div class="vistaAppLista">' + items.map(function (item) {
    return '<div class="vistaAppCard"><p class="vistaAppTexto">' + t(item[0]) + '</p><span class="vistaAppTexto vistaAppTexto--chico">' + t(item[1]) + '</span></div>';
  }).join('') + '</div>';
}
export function map(block) {
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

export function legend(items) {
  return '<div class="vistaAppGrid2">' + items.map(function (item) {
    return '<span class="vistaAppBadge vistaAppBadge--gris">' + t(item) + '</span>';
  }).join('') + '</div>';
}

export function mapSheet(block) {
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
