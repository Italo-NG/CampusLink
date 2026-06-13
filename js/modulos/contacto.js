export function inicializarContacto() {
  var formulario = document.getElementById('formulario-contacto');

  if (!formulario) return;

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();
  });
}
