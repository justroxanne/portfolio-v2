import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "home",
  title: "Accueil",
  icon: HomeIcon,
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "string",
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "projectsList",
          title: "Liste des projets",
          type: "array",
          of: [{ type: "reference", to: [{ type: "project" }] }],
        }),
      ],
    }),
    defineField({
      name: "galleryTitle",
      title: "Titre de la galerie",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Galerie",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: "drawingList",
          title: "Liste des oeuvres",
          type: "array",
          of: [{ type: "reference", to: [{ type: "drawing" }] }],
        }),
      ],
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
    }),
    defineField({
      name: "bio",
      title: "Biographie",
      type: "text",
    }),
    defineField({
      name: "parkour",
      title: "Parkour",
      type: "array",
      of: [{ type: "step" }],
    }),
    defineField({
      name: "aboutLink",
      title: "Lien section About",
      type: "link",
    }),
  ],
});
