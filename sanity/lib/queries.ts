import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
  *[_type == "home"][0]{
    _id,
    title,
    intro,
    projects {
      projectsList[] -> {
        ...,
        title,
        stack,
        description,
        image {
          asset -> {url}
        },
        link
      }
    },
    galleryTitle,
    gallery {
      drawingList[] -> {
        ...,
        title,
        image,
        description,
        ratio
      }
    },
    portrait,
    bio,
    parkour,
    aboutLink,
    contactTitle,
  }`);

export const SETTINGS_QUERY = defineQuery(`
    *[_type == "settings"][0]{
      "footer": {
        "email": email,
        "socials": socials[] {
          ...,
          label,
          url
        },
        "contactTitle": contactTitle
      },
      navigation[] {
        ...,
        label,
        url
      },
      seo {
        ...,
      }
  }`);
