export function initHowItWorks() {
  var howSection = document.querySelector('#how-it-works');
  var howList = howSection ? howSection.querySelector('.howList') : null;
  var howButtons = howSection ? howSection.querySelectorAll('[data-how-step]') : [];
  var howImages = howSection ? howSection.querySelectorAll('[data-how-image]') : [];

  if (!howSection || !howList || howButtons.length === 0 || howImages.length === 0 || howButtons.length !== howImages.length) return;

  var activeHowIndex = 0;

  howImages.forEach(function (figure) {
    var image = figure.querySelector('img');
    if (image && typeof image.decode === 'function') {
      image.decode().catch(function () {});
    }
  });

  function showStep(index) {
    activeHowIndex = index;

    howButtons.forEach(function (button, buttonIndex) {
      var step = button.parentElement;

      if (buttonIndex === index) {
        button.setAttribute('aria-current', 'step');
      } else {
        step.classList.remove('isActive');
        button.removeAttribute('aria-current');
      }
    });

    var activeStep = howButtons[index].parentElement;
    activeStep.classList.remove('isActive');
    void activeStep.offsetWidth;
    activeStep.classList.add('isActive');

    howImages.forEach(function (image, imageIndex) {
      if (imageIndex === index) {
        image.classList.add('isActive');
        image.removeAttribute('aria-hidden');
      } else {
        image.classList.remove('isActive');
        image.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function advanceStep() {
    var nextIndex = activeHowIndex + 1;

    if (nextIndex >= howButtons.length) {
      nextIndex = 0;
    }

    showStep(nextIndex);
  }

  howList.addEventListener('animationend', function (event) {
    if (event.animationName !== 'howActiveBar') {
      return;
    }
    advanceStep();
  });

  howButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
      showStep(index);
    });
  });
}
