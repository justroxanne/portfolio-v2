"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis } from "lenis/react";
import Cursor from "./Cursor";
import Menu from "./Menu";
import styles from "./App.module.css";

export default function App({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isStudio = pathname.includes("studio");

  const content = (
    <div className={styles.root} data-studio={isStudio}>
      {!isStudio && (
        <>
          <Menu />
          <Cursor />
        </>
      )}
      <main>{children}</main>
    </div>
  );

  if (isStudio) {
    return content;
  }

  return (
    <ReactLenis options={{ lerp: 0.1 }} root>
      {content}
    </ReactLenis>
  );
}
