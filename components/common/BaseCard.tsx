'use client';

import { ReactNode } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  header?: ReactNode;
  footer?: ReactNode;
  hoverEffect?: 'translate' | 'scale' | 'shadow' | 'none';
}

const hoverEffects = {
  translate: 'hover:-translate-y-1',
  scale: 'hover:scale-105',
  shadow: 'hover:shadow-xl',
  none: ''
};

export default function BaseCard({
  children,
  className = '',
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  header,
  footer,
  hoverEffect = 'translate'
}: BaseCardProps) {
  const hoverClass = hoverEffects[hoverEffect] || '';
  
  return (
    <Card 
      className={cn(
        "rounded-lg overflow-hidden transition-all duration-300 border-border h-full",
        hoverClass,
        hoverEffect === 'shadow' ? 'hover:shadow-xl' : '',
        className
      )}
    >
      {header && (
        <CardHeader className={headerClassName}>
          {header}
        </CardHeader>
      )}
      
      <CardContent className={cn("p-4", contentClassName)}>
        {children}
      </CardContent>
      
      {footer && (
        <CardFooter className={footerClassName}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}