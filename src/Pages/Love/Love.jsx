import React, { useState, useEffect, useRef } from "react";
import styles from "./love.module.scss";
import Header from "Components/Header/header/DetailHeader";
import Progress from "Components/Header/progress/Progress";
import calcAnimationValues from "Hooks/calcAnimationValues";
import renderComponent from "Hooks/renderComponent";
import art from "Images/love.jpg";

/* 효과 미정 */
const Love = ({ history }) => {
  const progressRef = useRef(); // 스크롤 진행률 Ref
  const nextBackgroundRef = useRef(); // Next 영역의 배경 Ref
  const nextButtonRef = useRef(); // Next 영역의 버튼(메시지) Ref
  const [startRender, setStartRender] = useState(false); // 애니메이션 시작 여부
  const [isRender, setIsRender] = useState(false); // 애니메이션 완료 여부
  const [isMobile, setIsMobile] = useState(false); // 사용자의 기기가 모바일인지에 대한 여부

  // 스크롤 시 이벤트 핸들링
  const handlePageScroll = () => {
    const scrollRatio =
      window.pageYOffset / (document.body.offsetHeight - window.innerHeight); // 스크롤 비율
    const animationStartRatio =
      (document.body.offsetHeight - window.innerHeight * 2) /
      document.body.offsetHeight; // Next 영역 Opacity 애니메이션 시작 시점

    // 스크롤 진행률 표시
    if (progressRef.current) {
      progressRef.current.style.width = `${scrollRatio * 100}%`;
    }

    // Next 영역 Opacity 애니메이션
    if (scrollRatio > animationStartRatio) {
      if (nextBackgroundRef.current) {
        nextBackgroundRef.current.style.opacity = calcAnimationValues(
          [0, 0.6, { start: 0, end: 1 }],
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
        nextButtonRef.current.style.transform = `translate3d(0, ${calcAnimationValues(
          [20, 0, { start: 0.5, end: 1 }],
          window.innerHeight,
          window.pageYOffset - document.body.offsetHeight * animationStartRatio
        )}%, 0)`;
      }
    }
  };

  useEffect(() => {
    // 사용자가 컴퓨터 환경인지 모바일 환경인지 판단
    const userInfo = navigator.userAgent;
    if (userInfo.indexOf("iPhone") > -1 || userInfo.indexOf("Android") > -1) {
      setIsMobile(true);
    }

    // 렌더링 애니메이션
    setStartRender(true);

    // 렌더링 애니메이션이 완전히 끝나기 전 까지 스크롤을 할 수 없도록 설정
    setTimeout(() => {
      window.addEventListener("scroll", handlePageScroll);
      setIsRender(true);
    }, 1500);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
    };
  }, [setIsMobile]);

  return (
    <div
      className={`${styles["content"]} ${
        !isRender ? styles["before-load"] : ""
      }`}
    >
      <Header history={history} />
      <Progress ref={progressRef} />
      <section className={styles["intro"]}>
        <div
          className={styles["intro__background"]}
          style={isMobile ? { position: "relative" } : null}
        >
          <div
            className={`${styles["background__image"]} ${
              startRender && styles["background__image--render"]
            }`}
            style={isMobile ? { backgroundAttachment: "unset" } : null}
          ></div>
        </div>
        <div
          className={`${styles["intro__desc"]} ${
            startRender && styles["intro__desc--render"]
          }`}
        >
          <div className={styles["desc__title"]}>사랑</div>
          <div>Love</div>
        </div>
      </section>

      <section className={styles["info"]}>
        <div className={styles["info__art"]}>
          <img className={styles["art__image"]} src={art} alt=""></img>
        </div>
        <div className={styles["info__desc"]}>
          사랑 (Love)
          <br />
          2021
          <div
            style={{
              fontWeight: "normal",
              fontSize: "1.5rem",
              marginTop: "1em",
              textAlign: "left",
              lineHeight: "1.2em",
            }}
          >
            사랑은 미움의 대립개념으로 볼 수도 있다. 사랑의 표현 방법은 한결같지
            않으며 교제 형태에 따라 다르게 나타난다. 모든 감정, 마음과 얽혀있는
            무언가는 사랑일 수도 있기 때문에 자신의 색안경을 끼고 보이는 데로만
            판단하지 않도록 조심해야 하는 것이 사랑이다.
          </div>
        </div>
      </section>

      <section className={styles["transparent-area"]}></section>
      <section className={styles["next"]}>
        <div
          ref={nextBackgroundRef}
          className={styles["next__background"]}
        ></div>
        <div
          ref={nextButtonRef}
          className={styles["next__button"]}
          onClick={() => {
            renderComponent(history, "/anxious");
          }}
        >
          <div className={styles["next__button--text"]}>NEXT</div>
        </div>
      </section>
    </div>
  );
};

export default Love;
