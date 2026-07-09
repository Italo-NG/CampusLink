import { icon } from './icons.js';
import { t, actionAttributes, setRenderState } from './helpers.js';
import { APP_VIEW_MODALS } from '../data/index.js';

function sheetGroup(group) {
  var content;
  if (group.campos) {
    content = '<div class="appViewSheetLocation">' + group.campos.map(function (field) {
      return '<div class="appViewSheetField"><span class="appViewFieldBoxLabel">' + t(field[0]) + '</span><span class="appViewSheetFieldValue">' + t(field[1]) + '</span></div>';
    }).join('') + '</div>';
  } else {
    content = '<div class="appViewSheetChips">' + group.chips.map(function (chip) {
      return '<span class="appViewChip' + (chip === group.activo ? ' appViewChip--active' : '') + '">' + t(chip) + '</span>';
    }).join('') + '</div>';
  }
  return '<div class="appViewSheetGroup"><span class="appViewSheetLabel">' + t(group.label) + '</span>' + content + '</div>';
}

function renderFilterSheet(data) {
  var groups = (data.grupos || []).map(sheetGroup).join('');
  return '<div class="appViewOverlay appViewOverlay--sheet" data-view-action="cerrar-modal" role="dialog" aria-modal="true" aria-label="' + t(data.titulo) + '">' +
    '<div class="appViewSheet">' +
      '<span class="appViewSheetHandle" aria-hidden="true"></span>' +
      '<div class="appViewSheetHead">' +
        '<h3 class="appViewTitle">' + t(data.titulo) + '</h3>' +
        '<button class="appViewSheetClear" data-view-action="cerrar-modal">' + t('Clear') + '</button>' +
        '<button class="appViewSheetClose" data-view-action="cerrar-modal" aria-label="' + t('Close') + '">' + icon('x') + '</button>' +
      '</div>' +
      '<div class="appViewSheetBody">' + groups + '</div>' +
      '<div class="appViewSheetActions">' +
        '<button class="appViewButton appViewButton--primary appViewButton--tall" data-view-action="cerrar-modal">' + t('Apply filters') + '</button>' +
        '<button class="appViewButton appViewButton--text" data-view-action="cerrar-modal">' + t('Reset') + '</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderAppViewModal(state) {
  setRenderState(state);
  var data = state.modal ? APP_VIEW_MODALS[state.modal] : null;
  if (!data) return '';
  if (data.tipo === 'sheetFiltros') return renderFilterSheet(data);

  var actions = data.acciones.slice().reverse();
  return '<div class="appViewOverlay" data-view-action="cerrar-modal" role="dialog" aria-modal="true" aria-labelledby="appViewModalTitle">' +
    '<div class="appViewModal' + (data.sinIcono ? ' appViewModal--noIcon' : '') + '">' +
      (data.sinIcono ? '' : '<span class="appViewModalIcon">' + icon(data.icon === '!' ? 'alert' : (data.icon || 'alert')) + '</span>') +
      '<h3 class="appViewTitle appViewTitle--small appViewTitle--center" id="appViewModalTitle">' + t(data.titulo) + '</h3>' +
      '<p class="appViewText appViewText--center">' + t(data.texto) + '</p>' +
      '<div class="appViewModalActions">' + actions.map(function (action, index) {
        var clase = 'appViewModalAction' + (index === 0 ? ' appViewModalAction--highlighted' : '');
        return '<button class="' + clase + '"' + actionAttributes(action) + '>' + t(action.control) + '</button>';
      }).join('') + '</div>' +
    '</div>' +
  '</div>';
}
