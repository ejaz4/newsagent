import React from "react";
import styles from "./result.module.css";
import Link from "next/link";

export const SearchResult = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) => {
  return (
    <Link
      href={`/article/create?url=${encodeURIComponent(url)}`}
      className={styles.result}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </Link>
  );
};
