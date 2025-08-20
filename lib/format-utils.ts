/**
 * Utility functions for consistent data formatting across the application
 */

// Format currency with proper symbol and decimal places
export function formatCurrency(amount: number, currency = 'INR', locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date in a consistent way
export function formatDate(date: Date | string, format: 'short' | 'medium' | 'long' = 'medium', locale = 'en-IN'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const options: Intl.DateTimeFormatOptions = {
    short: { day: 'numeric', month: 'short', year: 'numeric' },
    medium: { day: 'numeric', month: 'long', year: 'numeric' },
    long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
  }[format];
  
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

// Format duration (e.g., "3 days, 2 nights")
export function formatDuration(days: number): string {
  if (days <= 0) return '';
  const nights = Math.max(0, days - 1);
  
  return `${days} day${days !== 1 ? 's' : ''}${nights > 0 ? `, ${nights} night${nights !== 1 ? 's' : ''}` : ''}`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Format difficulty level
export function formatDifficulty(level: 'easy' | 'moderate' | 'challenging' | 'difficult' | string): string {
  const capitalizedLevel = level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
  return capitalizedLevel;
}