import { Link, Step } from "@/sanity.types";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import styles from "./About.module.css";
import SanityImage from "@/components/ui/SanityImage";

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
  link?: Link;
  media?: SanityAsset;
}) {
  return (
    <div className={styles.root} id="about">
      {bio && (
        <div className={styles.bio}>
          <em>{bio}</em>
        </div>
      )}
      {parkour && (
        <div className={styles.parkour}>
          {parkour.map((step) => (
            <div key={step._key}>
              <div>
                {step.date} • {step.title}
              </div>
              <div>{step.company}</div>
            </div>
          ))}
        </div>
      )}
      <div className={styles.portrait}>
        <SanityImage image={media} />
      </div>
    </div>
  );
}
