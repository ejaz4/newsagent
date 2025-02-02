import React from "react";
import styles from "./hero.module.css";
import { SearchBar } from "@/app/search/searchbar";

export const MainHero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textArt}>
        <h1>newsagent</h1>
        <p>The world, from on top of the fence.</p>
      </div>

      {/* <SearchBar /> */}
    </div>
  );
};
