"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCursor } from "../providers/CursorProvider";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const { cursorData, cursorPosition, backgroundImageSrc } = useCursor();
  const isDesktop = useMediaQuery("(min-width: 768px");

  if (!isDesktop) return;

  return (
    <div
      aria-hidden="true"
      className={styles.cursor}
      data-background={backgroundImageSrc !== ""}
      data-text={cursorData.data === "text"}
      data-hover={cursorData.data === "hover"}
      style={{
        backgroundImage: backgroundImageSrc
          ? `url(${backgroundImageSrc})`
          : "none",
        transform: `translate(calc(${cursorPosition.x}px - 100%), calc(${cursorPosition.y}px - 100%))`,
      }}
    >
      {cursorData.text && <span>{cursorData.text}</span>}
    </div>
  );
}
