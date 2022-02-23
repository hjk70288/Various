import React, { forwardRef } from "react";
import styles from "./cursor.module.scss";

const cursor = forwardRef((props, ref) => {
  return (
    <svg ref={ref} className={styles["cursor_circle"]}>
      <circle cx="50%" cy="50%" r="250"></circle>
    </svg>
  );
});

export default cursor;
