"use client";

import { Link as LinkType, Step } from "@/sanity.types";
import { Image as ImageType } from "@/sanity/lib/types";
import { SanityImage } from "@/components/ui/SanityImage";
import styles from "./About.module.css";
import ArrowRight from "@/components/icons/ArrowRight";
import { useCursor } from "@/components/providers/CursorProvider";
import Link from "@/components/ui/Link";

export default function About({
  bio,
  parkour,
  link,
  media,
}: {
  bio?: string;
  parkour?: ({
    _key: string;
  } & Step)[];
  link?: LinkType;
  media?: ImageType;
}) {
  const { setCursorData } = useCursor();

  return (
    <div className={styles.root} id="about">
      {bio && (
        <div className={styles.bio}>
          <em>{bio}</em>
        </div>
      )}
      <div className={styles.portrait}>
        <SanityImage
          image={media}
          alt={media?.alt ?? ""}
          loading="lazy"
          sizes={"(max-width: 768px) 60vw, 33vw"}
        />
      </div>
      {parkour && (
        <ul className={styles.parkour}>
          {parkour.map((step) => (
            <li key={step._key}>
              <div>
                {step.date} • {step.title}
              </div>
              {step.company &&
                (step.website ? (
                  <Link href={step.website} variant="underline-reverse">
                    {step.company}
                  </Link>
                ) : (
                  <i>{step.company}</i>
                ))}
            </li>
          ))}
        </ul>
      )}
      {link && (
        <Link
          href={link.url!}
          className={styles.link}
          onMouseOver={() =>
            setCursorData({
              data: "text",
              text: "Click me !",
            })
          }
          onMouseLeave={() =>
            setCursorData({
              data: "",
              text: "",
            })
          }
        >
          <span>{link.label}</span>
          <ArrowRight className={styles.arrow} />
        </Link>
      )}
    </div>
  );
}
