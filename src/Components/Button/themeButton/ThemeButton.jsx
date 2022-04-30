import React from "react";
import styles from "./themeButton.module.scss";

// 테마 변경 버튼 (라이트, 다크)
const ThemeButton = props => {
  const { darkMode, setDarkMode } = props;

  // 테마 변경하기
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
    <div onClick={changeTheme} className={styles["change-button"]}>
      {darkMode ? "LIGHT ON" : "LIGHT OFF"}
    </div>
  );
};

export default ThemeButton;
