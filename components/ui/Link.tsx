import NextLink from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import styles from "./Link.module.css";

export default function Link({
  children,
  href,
  variant,
  className,
  onClick,
  ...props
}: React.ComponentPropsWithRef<typeof NextLink> & {
  href: string;
  variant?: "animated-underline" | "underline-reverse";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  const isExternal = href.toString().startsWith("http");
  const isNativeAnchor = href.toString().match(/^(https?:|mailto:|tel:)/);

  const Component = isNativeAnchor ? "a" : NextLink;

  return (
    <Component
      href={href}
      className={cn(styles.root, className)}
      data-variant={variant}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
}
