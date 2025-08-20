/**
 * Theme utility functions for consistent theme handling across the application
 */

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system';

// Theme color mapping
export const themeColors = {
  primary: 'var(--primary)',
  secondary: 'var(--secondary)',
  accent: 'var(--accent)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  mutedForeground: 'var(--muted-foreground)',
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  himalayan: {
    saffron: 'var(--himalayan-saffron)',
    green: 'var(--himalayan-green)',
  }
};

// Helper function to get CSS variable value
export function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '';
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Helper function to get current theme
export function getCurrentTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  
  const storedTheme = localStorage.getItem('theme') as ThemeMode | null;
  if (storedTheme) return storedTheme;
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Helper function to apply alpha to a color variable
export function withAlpha(colorVar: string, alpha: number): string {
  return `rgba(var(${colorVar}), ${alpha})`;
}