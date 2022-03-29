import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__people"]}>
        <div
          className={styles["link"]}
          onClick={() => {
            window.open("https://www.instagram.com/llllllilllllilllllillllil");
          }}
        >
          ART BY llllllilllllilllllillllil
        </div>
      </div>
      <div className={styles["footer__people"]}>
        <div
          className={styles["link"]}
          onClick={() => {
            window.open("https://github.com/hjk70288");
          }}
        >
          DEVELOPED BY KYM
        </div>
      </div>
      <div className={styles["footer__copy-right"]}>
        Copyright 2022. (KYM) all rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
