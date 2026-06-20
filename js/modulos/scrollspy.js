export function inicializarScrollspy() {
  var enlaces = document.querySelectorAll('.navLista a[href^="#"]');
  if (!enlaces.length || !('IntersectionObserver' in window)) return;

  var secciones = [];
  for (var i = 0; i < enlaces.length; i++) {
    var id = enlaces[i].getAttribute('href').slice(1);
    var seccion = document.getElementById(id);
    if (seccion) secciones.push(seccion);
  }

  function activar(id) {
    var grupoActivo = null;
    for (var k = 0; k < enlaces.length; k++) {
      var activo = enlaces[k].getAttribute('href') === '#' + id;
      enlaces[k].classList.toggle('estaActivo', activo);
      if (activo) {
        enlaces[k].setAttribute('aria-current', 'true');
        var grupo = enlaces[k].closest('.navGrupo');
        if (grupo) grupoActivo = grupo;
      } else {
        enlaces[k].removeAttribute('aria-current');
      }
    }
    var grupos = document.querySelectorAll('.navGrupo');
    for (var g = 0; g < grupos.length; g++) {
      var disparador = grupos[g].querySelector('.navGrupoDisparador');
      if (disparador) {
        disparador.classList.toggle('estaActivo', grupos[g] === grupoActivo);
      }
    }
  }

  var visibles = {};
  var observador = new IntersectionObserver(
    function (entradas) {
      for (var e = 0; e < entradas.length; e++) {
        visibles[entradas[e].target.id] = entradas[e].isIntersecting;
      }
      for (var s = 0; s < secciones.length; s++) {
        if (visibles[secciones[s].id]) {
          activar(secciones[s].id);
          return;
        }
      }
    },
    { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
  );

  for (var n = 0; n < secciones.length; n++) {
    observador.observe(secciones[n]);
  }
}
