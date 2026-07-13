"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCursor } from "../providers/CursorProvider";
import styles from "./Cursor.module.css";

export default function Cursor() {
  const { cursorData, cursorRef, backgroundImageSrc } = useCursor();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className={styles.cursor}
      data-background={backgroundImageSrc !== ""}
      data-text={cursorData.data === "text"}
      data-hover={cursorData.data === "hover"}
      style={{
        backgroundImage: backgroundImageSrc
          ? `url(${backgroundImageSrc})`
          : "none",
      }}
    >
      {cursorData.text && <span>{cursorData.text}</span>}
    </div>
  );
}
