import { icon } from './icons.js';
import { t, safeText, actionAttributes, button, getData } from './helpers.js';
import { readData } from '../data/index.js';
import {
  card, metrics, alertCard, filterChips, ticketCards, sheetHeader, photoCard,
  dataCard, banner, summaryCard, locationCard, timeline, reportCards, scanner,
  sos, profile, settingsCard, list, map, legend, mapSheet, ticketHeader, searchFilter
} from './contentBlocks.js';
import {
  inputs, selectRow, options, categoryGrid, upload, segmented, checkRow, rating
} from './formBlocks.js';

export function header(screen) {
  var data = screen.header;
  if (!data) return '';

  if (data.tipo === 'rojo') {
    var className = 'appViewHeaderRed' + (data.compacto ? ' appViewHeaderRed--teacher' : '');
    var prompt = data.prompt ? '<div class="appViewSpacer16"></div><h3 class="appViewTitle">' + t(data.prompt) + '</h3>' : '';
    var notification = data.notifications
      ? '<button class="appViewIconBtn appViewNotification" data-view-action="pantalla" data-view-target="' + safeText(data.notifications) + '" aria-label="' + t('View notifications') + '">' + icon('bell') + '</button>'
      : '';
    return '' +
      '<header class="' + className + '">' +
        '<div class="appViewHeaderRow">' +
          '<div class="appViewProfileMini">' +
            '<div class="appViewAvatar">' + icon(data.icon || 'u') + '</div>' +
            '<div><span class="appViewLabel">' + t(data.label || 'CampusLink') + '</span>' +
            '<h3 class="appViewTitle appViewTitle--small">' + t(data.titulo) + '</h3></div>' +
          '</div>' +
          notification +
        '</div>' +
        prompt +
      '</header>';
  }

  if (data.tipo === 'perfil') {
    var editButton = data.accionDerecha
      ? '<button class="appViewProfileEdit"' + actionAttributes(data.accionDerecha) + '>' + t(data.accionDerecha.texto) + '</button>'
      : '';
    return '' +
      '<header class="appViewHeaderProfile">' +
        '<div class="appViewHeaderRow">' +
          '<h3 class="appViewTitle">' + t(data.titulo) + '</h3>' +
          editButton +
        '</div>' +
        '<div class="appViewProfileHeader">' +
          '<span class="appViewAvatar appViewAvatar--large">' + t(data.initials) + '</span>' +
          '<div class="appViewProfileData">' +
            '<h2 class="appViewProfileName">' + t(data.nombre) + '</h2>' +
            '<p class="appViewProfileRole">' + t(data.rol) + '</p>' +
            '<p class="appViewProfileEmail">' + t(data.email) + '</p>' +
          '</div>' +
        '</div>' +
      '</header>';
  }

  if (data.tipo === 'oscuro') {
    return '' +
      '<header class="appViewHeaderDark">' +
          '<div class="appViewHeaderRow">' +
          iconButton('chevron-left', data.volver, 'Back') +
          '<h3 class="appViewTitle appViewTitle--small">' + t(data.titulo) + '</h3>' +
          '<span class="appViewIconBtn appViewIconBtn--light" aria-hidden="true"></span>' +
        '</div>' +
      '</header>';
  }

  var left = data.volver ? iconButton('chevron-left', data.volver, 'Back') : '<span class="appViewIconBtn appViewIconBtn--light" aria-hidden="true"></span>';
  var right = '<span class="appViewIconBtn appViewIconBtn--light" aria-hidden="true"></span>';
  if (data.accionDerecha) {
    right = '<button class="appViewButton appViewButton--text appViewButton--header"' + actionAttributes(data.accionDerecha) + '>' + t(data.accionDerecha.texto) + '</button>';
  }
  return '' +
    '<header class="appViewHeaderLight">' +
      '<div class="appViewHeaderRow">' +
        left +
        '<h3 class="appViewTitle appViewTitle--small appViewTitle--center">' + t(data.titulo) + '</h3>' +
        right +
      '</div>' +
    '</header>';
}

export function iconButton(iconName, target, label) {
  return '<button class="appViewIconBtn appViewIconBtn--light" data-view-action="pantalla" data-view-target="' + safeText(target) + '" data-view-direction="atras" aria-label="' + t(label) + '">' + icon(iconName) + '</button>';
}

export function tabbar(data, state) {
  if (!data) return '';

  var activeRole = state.rol || 'estudiante';
  var roleType = activeRole === 'soporte' ? 'support' : 'student';
  var items;
  if (roleType === 'support') {
    items = [
      ['inicio', 'home', 'Home', 'home'],
      ['mapa', 'map', 'Map', 'mapa'],
      ['tickets', 'list', 'Tickets', 'tickets'],
      ['perfil', 'user', 'Profile', 'perfil']
    ];
  } else {
    items = [
      ['inicio', 'home', 'Home', 'home'],
      ['mapa', 'map', 'Map', 'mapa'],
      ['reportar', 'qr', 'Report', 'reportar'],
      ['reportes', 'doc', 'Reports', 'reportes'],
      ['perfil', 'user', 'Profile', 'perfil']
    ];
  }

  return '<nav class="appViewTabbar appViewTabbar--' + roleType + '" aria-label="' + t('Prototype navigation') + '">' +
    items.map(function (item) {
      var className = 'appViewTab' + (item[0] === data.activo ? ' appViewTab--active' : '');
      var attrs = item[3] ? ' data-view-action="pantalla" data-view-target="' + safeText(item[3]) + '" data-view-transition="fade"' : ' disabled';
      return '<button class="' + className + '"' + attrs + '><span class="appViewTabIcon">' + icon(item[1]) + '</span><span>' + t(item[2]) + '</span></button>';
    }).join('') +
  '</nav>';
}

export function renderBlocks(blocks, state) {
  return (blocks || []).map(function (block) {
    return renderBlock(block, state);
  }).join('');
}

export function renderBlock(block, state) {
  if (!block) return '';

  if (block.tipo === 'spacer') {
    return '<div class="appViewSpacer' + safeText(block.size) + '"></div>';
  }
  if (block.tipo === 'title') {
    return '<h3 class="appViewTitle appViewTitle--small' + (block.centro ? ' appViewTitle--center' : '') + '">' + t(block.texto) + '</h3>';
  }
  if (block.tipo === 'text') {
    var className = 'appViewText' + (block.chico ? ' appViewText--small' : '') + (block.centro ? ' appViewText--center' : '') + (block.claro ? ' appViewText--muted' : '');
    return '<p class="' + className + '">' + t(block.texto) + '</p>';
  }
  if (block.tipo === 'pill') {
    return '<div class="appViewBadge appViewBadge--blue appViewBadge--centered"><span class="appViewPillIcon">' + icon('info') + '</span>' + t(block.texto) + '</div>';
  }
  if (block.tipo === 'hero') {
    return '<div class="appViewHero">' +
      '<span class="appViewHeroIcon">' + icon(block.icon || 'triangle') + '</span>' +
      '<h3 class="appViewTitle appViewTitle--center">' + t(block.titulo) + '</h3>' +
      '<p class="appViewText appViewText--center">' + t(block.texto) + '</p>' +
    '</div>';
  }
  if (block.tipo === 'slaCard') {
    var slaRows = (block.items || []).map(function (item) {
      return '<div class="appViewSummaryRow">' +
        '<span class="appViewSlaIcon">' + icon(item.icon || 'info') + '</span>' +
        '<div class="appViewSummaryBody">' +
          '<span class="appViewFieldBoxLabel">' + t(item.etiqueta) + '</span>' +
          '<strong class="appViewSummaryValue">' + t(item.valor) + '</strong>' +
        '</div>' +
      '</div>';
    }).join('');
    var slaStatus = block.estado
      ? '<div class="appViewSlaStatus"><span class="appViewSlaDot" aria-hidden="true"></span>' + t(block.estado) + '</div>'
      : '';
    return '<div class="appViewCard appViewSla">' +
      '<div class="appViewSlaHeader">' +
        '<strong class="appViewSlaLabel">' + t(block.etiqueta) + '</strong>' +
        '<span class="appViewBadge"><span class="appViewPillIcon">' + icon('clock') + '</span>' + t(block.badge) + '</span>' +
      '</div>' +
      '<div class="appViewSlaBody">' + slaRows + slaStatus + '</div>' +
    '</div>';
  }
  if (block.tipo === 'problemGrid') {
    var problemData = getData();
    return '<div class="appViewProblems">' + block.items.map(function (item) {
      var active = block.field && readData(problemData, block.field) === item.texto;
      var attrs = block.field
        ? ' data-view-action="seleccion" data-view-field="' + safeText(block.field) + '" data-view-value="' + safeText(item.texto) + '"' + (item.modal ? ' data-view-modal="' + safeText(item.modal) + '"' : '')
        : actionAttributes(item);
      return '<button class="appViewCard appViewProblem' + (active ? ' appViewProblem--active' : '') + '"' + attrs + '>' +
        '<span class="appViewProblemIcon appViewProblemIcon--' + safeText(item.tinte || 'red') + '">' + icon(item.icon || 'alert') + '</span>' +
        '<span class="appViewProblemText">' + t(item.texto) + '</span>' +
      '</button>';
    }).join('') + '</div>';
  }
  if (block.tipo === 'alertBanner') {
    return card({ titulo: block.titulo, texto: block.texto, icon: 'check', badge: 'Resolved', to: block.to, accent: true });
  }
  if (block.tipo === 'successInline') {
    return '<div class="appViewCard ' + (block.danger ? 'appViewCard--danger' : 'appViewCard--accent') + '">' +
      '<span class="appViewBadge">' + t(block.badge || 'Priority') + '</span>' +
      '<h3 class="appViewTitle appViewTitle--small">' + t(block.titulo) + '</h3>' +
      '<p class="appViewText appViewText--small">' + t(block.texto) + '</p>' +
    '</div>';
  }
  if (block.tipo === 'card') return card(block);
  if (block.tipo === 'gridCards') {
    return '<div class="appViewGrid2">' + block.items.map(function (item) {
      return card({ titulo: item.titulo, icon: item.icon, to: item.to, compacto: true });
    }).join('') + '</div>';
  }
  if (block.tipo === 'metrics') return metrics(block.items);
  if (block.tipo === 'alertaCard') return alertCard(block);
  if (block.tipo === 'filterChips') return filterChips(block);
  if (block.tipo === 'searchFilter') return searchFilter(block);
  if (block.tipo === 'ticketCards') return ticketCards(block);
  if (block.tipo === 'fichaCabecera') return sheetHeader(block);
  if (block.tipo === 'fotoCard') return photoCard(block);
  if (block.tipo === 'dataCard') return dataCard(block);
  if (block.tipo === 'ticketHeader') return ticketHeader(block);
  if (block.tipo === 'banda') return banner(block);
  if (block.tipo === 'resumenCard') return summaryCard(block);
  if (block.tipo === 'locationCard') return locationCard(block);
  if (block.tipo === 'timeline') return timeline(block.items);
  if (block.tipo === 'buttonGroup') {
    return '<div class="appViewButtonGroup">' + block.items.map(button).join('') + '</div>';
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
  if (block.tipo === 'bottomPanel') return '<div class="appViewBottomPanel">' + renderBlocks(block.blocks, state) + '</div>';
  if (block.tipo === 'sos') return sos(block);
  if (block.tipo === 'profile') return profile(block);
  if (block.tipo === 'settingsCard') return settingsCard(block);
  if (block.tipo === 'list') return list(block.items);
  if (block.tipo === 'rating') return rating(block);
  if (block.tipo === 'map') return map(block);
  if (block.tipo === 'legend') return legend(block.items);
  if (block.tipo === 'mapSheet') return mapSheet(block);

  return '';
}
