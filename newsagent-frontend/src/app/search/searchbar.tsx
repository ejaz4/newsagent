"use client";
import React, { useState } from "react";
import { SearchIcon } from "lucide-react";
import styles from "./searchbar.module.css";
import { useRouter } from "next/navigation";

export const SearchBar = ({ query = "" }: { query?: string }) => {
  const [active, setActive] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className={`${styles.container}`}>
        <div className={styles.icon}>
          <SearchIcon size={16} />
        </div>
        <input
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              if (e.currentTarget.value) {
                router.push(`/search?query=${e.currentTarget.value}`);
              }
            }
          }}
          type="text"
          placeholder="What do you want to see today?"
          defaultValue={query}
        />
      </div>
    </>
  );
};
