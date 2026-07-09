import { Image } from "@/sanity/lib/types";
import { projectId, dataset } from "@/sanity/env";
import { createImageUrlBuilder } from "@sanity/image-url";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: Image) {
  if (!source || typeof source !== "object" || !("asset" in source)) return "";

  return builder.image(source).auto("format").fit("max").url();
}
