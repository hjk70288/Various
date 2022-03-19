import React, { useState } from "react";
import styles from "./loading.module.scss";

const Loading = props => {
  const { isLoaded } = props;
  const [afterLoad, setAfterLoad] = useState(false);

  // 로딩이 완료된 후 0.5초 후 실행
  if (isLoaded) {
    setTimeout(() => {
      setAfterLoad(true);
    }, 500);
  }

  return (
    <div
      className={
        !isLoaded
          ? styles["before-load"]
          : afterLoad
          ? styles["after-load"]
          : ""
      }
    >
      <div className={styles["loading"]}>
        <svg className={styles["loading__circle"]}>
          <circle cx="50%" cy="50%" r="25"></circle>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
