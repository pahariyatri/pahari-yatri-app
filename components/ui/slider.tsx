"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const sliderVariants = cva(
  "relative flex w-full touch-none select-none items-center",
  {
    variants: {
      variant: {
        default: "",
        premium: "",
        minimal: "",
      },
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const trackVariants = cva(
  "relative w-full grow overflow-hidden rounded-full",
  {
    variants: {
      variant: {
        default: "h-2 bg-secondary",
        premium: "h-2 bg-secondary/30",
        minimal: "h-1 bg-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const rangeVariants = cva(
  "absolute h-full",
  {
    variants: {
      variant: {
        default: "bg-primary",
        premium: "bg-gradient-to-r from-primary to-secondary",
        minimal: "bg-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const thumbVariants = cva(
  "block rounded-full border-2 bg-background ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-primary hover:scale-110",
        premium: "border-primary shadow-brand-sm hover:shadow-brand hover:scale-110",
        minimal: "border-primary scale-90 hover:scale-100",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SliderProps extends 
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
  VariantProps<typeof sliderVariants> {}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant, size, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants({ variant, size }), className)}
    {...props}
  >
    <SliderPrimitive.Track className={cn(trackVariants({ variant }))}>
      <SliderPrimitive.Range className={cn(rangeVariants({ variant }))} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(thumbVariants({ variant, size }))} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
