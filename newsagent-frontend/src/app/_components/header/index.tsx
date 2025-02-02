"use client";
import { useEffect, useState } from "react";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";
import { MiniDisplay } from "../account/miniDisplay";
import Link from "next/link";

export const Header = () => {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!pathname) return;

    if (pathname === "/") {
      return setHidden(true);
    }

    return setHidden(false);
  }, [pathname]);

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      <div className="content">
        <div className={styles.headerInner}>
          <Link href={"/"}>
            <h2>newsagent</h2>
          </Link>
          <div></div>
          {/* <MiniDisplay /> */}
        </div>
      </div>
    </header>
  );
};
