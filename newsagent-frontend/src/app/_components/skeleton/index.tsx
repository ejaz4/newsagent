import styles from "./skeleton.module.css";

export const Skeleton = ({
  count = 1,
  width,
  height,
  borderRadius = 4,
  bottomMargin = false,
  rainbow = false,
}: {
  count?: number;
  width: number | string;
  height: number | string;
  borderRadius?: number;
  bottomMargin?: boolean;
  rainbow?: boolean;
}) => {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <div
          style={{
            width: width,
            height: height,
            borderRadius: borderRadius,
            marginBottom: bottomMargin ? 4 : count > 1 ? 4 : 0,
          }}
          key={i}
          className={`${styles.skeleton} ${rainbow ? styles.rainbow : ""}`}
        ></div>
      ))}
    </>
  );
};
