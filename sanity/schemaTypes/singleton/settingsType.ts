import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "navigation",
      title: "Navigation",
      type: "array",
      of: [{ type: "link" }],
    }),
    defineField({
      name: "socials",
      title: "Réseaux sociaux",
      type: "array",
      of: [{ type: "link" }],
    }),
  ],
});
