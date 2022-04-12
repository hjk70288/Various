import React, { useState, useEffect, useRef } from "react";
import styles from "./art.module.scss";
import Header from "Components/Header/header/DetailHeader";
import calcAnimationValues from "Hooks/calcAnimationValues";
import renderComponent from "Hooks/renderComponent";

const Art3 = ({ history }) => {
  const backgroundRef = useRef();
  const nextButtonRef = useRef();
  const [startRender, setStartRender] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const handlePageScroll = () => {
    const scrollRatio = window.pageYOffset / document.body.offsetHeight;
    const animationStartRatio =
      (document.body.offsetHeight - window.innerHeight * 2) /
      document.body.offsetHeight;

    if (scrollRatio > animationStartRatio) {
      if (backgroundRef.current) {
        backgroundRef.current.style.opacity = calcAnimationValues(
          [0.1, 0.6, { start: 0, end: 1 }],
          window.innerHeight,
          window.pageYOffset - document.body.offsetHeight * animationStartRatio
        );
      }
      if (nextButtonRef.current) {
        nextButtonRef.current.style.opacity = calcAnimationValues(
          [0, 1, { start: 0.5, end: 1 }],
          window.innerHeight,
          window.pageYOffset - document.body.offsetHeight * animationStartRatio
        );
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStartRender(true);
    }, 300);
    setTimeout(() => {
      window.addEventListener("scroll", handlePageScroll);
      setIsRender(true);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  });

  return (
    <div
      className={`${styles["content"]} ${
        !isRender ? styles["before-load"] : ""
      }`}
    >
      <Header history={history} />
      <section className={styles["intro"]}>
        <div className={styles["intro__background"]}>
          <div
            className={`${styles["background__image"]} ${
              startRender && styles["background__image--render"]
            }`}
          ></div>
        </div>
        <div
          className={`${styles["intro__desc"]} ${
            startRender && styles["intro__desc--render"]
          }`}
        >
          <div className={styles["desc__title"]}>메롱</div>
          <div>메롱메롱메롱메롱메롱메롱</div>
        </div>
      </section>
      <section className={styles["info"]}>대충 작품 설명하는 내용</section>
      <section className={styles["next"]}>
        <div ref={backgroundRef} className={styles["next__background"]}></div>
        <div
          ref={nextButtonRef}
          className={styles["next__button"]}
          onClick={() => {
            renderComponent(history, "/art4");
          }}
        >
          NEXT
        </div>
      </section>
    </div>
  );
};

export default Art3;
