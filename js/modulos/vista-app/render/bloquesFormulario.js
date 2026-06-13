import { icono } from './iconos.js';
import { t, textoSeguro, slugCampo, accionAtributos, normalizarCampo, autoTipoCampo, obtenerDatos } from './helpers.js';
import { leerDato } from '../datos/index.js';

export function campoInput(fieldRaw, claseExtra) {
  var field = normalizarCampo(fieldRaw);
  var ruta = field.campo || 'campos.' + slugCampo(field.etiqueta);
  var tipo = autoTipoCampo(field);
  var datos = obtenerDatos();

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
export function inputs(fields) {
  return '<div class="vistaAppCampos">' + fields.map(function (field) {
    return campoInput(field, '');
  }).join('') + '</div>';
}

export function authFields(fields) {
  return '<div class="vistaAppAuthFields">' + fields.map(function (field) {
    return campoInput(field, ' vistaAppInput--auth');
  }).join('') + '</div>';
}

export function selectRow(items) {
  return '<div class="vistaAppSelectRow">' + items.map(function (item) {
    var data = Array.isArray(item) ? { etiqueta: item[0], valor: item[1] } : item;
    var clase = 'vistaAppFieldCaja vistaAppFieldCaja--select' + (data.activo ? ' vistaAppFieldCaja--activa' : '');
    return '<div class="' + clase + '"><span class="vistaAppFieldCajaLabel">' + t(data.etiqueta) + '</span><strong class="vistaAppFieldCajaValor">' + t(data.valor) + '</strong></div>';
  }).join('') + '</div>';
}

export function options(block) {
  var campo = block.campo || null;
  var datos = obtenerDatos();

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

export function categoryGrid(block) {
  var campo = block.campo || null;
  var datos = obtenerDatos();
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

export function upload(block) {
  if (!block.campo) {
    var tag = block.to || block.modal ? 'button' : 'div';
    return '<' + tag + ' class="vistaAppUpload"' + accionAtributos(block) + '><span class="vistaAppUploadIcono">' + icono(block.icono || 'camara') + '</span><span>' + t(block.texto) + '</span></' + tag + '>';
  }

  var datos = obtenerDatos();
  var cargada = !!leerDato(datos, block.campo);
  var texto = cargada ? (block.textoCargada || 'Imagen cargada correctamente') : (block.texto || 'Agregar foto');
  return '<button class="vistaAppUpload vistaAppUpload--campo' + (cargada ? ' vistaAppUpload--cargada' : '') + '" data-vista-accion="toggle" data-vista-campo="' + textoSeguro(block.campo) + '">' +
    '<span class="vistaAppUploadIcono">' + icono(cargada ? 'imagen' : 'camara') + '</span>' +
    '<span class="vistaAppUploadTexto">' + t(texto) + '</span>' +
    (cargada ? '<span class="vistaAppUploadQuitar" aria-hidden="true">' + icono('x') + '</span>' : '') +
  '</button>';
}

export function segmented(block) {
  var datos = obtenerDatos();
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
export function checkRow(block) {
  var datos = obtenerDatos();
  var activo = !!leerDato(datos, block.campo);
  return '<button class="vistaAppCheckRow' + (activo ? ' vistaAppCheckRow--activo' : '') + '" data-vista-accion="toggle" data-vista-campo="' + textoSeguro(block.campo) + '" role="checkbox" aria-checked="' + (activo ? 'true' : 'false') + '">' +
    '<span class="vistaAppCheck">' + (activo ? icono('check') : '') + '</span>' +
    '<span>' + t(block.texto) + '</span>' +
  '</button>';
}
export function rating(block) {
  var datos = obtenerDatos();
  var seleccion = datos.rating || 0;
  var estrellas = [1, 2, 3, 4, 5].map(function (valor) {
    var activa = valor <= seleccion;
    return '<button class="vistaAppEstrella' + (activa ? ' vistaAppEstrella--activa' : '') + '" data-vista-accion="seleccion" data-vista-campo="rating" data-vista-valor="' + valor + '" aria-label="Calificar con ' + valor + (valor === 1 ? ' estrella' : ' estrellas') + '">' + icono('estrella') + '</button>';
  }).join('');
  return '<div class="vistaAppRating" role="radiogroup" aria-label="Calificación de la atención">' + estrellas + '</div>';
}
