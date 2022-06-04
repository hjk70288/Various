import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
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
      <div className={styles["footer__copy-right"]}>
        Copyright 2022. (KYM) all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
