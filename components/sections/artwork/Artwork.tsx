"use client";

import gsap from "gsap";
import { DrawingType } from "@/sanity/types";
import { useEffect, useRef } from "react";
import { horizontalLoop } from "@/app/utils/horizontalLoop";
import { useCursor } from "@/components/providers/CursorProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SanityImage from "@/components/ui/SanityImage";
import styles from "./Artwork.module.css";
import Markdown from "markdown-to-jsx";

gsap.registerPlugin(ScrollTrigger);

export default function Artwork({
  title,
  gallery,
}: {
  title?: string | null | undefined;
  gallery: DrawingType[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRefs = useRef<HTMLDivElement[]>([]);
  const pinnedSection = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { setCursorData } = useCursor();

  useEffect(() => {
    if (!imagesRefs.current || !containerRef.current) return;

    horizontalLoop(containerRef.current, imagesRefs.current, {
      draggable: true,
      speed: 0.55,
      snap: 1,
      paddingRight: "0",
      repeat: true,
    });
  }, []);

  useEffect(() => {
    if (!overlayRef || !pinnedSection || !titleRef) return;

    const tl = gsap.timeline();

    const overlay = overlayRef.current;
    const container = pinnedSection.current;
    const title = titleRef.current;

    tl.fromTo(
      title,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        ease: "power1.out",
        scrollTrigger: {
          trigger: container,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );

    tl.to(overlay, {
      maskPosition: "100% 0",
      WebkitMaskPosition: "100% 0",
      ease: "steps(24)",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });
  }, []);

  return (
    <div className={styles.root} id="gallery">
      {title && (
        <div className={styles.title} ref={pinnedSection}>
          <div className={styles["animated-overlay"]} ref={overlayRef}></div>
          <h2 ref={titleRef}>
            <Markdown>{title}</Markdown>
          </h2>
        </div>
      )}
      {gallery && (
        <div className={styles.artwork}>
          <div
            className={styles.carousel}
            ref={containerRef}
            onMouseOver={() =>
              setCursorData({
                data: "text",
                text: "Drag me !",
              })
            }
            onMouseLeave={() =>
              setCursorData({
                data: "",
                text: "",
              })
            }
          >
            {gallery.map((drawing, index) => (
              <div
                className={styles["image-container"]}
                data-format={drawing.rendering}
                key={drawing._id}
                ref={(el: HTMLDivElement) => {
                  if (el) imagesRefs.current[index] = el;
                }}
              >
                <SanityImage image={drawing.image} name={drawing.title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
