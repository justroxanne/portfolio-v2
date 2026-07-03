"use client";

import { PROJECTS_QUERYResult } from "@/sanity.types";
import ProjectsList from "./ProjectsList";
import styles from "./Work.module.css";

export default function Work({
  projects,
}: {
  projects?: PROJECTS_QUERYResult;
}) {
  return (
    <div className={styles.root} id="work">
      {projects && <ProjectsList projects={projects!} />}
    </div>
  );
}
