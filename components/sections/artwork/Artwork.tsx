"use client";

import gsap from "gsap";
import { DrawingType } from "@/sanity/lib/types";
import { useEffect, useRef } from "react";
import { horizontalLoop } from "@/lib/horizontalLoop";
import { useCursor } from "@/components/providers/CursorProvider";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SanityImage } from "@/components/ui/SanityImage";
import Markdown from "markdown-to-jsx";
import styles from "./Artwork.module.css";

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
  const maskRef = useRef<HTMLDivElement>(null);
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
    if (!maskRef || !pinnedSection || !titleRef) return;

    const tl = gsap.timeline();

    const overlay = maskRef.current;
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
      },
    );

    tl.to(overlay, {
      maskPosition: "100% 0",
      WebkitMaskPosition: "100% 0",
      ease: "steps(21)",
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
    <div className={styles.root} id="artwork">
      {title && (
        <div className={styles.title} ref={pinnedSection}>
          <div className={styles["mask-container"]}>
            <div className={styles["animated-mask"]} ref={maskRef}></div>
          </div>
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
            onPointerDown={() => {
              containerRef?.current?.setAttribute("data-grabbing", "true");
            }}
            onPointerUp={() => {
              containerRef?.current?.removeAttribute("data-grabbing");
            }}
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
                data-format={drawing.ratio}
                key={drawing._id}
                ref={(el: HTMLDivElement) => {
                  if (el) imagesRefs.current[index] = el;
                }}
              >
                <SanityImage
                  image={drawing.image}
                  alt={drawing.description ?? drawing.title!}
                  sizes={"(max-width: 768px) 100vw, 33vw"}
                  loading={index > 3 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
