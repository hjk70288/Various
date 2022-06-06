import React from "react";
import styles from "./header.module.scss";

const Header = props => {
  const { scrollSectionInfo } = props;

  // 스크롤 섹션의 높이 설정
  scrollSectionInfo.sectionHeight =
    scrollSectionInfo.heightRatio * window.innerHeight;
  const sectionHeight = scrollSectionInfo.sectionHeight;

  // // 헤더의 바로가기 클릭 시 핸들링
  // const handleClickLink = (destination, hideTime = 500) => {
  //   // 스크롤링 되는 동안 그 사이에 있는 요소들을 잠시 숨김
  //   document.body.classList.add("scrolling");
  //   // 요소가 다시 보여질 때 opacity transition을 위해 추가
  //   document.body.classList.add("scrolling-transition");
  //   // 스크롤 맨 위로 이동
  //   window.scrollBy(0, sectionHeight * destination - window.pageYOffset);

  //   // 요소 다시 보이도록 함
  //   setTimeout(() => {
  //     document.body.classList.remove("scrolling");
  //   }, hideTime);
  //   // 0.5초 후 클래스 제거
  //   setTimeout(() => {
  //     document.body.classList.remove("scrolling-transition");
  //   }, hideTime + 500);
  // };

  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <div
          className={`${styles["link"]} ${styles["title"]}`}
          onClick={() => {
            // handleClickLink(0, 1000);
            window.scrollTo(0, 0);
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
            // handleClickLink(0.26);
            window.scrollBy(0, sectionHeight * 0.26 - window.pageYOffset);
          }}
        >
          1
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            // handleClickLink(0.51);
            window.scrollBy(0, sectionHeight * 0.51 - window.pageYOffset);
          }}
        >
          2
        </div>
        <div
          className={styles["link"]}
          onClick={() => {
            // handleClickLink(0.75);
            window.scrollBy(0, sectionHeight * 0.75 - window.pageYOffset);
          }}
        >
          3
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
