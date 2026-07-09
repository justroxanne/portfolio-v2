"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCursor } from "../providers/CursorProvider";
import { useCallback, useRef, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";
import gsap from "gsap";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "../ui/Link";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/Drawer";
import styles from "./Header.module.css";

gsap.registerPlugin(ScrollSmoother);

export default function Header({
  navigation,
  socials,
}: {
  navigation: NonNullable<SETTINGS_QUERY_RESULT>["navigation"];
  socials: NonNullable<SETTINGS_QUERY_RESULT>["footer"]["socials"];
}) {
  const { setCursorData } = useCursor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const listElRef = useRef<HTMLUListElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const socialsElRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => {
    if (!tl.current) {
      setIsMenuOpen(false);
      return;
    }

    tl.current.reverse();
    tl.current.eventCallback("onReverseComplete", () => {
      setIsMenuOpen(false);
    });
  }, []);

  const handleOpenChange = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
    } else {
      closeMenu();
    }
  };

  const handleNavClick = useCallback((e: React.MouseEvent, url: string) => {
    closeMenu();

    if (!url.startsWith("#")) return;

    e.preventDefault();

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(url, true, "top top");
      history.pushState(null, "", url);
    } else {
      document.querySelector(url)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const buildTimeline = useCallback(() => {
    if (!listElRef.current || !isMenuOpen) return;

    const items = listElRef.current.querySelectorAll("li");
    gsap.set(items, { y: -20, opacity: 0 });

    const newTl = gsap.timeline({ paused: true }).to(items, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.1,
      delay: 0.1,
    });

    if (socialsElRef.current) {
      gsap.set(socialsElRef.current, { opacity: 0, x: "-100%" });
      newTl.to(
        socialsElRef.current,
        { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
        ">-0.1",
      );
    }

    tl.current = newTl;
  }, [isMenuOpen]);

  const setNavRef = useCallback(
    (el: HTMLUListElement | null) => {
      listElRef.current = el;
      buildTimeline();
    },
    [buildTimeline],
  );

  const setSocialsRef = useCallback(
    (el: HTMLDivElement | null) => {
      socialsElRef.current = el;
      buildTimeline();
    },
    [buildTimeline],
  );

  const handleDrawerAnimationEnd = useCallback(() => {
    tl.current?.play();
  }, []);

  return (
    <header className={styles.menu} data-open={isMenuOpen}>
      {isDesktop ? (
        <ul className={styles["desktop-navigation"]}>
          {navigation?.map((navItem, index) => (
            <li
              key={index}
              onMouseOver={() => setCursorData({ data: "hover", text: "" })}
              onMouseLeave={() => setCursorData({ data: "", text: "" })}
            >
              <Link
                href={navItem.url ?? ""}
                variant="animated-underline"
                onClick={(e) => handleNavClick(e, navItem.url ?? "")}
              >
                {`0${index + 1}/`}
                {navItem.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Drawer modal={false} open={isMenuOpen} onOpenChange={handleOpenChange}>
          <DrawerTrigger className={styles.burger} title="Open menu">
            <span></span>
            <span></span>
            <span></span>
          </DrawerTrigger>
          <DrawerContent
            onAnimationEnd={handleDrawerAnimationEnd}
            className={styles["menu-drawer"]}
            animationOrigin="left"
          >
            <DrawerTitle asChild>
              <VisuallyHidden>Menu</VisuallyHidden>
            </DrawerTitle>
            <DrawerDescription asChild>
              <VisuallyHidden>Navigation</VisuallyHidden>
            </DrawerDescription>
            <ul
              ref={setNavRef}
              className={styles["mobile-navigation"]}
              data-open={isMenuOpen}
            >
              {navigation?.map((navItem, index) => (
                <li key={index}>
                  <Link
                    className={styles["nav-link"]}
                    href={navItem.url ?? ""}
                    onClick={(e) => handleNavClick(e, navItem.url ?? "")}
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </ul>
            {socials && (
              <div className={styles.socials} ref={setSocialsRef}>
                {socials.map((item) => (
                  <Link key={item._key} href={item.url!}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </DrawerContent>
        </Drawer>
      )}
    </header>
  );
}
