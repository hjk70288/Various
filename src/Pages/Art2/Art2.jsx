import React, { useState, useEffect, useRef } from "react";
import styles from "./art2.module.scss";
import Header from "Components/Header/header/DetailHeader";
import Progress from "Components/Header/progress/Progress";
import calcAnimationValues from "Hooks/calcAnimationValues";
import renderComponent from "Hooks/renderComponent";
import art from "Images/art2.jpg";

/* 3D Rotate 효과 적용 */
const Art2 = ({ history }) => {
  const artRef = useRef(); // Info 영역의 작품 Ref
  const progressRef = useRef(); // 스크롤 진행률 Ref
  const nextBackgroundRef = useRef(); // Next 영역의 배경 Ref
  const nextButtonRef = useRef(); // Next 영역의 버튼(메시지) Ref
  const [startRender, setStartRender] = useState(false); // 애니메이션 시작 여부
  const [isRender, setIsRender] = useState(false); // 애니메이션 완료 여부
  const [isMobile, setIsMobile] = useState(false); // 사용자의 기기가 모바일인지에 대한 여부

  // 스크롤 시 이벤트 핸들링
  const handlePageScroll = () => {
    const scrollRatio = window.pageYOffset / document.body.offsetHeight; // 스크롤 비율
    const animationStartRatio =
      (document.body.offsetHeight - window.innerHeight * 2) /
      document.body.offsetHeight; // Next 영역 Opacity 애니메이션 시작 시점

    // 스크롤 진행률 표시
    if (progressRef.current) {
      progressRef.current.style.width = `${scrollRatio * 120}%`;
    }

    // Next 영역 Opacity 애니메이션
    if (scrollRatio > animationStartRatio) {
      if (nextBackgroundRef.current) {
        nextBackgroundRef.current.style.opacity = calcAnimationValues(
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
        nextButtonRef.current.style.transform = `translate3d(0, ${calcAnimationValues(
          [20, 0, { start: 0.5, end: 1 }],
          window.innerHeight,
          window.pageYOffset - document.body.offsetHeight * animationStartRatio
        )}%, 0)`;
      }
    }
  };

  // 마우스 이동 시 이벤트 핸들링
  const handleMoveMouse = e => {
    // 사용자가 컴퓨터 환경인지 모바일 환경인지 판단
    const userInfo = navigator.userAgent;
    let isMobile = false;
    if (userInfo.indexOf("iPhone") > -1 || userInfo.indexOf("Android") > -1) {
      isMobile = true;
    }

    if (!isMobile) {
      const xDeg = ((window.innerWidth / 2 - e.clientX) / 30) * -1;
      const yDeg = (window.innerHeight / 2 - e.clientY) / 30;

      if (artRef.current) {
        artRef.current.style.transform = `rotateY(${xDeg}deg) rotateX(${yDeg}deg)`;
      }
    } else {
      // TODO: 상하좌우 판단하는 코드 작성
      // if (e.srcElement.nodeName === "IMG") {
      //   if (artRef.current.classList.length === 1) {
      //     artRef.current.classList.add(styles["art--rotate-top"]);
      //     setTimeout(() => {
      //       artRef.current.classList.remove(styles["art--rotate-top"]);
      //     }, 2000);
      //   }
      //   // // console.log(e.clientX, e.clientY);
      //   console.log(e.srcElement.getBoundingClientRect());
      // }
    }
  };

  // 화면 크기 변경 시 이벤트 핸들링
  const handleResizeWindow = () => {
    // 사용자가 컴퓨터 환경인지 모바일 환경인지 판단
    const userInfo = navigator.userAgent;
    let isMobile = false;
    if (userInfo.indexOf("iPhone") > -1 || userInfo.indexOf("Android") > -1) {
      isMobile = true;
    }

    // 컴퓨터 환경일 때만 resize
    if (isMobile === false) {
      window.location.reload();
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

      // 작품의 높이가 현재 창 크기보다 큰 경우
      if (
        artRef.current &&
        window.innerHeight < artRef.current.children[0].height + 50
      ) {
        // 높이 조정
        artRef.current.children[0].style.height = "80vh";
        artRef.current.children[0].style.width = "unset";
      }
      // 작품의 높이가 현재 창 크기보다 작은 경우
      else {
        // 넓이 조정
        artRef.current.children[0].style.height = "unset";
        artRef.current.children[0].style.width = "70vw";
      }
    }, 1500);

    // Intro 영역의 작품 Rotate 효과 추가
    window.addEventListener("mousemove", handleMoveMouse);

    // 화면 크기 변경 시 이벤트 핸들링
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("mousemove", handleMoveMouse);
      window.removeEventListener("resize", handleResizeWindow);
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
          <div className={styles["desc__title"]}>유리땅</div>
          <div>Glass</div>
        </div>
      </section>
      <section className={styles["info"]}>
        <div className={styles["info__art"]}>
          <div className={styles["art"]} ref={artRef}>
            <img className={styles["art__image"]} src={art} alt=""></img>
          </div>
        </div>
        <div className={styles["info__desc"]}>
          대충 설명하는 내용
          <div
            style={{
              fontWeight: "normal",
              fontSize: "1.5rem",
              marginTop: "1em",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            nihil reprehenderit tempore deleniti rem molestias velit suscipit.
            Beatae quaerat distinctio libero, consequuntur eum autem optio, in
            sed perspiciatis rem repudiandae?
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
            renderComponent(history, "/art3");
          }}
        >
          <div className={styles["next__button--text"]}>NEXT</div>
        </div>
      </section>
    </div>
  );
};

export default Art2;
