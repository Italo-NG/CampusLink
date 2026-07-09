import { icon, ICON_CATEGORY, LEGEND_COLORS } from './icons.js';
import { t, safeText, actionAttributes, button, getData, translateValue } from './helpers.js';
import { readData } from '../data/index.js';

export function card(block) {
  var tag = block.to || block.modal ? 'button' : 'div';
  var className = 'appViewCard' + (block.texto || block.link ? ' appViewCard--row' : '') + (block.accent ? ' appViewCard--accent' : '') + (block.danger ? ' appViewCard--danger' : '');
  var attrs = actionAttributes(block);
  var badge = block.badge ? '<span class="appViewBadge' + badgeClass(block.badge) + '">' + t(block.badge) + '</span>' : '';
  var link = block.link ? '<span class="appViewText appViewText--small appViewCardLink">' + t(block.link) + '</span>' : '';
  var iconHtml = block.icon ? '<span class="appViewCardIcon ' + (block.accent ? 'appViewCardIcon--red' : '') + '">' + icon(block.icon) + '</span>' : '';
  var content = '<div class="appViewCardBody">' +
    badge +
    '<h3 class="appViewTitle appViewTitle--small">' + t(block.titulo) + '</h3>' +
    (block.texto ? '<p class="appViewText">' + t(block.texto) + '</p>' : '') +
    link +
  '</div>';

  if (block.compacto) {
    className = 'appViewCard';
    content = iconHtml + '<h3 class="appViewTitle appViewTitle--small appViewTitle--center">' + t(block.titulo) + '</h3>';
  } else {
    content = iconHtml + content;
  }

  return '<' + tag + ' class="' + className + '"' + attrs + '>' + content + '</' + tag + '>';
}

export function badgeClass(text) {
  if (text === 'Received' || text === 'Pending' || text === 'Reopened') return ' appViewBadge--blue';
  if (text === 'In progress' || text === 'Being handled') return ' appViewBadge--amber';
  if (text === 'Resolved') return ' appViewBadge--green';
  if (text === 'Canceled' || text === 'Normal' || text === 'Assigned' || text === 'Paused') return ' appViewBadge--gray';
  return '';
}

export function metrics(items) {
  return '<div class="appViewGrid3">' + items.map(function (item) {
    var className = item[2] ? ' appViewMetricNumber--red' : (item[3] === 'verde' ? ' appViewMetricNumber--green' : '');
    return '<div class="appViewCard appViewMetric' + (item[2] ? ' appViewMetric--active' : '') + '">' +
      '<strong class="appViewMetricNumber' + className + '">' + t(item[0]) + '</strong>' +
      '<span class="appViewText appViewText--small">' + t(item[1]) + '</span>' +
    '</div>';
  }).join('') + '</div>';
}

export function alertCard(block) {
  return '<button class="appViewCard appViewAlert" data-view-action="pantalla" data-view-target="' + safeText(block.to) + '">' +
    '<div class="appViewAlertHeader">' +
      '<span class="appViewAlertIcon">' + icon('alert') + '</span>' +
      '<h3 class="appViewAlertTitle">' + t(block.titulo) + '</h3>' +
    '</div>' +
    '<p class="appViewText">' + t(block.texto) + '</p>' +
    '<div class="appViewAlertFooter">' +
      '<span class="appViewBadge">' + t(block.badge) + '</span>' +
      '<span class="appViewCardLink appViewText--small">' + t(block.link) + '</span>' +
    '</div>' +
  '</button>';
}

export function filterChips(block) {
  var data = getData();
  return '<div class="appViewFilters">' + block.items.map(function (text) {
    var active = readData(data, block.field) === text;
    return '<button class="appViewChip appViewChip--filter' + (active ? ' appViewChip--active' : '') + '" data-view-action="seleccion" data-view-field="' + safeText(block.field) + '" data-view-value="' + safeText(text) + '">' + t(text) + '</button>';
  }).join('') + '</div>';
}

export function searchFilter(block) {
  var data = getData();
  var value = readData(data, block.field) || '';
  return '<div class="appViewSearchRow">' +
    '<label class="appViewSearch appViewSearch--flex">' +
      '<span class="appViewSearchIcon">' + icon('search') + '</span>' +
      '<input class="appViewInput appViewInput--search" type="search" value="' + safeText(value) + '" data-view-field="' + safeText(block.field) + '" placeholder="' + safeText(translateValue(block.placeholder || 'Search')) + '" aria-label="' + t('Search') + '" />' +
    '</label>' +
    '<button class="appViewFiltersBtn" data-view-action="modal" data-view-target="' + safeText(block.modal) + '"><span class="appViewFiltersBtnIcon">' + icon('filters') + '</span><span>' + t('Filters') + '</span></button>' +
  '</div>';
}
export function ticketCards(block) {
  var data = getData();
  var filter = data.filtroTickets || 'All';
  var search = String(readData(data, 'campos.buscar') || '').toLowerCase().trim();
  var visibleCount = 0;

  var html = block.items.map(function (item) {
    var content = (item.id + ' ' + item.titulo + ' ' + item.lugar + ' ' + item.estadoTexto).toLowerCase();
    var passesFilter = filter === 'All' || (item.etiquetas || []).indexOf(filter) !== -1;
    var visible = passesFilter && (!search || content.indexOf(search) !== -1);
    if (visible) visibleCount += 1;

    var ticketCard = '<button class="appViewCard appViewTicketSupport' + (item.prioridad ? ' appViewCard--danger' : '') + '" data-view-action="pantalla" data-view-target="' + safeText(item.to) + '">' +
      '<div class="appViewTicketSupportRow">' +
        '<span class="appViewTicketId">' + t(item.id) + '</span>' +
        '<span class="appViewBadge' + badgeClass(item.badge) + '">' + t(item.badge) + '</span>' +
      '</div>' +
      '<h3 class="appViewTitle appViewTitle--small">' + t(item.titulo) + '</h3>' +
      '<p class="appViewTicketLocation"><span class="appViewTicketPin">' + icon('pin') + '</span>' + t(item.lugar) + '</p>' +
      '<div class="appViewTicketSupportFooter">' +
        '<span class="appViewText appViewText--small">' + t('Status') + ': ' + t(item.estadoTexto) + '</span>' +
        '<span class="appViewCardLink appViewText--small">' + t('View technical sheet') + ' →</span>' +
      '</div>' +
    '</button>';

    return '<div class="appViewListItem' + (visible ? '' : ' appViewHidden') + '" data-view-filter="' + (passesFilter ? '1' : '0') + '" data-view-text="' + safeText(content) + '">' + ticketCard + '</div>';
  }).join('');

  html += '<div class="appViewEmpty' + (visibleCount > 0 ? ' appViewHidden' : '') + '">' +
    '<span class="appViewEmptyIcon">' + icon('search') + '</span>' +
    '<p class="appViewText appViewText--center">' + t('No tickets match your search.') + '</p>' +
  '</div>';

  return '<div class="appViewList" data-view-filterable="1">' + html + '</div>';
}

export function sheetHeader(block) {
  return '<div class="appViewSheetHeader">' +
    '<span class="appViewSheetChip">' + t(block.id) + '</span>' +
    '<span class="appViewBadge appViewBadge--softRed">' + t(block.badge) + '</span>' +
  '</div>';
}

export function photoCard(block) {
  return '<div class="appViewCard">' +
    '<h3 class="appViewCardTitleCaps">' + t(block.titulo) + '</h3>' +
    '<div class="appViewPhotoRow">' +
      '<span class="appViewPhotoFrame" aria-hidden="true"></span>' +
      '<span class="appViewText">' + t(block.texto) + '</span>' +
    '</div>' +
  '</div>';
}

export function dataCard(block) {
  var titleHtml = '';
  if (block.titulo) {
    titleHtml = block.caps
      ? '<h3 class="appViewCardTitleCaps">' + t(block.titulo) + '</h3>'
      : '<h3 class="appViewTitle appViewTitle--small">' + t(block.titulo) + '</h3>';
  }
  var badge = block.badge ? '<span class="appViewBadge' + badgeClass(block.badge) + '">' + t(block.badge) + '</span>' : '';
  var rows = (block.rows || []).map(function (row) {
    var data = Array.isArray(row) ? { etiqueta: row[0], valor: row[1] } : row;
    var right;
    if (data.badge) {
      right = '<span class="appViewDataRight"><span class="appViewBadge' + badgeClass(data.badge) + '">' + t(data.badge) + '</span></span>';
    } else {
      var arrow = data.flecha ? '<span class="appViewDataArrow">' + icon('chevron') + '</span>' : '';
      right = '<span class="appViewDataRight"><strong class="appViewDataValue">' + t(data.valor) + '</strong>' + arrow + '</span>';
    }

    if (data.to) {
      return '<button class="appViewDataRow appViewDataRow--link" data-view-action="pantalla" data-view-target="' + safeText(data.to) + '"><span class="appViewDataLabel">' + t(data.etiqueta) + '</span>' + right + '</button>';
    }
    return '<div class="appViewDataRow"><span class="appViewDataLabel">' + t(data.etiqueta) + '</span>' + right + '</div>';
  }).join('');
  return '<div class="appViewCard">' + badge + titleHtml + '<div class="appViewDataList">' + rows + '</div></div>';
}

export function banner(block) {
  var toneClass = '';
  if (block.tono === 'gris') toneClass = ' appViewBanner--gray';
  if (block.tono === 'azul') toneClass = ' appViewBanner--blue';
  return '<div class="appViewBanner' + toneClass + '">' + t(block.texto) + '</div>';
}

export function summaryCard(block) {
  var rows = (block.items || []).map(function (item) {
    var toneClass = item.tono === 'rojo' ? ' appViewSummaryIcon--red' : '';
    var content = '<span class="appViewFieldBoxLabel">' + t(item.etiqueta) + '</span>';
    if (item.image) {
      content += getData().evidencia
        ? '<span class="appViewSummaryImage">' + icon('image') + '</span>'
        : '<strong class="appViewSummaryValue">' + t('No evidence attached') + '</strong>';
    } else {
      content += '<strong class="appViewSummaryValue">' + t(item.valor) + '</strong>';
    }
    return '<div class="appViewSummaryRow">' +
      '<span class="appViewSummaryIcon' + toneClass + '">' + icon(item.icon || 'doc') + '</span>' +
      '<div class="appViewSummaryBody">' + content + '</div>' +
    '</div>';
  }).join('');
  return '<div class="appViewCard appViewSummary">' + rows + '</div>';
}

export function locationCard(block) {
  var columns = (block.columnas || []).map(function (col) {
    return '<div class="appViewLocationCol"><span class="appViewDataLabel">' + t(col[0]) + '</span><strong class="appViewLocationValue">' + t(col[1]) + '</strong></div>';
  }).join('');
  var verifiedBanner = block.verificada
    ? '<div class="appViewLocationBadge"><span class="appViewLocationLock">' + icon('lock') + '</span>' + t(block.verificada === true ? 'Location verified by QR' : block.verificada) + '</div>'
    : '';
  return '<div class="appViewCard appViewLocation"><div class="appViewLocationCols">' + columns + '</div>' + verifiedBanner + '</div>';
}

export function timeline(items) {
  return '<div class="appViewCard"><div class="appViewTimeline">' + items.map(function (item) {
    var active = item[3];
    var dotClass = active ? 'appViewDot' : 'appViewDot appViewDot--gray';
    if (item[4] === 'pulso') dotClass += ' appViewDot--pulse';
    var titleClass = 'appViewTitle appViewTitle--small' + (active ? '' : ' appViewTimelineTitle--inactive');
    return '<div class="appViewTimelineItem"><span class="' + dotClass + '">' + (active ? icon('check') : '') + '</span><div>' +
      '<h4 class="' + titleClass + '">' + t(item[0]) + '</h4>' +
      (item[1] ? '<p class="appViewText appViewText--small">' + t(item[1]) + '</p>' : '') +
      (item[2] ? '<p class="appViewText appViewText--small">' + t(item[2]) + '</p>' : '') +
    '</div></div>';
  }).join('') + '</div></div>';
}
export function ticketHeader(block) {
  var badge = block.badge ? '<span class="appViewBadge' + badgeClass(block.badge) + '">' + t(block.badge) + '</span>' : '';
  return '<div class="appViewTicketHeader">' +
    '<div class="appViewTicketHeaderRow"><h3 class="appViewTitle">' + t(block.id) + '</h3>' + badge + '</div>' +
    (block.fecha ? '<span class="appViewText appViewText--small">' + t(block.fecha) + '</span>' : '') +
  '</div>';
}
export function reportCards(block) {
  var items = Array.isArray(block) ? block : block.items;

  var html = items.map(function (item) {
    var tag = item.to ? 'button' : 'div';
    var attrs = item.to ? ' data-view-action="pantalla" data-view-target="' + safeText(item.to) + '"' : '';
    return '<' + tag + ' class="appViewCard appViewTicket"' + attrs + '>' +
      '<span class="appViewCardIcon">' + icon(ICON_CATEGORY[item.categoria] || 'doc') + '</span>' +
      '<div class="appViewTicketBody">' +
        '<span class="appViewTicketId">' + t(item.id) + '</span>' +
        '<h3 class="appViewTitle appViewTitle--small">' + t(item.categoria) + '</h3>' +
        '<p class="appViewText appViewText--small">' + t(item.lugar) + '</p>' +
      '</div>' +
      '<span class="appViewBadge' + badgeClass(item.estado) + '">' + t(item.estado) + '</span>' +
    '</' + tag + '>';
  }).join('');

  return '<div class="appViewList">' + html + '</div>';
}
export function scanner(block) {
  var data = getData();
  var detected = !!data.qrDetectado;
  var statusText = detected ? t('QR detected') + '<br>' + t('successfully') : t('Searching for QR code...');
  return '<div class="appViewScanner">' +
    '<button class="appViewScannerArea' + (detected ? ' appViewScannerArea--ok' : '') + '" data-view-action="modal" data-view-target="' + safeText(block.modal) + '" aria-label="' + t('Scanning area') + '">' +
      (detected ? '' : '<span class="appViewScannerLine" aria-hidden="true"></span>') +
      '<span class="appViewScannerStatus' + (detected ? ' appViewScannerStatus--ok' : '') + '">' + statusText + '</span>' +
    '</button>' +
  '</div>';
}
export function sos(block) {
  var sosButton = '<button class="appViewSos ' + (block.docente ? 'appViewSos--teacher' : '') + '"' + actionAttributes(block) + '>' +
    '<span class="appViewSosIcon">!</span><span class="appViewSosText">' + t(block.texto) + '</span>' +
  '</button>';
  if (!block.ayuda) return sosButton;
  return '<div class="appViewSosWrap">' + sosButton +
    '<button class="appViewSosHelp" data-view-action="modal" data-view-target="' + safeText(block.ayuda) + '" aria-label="' + t('What is Classroom S.O.S.') + '">?</button>' +
  '</div>';
}
export function profile(block) {
  return '<div class="appViewCard appViewCard--row">' +
    '<span class="appViewAvatar appViewAvatar--gray">' + t(block.initials) + '</span>' +
    '<div><h3 class="appViewTitle appViewTitle--small">' + t(block.nombre) + '</h3>' +
    '<p class="appViewText appViewText--small">' + t(block.rol) + '</p>' +
    '<p class="appViewText appViewText--small">' + t(block.email) + '</p></div>' +
  '</div>';
}
export function settingsCard(block) {
  var data = getData();
  var titleHtml = block.titulo ? '<h3 class="appViewTitle appViewTitle--small">' + t(block.titulo) + '</h3>' : '';
  var rows = (block.rows || []).map(function (row) {
    var monogram = '<span class="appViewMonogram' + (row.peligro ? ' appViewMonogram--danger' : '') + '">' + safeText(row.insignia) + '</span>';
    var label = '<span class="appViewSettingsLabel' + (row.peligro ? ' appViewSettingsLabel--danger' : '') + '">' + t(row.etiqueta) + '</span>';
    var right = '';
    var tag = 'div';
    var attrs = '';

    if (row.switch) {
      var active = !!readData(data, row.switch);
      right = '<span class="appViewSwitch' + (active ? ' appViewSwitch--on' : '') + '" role="switch" aria-checked="' + (active ? 'true' : 'false') + '"><span class="appViewSwitchKnob"></span></span>';
      tag = 'button';
      attrs = ' data-view-action="toggle" data-view-field="' + safeText(row.switch) + '"';
    } else {
      if (row.flecha) right = '<span class="appViewDataArrow">' + icon('chevron') + '</span>';
      tag = row.to || row.modal ? 'button' : 'div';
      attrs = actionAttributes(row);
    }

    return '<' + tag + ' class="appViewSettingsRow' + (row.peligro ? ' appViewSettingsRow--danger' : '') + '"' + attrs + '>' +
      monogram + label + right +
    '</' + tag + '>';
  }).join('');
  return '<div class="appViewCard appViewSettings">' + titleHtml + '<div class="appViewSettingsList">' + rows + '</div></div>';
}
export function list(items) {
  return '<div class="appViewList">' + items.map(function (item) {
    if (Array.isArray(item)) {
      return '<div class="appViewCard"><p class="appViewText">' + t(item[0]) + '</p><span class="appViewText appViewText--small">' + t(item[1]) + '</span></div>';
    }
    var dot = item.nuevo ? '<span class="appViewNotifDot" aria-label="' + t('Unread') + '"></span>' : '';
    return '<div class="appViewCard appViewNotif' + (item.nuevo ? ' appViewNotif--new' : '') + '">' +
      '<span class="appViewNotifIcon appViewNotifIcon--' + safeText(item.tono || 'blue') + '">' + icon(item.icon || 'bell') + '</span>' +
      '<div class="appViewNotifBody">' +
        '<p class="appViewNotifText">' + t(item.texto) + '</p>' +
        '<span class="appViewText appViewText--small">' + t(item.hora) + '</span>' +
      '</div>' +
      dot +
    '</div>';
  }).join('') + '</div>';
}
export function map(block) {
  var legendHtml = block.leyenda
    ? '<div class="appViewLegend">' + (block.leyenda || []).map(function (item) {
        return '<span class="appViewLegendRow"><i class="appViewLegendDot appViewLegendDot--' + safeText(LEGEND_COLORS[item] || 'gray') + '"></i>' + t(item) + '</span>';
      }).join('') + '</div>'
    : '';

  var buildingBContent = '<span class="appViewMapPin appViewMapPin--red">!</span><span class="appViewBuildingName">' + t('Building B') + '</span>';
  var buildingB = block.estatico
    ? '<div class="appViewBuilding appViewBuilding--b">' + buildingBContent + '</div>'
    : '<button class="appViewBuilding appViewBuilding--b" data-view-action="pantalla" data-view-target="' + safeText(block.to || 'operations-map-selection') + '" aria-label="' + t('View priority incident in building B') + '">' + buildingBContent + '</button>';
  var locateHtml = block.ubicar ? '<span class="appViewMapLocate" aria-hidden="true">' + icon('target') + '</span>' : '';

  return '<div class="appViewMap">' +
    '<span class="appViewMapStreet appViewMapStreet--v" aria-hidden="true"></span>' +
    '<span class="appViewMapStreet appViewMapStreet--h" aria-hidden="true"></span>' +
    '<div class="appViewBuilding appViewBuilding--a">' +
      '<span class="appViewMapPin appViewMapPin--blue">2</span>' +
      '<span class="appViewBuildingName">' + t('Building A') + '</span>' +
    '</div>' +
    buildingB +
    locateHtml +
    legendHtml +
  '</div>';
}

export function legend(items) {
  return '<div class="appViewGrid2">' + items.map(function (item) {
    return '<span class="appViewBadge appViewBadge--gray">' + t(item) + '</span>';
  }).join('') + '</div>';
}

export function mapSheet(block) {
  return '<div class="appViewCard appViewMapSheet">' +
    '<div class="appViewMapSheetHeader">' +
      '<span class="appViewBadge">' + t(block.badge) + '</span>' +
      '<button class="appViewMapSheetClose" data-view-action="pantalla" data-view-target="operations-map" data-view-direction="atras" aria-label="' + t('Close detail') + '">' + icon('x') + '</button>' +
    '</div>' +
    '<h3 class="appViewTitle appViewTitle--small">' + t(block.titulo) + '</h3>' +
    '<p class="appViewTicketLocation"><span class="appViewTicketPin">' + icon('pin') + '</span>' + t(block.texto) + '</p>' +
    button({ texto: 'View technical sheet', to: block.to, variante: 'primario' }) +
  '</div>';
}
