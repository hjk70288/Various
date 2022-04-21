import renderComponent from "Hooks/renderComponent";
import React from "react";
import styles from "./header.module.scss";

const DetailHeader = props => {
  const { history } = props;

  return (
    <nav className={styles["header"]}>
      <div className={styles["header__links"]}>
        <div
          className={`${styles["link"]} ${styles["title"]}`}
          onClick={() => {
            renderComponent(history, "/");
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
      </div>
    </nav>
  );
};

export default DetailHeader;
