import React, { forwardRef } from "react";
import styles from "./cursor.module.scss";

const Cursor = forwardRef((props, ref) => {
  return (
    <svg ref={ref} className={styles["cursor-circle"]}>
      <circle cx="50%" cy="50%" r="250"></circle>
    </svg>
  );
});

export default Cursor;
