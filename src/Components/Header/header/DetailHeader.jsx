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
          VARIOUS
        </div>
      </div>
    </nav>
  );
};

export default DetailHeader;
