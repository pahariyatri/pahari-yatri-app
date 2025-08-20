import { CSSProperties } from 'react';

interface SpacerProps {
  size?: number | string;
  axis?: 'horizontal' | 'vertical';
  style?: CSSProperties;
  className?: string;
}

/**
 * Spacer component for adding consistent spacing between elements
 * @param size - Size of the spacer in pixels or any CSS unit (default: 1rem)
 * @param axis - Direction of the spacer (default: 'vertical')
 * @param style - Additional CSS styles
 * @param className - Additional CSS classes
 */
export default function Spacer({ 
  size = '1rem', 
  axis = 'vertical', 
  style = {}, 
  className = '' 
}: SpacerProps) {
  const width = axis === 'vertical' ? 1 : size;
  const height = axis === 'horizontal' ? 1 : size;
  
  return (
    <span
      className={`block ${className}`}
      style={{
        display: 'block',
        width: typeof width === 'number' ? `${width}px` : width,
        minWidth: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: typeof height === 'number' ? `${height}px` : height,
        ...style
      }}
      aria-hidden="true"
    />
  );
}