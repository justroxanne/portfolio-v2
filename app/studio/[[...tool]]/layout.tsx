import type { Metadata } from "next";
import { metadata as studioMetadata } from "next-sanity/studio";

export const dynamic = "force-static";
export { viewport } from "next-sanity/studio";

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Roxanne Lucas - Creative Developer",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
