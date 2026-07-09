"use client";

import ProjectsList from "./ProjectsList";
import styles from "./Work.module.css";
import { ProjectType } from "@/sanity/lib/types";

export default function Work({ projects }: { projects?: ProjectType[] }) {
  return (
    <div className={styles.root} id="code">
      {projects && <ProjectsList projects={projects!} />}
    </div>
  );
}
