import React from "react";
import styles from "./header.module.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <Link to="#" className={`${styles["link"]} ${styles["title"]}`}>
          iiIIiIiIiiiiI
        </Link>
        <Link to="#" className={styles["link"]}>
          개요
        </Link>
        <Link to="#" className={styles["link"]}>
          제품사항
        </Link>
        <Link to="#" className={styles["link"]}>
          구매하기
        </Link>
      </div>
    </nav>
  );
}

export default Header;
