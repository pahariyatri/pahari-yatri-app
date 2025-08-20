import { ImageProps } from 'next/image'
import ResponsiveImage from './ResponsiveImage'

// This component is a wrapper around ResponsiveImage to maintain backward compatibility
// while ensuring consistent image handling across the application
const Image = ({ className, alt, width, height, fill, ...rest }: ImageProps) => {
  // We'll pass all props directly to ResponsiveImage which now handles the conflict internally
  return (
    <ResponsiveImage 
      className={className || ''}
      alt={alt || 'Image'}
      aspectRatio="16:9"
      width={width}
      height={height}
      fill={fill}
      {...rest} 
    />
  )
}

export default Image