import { SanityImageAsset } from "@/sanity.types";

export type DrawingType = {
  _id: string;
  _type: "drawing";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string | null;
  image?: ImageType | null;
  medium?: string | null;
  rendering?: "fullWidth" | "fullHeight" | "square" | null;
};

export type ImageType = {
  asset?: SanityImageAsset | null;
  _type?: string;
  _id?: string;
};
