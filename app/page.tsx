import About from "@/components/sections/about/About";
import Artwork from "@/components/sections/artwork/Artwork";
import Hello from "@/components/sections/hello/Hello";
import Work from "@/components/sections/work/Work";
import { HOMEPAGE_QUERYResult, PROJECTS_QUERYResult } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries";

export default async function Home() {
  const homeData = await client.fetch<HOMEPAGE_QUERYResult>(HOMEPAGE_QUERY);
  const {
    aboutLink,
    bio,
    galleryTitle,
    gallery,
    intro,
    parkour,
    portrait,
    title,
  } = homeData ?? {};

  const projects = await client.fetch<PROJECTS_QUERYResult>(PROJECTS_QUERY);

  return (
    <>
      {title && intro && <Hello title={title} intro={intro} />}
      <Work projects={projects} />
      {gallery && <Artwork title={galleryTitle} gallery={gallery} />}
      <About
        bio={bio ?? ""}
        parkour={parkour!}
        link={aboutLink!}
        media={portrait!}
      />
    </>
  );
}
