export function initMenu() {
  var toggle = document.querySelector('.navToggle');
  var nav = document.getElementById('nav-principal');

  if (!toggle || !nav) return;

  var groups = nav.querySelectorAll('.navGroup');

  function closeGroups() {
    for (var i = 0; i < groups.length; i++) {
      groups[i].removeAttribute('data-open');
      var trigger = groups[i].querySelector('.navGroupTrigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    }
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('isOpen');
    closeGroups();
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('isOpen');
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  for (var g = 0; g < groups.length; g++) {
    (function (group) {
      var trigger = group.querySelector('.navGroupTrigger');
      if (!trigger) return;
      trigger.addEventListener('click', function () {
        var open = group.getAttribute('data-open') === 'true';
        closeGroups();
        if (!open) {
          group.setAttribute('data-open', 'true');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    })(groups[g]);
  }

  var links = nav.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', closeMenu);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  document.addEventListener('click', function (event) {
    var inside = event.target.closest && event.target.closest('.siteHeader');
    if (!inside) {
      closeMenu();
    }
  });
}
