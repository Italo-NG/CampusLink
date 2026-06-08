export function inicializarMenu() {
  var alternador = document.querySelector('.navAlternar');
  var navegacion = document.getElementById('nav-principal');

  if (!alternador || !navegacion) return;

  function cerrarMenu() {
    alternador.setAttribute('aria-expanded', 'false');
    navegacion.classList.remove('estaAbierto');
  }

  function abrirMenu() {
    alternador.setAttribute('aria-expanded', 'true');
    navegacion.classList.add('estaAbierto');
  }

  alternador.addEventListener('click', function () {
    var estaAbierto = alternador.getAttribute('aria-expanded') === 'true';
    if (estaAbierto) {
      cerrarMenu();
    } else {
      abrirMenu();
    }
  });

  var enlaces = navegacion.querySelectorAll('a');
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', cerrarMenu);
  }

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      cerrarMenu();
    }
  });
}
