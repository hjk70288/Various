import React from "react";
import styles from "./header.module.scss";

const Header = props => {
  const { scrollSectionInfo } = props;

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

  // 헤더의 바로가기 클릭 시 핸들링
  const handleClickLink = destination => {
    // 스크롤링 되는 동안 그 사이에 있는 요소들을 잠시 숨김
    document.body.classList.add("scrolling");
    window.scrollBy(0, totalSectionHeight * destination - window.pageYOffset);

    // 요소 다시 보이도록 함
    setTimeout(() => {
      document.body.classList.remove("scrolling");
    }, 500);
  };

  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <div
          className={`${styles["link"]} ${styles["title"]}`}
          onClick={() => {
            handleClickLink(0);
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
        <div
          className={styles["link"]}
          onClick={() => {
            handleClickLink(0);
          }}
        >
          0
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            handleClickLink(0.13);
            // window.scrollBy(0, totalSectionHeight * 0.13 - window.pageYOffset);
          }}
        >
          1
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            handleClickLink(0.43);
            // window.scrollBy(0, totalSectionHeight * 0.43 - window.pageYOffset);
          }}
        >
          2
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            handleClickLink(0.77);
            // window.scrollBy(0, totalSectionHeight * 0.77 - window.pageYOffset);
          }}
        >
          3
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            handleClickLink(2);
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
