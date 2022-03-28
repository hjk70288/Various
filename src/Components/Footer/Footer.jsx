import React from "react";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer__people"]}>
        ART BY llllllilllllilllllillllil
      </div>
      <div className={styles["footer__people"]}>DEVELOPED BY KYM</div>
      <div className={styles["footer__copy-right"]}>카피라이트</div>
    </footer>
  );
};

export default Footer;
