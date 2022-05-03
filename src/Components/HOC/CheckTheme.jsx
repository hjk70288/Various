import React from "react";

// 다크모드인지 판단하는 고차 컴포넌트
export default function CheckTheme(Component) {
  function setTheme(props) {
    // 이전에 다크모드로 설정되어 있던 경우 다크모드로 설정
    if (window.localStorage.darkMode === "true") {
      document.body.classList.add("dark-mode");
      document.body.classList.add("dark-mode--fin");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.remove("dark-mode--fin");
    }

    return <Component history={props.history} />;
  }

  return setTheme;
}
