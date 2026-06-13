// vista-app/render/helpers.js — estado de render compartido + utilidades base (escape, plantillas, acciones, boton)
import { icono } from './iconos.js';
import { VISTA_APP_REGLAS } from '../datos/index.js';

var estadoActual = null;
export function fijarEstadoRender(estado) { estadoActual = estado; }
export function obtenerEstado() { return estadoActual; }
export function obtenerDatos() { return estadoActual ? estadoActual.datos : null; }

export function textoSeguro(valor) {
  return String(valor == null ? '' : valor)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function plantilla(valor) {
  var texto = String(valor == null ? '' : valor);
  if (texto.indexOf('{') === -1) return texto;

  var datos = obtenerDatos();
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

export function t(valor) {
  return textoSeguro(plantilla(valor));
}

export function slugCampo(texto) {
  return String(texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function accionAtributos(item) {
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
export function boton(item) {
  var variante = item.variante || 'secundario';
  var clases = 'vistaAppBoton vistaAppBoton--' + variante + (item.clase ? ' ' + item.clase : '');
  var atributos = accionAtributos(item);
  var disabled = item.disabled ? ' disabled' : '';

  if (item.habilitaCon) {
    atributos += ' data-vista-habilita-con="' + textoSeguro(item.habilitaCon) + '"';
    var regla = VISTA_APP_REGLAS[item.habilitaCon];
    if (regla && !regla(obtenerDatos())) disabled = ' disabled';
  }

  var contenido = item.icono ? '<span class="vistaAppBotonIcon">' + icono(item.icono) + '</span>' : '';
  if (item.destacado) {
    contenido += '<span class="vistaAppBotonNormal">' + t(item.texto) + '</span> <strong class="vistaAppBotonDestacado">' + t(item.destacado) + '</strong>';
  } else {
    contenido += '<span>' + t(item.texto) + '</span>';
  }
  return '<button class="' + clases + '"' + atributos + disabled + '>' + contenido + '</button>';
}
export function normalizarCampo(field) {
  if (Array.isArray(field)) {
    return { etiqueta: field[0], placeholder: field[1] || '' };
  }
  return field;
}

export function autoTipoCampo(field) {
  if (field.tipo) return field.tipo;
  var etiqueta = field.etiqueta || '';
  if (etiqueta.indexOf('ontraseña') !== -1) return 'clave';
  if (etiqueta.indexOf('orreo') !== -1) return 'correo';
  if (etiqueta.indexOf('Buscar') === 0) return 'busqueda';
  return 'texto';
}
