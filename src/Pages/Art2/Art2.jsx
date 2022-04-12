import React, { useState, useEffect } from "react";
import styles from "./art.module.scss";
import Header from "Components/Header/header/DetailHeader";
import art from "Images/유리땅.jpg";

const Art2 = ({ history }) => {
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsRender(true);
    }, 200);
  });

  return (
    <div className={styles["content"]}>
      <Header history={history} />
      <div
        className={`${styles["art-detail"]} ${
          isRender ? styles["art-detail--render"] : ""
        }`}
      >
        <img className={styles["art-detail__art"]} src={art} alt="" />
        <div className={styles["art-detail__desc"]}>
          <div className={styles["desc__title"]}>사랑</div>
          <div>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex
            consequuntur corrupti, odio incidunt quo, qui veniam vitae est
            atque, ipsa vel eveniet beatae voluptatem minima doloribus ab nulla
            deserunt ad?
          </div>
        </div>
      </div>
    </div>
  );
};

export default Art2;
