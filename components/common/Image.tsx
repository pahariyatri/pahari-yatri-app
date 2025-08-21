import { ImageProps } from "next/image"
import ResponsiveImage from "./ResponsiveImage"

const Image = ({ className, alt, ...rest }: ImageProps) => {
  return (
    <ResponsiveImage
      className={className || ""}
      alt={alt || "Image"}
      {...rest} // spread all props, don't force aspectRatio
    />
  )
}

export default Image
