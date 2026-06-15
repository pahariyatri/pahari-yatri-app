'use client';

import { useState } from 'react';
import NextImage, { ImageProps } from 'next/image';

interface ResponsiveImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2' | '2:3';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
}

const ASPECT_RATIO: Record<NonNullable<ResponsiveImageProps['aspectRatio']>, string> = {
  '1:1': '1 / 1',
  '4:3': '4 / 3',
  '16:9': '16 / 9',
  '3:2': '3 / 2',
  '2:3': '2 / 3',
};

const ROUNDED: Record<NonNullable<ResponsiveImageProps['rounded']>, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

/**
 * A resilient wrapper around next/image with three explicit modes:
 *
 *  1. `fill`            → fills its (positioned) parent. Caller owns sizing.
 *  2. `width`/`height`  → intrinsic, fixed-dimension image.
 *  3. neither           → component owns sizing via a `relative` box. The box
 *     uses the CSS `aspect-ratio` property (not a padding hack), so an explicit
 *     height in `className` (e.g. `h-40`) correctly takes precedence instead of
 *     stacking on top of the ratio.
 *
 * In every mode a failed load falls back to `fallbackSrc`.
 */
export default function ResponsiveImage({
  src,
  alt,
  fallbackSrc = '/static/images/placeholder.jpg',
  aspectRatio = '16:9',
  rounded = 'md',
  overlay = false,
  overlayColor = 'black',
  overlayOpacity = 0.3,
  className = '',
  width,
  height,
  fill,
  sizes,
  ...props
}: ResponsiveImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const overlayEl = overlay ? (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
    />
  ) : null;

  // Mode 1 — explicit fill: caller provides a positioned, sized parent.
  if (fill) {
    return (
      <>
        <NextImage
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes ?? '100vw'}
          className={`object-cover ${className}`}
          onError={handleError}
          {...props}
        />
        {overlayEl}
      </>
    );
  }

  // Mode 2 — intrinsic dimensions.
  if (width !== undefined || height !== undefined) {
    return (
      <span className={`relative inline-flex overflow-hidden ${ROUNDED[rounded]} ${className}`}>
        <NextImage
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="object-cover"
          onError={handleError}
          {...props}
        />
        {overlayEl}
      </span>
    );
  }

  // Mode 3 — component-owned responsive box (aspect-ratio yields to any
  // explicit height in `className`).
  return (
    <div
      className={`relative overflow-hidden ${ROUNDED[rounded]} ${className}`}
      style={{ aspectRatio: ASPECT_RATIO[aspectRatio] }}
    >
      <NextImage
        src={imgSrc}
        alt={alt}
        fill
        sizes={sizes ?? '100vw'}
        className="object-cover"
        onError={handleError}
        {...props}
      />
      {overlayEl}
    </div>
  );
}
