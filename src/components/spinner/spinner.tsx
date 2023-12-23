import React from "react";
import styles from "./spinner.module.css";

interface SpinnerProps {
  size: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size }) => {
  return (
    <svg
      className={styles.spinner}
      width={size}
      height={size}
      viewBox="0 0 50 50"
    >
      <circle
        className={styles.spinnerCircle}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      />
    </svg>
  );
};

export default Spinner;
