import { icono } from './iconos.js';
import { t, accionAtributos, fijarEstadoRender } from './helpers.js';
import { VISTA_APP_MODALES } from '../datos/index.js';

function sheetGrupo(grupo) {
  var contenido;
  if (grupo.campos) {
    contenido = '<div class="vistaAppSheetUbic">' + grupo.campos.map(function (campo) {
      return '<div class="vistaAppSheetCampo"><span class="vistaAppFieldCajaLabel">' + t(campo[0]) + '</span><span class="vistaAppSheetCampoValor">' + t(campo[1]) + '</span></div>';
    }).join('') + '</div>';
  } else {
    contenido = '<div class="vistaAppSheetChips">' + grupo.chips.map(function (chip) {
      return '<span class="vistaAppChip' + (chip === grupo.activo ? ' vistaAppChip--activa' : '') + '">' + t(chip) + '</span>';
    }).join('') + '</div>';
  }
  return '<div class="vistaAppSheetGrupo"><span class="vistaAppSheetLabel">' + t(grupo.label) + '</span>' + contenido + '</div>';
}

function renderSheetFiltros(data) {
  var grupos = (data.grupos || []).map(sheetGrupo).join('');
  return '<div class="vistaAppOverlay vistaAppOverlay--sheet" data-vista-accion="cerrar-modal" role="dialog" aria-modal="true" aria-label="' + t(data.titulo) + '">' +
    '<div class="vistaAppSheet">' +
      '<span class="vistaAppSheetHandle" aria-hidden="true"></span>' +
      '<div class="vistaAppSheetHead">' +
        '<h3 class="vistaAppTitulo">' + t(data.titulo) + '</h3>' +
        '<button class="vistaAppSheetLimpiar" data-vista-accion="cerrar-modal">Limpiar</button>' +
        '<button class="vistaAppSheetCerrar" data-vista-accion="cerrar-modal" aria-label="Cerrar">' + icono('x') + '</button>' +
      '</div>' +
      '<div class="vistaAppSheetCuerpo">' + grupos + '</div>' +
      '<div class="vistaAppSheetAcciones">' +
        '<button class="vistaAppBoton vistaAppBoton--primario vistaAppBoton--alto" data-vista-accion="cerrar-modal">Aplicar filtros</button>' +
        '<button class="vistaAppBoton vistaAppBoton--texto" data-vista-accion="cerrar-modal">Restablecer</button>' +
      '</div>' +
    '</div>' +
  '</div>';
}

export function renderizarModalVistaApp(estado) {
  fijarEstadoRender(estado);
  var data = estado.modal ? VISTA_APP_MODALES[estado.modal] : null;
  if (!data) return '';
  if (data.tipo === 'sheetFiltros') return renderSheetFiltros(data);

  var acciones = data.acciones.slice().reverse();
  return '<div class="vistaAppOverlay" data-vista-accion="cerrar-modal" role="dialog" aria-modal="true" aria-labelledby="vistaAppModalTitulo">' +
    '<div class="vistaAppModal' + (data.sinIcono ? ' vistaAppModal--sinIcono' : '') + '">' +
      (data.sinIcono ? '' : '<span class="vistaAppModalIcon">' + icono(data.icono === '!' ? 'alert' : (data.icono || 'alert')) + '</span>') +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro" id="vistaAppModalTitulo">' + t(data.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.texto) + '</p>' +
      '<div class="vistaAppModalActions">' + acciones.map(function (accion, indice) {
        var clase = 'vistaAppModalAccion' + (indice === 0 ? ' vistaAppModalAccion--destacada' : '');
        return '<button class="' + clase + '"' + accionAtributos(accion) + '>' + t(accion.control) + '</button>';
      }).join('') + '</div>' +
    '</div>' +
  '</div>';
}
