"use client";

import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

/**
 * Chapter-to-chapter navigation that feels like turning a page, using the
 * native View Transitions API. Degrades to a plain `next/link` navigation
 * (no special effect, no error) on browsers that don't support it, or on a
 * modified click (new tab, etc.) — never blocks navigation either way.
 */
export default function PageTurnLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (typeof document === "undefined" || !("startViewTransition" in document)) return;
    e.preventDefault();
    const root = document.documentElement;
    root.classList.add("pt-transition");
    const transition = (document as any).startViewTransition(() => {
      router.push(href);
    });
    transition.finished.finally(() => root.classList.remove("pt-transition"));
  }

  return (
    <NextLink href={href} className={className} onClick={handleClick}>
      {children}
    </NextLink>
  );
}
