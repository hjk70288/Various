import React from "react";
import styles from "./footer.module.scss";

const Footer = props => {
  const { darkMode, setDarkMode } = props;

  // 테마 변경하기
  const changeTheme = () => {
    // 스크롤 되는 동안 사이의 요소 잠시 감춤
    document.body.classList.add("scrolling");

    // 스크롤 맨 위로 이동
    window.scrollTo(0, 0);

    // 요소 다시 보이도록 함
    setTimeout(() => {
      document.body.classList.remove("scrolling");
    }, 1500);

    // 테마 변경
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
    <footer className={styles["footer"]}>
      <div className={styles["footer__people"]}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/llllllilllllilllllillllil"
          data-hover="CLICK ME"
        >
          ART BY llllllilllllilllllillllil
          <span className={styles["hidden-message"]}>Click To Instagram!</span>
        </a>
      </div>
      <div className={styles["footer__people"]}>
        <a target="_blank" rel="noreferrer" href="https://github.com/hjk70288">
          DEVELOPED BY KYM
          <span className={styles["hidden-message"]}>Click To GitHub!</span>
        </a>
      </div>
      <div className={styles["footer__people"]}>
        <div onClick={changeTheme}>
          CHANGE THEME
          <span className={styles["hidden-message"]}>
            {darkMode ? "Click To Light Mode!" : "Click To Dark Mode!"}
          </span>
        </div>
      </div>
      <div className={styles["footer__copy-right"]}>
        Copyright 2022. (KYM) all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
