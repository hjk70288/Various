import React, { useState, useEffect, useRef } from "react";
import styles from "./art.module.scss";
import Header from "Components/Header/header/DetailHeader";
import calcAnimationValues from "Hooks/calcAnimationValues";
import renderComponent from "Hooks/renderComponent";

const Art1 = ({ history }) => {
  const introRef = useRef();
  const backgroundRef = useRef();
  const nextButtonRef = useRef();
  const [startRender, setStartRender] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const handlePageScroll = () => {
    const scrollRatio = window.pageYOffset / document.body.offsetHeight;
    const animationStartRatio =
      (document.body.offsetHeight - window.innerHeight * 2) /
      document.body.offsetHeight; // Next 영역의 애니메이션이 시작되는 시점

    // 인트로를 모두 스크롤 했다면
    if (window.pageYOffset > window.innerHeight) {
      // 인트로를 보이지 않도록 함
      if (introRef.current) {
        introRef.current.style.opacity = 0;
        introRef.current.style.zIndex = 0;
      }
    }
    // 인트로를 모두 스크롤하지 않았다면
    else {
      // 인트로를 보이도록 함
      if (introRef.current) {
        introRef.current.style.opacity = 1;
        introRef.current.style.zIndex = 2;
      }
    }

    // Next 영역 Opacity 애니메이션 처리
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
    } else {
      if (backgroundRef.current) backgroundRef.current.style.opacity = 0.1;
      if (nextButtonRef.current) nextButtonRef.current.style.opacity = 0;
    }
  };

  useEffect(() => {
    setStartRender(true);
    // setTimeout(() => {
    //   setStartRender(true);
    // }, 1800);
    setTimeout(() => {
      window.addEventListener("scroll", handlePageScroll);
      setIsRender(true);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, [setStartRender]);

  return (
    <div
      className={`${styles["content"]} ${
        !isRender ? styles["before-load"] : ""
      }`}
    >
      <Header history={history} />
      <section ref={introRef} className={styles["intro"]}>
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
          <div className={styles["desc__title"]}>사랑</div>
          <div>사랑사랑사랑사랑사랑사랑</div>
        </div>
      </section>
      <section className={styles["info"]}>대충 작품 설명하는 내용</section>
      <section className={styles["transparent-area"]}></section>
      <section className={styles["next"]}>
        <div ref={backgroundRef} className={styles["next__background"]}></div>
        <div
          ref={nextButtonRef}
          className={styles["next__button"]}
          onClick={() => {
            renderComponent(history, "/art2");
          }}
        >
          NEXT
        </div>
      </section>
    </div>
  );
};

export default Art1;
