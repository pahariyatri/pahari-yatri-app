import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex min-h-[80px] w-full border bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-input focus:border-primary/50",
        premium: "border-primary/10 focus:border-primary/50 shadow-soft-sm focus:shadow-brand-sm",
        minimal: "border-transparent border-b-input bg-transparent rounded-none px-0 focus:border-b-primary",
      },
      size: {
        default: "px-3 py-2 rounded-md",
        sm: "px-2 py-1 text-xs rounded-sm min-h-[60px]",
        lg: "px-4 py-3 text-base rounded-lg min-h-[120px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };