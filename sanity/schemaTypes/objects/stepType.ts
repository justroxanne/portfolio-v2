import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
  name: "step",
  title: "Étape de parcours",
  type: "object",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Poste",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Entreprise",
      type: "string",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
    }),
  ],
});
