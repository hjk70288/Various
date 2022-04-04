import React, { useState, useRef } from "react";
import styles from "./loading.module.scss";

const Loading = props => {
  // const { isLoaded } = props;
  const loadingRef = useRef();
  const [afterLoad, setAfterLoad] = useState(false);

  // 로딩 컴포넌트의 display을 0.5초 뒤에 none으로 변경
  const removeLoadingDisplay = () => {
    setTimeout(() => {
      loadingRef.current.style.display = "none";
    }, 500);
  };

  // 0.5초동안 로딩 컴포넌트 띄우기
  setTimeout(() => {
    setAfterLoad(true);
    removeLoadingDisplay();
  }, 500);

  return (
    <div
      ref={loadingRef}
      className={!afterLoad ? styles["before-load"] : styles["after-load"]}
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
