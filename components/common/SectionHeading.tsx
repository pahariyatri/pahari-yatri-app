import { ReactNode } from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  children?: ReactNode;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  children,
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`mb-8 ${alignmentClasses[align]} ${className}`}>
      <h2 className={`text-3xl font-bold tracking-tight text-foreground sm:text-4xl ${titleClassName}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg text-muted-foreground ${subtitleClassName}`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}