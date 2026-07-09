"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { Footer } from "./Footer";
import { usePathname } from "next/navigation";
import { FooterType } from "@/sanity/lib/types";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroller({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: FooterType;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const footerTween = useRef<gsap.core.Timeline | null>(null);

  const pathname = usePathname();

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      smooth: 3,
      effects: true,
      smoothTouch: 0.1,
      normalizeScroll: true,
    });

    if (!footerRef.current) return;

    const footer = footerRef.current;
    const footerHeight = footer.offsetHeight;

    gsap.set(footer, { yPercent: -50 });

    const uncover = gsap.timeline({ paused: true });
    uncover.to(footer, { yPercent: 0, ease: "none" });

    footerTween.current = uncover;

    ScrollTrigger.create({
      trigger: "#main",
      start: "bottom bottom",
      end: `+=${footerHeight}`,
      animation: uncover,
      scrub: true,
      refreshPriority: -10,
    });

    // Gestion du hash initial (ex: arrivée via /#work)
    if (window.location.hash) {
      const target = window.location.hash;

      // On attend que tout soit bien monté/mesuré (images, layout, etc.)
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        smoother.scrollTo(target, false, "top top"); // false = pas d'animation, positionnement direct
      });
    }
  }, []);

  useEffect(() => {
    ScrollSmoother.get()?.scrollTo(0, false);

    if (!footerTween.current?.scrollTrigger) return;
    requestAnimationFrame(() => {
      footerTween.current?.scrollTrigger?.refresh();
    });
  }, [pathname]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isLocked = document.body.hasAttribute("data-scroll-locked");
      const smoother = ScrollSmoother.get();
      if (!smoother) return;

      if (isLocked) {
        smoother.paused(true);
      } else {
        smoother.paused(false);
      }
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const content = document.getElementById("smooth-content");
    if (!content) return;

    let timer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });

    observer.observe(content);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapper}>
      <div id="smooth-content" ref={content}>
        {children}
        <Footer content={footer} ref={footerRef} />
      </div>
    </div>
  );
}
