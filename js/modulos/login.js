import { traducirTexto } from './i18n.js';

export function inicializarLogin() {
  var formulario = document.getElementById('formulario-login');
  if (!formulario) return;

  var correo = document.getElementById('correo');
  var clave = document.getElementById('clave');
  var estado = document.getElementById('login-estado');
  var acciones = formulario.querySelectorAll('[data-login-accion]');
  var dominioPermitido = '@upc.edu.pe';

  function campoDe(input) {
    return input.closest('[data-login-campo]');
  }

  function errorDe(input) {
    return document.getElementById(input.id + '-error');
  }

  function limpiarCampo(input) {
    input.setCustomValidity('');
    input.removeAttribute('aria-invalid');
    var campo = campoDe(input);
    var error = errorDe(input);
    if (campo) campo.classList.remove('estaInvalido');
    if (error) error.textContent = '';
  }

  function marcarCampo(input, mensaje) {
    var texto = traducirTexto(mensaje);
    input.setCustomValidity(texto);
    input.setAttribute('aria-invalid', 'true');
    var campo = campoDe(input);
    var error = errorDe(input);
    if (campo) campo.classList.add('estaInvalido');
    if (error) error.textContent = texto;
  }

  function mostrarEstado(mensaje, error) {
    estado.textContent = traducirTexto(mensaje);
    estado.classList.toggle('estaError', !!error);
  }

  function validarCorreo() {
    var valor = correo.value.trim().toLowerCase();
    limpiarCampo(correo);

    if (!valor) {
      marcarCampo(correo, 'Ingresa tu correo institucional.');
      return false;
    }

    if (!correo.validity.valid) {
      marcarCampo(correo, 'Escribe un correo v\u00e1lido.');
      return false;
    }

    if (!valor.endsWith(dominioPermitido)) {
      marcarCampo(correo, 'Solo se permiten correos institucionales UPC.');
      return false;
    }

    return true;
  }

  function validarClave() {
    limpiarCampo(clave);

    if (!clave.value) {
      marcarCampo(clave, 'Ingresa tu contrase\u00f1a.');
      return false;
    }

    if (clave.value.length < 8) {
      marcarCampo(clave, 'La contrase\u00f1a debe tener al menos 8 caracteres.');
      return false;
    }

    return true;
  }

  correo.addEventListener('input', function () {
    limpiarCampo(correo);
    mostrarEstado('', false);
  });

  clave.addEventListener('input', function () {
    limpiarCampo(clave);
    mostrarEstado('', false);
  });

  for (var i = 0; i < acciones.length; i++) {
    acciones[i].addEventListener('click', function () {
      var accion = this.getAttribute('data-login-accion');
      if (accion === 'recuperar') {
        mostrarEstado('Recupera tu contrase\u00f1a desde los canales oficiales de UPC', false);
      }
      if (accion === 'registro') {
        mostrarEstado('Solicita el registro con tu correo institucional UPC', false);
      }
    });
  }

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var correoValido = validarCorreo();
    var claveValida = validarClave();

    if (!correoValido || !claveValida) {
      mostrarEstado('Revisa los campos marcados para continuar.', true);
      formulario.reportValidity();
      if (!correoValido) {
        correo.focus();
      } else {
        clave.focus();
      }
      return;
    }

    mostrarEstado('Tus datos son v\u00e1lidos. Acceso concedido', false);
  });
}
