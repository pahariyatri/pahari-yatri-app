import { ReactNode } from 'react';

type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    base?: GridColumns;
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
    xl?: GridColumns;
  };
  gap?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export default function ResponsiveGrid({
  children,
  className = '',
  cols = { base: 1, sm: 2, md: 3, lg: 4 },
  gap = { base: 4, md: 6, lg: 8 },
}: ResponsiveGridProps) {
  // Convert column counts to Tailwind grid classes
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  };

  // Convert gap values to Tailwind gap classes
  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
  };

  // Build responsive column classes
  const responsiveColClasses = [
    cols.base && colClasses[cols.base],
    cols.sm && `sm:${colClasses[cols.sm]}`,
    cols.md && `md:${colClasses[cols.md]}`,
    cols.lg && `lg:${colClasses[cols.lg]}`,
    cols.xl && `xl:${colClasses[cols.xl]}`,
  ].filter(Boolean).join(' ');

  // Build responsive gap classes
  const responsiveGapClasses = [
    gap.base !== undefined && gapClasses[gap.base as keyof typeof gapClasses],
    gap.sm !== undefined && `sm:${gapClasses[gap.sm as keyof typeof gapClasses]}`,
    gap.md !== undefined && `md:${gapClasses[gap.md as keyof typeof gapClasses]}`,
    gap.lg !== undefined && `lg:${gapClasses[gap.lg as keyof typeof gapClasses]}`,
    gap.xl !== undefined && `xl:${gapClasses[gap.xl as keyof typeof gapClasses]}`,
  ].filter(Boolean).join(' ');

  return (
    <div className={`grid ${responsiveColClasses} ${responsiveGapClasses} ${className}`}>
      {children}
    </div>
  );
}