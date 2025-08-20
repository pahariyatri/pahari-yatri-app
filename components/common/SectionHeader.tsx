import React from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string | React.ReactNode;
  description?: string;
  descriptionClassName?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  eyebrowClassName,
  title,
  description,
  descriptionClassName,
  align = "center",
  className,
}) => {
  const alignment =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  return (
    <div className={clsx("flex flex-col mb-12", alignment, className)}>
      {eyebrow && (
        <p
          className={clsx(
            "text-sm font-medium uppercase tracking-widest text-primary animate-fade-in mb-3",
            eyebrowClassName
          )}
        >
          {eyebrow}
        </p>
      )}

      <div className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-tight mb-6 animate-fade-in-up text-foreground">
        {title}
      </div>
      
      {description && (
        <p
          className={clsx(
            "mx-auto max-w-3xl text-lg text-muted-foreground animate-fade-in mt-4 mb-8",
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
