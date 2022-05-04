import React from "react";
import styles from "./header.module.scss";

const Header = props => {
  const { scrollSectionInfo, setDarkMode } = props;

  // 스크롤 섹션의 높이 설정
  scrollSectionInfo.map(value => {
    value.sectionHeight = value.heightRatio * window.innerHeight;
    return null;
  });

  // 스크롤 섹션들의 높이를 모두 합친 값 구하기
  let totalSectionHeight = 0;
  for (let i = 0; i < scrollSectionInfo.length; i++) {
    totalSectionHeight += scrollSectionInfo[i].sectionHeight;
  }

  // 테마 변경하기
  const changeTheme = () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode--fin");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark-mode");
      setDarkMode(true);

      setTimeout(() => {
        document.body.classList.add("dark-mode--fin");
      }, 550);
    }
  };

  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <div
          className={`${styles["link"]} ${styles["title"]}`}
          onClick={() => {
            window.scrollBy(0, 0 - window.pageYOffset);
          }}
        >
          {/* VARIOUS */}
          <span className={styles["title__word"]}>V</span>
          <span className={styles["title__word"]}>A</span>
          <span className={styles["title__word"]}>R</span>
          <span className={styles["title__word"]}>I</span>
          <span className={styles["title__word"]}>O</span>
          <span className={styles["title__word"]}>U</span>
          <span className={styles["title__word"]}>S</span>
        </div>
        <div className={styles["link"]} onClick={changeTheme}>
          D
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, 0 - window.pageYOffset);
          }}
        >
          0
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, totalSectionHeight * 0.09 - window.pageYOffset);
          }}
        >
          1
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, totalSectionHeight * 0.32 - window.pageYOffset);
          }}
        >
          2
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, totalSectionHeight * 0.57 - window.pageYOffset);
          }}
        >
          3
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, totalSectionHeight * 0.82 - window.pageYOffset);
          }}
        >
          4
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            window.scrollBy(0, totalSectionHeight * 2 - window.pageYOffset);
          }}
        >
          0
        </div>
        {/* <a
          className={styles["link"]}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/llllllilllllilllllillllil"
        >
          Instagram
        </a> */}
      </div>
    </nav>
  );
};

export default Header;
