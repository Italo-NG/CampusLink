// Seccion "Como funciona": la tarjeta y la imagen activas avanzan en sincronia
// con la barra de progreso, y tambien se pueden seleccionar con un click.
export function inicializarComoFunciona() {
  var seccionComo = document.querySelector('#como-funciona');
  var comoLista = seccionComo ? seccionComo.querySelector('.comoLista') : null;
  var botonesComo = seccionComo ? seccionComo.querySelectorAll('[data-como-paso]') : [];
  var imagenesComo = seccionComo ? seccionComo.querySelectorAll('[data-como-imagen]') : [];

  // Si falta algo o los conteos no coinciden, salimos sin romper la consola.
  if (!seccionComo || !comoLista || botonesComo.length === 0 || imagenesComo.length === 0 || botonesComo.length !== imagenesComo.length) return;

  var indiceComoActivo = 0;

  // Pre-decodifica las imagenes al cargar para pagar por adelantado el coste de
  // la primera decodificacion; asi la barra no se traba la primera vez que se
  // muestra cada card.
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

    // Reinicia la animacion de la barra del paso activo (quitar la clase,
    // forzar un reflujo y volver a ponerla la hace empezar desde cero).
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

  // La barra es la unica fuente de verdad: la tarjeta y la imagen avanzan
  // justo cuando la animacion de llenado termina, no con un temporizador aparte.
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
