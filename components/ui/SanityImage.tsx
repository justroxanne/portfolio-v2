import { forwardRef } from "react";
import { Image as ImageType } from "@/sanity/lib/types";
import { urlFor } from "@/lib/imageUrl";
import { getImageDimensions, SanityImageSource } from "@sanity/asset-utils";
import Image from "next/image";
import styles from "./SanityImage.module.css";

export const SanityImage = forwardRef<
  React.ComponentRef<typeof Image>,
  Omit<React.ComponentPropsWithoutRef<typeof Image>, "src"> & {
    image: ImageType | null | undefined;
  }
>(function sanityImage({ image, alt, ...props }, ref) {
  if (!image || !(typeof image === "object" && "asset" in image)) {
    return null;
  }

  const src = urlFor(image);
  const { width, height } = getImageDimensions(image as SanityImageSource);

  return (
    <Image
      className={styles.root}
      src={src}
      alt={alt}
      width={width}
      height={height}
      ref={ref}
      {...props}
    />
  );
});
