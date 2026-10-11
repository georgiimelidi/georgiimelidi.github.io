document.querySelectorAll('.animation-toggle').forEach((button) => {
  const labels = {
    en: { play: 'Play animated demo', stop: 'Show static preview', error: 'The animation could not load. You can try again.' },
    fr: { play: 'Lancer l’animation', stop: 'Afficher l’image fixe', error: 'L’animation n’a pas pu être chargée. Vous pouvez réessayer.' },
    ru: { play: 'Запустить анимацию', stop: 'Показать статичное изображение', error: 'Не удалось загрузить анимацию. Попробуйте ещё раз.' }
  }[document.documentElement.lang];
  const image = document.getElementById(button.getAttribute('aria-controls'));
  const status = button.parentElement.querySelector('.animation-status');
  if (!image) return;

  const showStatic = () => {
    image.src = button.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = labels.play;
  };

  button.hidden = false;
  button.addEventListener('click', () => {
    status.textContent = '';
    if (button.getAttribute('aria-pressed') === 'true') {
      showStatic();
    } else {
      image.src = button.dataset.animation;
      button.setAttribute('aria-pressed', 'true');
      button.textContent = labels.stop;
    }
  });

  image.addEventListener('error', () => {
    if (button.getAttribute('aria-pressed') === 'true') {
      showStatic();
      status.textContent = labels.error;
    }
  });
});
