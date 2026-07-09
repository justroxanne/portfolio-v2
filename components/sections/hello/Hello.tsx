import Markdown from "markdown-to-jsx";
import styles from "./Hello.module.css";

export default function Hello({
  title,
  intro,
}: {
  title?: string;
  intro?: string;
}) {
  return (
    <div className={styles.root} id="hello">
      {intro && (
        <Markdown
          options={{
            forceWrapper: true,
            wrapper: ({ children, ...props }) => <p {...props}>{children}</p>,
          }}
        >
          {intro}
        </Markdown>
      )}
      {title && (
        <Markdown
          options={{
            forceWrapper: true,
            wrapper: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
          }}
        >
          {title}
        </Markdown>
      )}
    </div>
  );
}
