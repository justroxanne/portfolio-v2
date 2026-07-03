import Nextlink from "next/link";
import React from "react";
import styles from "./Link.module.css";

export default function Link({
  children,
  to,
  variant,
  className,
  target = "_self",
}: {
  children: React.ReactNode;
  to: string;
  variant?: string;
  className?: string;
  target?: string;
}) {
  return (
    <Nextlink
      href={to}
      className={`${styles.root} ${className ? className : ""}`}
      data-variant={variant}
      target={target}
    >
      {children}
    </Nextlink>
  );
}
