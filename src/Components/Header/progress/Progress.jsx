import React, { forwardRef } from "react";
import styles from "./progress.module.scss";

const Progress = forwardRef((props, ref) => {
  return <div ref={ref} className={styles["progress"]}></div>;
});

export default Progress;
