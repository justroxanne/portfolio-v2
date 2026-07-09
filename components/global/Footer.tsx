import { forwardRef } from "react";
import { FooterType } from "@/sanity/lib/types";
import { useCursor } from "../providers/CursorProvider";
import Link from "../ui/Link";
import styles from "./Footer.module.css";
import ArrowUp from "../icons/ArrowUp";

export const Footer = forwardRef<
  HTMLDivElement,
  {
    content: FooterType;
  }
>(function Footer({ content }, ref) {
  const { setCursorData } = useCursor();

  return (
    <footer className={styles.root} id="contact" ref={ref}>
      <h2 className={styles.title}>{content?.contactTitle}</h2>
      <div className={styles.email}>
        <Link
          href={content?.email!}
          onMouseOver={() =>
            setCursorData({
              data: "text",
              text: "contact me!",
            })
          }
          onMouseLeave={() =>
            setCursorData({
              data: "",
              text: "",
            })
          }
        >
          <ArrowUp className={styles.before} aria-hidden />
          {content?.email}
          <ArrowUp className={styles.after} aria-hidden />
        </Link>
      </div>
      <div className={styles.copyright}>©2026 - Roxanne Lucas</div>
      <div className={styles.socials}>
        {content?.socials?.map((item) => (
          <Link
            href={item.url!}
            key={item._key}
            variant="animated-underline"
            onMouseOver={() => setCursorData({ data: "hover", text: "" })}
            onMouseLeave={() => setCursorData({ data: "", text: "" })}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
});
