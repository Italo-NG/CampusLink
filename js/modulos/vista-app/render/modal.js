import { icono } from './iconos.js';
import { t, accionAtributos, fijarEstadoRender } from './helpers.js';
import { VISTA_APP_MODALES } from '../datos/index.js';

export function renderizarModalVistaApp(estado) {
  fijarEstadoRender(estado);
  var data = estado.modal ? VISTA_APP_MODALES[estado.modal] : null;
  if (!data) return '';

  var acciones = data.acciones.slice().reverse();
  return '<div class="vistaAppOverlay" data-vista-accion="cerrar-modal" role="dialog" aria-modal="true" aria-labelledby="vistaAppModalTitulo">' +
    '<div class="vistaAppModal">' +
      '<span class="vistaAppModalIcon">' + icono(data.icono === '!' ? 'alert' : (data.icono || 'alert')) + '</span>' +
      '<h3 class="vistaAppTitulo vistaAppTitulo--chico vistaAppTitulo--centro" id="vistaAppModalTitulo">' + t(data.titulo) + '</h3>' +
      '<p class="vistaAppTexto vistaAppTexto--centro">' + t(data.texto) + '</p>' +
      '<div class="vistaAppModalActions">' + acciones.map(function (accion, indice) {
        var clase = 'vistaAppModalAccion' + (indice === 0 ? ' vistaAppModalAccion--destacada' : '');
        return '<button class="' + clase + '"' + accionAtributos(accion) + '>' + t(accion.control) + '</button>';
      }).join('') + '</div>' +
    '</div>' +
  '</div>';
}
