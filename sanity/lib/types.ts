import {
  internalGroqTypeReferenceTo,
  SanityImageHotspot,
  SanityImageCrop,
  Slug,
} from "@/sanity.types";

export type Image =
  | {
      _type: "image";
      title?: string | null;
      alt?: string | null;
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
    }
  | null
  | undefined;

export type DrawingType = {
  _id: string;
  _type: "drawing";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string | null;
  image?: Image | null;
  description?: string | null;
  medium?: string | null;
  ratio?: "horizontal" | "vertical" | "square" | null;
};

export type ProjectType = {
  _id: string;
  _type: "project";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string | null;
  slug?: Slug | null;
  stack?: string | null;
  description?: string | null;
  image: {
    asset: {
      url: string | null;
    } | null;
  } | null;
  link?: string | null;
};

export type FooterType =
  | {
      email: string | null;
      socials: Array<{
        _key: string;
        _type: "link";
        label: string | null;
        url: string | null;
      }> | null;
      contactTitle: string | null;
    }
  | null
  | undefined;
