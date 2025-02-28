import Image from "next/image";
import styles from "./frontpage.module.css";
import { MainHero } from "./_components/hero";
import { Feed } from "./_components/feed";
import { StarFeed } from "./_components/feed/starFeed";
import { SearchBar } from "./search/searchbar";
import { MiniDisplay } from "./_components/account/miniDisplay";

export default function Home() {
  return (
    <div className="content topPadding">
      <MainHero />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 8,
        }}
      >
        <SearchBar />
        {/* <MiniDisplay larger={true} /> */}
      </div>

      <div className={styles.mainContent}>
        <div className="section">
          <StarFeed channel="latest" />
        </div>
        <div className="section">
          <h1>Latest</h1>
          <Feed channel="latest" />
        </div>

        <div className="section">
          <h1>Politics</h1>
          <Feed channel="@category/Politics" />
        </div>

        <div className="section">
          <h1>Technology</h1>
          <Feed channel="@category/Technology" />
        </div>

        <div className="section">
          <h1>Business</h1>
          <Feed channel="@category/Business" />
        </div>

        <div className="section">
          <h1>Sport</h1>
          <Feed channel="@category/Sport" />
        </div>

        <div className="section">
          <h1>Society</h1>
          <Feed channel="@category/Society" />
        </div>
      </div>
    </div>
  );
}
