'use client';

import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

type BadgeVariant = 'primary' | 'secondary' | 'outline' | 'muted';

interface CustomBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  outline: 'bg-background text-foreground border border-border',
  muted: 'bg-muted text-muted-foreground'
};

export default function CustomBadge({ 
  children, 
  variant = 'primary', 
  className = '' 
}: CustomBadgeProps) {
  return (
    <Badge className={cn(variantClasses[variant], className)}>
      {children}
    </Badge>
  );
}