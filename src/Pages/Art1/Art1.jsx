import React from "react";
import renderComponent from "Hooks/renderComponent";

const Art1 = ({ history }) => {
  return (
    <div
      style={{ marginTop: "5em", textAlign: "center", fontSize: "5rem" }}
      onClick={() => {
        renderComponent(history, "/");
      }}
    >
      첫 번째 작품 입니다.
    </div>
  );
};

export default Art1;
