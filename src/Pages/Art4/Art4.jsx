import React, { useState, useEffect, useRef } from "react";
import styles from "./art.module.scss";
import Header from "Components/Header/header/DetailHeader";
import Progress from "Components/Header/progress/Progress";
import calcAnimationValues from "Hooks/calcAnimationValues";
import renderComponent from "Hooks/renderComponent";
import art from "Images/art4.jpg";

const GlitchBox = props => {
  const { x, y, width, height } = props;
  return (
    <div
      className={styles["art__glitch"]}
      style={{
        top: `${y}px`,
        left: `${x}px`,
        backdropFilter: `invert(1)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    ></div>
  );
};

const Art4 = ({ history }) => {
  const artRef = useRef(); // Info 영역의 작품 Ref
  const progressRef = useRef(); // 스크롤 진행률 Ref
  const nextBackgroundRef = useRef(); // Next 영역의 배경 Ref
  const nextButtonRef = useRef(); // Next 영역의 버튼(메시지) Ref
  const [glitchBox, setGlitchBox] = useState([]);
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

  // 중복되지 않는 난수 배열 생성
  const makeRandomNumberArray = (maxNumber, count) => {
    const randomNumberArray = [];
    for (let i = 0; i < count; i++) {
      //check if there is any duplicate index
      const randomNum = Math.floor(Math.random() * maxNumber);
      if (randomNumberArray.indexOf(randomNum) === -1) {
        randomNumberArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomNumberArray;
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

    window.addEventListener("mousemove", e => {
      if (
        e.srcElement.classList.contains(styles["art__image"]) ||
        e.srcElement.classList.contains(styles["art__glitch"])
      ) {
        artRef.current.classList.remove(styles["none"]);
        artRef.current.style.height = `${artRef.current.children[0].height}px`;
        const children = [];
        if (artRef.current) {
          const xs = makeRandomNumberArray(
            artRef.current.children[0].width,
            10
          );
          const ys = makeRandomNumberArray(
            artRef.current.children[0].height,
            10
          );
          const widths = makeRandomNumberArray(200, 10);
          const heights = makeRandomNumberArray(100, 10);
          Math.floor(Math.random() * 2);
          const test = [
            [5000, 50, 0, 100],
            [50, 5000, 100, 0],
          ];
          const ran = Math.floor(Math.random() * 2);
          for (let i = 0; i < 10; i++) {
            children.push(
              <GlitchBox
                key={i}
                // width={widths[i]}
                // height={heights[i]}
                // x={xs[i]}
                // y={ys[i]}
                width={test[ran][0]}
                height={test[ran][1]}
                x={test[ran][2] * i}
                y={test[ran][3] * i}
              />
            );
          }
          setGlitchBox(children);
        }
      } else {
        artRef.current.classList.add(styles["none"]);
      }
    });

    return () => {
      window.removeEventListener("scroll", handlePageScroll);
      // window.removeEventListener("mousemove", handleMoveMouse);
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
          <div className={styles["desc__title"]}>이인증</div>
          <div>이인증</div>
        </div>
      </section>
      <section className={styles["info"]}>
        <div className={styles["art"]} ref={artRef}>
          <img className={styles["art__image"]} src={art} alt=""></img>
          {glitchBox}
        </div>
        {/* <div className={styles["info__top"]}>
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
                marginTop: "2em",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
              nihil reprehenderit tempore deleniti rem molestias velit suscipit.
              Beatae quaerat distinctio libero, consequuntur eum autem optio, in
              sed perspiciatis rem repudiandae?
            </div>
          </div>
        </div> */}
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
            renderComponent(history, "/art1");
          }}
        >
          <div className={styles["next__button--text"]}>NEXT?</div>
        </div>
      </section>
    </div>
  );
};

export default Art4;
