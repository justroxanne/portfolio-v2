"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [progress, setProgress] = useState(0);
  const [isHidden, setisHidden] = useState(!isHome);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99) {
          clearInterval(intervalRef.current!);
          return prev;
        }
        return Math.min(prev + Math.random() * 8, 99);
      });
    }, 150);

    const handleLoad = () => {
      clearInterval(intervalRef.current!);
      setProgress(100);
      setTimeout(() => setisHidden(true), 600);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearInterval(intervalRef.current!);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div className={cn(styles.root, progress === 100 ? styles.visible : "")}>
      <div className={styles.percent}>{Math.round(progress)}%</div>
    </div>
  );
}
