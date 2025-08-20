'use client';

import { ReactNode } from 'react';
import Icon from './Icon';

interface ContactInfoItemProps {
  icon?: ReactNode;
  iconType?: 'email' | 'phone' | 'location' | 'calendar' | 'clock' | 'user' | 'info';
  title: string;
  content: string | ReactNode;
}

export default function ContactInfoItem({ icon, iconType, title, content }: ContactInfoItemProps) {
  return (
    <div className="flex items-start space-x-3">
      <div className="bg-primary/10 p-2 rounded-full">
        {iconType ? (
          <Icon type={iconType} className="text-primary" />
        ) : (
          icon
        )}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
}