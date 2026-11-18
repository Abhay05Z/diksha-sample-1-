"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    let destroyed = false;
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        prevent: (node) => Boolean(node.closest("[data-lenis-prevent]")),
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });

    return () => {
      destroyed = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
