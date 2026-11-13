import { Monitor, Moon, Sun } from 'lucide-react';

const themeIcons = {
  dark: Sun,
  light: Moon,
  system: Monitor,
};

export default function ThemeToggle({ theme, onToggle, compact = false }) {
  const Icon = themeIcons[theme] ?? Sun;
  const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
  const currentLabel = theme.charAt(0).toUpperCase() + theme.slice(1);

  return (
    <button
      type="button"
      className={compact ? 'theme-toggle theme-toggle--compact' : 'theme-toggle'}
      onClick={onToggle}
      aria-label={`Current theme: ${currentLabel}. Activate to change theme.`}
      title="Cycle between dark, light, and system themes"
    >
      <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
      {!compact && <span>{currentLabel}</span>}
      <span className="sr-only">Next: {nextTheme}</span>
    </button>
  );
}
