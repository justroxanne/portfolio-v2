import dynamic from "next/dynamic";
import Hello from "@/components/sections/hello/Hello";
import { HOMEPAGE_QUERY_RESULT } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

const Work = dynamic(() => import("@/components/sections/work/Work"));
const Artwork = dynamic(() => import("@/components/sections/artwork/Artwork"));
const About = dynamic(() => import("@/components/sections/about/About"));

export default async function Home() {
  const homeData = await client.fetch<HOMEPAGE_QUERY_RESULT>(HOMEPAGE_QUERY);
  const {
    aboutLink,
    bio,
    galleryTitle,
    gallery,
    projects,
    intro,
    parkour,
    portrait,
    title,
  } = homeData ?? {};

  return (
    <>
      {title && intro && <Hello title={title} intro={intro} />}
      {projects && projects.projectsList && (
        <Work projects={projects?.projectsList} />
      )}
      {gallery && gallery.drawingList && (
        <Artwork title={galleryTitle} gallery={gallery.drawingList} />
      )}
      <About
        bio={bio ?? ""}
        parkour={parkour!}
        link={aboutLink!}
        media={portrait!}
      />
    </>
  );
}
