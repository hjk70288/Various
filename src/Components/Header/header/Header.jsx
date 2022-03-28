import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

const Header = () => {
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
        <a
          className={styles["link"]}
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/llllllilllllilllllillllil"
        >
          Instagram
        </a>
      </div>
    </nav>
  );
};

export default Header;
