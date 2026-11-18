"use client";

import { useEffect } from "react";

export function IndexMotion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let context: { revert: () => void } | undefined;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([gsapModule, triggerModule]) => {
      if (cancelled) return;
      const gsap = gsapModule.default;
      gsap.registerPlugin(triggerModule.ScrollTrigger);
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((element) => {
          gsap.from(element, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: element, start: "top 88%" },
          });
        });
      });
    });
    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);
  return null;
}
