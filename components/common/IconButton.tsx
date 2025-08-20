'use client';

import { ReactNode } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import Icon from './Icon';

interface IconButtonProps extends ButtonProps {
  icon?: ReactNode;
  iconType?: 'email' | 'phone' | 'location' | 'calendar' | 'clock' | 'user' | 'info';
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

export default function IconButton({ 
  icon, 
  iconType, 
  iconPosition = 'left', 
  children, 
  ...buttonProps 
}: IconButtonProps) {
  const iconElement = iconType ? <Icon type={iconType} /> : icon;

  return (
    <Button {...buttonProps}>
      {iconPosition === 'left' && iconElement && (
        <span className="mr-2">{iconElement}</span>
      )}
      {children}
      {iconPosition === 'right' && iconElement && (
        <span className="ml-2">{iconElement}</span>
      )}
    </Button>
  );
}