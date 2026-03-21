import { FC } from "react";
import styles from "./spinner.module.css";

type SpinnerVariant = "onDark" | "onLight";

type Props = {
  variant?: SpinnerVariant;
  className?: string;
};

export const Spinner: FC<Props> = ({ variant = "onLight", className }) => {
  const variantClass = variant === "onDark" ? styles.onDark : styles.onLight;
  return (
    <span
      className={[styles.root, variantClass, className].filter(Boolean).join(" ")}
      aria-hidden
    />
  );
};
