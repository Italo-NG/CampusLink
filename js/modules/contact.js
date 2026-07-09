export function initContact() {
  var form = document.getElementById('contact-form');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}
