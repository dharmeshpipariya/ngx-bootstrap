import { window } from './facade/browser';

let guessedVersion: 'bs3' | 'bs4' | 'bs5';

function _guessBsVersion(): 'bs3' | 'bs4' | 'bs5' {
  if (typeof document === 'undefined') {
    return 'bs4';
  }
  const spanEl = window.document.createElement('span');
  spanEl.innerText = 'testing bs version';
  spanEl.classList.add('d-none');
  spanEl.classList.add('visually-hidden');
  window.document.head.appendChild(spanEl);
  const rect = spanEl.getBoundingClientRect();
  const overflowStyle = window.getComputedStyle(spanEl).overflow;
  document.head.removeChild(spanEl);
  if (!rect || (rect && rect.top !== 0)) {
    return 'bs3';
  }
  if (overflowStyle && overflowStyle === 'hidden') {
    return 'bs5'
  }
  return 'bs4';
}

export function setTheme(theme: 'bs3' | 'bs4' | 'bs5'): void {
  guessedVersion = theme;
}

// todo: in ngx-bootstrap, bs4 will became a default one
export function isBs3(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  if (typeof window.__theme === 'undefined') {
    if (guessedVersion) {
      return guessedVersion === 'bs3';
    }
    guessedVersion = _guessBsVersion();

    return guessedVersion === 'bs3';
  }

  return window.__theme !== 'bs4';
}

export function isBs4(): boolean {
  if (isBs3()) return false;

  if (guessedVersion) return guessedVersion === 'bs4';

  guessedVersion = _guessBsVersion();

  return guessedVersion === 'bs4';
}

export function isBs5(): boolean {
  if (isBs3() || isBs4()) return false;

  if (guessedVersion) return guessedVersion === 'bs5';

  guessedVersion = _guessBsVersion();

  return guessedVersion === 'bs5';
}

export function getBsVer(): {isBs3: boolean; isBs4: boolean; isBs5: boolean} {
  return {
    isBs3: isBs3(),
    isBs4: isBs4(),
    isBs5: isBs5()
  }
}


