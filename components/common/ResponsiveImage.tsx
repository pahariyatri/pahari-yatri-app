'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ResponsiveImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | '2:3';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

export default function ResponsiveImage({
  src,
  alt,
  fallbackSrc = '/static/images/testimonial-default.jpg',
  aspectRatio = '16:9',
  rounded = 'md',
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.3,
  className = '',
  width,
  height,
  fill,
  ...props
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // Handle image load error
  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Calculate aspect ratio padding
  const aspectRatioPadding = {
    '1:1': 'pb-[100%]',
    '4:3': 'pb-[75%]',
    '16:9': 'pb-[56.25%]',
    '3:2': 'pb-[66.66%]',
    '2:3': 'pb-[150%]',
  }[aspectRatio];

  // Border radius classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  }[rounded];

  // Determine if we should use fill layout or explicit dimensions
  // If fill is provided or neither width nor height is provided, use fill layout
  const shouldUseFill = fill !== undefined ? fill : (width === undefined && height === undefined);
  
  return (
    <div className={`relative overflow-hidden ${shouldUseFill ? aspectRatioPadding : ''} ${roundedClasses} ${className}`}>
      <Image
        src={imgSrc}
        alt={alt}
        {...(shouldUseFill ? { fill: true } : { width, height })}
        className={`${shouldUseFill ? 'object-cover' : ''} transition-transform duration-300 ${props.priority ? '' : 'loading:blur'}`}
        onError={handleError}
        {...props}
      />
      {overlay && (
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}