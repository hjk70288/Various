import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <Link to="#" className={`${styles["link"]} ${styles["title"]}`}>
          iillililiiiil
        </Link>
        <Link to="#" className={styles["link"]}>
          개요
        </Link>
        <Link to="#" className={styles["link"]}>
          제품사항
        </Link>
        <a
          className={styles["link"]}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/iillililiiiil"
        >
          Instagram
        </a>
      </div>
    </nav>
  );
};

export default Header;
