import React from "react";
import styles from "./themeButton.module.scss";

const ThemeButton = props => {
  const { setDarkMode } = props;

  const changeTheme = () => {
    if (document.body.classList.contains("dark-mode")) {
      document.body.classList.remove("dark-mode");
      setDarkMode(false);
    } else {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  };
  return (
    <button onClick={changeTheme} className={styles["change-button"]}>
      TURN LIGHT
    </button>
  );
};

export default ThemeButton;
