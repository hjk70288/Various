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
        >
          ART BY llllllilllllilllllillllil
        </a>
      </div>
      <div className={styles["footer__people"]}>
        <a target="_blank" rel="noreferrer" href="https://github.com/hjk70288">
          DEVELOPED BY KYM
        </a>
      </div>
      <div className={styles["footer__copy-right"]}>
        Copyright 2022. (KYM) all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
