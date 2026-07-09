import { translateText } from './i18n.js';

export function initLogin() {
  var form = document.getElementById('login-form');
  if (!form) return;

  var email = document.getElementById('email');
  var password = document.getElementById('password');
  var status = document.getElementById('login-status');
  var actions = form.querySelectorAll('[data-login-action]');
  var allowedDomain = '@upc.edu.pe';

  function fieldOf(input) {
    return input.closest('[data-login-field]');
  }

  function errorOf(input) {
    return document.getElementById(input.id + '-error');
  }

  function clearField(input) {
    input.setCustomValidity('');
    input.removeAttribute('aria-invalid');
    var field = fieldOf(input);
    var error = errorOf(input);
    if (field) field.classList.remove('isInvalid');
    if (error) error.textContent = '';
  }

  function markField(input, message) {
    var text = translateText(message);
    input.setCustomValidity(text);
    input.setAttribute('aria-invalid', 'true');
    var field = fieldOf(input);
    var error = errorOf(input);
    if (field) field.classList.add('isInvalid');
    if (error) error.textContent = text;
  }

  function showStatus(message, error) {
    status.textContent = translateText(message);
    status.classList.toggle('isError', !!error);
  }

  function validateEmail() {
    var value = email.value.trim().toLowerCase();
    clearField(email);

    if (!value) {
      markField(email, 'Enter your institutional email.');
      return false;
    }

    if (!email.validity.valid) {
      markField(email, 'Enter a valid email.');
      return false;
    }

    if (!value.endsWith(allowedDomain)) {
      markField(email, 'Only UPC institutional emails are allowed.');
      return false;
    }

    return true;
  }

  function validatePassword() {
    clearField(password);

    if (!password.value) {
      markField(password, 'Enter your password.');
      return false;
    }

    if (password.value.length < 8) {
      markField(password, 'The password must be at least 8 characters long.');
      return false;
    }

    return true;
  }

  email.addEventListener('input', function () {
    clearField(email);
    showStatus('', false);
  });

  password.addEventListener('input', function () {
    clearField(password);
    showStatus('', false);
  });

  for (var i = 0; i < actions.length; i++) {
    actions[i].addEventListener('click', function () {
      var action = this.getAttribute('data-login-action');
      if (action === 'recuperar') {
        showStatus('Recover your password through UPC’s official channels', false);
      }
      if (action === 'registro') {
        showStatus('Request registration with your UPC institutional email', false);
      }
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var emailValid = validateEmail();
    var passwordValid = validatePassword();

    if (!emailValid || !passwordValid) {
      showStatus('Review the marked fields to continue.', true);
      form.reportValidity();
      if (!emailValid) {
        email.focus();
      } else {
        password.focus();
      }
      return;
    }

    showStatus('Your data is valid. Access granted', false);
  });
}
