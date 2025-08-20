/**
 * Responsive utility functions and constants for consistent responsive design
 */

// Breakpoint definitions matching Tailwind's default breakpoints
export const breakpoints = {
  sm: 640,  // Small devices (phones)
  md: 768,  // Medium devices (tablets)
  lg: 1024, // Large devices (laptops)
  xl: 1280, // Extra large devices (desktops)
  '2xl': 1536 // 2X Extra large devices (large desktops)
};

// Media query strings for use with CSS-in-JS libraries
export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`,
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',
  hover: '@media (hover: hover)',
  notHover: '@media (hover: none)'
};

// Helper function to check if current viewport matches a breakpoint
export function isBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

// Helper function to get appropriate spacing value based on breakpoint
export function responsiveSpacing({
  base,
  sm,
  md,
  lg,
  xl,
}: {
  base: number | string;
  sm?: number | string;
  md?: number | string;
  lg?: number | string;
  xl?: number | string;
}): string {
  return `${base}${sm ? ` sm:${sm}` : ''}${md ? ` md:${md}` : ''}${lg ? ` lg:${lg}` : ''}${xl ? ` xl:${xl}` : ''}`;
}