"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        premium: "text-primary font-semibold",
      },
      size: {
        default: "text-sm leading-none",
        sm: "text-xs leading-tight",
        lg: "text-base leading-relaxed",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, size, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size }), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
