import { useEffect, useState } from 'react';
import { navigation } from '../data/portfolio.js';

const THEME_KEY = 'isaac-portfolio-theme';
const THEME_OPTIONS = ['dark', 'light', 'system'];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    return THEME_OPTIONS.includes(saved) ? saved : 'dark';
  } catch {
    return 'dark';
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const systemThemeQuery = window.matchMedia('(prefers-color-scheme: light)');
    const applyTheme = () => {
      const effectiveTheme = theme === 'system'
        ? (systemThemeQuery.matches ? 'light' : 'dark')
        : theme;
      document.documentElement.dataset.theme = effectiveTheme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        effectiveTheme === 'dark' ? '#0b0c0e' : '#f4f5f1',
      );
    };

    applyTheme();
    systemThemeQuery.addEventListener?.('change', applyTheme);
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // The selected theme still works when storage is unavailable.
    }

    return () => systemThemeQuery.removeEventListener?.('change', applyTheme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((current) => THEME_OPTIONS[(THEME_OPTIONS.indexOf(current) + 1) % THEME_OPTIONS.length]);
  };
  return { theme, toggleTheme };
}

export function usePortfolioScroll() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    document.documentElement.classList.add('js-reveal-enabled');
    const sections = navigation
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const revealNodes = document.querySelectorAll('[data-reveal]');
    let revealObserver;
    let sectionObserver;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
    } else {
      revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
      );
      revealNodes.forEach((node, index) => {
        node.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 65}ms`);
        revealObserver.observe(node);
      });
    }

    const updateActiveFallback = () => {
      const marker = window.innerHeight * 0.34;
      const current = sections
        .filter((section) => section.getBoundingClientRect().top <= marker)
        .at(-1);
      if (current) setActiveSection(current.id);
    };

    if ('IntersectionObserver' in window) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) setActiveSection(visible.target.id);
        },
        { rootMargin: '-24% 0px -62% 0px', threshold: [0, 0.1, 0.25, 0.5] },
      );
      sections.forEach((section) => sectionObserver.observe(section));
    } else {
      updateActiveFallback();
      window.addEventListener('scroll', updateActiveFallback, { passive: true });
    }

    const pointerFine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updatePointer = (event) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`);
    };
    if (pointerFine.matches && !prefersReducedMotion) {
      window.addEventListener('pointermove', updatePointer, { passive: true });
    }

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      document.documentElement.style.setProperty('--scroll-progress', `${progress}`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      document.documentElement.classList.remove('js-reveal-enabled');
      revealObserver?.disconnect();
      sectionObserver?.disconnect();
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      window.removeEventListener('scroll', updateActiveFallback);
    };
  }, []);

  return activeSection;
}
