import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .id("home")
        .title("Accueil")
        .schemaType("home")
        .child(S.editor().id("home").schemaType("home").documentId("home")),
      S.listItem()
        .id("settings")
        .title("Settings")
        .schemaType("settings")
        .child(
          S.editor()
            .id("settings")
            .schemaType("settings")
            .documentId("settings")
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projets"),
      S.documentTypeListItem("drawing").title("Artwork"),
    ]);
