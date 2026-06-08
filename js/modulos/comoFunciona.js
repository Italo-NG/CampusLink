export function inicializarComoFunciona() {
  var seccionComo = document.querySelector('#como-funciona');
  var comoLista = seccionComo ? seccionComo.querySelector('.comoLista') : null;
  var botonesComo = seccionComo ? seccionComo.querySelectorAll('[data-como-paso]') : [];
  var imagenesComo = seccionComo ? seccionComo.querySelectorAll('[data-como-imagen]') : [];

  if (!seccionComo || !comoLista || botonesComo.length === 0 || imagenesComo.length === 0 || botonesComo.length !== imagenesComo.length) return;

  var indiceComoActivo = 0;

  imagenesComo.forEach(function (figura) {
    var imagen = figura.querySelector('img');
    if (imagen && typeof imagen.decode === 'function') {
      imagen.decode().catch(function () {});
    }
  });

  function mostrarPaso(indice) {
    indiceComoActivo = indice;

    botonesComo.forEach(function (boton, botonIndice) {
      var paso = boton.parentElement;

      if (botonIndice === indice) {
        boton.setAttribute('aria-current', 'step');
      } else {
        paso.classList.remove('estaActivo');
        boton.removeAttribute('aria-current');
      }
    });

    var pasoActivo = botonesComo[indice].parentElement;
    pasoActivo.classList.remove('estaActivo');
    void pasoActivo.offsetWidth;
    pasoActivo.classList.add('estaActivo');

    imagenesComo.forEach(function (imagen, imagenIndice) {
      if (imagenIndice === indice) {
        imagen.classList.add('estaActivo');
        imagen.removeAttribute('aria-hidden');
      } else {
        imagen.classList.remove('estaActivo');
        imagen.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function avanzarPaso() {
    var siguienteIndice = indiceComoActivo + 1;

    if (siguienteIndice >= botonesComo.length) {
      siguienteIndice = 0;
    }

    mostrarPaso(siguienteIndice);
  }

  comoLista.addEventListener('animationend', function (evento) {
    if (evento.animationName !== 'comoBarraActiva') {
      return;
    }
    avanzarPaso();
  });

  botonesComo.forEach(function (boton, indice) {
    boton.addEventListener('click', function () {
      mostrarPaso(indice);
    });
  });
}
