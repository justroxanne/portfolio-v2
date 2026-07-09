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
      name: "description",
      type: "string",
    }),
    defineField({
      name: "medium",
      type: "string",
    }),
    defineField({
      name: "ratio",
      title: "Ratio",
      type: "string",
      options: {
        list: [
          { title: "Horizontal", value: "horizontal" },
          { title: "Vertical", value: "vertical" },
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
