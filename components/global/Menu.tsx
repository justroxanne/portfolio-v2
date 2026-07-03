"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCursor } from "../providers/CursorProvider";
import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Menu.module.css";
import Link from "../ui/Link";

export default function Menu() {
  const { setCursorData } = useCursor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const sections = ["hello", "work", "gallery", "about", "contact"];

  const variants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    closed: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: -20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <div className={styles.menu} data-open={isMenuOpen}>
      {!isDesktop && (
        <>
          <div
            className={styles.burger}
            role="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <motion.ul
            className={styles["mobile-navigation"]}
            variants={variants}
            initial="closed"
            animate={isMenuOpen ? "open" : "closed"}
          >
            {sections.map((section, index) => (
              <motion.li
                key={index}
                variants={itemVariants}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Link to={`#${section}`}>{section}</Link>
              </motion.li>
            ))}
          </motion.ul>
        </>
      )}
      {isDesktop && (
        <ul className={styles["desktop-navigation"]}>
          {sections.map((section, index) => (
            <li
              key={index}
              onMouseOver={() => {
                setCursorData({
                  data: "hover",
                  text: "",
                });
              }}
              onMouseLeave={() => {
                setCursorData({
                  data: "",
                  text: "",
                });
              }}
            >
              <Link to={`#${section}`} variant="animated-underline">
                {`0${index + 1}/`}
                {section}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
