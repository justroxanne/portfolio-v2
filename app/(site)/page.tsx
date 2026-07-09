import About from "@/components/sections/about/About";
import Artwork from "@/components/sections/artwork/Artwork";
import Hello from "@/components/sections/hello/Hello";
import Work from "@/components/sections/work/Work";
import { HOMEPAGE_QUERY_RESULT } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";

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
