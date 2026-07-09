export function initScrollspy() {
  var links = document.querySelectorAll('.navList a[href^="#"]');
  if (!links.length || !('IntersectionObserver' in window)) return;

  var sections = [];
  for (var i = 0; i < links.length; i++) {
    var id = links[i].getAttribute('href').slice(1);
    var section = document.getElementById(id);
    if (section) sections.push(section);
  }

  function activate(id) {
    var activeGroup = null;
    for (var k = 0; k < links.length; k++) {
      var active = links[k].getAttribute('href') === '#' + id;
      links[k].classList.toggle('isActive', active);
      if (active) {
        links[k].setAttribute('aria-current', 'true');
        var group = links[k].closest('.navGroup');
        if (group) activeGroup = group;
      } else {
        links[k].removeAttribute('aria-current');
      }
    }
    var groups = document.querySelectorAll('.navGroup');
    for (var g = 0; g < groups.length; g++) {
      var trigger = groups[g].querySelector('.navGroupTrigger');
      if (trigger) {
        trigger.classList.toggle('isActive', groups[g] === activeGroup);
      }
    }
  }

  var visible = {};
  var observer = new IntersectionObserver(
    function (entries) {
      for (var e = 0; e < entries.length; e++) {
        visible[entries[e].target.id] = entries[e].isIntersecting;
      }
      for (var s = 0; s < sections.length; s++) {
        if (visible[sections[s].id]) {
          activate(sections[s].id);
          return;
        }
      }
    },
    { rootMargin: '-120px 0px -65% 0px', threshold: 0 }
  );

  for (var n = 0; n < sections.length; n++) {
    observer.observe(sections[n]);
  }
}
