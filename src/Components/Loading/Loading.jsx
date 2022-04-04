import React, { useState, useRef } from "react";
import styles from "./loading.module.scss";

const Loading = props => {
  const { isLoaded } = props;
  const loadingRef = useRef();
  const [afterLoad, setAfterLoad] = useState(false);

  // 로딩 컴포넌트의 display을 0.5초 뒤에 none으로 변경
  const removeLoadingDisplay = () => {
    setTimeout(() => {
      loadingRef.current.style.display = "none";
    }, 500);
  };

  // 로딩이 완료된 후 0.5초 후 실행
  if (isLoaded) {
    setTimeout(() => {
      setAfterLoad(true);
      removeLoadingDisplay();
    }, 500);
  }

  // 모바일 환경인 경우
  const userInfo = navigator.userAgent;
  if (userInfo.indexOf("iPhone") > -1 || userInfo.indexOf("Android") > -1) {
    // 로딩이 3초 이상 안되는 경우 강제로 로딩 제거 (모바일에서의 무한 로딩 오류 제거)
    if (!isLoaded) {
      setTimeout(() => {
        setAfterLoad(true);
        removeLoadingDisplay();
      }, 2000);
    }
  }

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
