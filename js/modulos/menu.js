export function inicializarMenu() {
  var alternador = document.querySelector('.navAlternar');
  var navegacion = document.getElementById('nav-principal');

  if (!alternador || !navegacion) return;

  var grupos = navegacion.querySelectorAll('.navGrupo');

  function cerrarGrupos() {
    for (var i = 0; i < grupos.length; i++) {
      grupos[i].removeAttribute('data-abierto');
      var disparador = grupos[i].querySelector('.navGrupoDisparador');
      if (disparador) disparador.setAttribute('aria-expanded', 'false');
    }
  }

  function cerrarMenu() {
    alternador.setAttribute('aria-expanded', 'false');
    navegacion.classList.remove('estaAbierto');
    cerrarGrupos();
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

  for (var g = 0; g < grupos.length; g++) {
    (function (grupo) {
      var disparador = grupo.querySelector('.navGrupoDisparador');
      if (!disparador) return;
      disparador.addEventListener('click', function () {
        var abierto = grupo.getAttribute('data-abierto') === 'true';
        cerrarGrupos();
        if (!abierto) {
          grupo.setAttribute('data-abierto', 'true');
          disparador.setAttribute('aria-expanded', 'true');
        }
      });
    })(grupos[g]);
  }

  var enlaces = navegacion.querySelectorAll('a');
  for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', cerrarMenu);
  }

  document.addEventListener('keydown', function (evento) {
    if (evento.key === 'Escape') {
      cerrarMenu();
    }
  });

  document.addEventListener('click', function (evento) {
    var dentro = evento.target.closest && evento.target.closest('.cabeceraSitio');
    if (!dentro) {
      cerrarMenu();
    }
  });
}
