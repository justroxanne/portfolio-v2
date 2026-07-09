import { CursorProvider } from "@/components/providers/CursorProvider";
import { Space_Grotesk } from "next/font/google";
import Cursor from "@/components/global/Cursor";
import Header from "@/components/global/Header";
import { client } from "@/sanity/lib/client";
import { SETTINGS_QUERY_RESULT } from "@/sanity.types";
import { SETTINGS_QUERY } from "@/sanity/lib/queries";
import SmoothScroller from "@/components/global/SmoothScroller";
import "@/app/styles/globals.css";
import { urlFor } from "@/lib/imageUrl";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export async function generateMetadata() {
  const settings = await client.fetch<SETTINGS_QUERY_RESULT>(SETTINGS_QUERY);

  if (!settings) return {};

  const { seo } = settings;

  return {
    metadataBase: new URL("https://roxannelucas.fr"),
    alternates: {
      canonical: "/",
    },
    title: seo?.title ?? "Roxanne Lucas",
    description: seo?.description ?? "",
    openGraph: {
      images: (seo?.image && urlFor(seo?.image)) ?? undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch<SETTINGS_QUERY_RESULT>(SETTINGS_QUERY);
  const { footer, navigation } = settings ?? {};

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable}`}>
        <CursorProvider>
          <Header navigation={navigation!} socials={footer?.socials ?? null} />
          <Cursor />
          <SmoothScroller footer={footer}>
            <main id="main">{children}</main>
          </SmoothScroller>
        </CursorProvider>
      </body>
    </html>
  );
}
