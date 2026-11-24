export const THEME_EVENT = 'bb:theme-change';

export function isDarkTheme() {
  return document.documentElement.dataset.theme === 'dark';
}

export function setTheme(isDark) {
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  try {
    localStorage.setItem('bb_theme', isDark ? 'dark' : 'light');
  } catch {
    // localStorage can be unavailable in private contexts
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function toggleTheme() {
  const next = !isDarkTheme();
  setTheme(next);
  return next;
}
