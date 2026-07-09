"use client";

import { useCursor } from "@/components/providers/CursorProvider";
import Arrow from "@/components/icons/Arrow";
import Link from "@/components/ui/Link";
import styles from "./ProjectsList.module.css";
import { ProjectType } from "@/sanity/lib/types";

export default function ProjectsList({
  projects,
}: {
  projects: ProjectType[];
}) {
  const { setBackgroundImageSrc } = useCursor();

  return (
    <ul className={styles.projects}>
      {projects?.map((project) => (
        <li
          className={styles["project-container"]}
          key={project?._id}
          onMouseOver={() => {
            setBackgroundImageSrc(
              project?.image?.asset?.url ? project?.image?.asset?.url : "",
            );
          }}
          onMouseLeave={() => {
            setBackgroundImageSrc("");
          }}
        >
          <Link className={styles.project} href={project.link!}>
            <h2 className={styles.title}>{project.title}</h2>
            <span className={styles.description}>
              {project.description} • {project.stack}
            </span>
            <Arrow className={styles.arrow} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
