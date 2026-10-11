(() => {
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let saved;
  try { saved = localStorage.getItem('theme'); } catch (_) { /* Storage is optional. */ }
  const labels = {
    en: { light: 'Switch to light theme', dark: 'Switch to dark theme' },
    fr: { light: 'Passer au thème clair', dark: 'Passer au thème sombre' },
    ru: { light: 'Включить светлую тему', dark: 'Включить тёмную тему' }
  }[document.documentElement.lang] || { light: 'Switch to light theme', dark: 'Switch to dark theme' };
  const apply = (theme) => {
    document.documentElement.dataset.theme = theme;
    const button = document.querySelector('.theme-toggle');
    if (button) {
      button.textContent = theme === 'dark' ? '🌞' : '🌙';
      button.setAttribute('aria-label', labels[theme === 'dark' ? 'light' : 'dark']);
    }
  };
  apply(saved === 'light' || saved === 'dark' ? saved : preference.matches ? 'dark' : 'light');
  document.addEventListener('DOMContentLoaded', () => {
    apply(document.documentElement.dataset.theme);
    document.querySelector('.theme-toggle')?.addEventListener('click', () => {
      saved = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(saved);
      try { localStorage.setItem('theme', saved); } catch (_) { /* Keep the current-page preference. */ }
    });
  });
  preference.addEventListener('change', () => { if (!saved) apply(preference.matches ? 'dark' : 'light'); });
})();
