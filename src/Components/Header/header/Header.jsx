import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

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

  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <Link
          to="#"
          className={`${styles["link"]} ${styles["title"]}`}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          llllllilllllilllllillllil
        </Link>
        <Link
          to="#"
          className={styles["link"]}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          0
        </Link>
        <Link
          to="#"
          className={styles["link"]}
          onClick={() => {
            window.scrollTo(0, totalSectionHeight * 0.1);
          }}
        >
          1
        </Link>
        <Link
          to="#"
          className={styles["link"]}
          onClick={() => {
            window.scrollTo(0, totalSectionHeight * 0.3);
          }}
        >
          2
        </Link>
        <Link
          to="#"
          className={styles["link"]}
          onClick={() => {
            window.scrollTo(0, totalSectionHeight * 0.6);
          }}
        >
          3
        </Link>
        <Link
          to="#"
          className={styles["link"]}
          onClick={() => {
            window.scrollTo(0, totalSectionHeight * 0.8);
          }}
        >
          4
        </Link>
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
