import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = signal<boolean>(this.getPreferredTheme());

  readonly isDarkMode$ = this.isDarkMode.asReadonly();

  constructor() {
    effect(() => {
      const isDark = this.isDarkMode();

      if (typeof document !== 'undefined') {
        const html = document.documentElement;

        if (isDark) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }

      if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
      }
    });
  }

  private getPreferredTheme(): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const saved = window.localStorage.getItem('theme');
      if (saved !== null) {
        return saved === 'dark';
      }
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  toggleTheme(): void {
    this.isDarkMode.update(dark => !dark);
  }

  setDarkMode(isDark: boolean): void {
    this.isDarkMode.set(isDark);
  }
}