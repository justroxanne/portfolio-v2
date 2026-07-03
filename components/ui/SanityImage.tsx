import { ImageType } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import Image from "next/image";
import styles from "./SanityImage.module.css";

type Props = {
  image?: ImageType | null;
  name?: string | null;
};

export default function SanityImage({ image, name }: Props) {
  const imageUrl = image ? urlFor(image).auto("format").url() : null;
  const { width, height } = getImageDimensions(image as SanityImageSource);

  return (
    <Image
      className={styles.root}
      src={imageUrl!}
      width={width}
      height={height}
      alt={name || ""}
    />
  );
}
