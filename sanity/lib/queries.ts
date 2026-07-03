import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(
  `*[_type == "home"][0]{
    _id,
    title,
    intro,
    galleryTitle,
    gallery[]-> {
      ...,
      image {
      ...,
      asset->
      },
    },
    portrait,
    bio,
    parkour,
    aboutLink,
    contactTitle
  }`
);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(_createdAt asc){
    _id,
    title,
    description,
    stack,
    image {
      asset -> {url}
    },
    link
  }`
);
