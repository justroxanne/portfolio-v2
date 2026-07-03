import { defineField, defineType } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "drawing",
  title: "Dessin",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "medium",
      type: "string",
    }),
    defineField({
      name: "rendering",
      title: "Rendu",
      type: "string",
      options: {
        list: [
          { title: "Pleine largeur", value: "fullWidth" },
          { title: "Pleine hauteur", value: "fullHeight" },
          { title: "Carré", value: "square" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
});
