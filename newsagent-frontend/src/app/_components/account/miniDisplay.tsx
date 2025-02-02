"use client";
import { UserRoundIcon } from "lucide-react";
import styles from "./miniDisplay.module.css";
import { useState } from "react";

export const MiniDisplay = ({ larger = false }: { larger?: boolean }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className={`${styles.mini} ${larger ? styles.larger : ""}`}>
        <UserRoundIcon size={16} />
      </button>
    </>
  );
};
