import { icono } from './iconos.js';
import { t, textoSeguro, accionAtributos, boton, obtenerDatos } from './helpers.js';
import { leerDato } from '../datos/index.js';
import {
  card, metrics, alertaCard, filterChips, ticketCards, fichaCabecera, fotoCard,
  dataCard, banda, resumenCard, locationCard, timeline, reportCards, scanner,
  sos, profile, list, map, legend, mapSheet
} from './bloquesContenido.js';
import {
  inputs, selectRow, options, categoryGrid, upload, segmented, checkRow, rating
} from './bloquesFormulario.js';

export function header(pantalla) {
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

export function botonIcono(nombreIcono, destino, label) {
  return '<button class="vistaAppIconBtn vistaAppIconBtn--claro" data-vista-accion="pantalla" data-vista-destino="' + textoSeguro(destino) + '" data-vista-direccion="atras" aria-label="' + textoSeguro(label) + '">' + icono(nombreIcono) + '</button>';
}

export function tabbar(data, estado) {
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

export function renderBloques(blocks, estado) {
  return (blocks || []).map(function (block) {
    return renderBloque(block, estado);
  }).join('');
}

export function renderBloque(block, estado) {
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
    var datosProblema = obtenerDatos();
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
