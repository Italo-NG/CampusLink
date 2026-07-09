import { icon } from './icons.js';
import { APP_VIEW_RULES } from '../data/index.js';
import { translateText } from '../../i18n.js';

var currentState = null;
export function setRenderState(state) { currentState = state; }
export function getData() { return currentState ? currentState.datos : null; }

export function safeText(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function applyTemplate(value) {
  var text = String(value == null ? '' : value);
  if (text.indexOf('{') === -1) return text;

  var data = getData();
  if (!data) return text;

  return text
    .replace(/\{sede\}/g, data.sede || 'Monterrico')
    .replace(/\{categoria\}/g, data.categoria || 'Cleaning')
    .replace(/\{descripcion\}/g, data.descripcion || 'Soda was spilled in the classroom')
    .replace(/\{evidencia\}/g, data.evidencia ? 'Image uploaded successfully' : 'No evidence attached')
    .replace(/\{problema\}/g, data.problema || 'Projector')
    .replace(/\{motivoReapertura\}/g, data.motivoReapertura || 'The projector failed again after service.')
    .replace(/\{ubicacion\}/g, (data.sede || 'Monterrico') + ' · Building B · Room B-301');
}

export function t(value) {
  return safeText(translateText(applyTemplate(value)));
}

export function translateValue(value) {
  return translateText(applyTemplate(value));
}

export function slugField(text) {
  return String(text || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function actionAttributes(item) {
  if (!item || item.disabled) return '';

  if (item.role) {
    return ' data-view-action="rol" data-view-target="' + safeText(item.role) + '"';
  }
  if (item.continuarRol) {
    return ' data-view-action="continuar-rol"';
  }
  if (item.accion === 'escanear') {
    return ' data-view-action="escanear"';
  }
  if (item.validar) {
    return ' data-view-action="validar-ir" data-view-fields="' + safeText(item.validar) + '" data-view-target="' + safeText(item.to) + '"';
  }
  if (item.modal) {
    return ' data-view-action="modal" data-view-target="' + safeText(item.modal) + '"';
  }
  if (item.to) {
    return ' data-view-action="pantalla" data-view-target="' + safeText(item.to) + '"' + (item.atras ? ' data-view-direction="atras"' : '');
  }
  if (item.tipo === 'cerrar') {
    return ' data-view-action="cerrar-modal"';
  }
  if (item.tipo === 'logout') {
    return ' data-view-action="logout"';
  }
  if (item.tipo === 'modal') {
    return ' data-view-action="modal" data-view-target="' + safeText(item.destino) + '"';
  }
  if (item.tipo === 'pantalla') {
    return ' data-view-action="pantalla" data-view-target="' + safeText(item.destino) + '"';
  }
  return '';
}
export function button(item) {
  var variante = item.variante || 'secundario';
  var classes = 'appViewButton appViewButton--' + variante + (item.clase ? ' ' + item.clase : '');
  var attrs = actionAttributes(item);
  var disabled = item.disabled ? ' disabled' : '';

  if (item.habilitaCon) {
    attrs += ' data-view-enables-with="' + safeText(item.habilitaCon) + '"';
    var rule = APP_VIEW_RULES[item.habilitaCon];
    if (rule && !rule(getData())) disabled = ' disabled';
  }

  var content = item.icon ? '<span class="appViewButtonIcon">' + icon(item.icon) + '</span>' : '';
  if (item.destacado) {
    content += '<span class="appViewButtonNormal">' + t(item.texto) + '</span> <strong class="appViewButtonHighlight">' + t(item.destacado) + '</strong>';
  } else {
    content += '<span>' + t(item.texto) + '</span>';
  }
  return '<button class="' + classes + '"' + attrs + disabled + '>' + content + '</button>';
}
export function normalizeField(field) {
  if (Array.isArray(field)) {
    return { etiqueta: field[0], placeholder: field[1] || '' };
  }
  return field;
}

export function autoFieldType(field) {
  if (field.tipo) return field.tipo;
  var label = field.etiqueta || '';
  if (label.indexOf('assword') !== -1) return 'clave';
  if (label.indexOf('mail') !== -1) return 'correo';
  if (label.indexOf('Search') === 0) return 'busqueda';
  return 'texto';
}
