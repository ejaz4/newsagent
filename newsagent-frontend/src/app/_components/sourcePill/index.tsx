import styles from "./sourcePill.module.css";

export const SourcePill = ({
  name,
  favicon,
  onclick,
  active = false,
}: {
  name: string;
  favicon?: string | null;
  onclick?: () => void;
  active?: boolean;
}) => {
  return (
    <button
      onClick={onclick}
      className={`${styles.pill} ${active ? styles.pillactive : ""}`}
    >
      {favicon && <img src={favicon} alt={name} />}
      <p>{name}</p>
    </button>
  );
};
