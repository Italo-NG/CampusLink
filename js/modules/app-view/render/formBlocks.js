import { icon } from './icons.js';
import { t, safeText, slugField, actionAttributes, normalizeField, autoFieldType, getData, translateValue } from './helpers.js';
import { readData } from '../data/index.js';

export function fieldInput(fieldRaw, extraClass) {
  var field = normalizeField(fieldRaw);
  var path = field.field || 'campos.' + slugField(field.etiqueta);
  var fieldType = autoFieldType(field);
  var data = getData();

  var value = readData(data, path);
  if (value == null) value = field.valor || '';

  var required = !!data.requeridos[path];
  var commonAttrs = ' data-view-field="' + safeText(path) + '" placeholder="' + safeText(translateValue(field.placeholder || '')) + '"';
  var control;

  if (field.dentro) {
    var visibleInline = !!data.clavesVisibles[path];
    var eyeButton = fieldType === 'clave'
      ? '<button class="appViewInputEye" type="button" data-view-action="toggle-clave" data-view-field="' + safeText(path) + '" aria-label="' + t('Show or hide password') + '">' + icon(visibleInline ? 'eye-off' : 'eye') + '</button>'
      : '';
    var typeInline = fieldType === 'clave' ? (visibleInline ? 'text' : 'password') : (fieldType === 'correo' ? 'email' : 'text');
    var errorInline = required && field.mensajeRequerido
      ? '<span class="appViewFieldError">' + t(field.mensajeRequerido) + '</span>'
      : '';
    return '<label class="appViewField appViewFieldBox' + (required ? ' appViewField--error' : '') + '" data-view-field-wrapper="' + safeText(path) + '">' +
      '<span class="appViewFieldBoxLabel">' + t(field.etiqueta) + '</span>' +
      '<input class="appViewInputPlain" type="' + typeInline + '" value="' + safeText(value) + '"' + commonAttrs + ' />' +
      eyeButton +
    '</label>';
  }

  if (field.multilinea) {
    control = '<textarea class="appViewInput appViewInput--area' + (extraClass || '') + '" rows="' + (field.filas || 3) + '"' + commonAttrs + '>' + safeText(value) + '</textarea>';
  } else if (fieldType === 'clave') {
    var visible = !!data.clavesVisibles[path];
    control = '<span class="appViewInputGroup">' +
      '<input class="appViewInput' + (extraClass || '') + '" type="' + (visible ? 'text' : 'password') + '" value="' + safeText(value) + '"' + commonAttrs + ' />' +
      '<button class="appViewInputEye" type="button" data-view-action="toggle-clave" data-view-field="' + safeText(path) + '" aria-label="' + t('Show or hide password') + '">' + icon(visible ? 'eye-off' : 'eye') + '</button>' +
    '</span>';
  } else if (fieldType === 'busqueda') {
    return '<label class="appViewSearch">' +
      '<span class="appViewSearchIcon">' + icon('search') + '</span>' +
      '<input class="appViewInput appViewInput--search" type="search" value="' + safeText(value) + '"' + commonAttrs + ' aria-label="' + t(field.etiqueta) + '" />' +
    '</label>';
  } else {
    var htmlType = fieldType === 'correo' ? 'email' : 'text';
    control = '<input class="appViewInput' + (extraClass || '') + '" type="' + htmlType + '" value="' + safeText(value) + '"' + commonAttrs + ' />';
  }

  var error = required && field.mensajeRequerido
    ? '<span class="appViewFieldError">' + t(field.mensajeRequerido) + '</span>'
    : '';

  return '<label class="appViewField' + (required ? ' appViewField--error' : '') + '" data-view-field-wrapper="' + safeText(path) + '">' +
    '<span class="appViewFieldLabel' + (field.suave ? ' appViewFieldLabel--soft' : '') + '">' + t(field.etiqueta) + '</span>' +
    control +
    error +
  '</label>';
}
export function inputs(fields) {
  return '<div class="appViewFields">' + fields.map(function (field) {
    return fieldInput(field, '');
  }).join('') + '</div>';
}

export function authFields(fields) {
  return '<div class="appViewAuthFields">' + fields.map(function (field) {
    return fieldInput(field, ' appViewInput--auth');
  }).join('') + '</div>';
}

export function selectRow(items) {
  return '<div class="appViewSelectRow">' + items.map(function (item) {
    var data = Array.isArray(item) ? { etiqueta: item[0], valor: item[1] } : item;
    var className = 'appViewFieldBox appViewFieldBox--select' + (data.activo ? ' appViewFieldBox--active' : '');
    return '<div class="' + className + '"><span class="appViewFieldBoxLabel">' + t(data.etiqueta) + '</span><strong class="appViewFieldBoxValue">' + t(data.valor) + '</strong></div>';
  }).join('') + '</div>';
}

export function options(block) {
  var field = block.field || null;
  var data = getData();

  var rows = block.items.map(function (item) {
    var active = field ? readData(data, field) === item.texto : !!item.active;
    var attrs;
    if (field) {
      attrs = ' data-view-action="seleccion" data-view-field="' + safeText(field) + '" data-view-value="' + safeText(item.texto) + '"';
      if (item.to || block.to) attrs += ' data-view-target="' + safeText(item.to || block.to) + '" data-view-direction="atras"';
    } else {
      attrs = actionAttributes(item);
    }
    var rightIcon = active ? icon('check') : (block.flecha ? icon('chevron') : '');

    if (block.agrupado) {
      return '<button class="appViewOptionRow' + (active ? ' appViewOptionRow--active' : '') + '"' + attrs + '><span>' + t(item.texto) + '</span><span class="appViewOptionIcon">' + rightIcon + '</span></button>';
    }
    return '<button class="appViewOption ' + (active ? 'appViewOption--active' : '') + '"' + attrs + '><span>' + t(item.texto) + '</span><span class="appViewOptionIcon">' + rightIcon + '</span></button>';
  }).join('');

  if (block.agrupado) {
    return '<div class="appViewCard appViewOptionsGroup">' + rows + '</div>';
  }
  return '<div class="appViewButtonGroup">' + rows + '</div>';
}

export function categoryGrid(block) {
  var field = block.field || null;
  var data = getData();
  return '<div class="appViewChips">' + block.items.map(function (item) {
    var itemData = typeof item === 'string' ? { texto: item } : item;
    var active = field ? readData(data, field) === itemData.texto : false;
    var attrs;
    if (field) {
      attrs = ' data-view-action="seleccion" data-view-field="' + safeText(field) + '" data-view-value="' + safeText(itemData.texto) + '"';
      if (itemData.modal) attrs += ' data-view-modal="' + safeText(itemData.modal) + '"';
      if (itemData.to) attrs += ' data-view-target="' + safeText(itemData.to) + '"';
    } else {
      attrs = actionAttributes(itemData);
    }
    return '<button class="appViewChip' + (active ? ' appViewChip--active' : '') + '"' + attrs + '>' + t(itemData.texto) + '</button>';
  }).join('') + '</div>';
}

export function upload(block) {
  if (!block.field) {
    var tag = block.to || block.modal ? 'button' : 'div';
    return '<' + tag + ' class="appViewUpload"' + actionAttributes(block) + '><span class="appViewUploadIcon">' + icon(block.icon || 'camera') + '</span><span>' + t(block.texto) + '</span></' + tag + '>';
  }

  var data = getData();
  var loaded = !!readData(data, block.field);
  var text = loaded ? (block.textoCargada || 'Image uploaded successfully') : (block.texto || 'Add photo');
  return '<button class="appViewUpload appViewUpload--field' + (loaded ? ' appViewUpload--loaded' : '') + '" data-view-action="toggle" data-view-field="' + safeText(block.field) + '">' +
    '<span class="appViewUploadIcon">' + icon(loaded ? 'image' : 'camera') + '</span>' +
    '<span class="appViewUploadText">' + t(text) + '</span>' +
    (loaded ? '<span class="appViewUploadRemove" aria-hidden="true">' + icon('x') + '</span>' : '') +
  '</button>';
}

export function segmented(block) {
  var data = getData();
  return '<div class="appViewSegmented">' + block.items.map(function (item) {
    var active = block.field ? readData(data, block.field) === item.texto : item.texto === block.active;
    var attrs;
    if (block.field) {
      attrs = ' data-view-action="seleccion" data-view-field="' + safeText(block.field) + '" data-view-value="' + safeText(item.texto) + '"';
    } else {
      attrs = actionAttributes(item);
    }
    return '<button class="' + (active ? 'isActive' : '') + '"' + attrs + '>' + t(item.texto) + '</button>';
  }).join('') + '</div>';
}
export function checkRow(block) {
  var data = getData();
  var active = !!readData(data, block.field);
  return '<button class="appViewCheckRow' + (active ? ' appViewCheckRow--active' : '') + '" data-view-action="toggle" data-view-field="' + safeText(block.field) + '" role="checkbox" aria-checked="' + (active ? 'true' : 'false') + '">' +
    '<span class="appViewCheck">' + (active ? icon('check') : '') + '</span>' +
    '<span>' + t(block.texto) + '</span>' +
  '</button>';
}
export function rating(block) {
  var data = getData();
  var selected = data.rating || 0;
  var stars = [1, 2, 3, 4, 5].map(function (level) {
    var active = level <= selected;
    return '<button class="appViewStar' + (active ? ' appViewStar--active' : '') + '" data-view-action="seleccion" data-view-field="rating" data-view-value="' + level + '" aria-label="' + t('Rate with ' + level + (level === 1 ? ' star' : ' stars')) + '">' + icon('star') + '</button>';
  }).join('');
  return '<div class="appViewRating" role="radiogroup" aria-label="' + t('Service rating') + '">' + stars + '</div>';
}
