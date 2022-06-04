import React, { useState, useEffect, useRef } from "react";
import renderComponent from "Hooks/renderComponent";
import styles from "./main.module.scss";
import headerStyles from "Components/Header/header/header.module.scss";
import footerStyles from "Components/Footer/footer.module.scss";
import Cursor from "Components/Cursor/Cursor";
import Loading from "Components/Loading/Loading";
import Header from "Components/Header/header/Header";
import Progress from "Components/Header/progress/Progress";
import Footer from "Components/Footer/Footer";
import art1 from "Images/art1.jpg";
import art2 from "Images/art2.jpg";
import art3 from "Images/art3.jpg";
import ScrollGuide from "./Guide";

const Main = ({ history }) => {
  // Parameter
  const cursorRef = useRef(); // 마우스 커서 컴포넌트의 Ref
  const progressRef = useRef(); // 스크롤 진행률 Ref
  const scrollSection = useRef(); // 스크롤 섹션
  const artsInSection = useRef([]); //스크롤 섹션 내의 작품 목록
  const artDescRef = useRef(); // 작품 설명
  // const [darkMode, setDarkMode] = useState(true);
  // const darkMode = true;
  const [artIndex, setArtIndex] = useState(0);
  let yOffset = 0; // 현재 스크롤 위치
  let delayedYOffset = 0; // 부드러운 애니메이션에 사용되는 yOffset (점점 커지다가 yOffset과 동일해짐)
  let rafId; // requestAnimationFrame이 반환하는 값
  let rafState = false; // 부드러운 애니메이션 동작 상태

  // 스크롤 섹션 정보
  const scrollSectionInfo = {
    // 스크롤 섹션 0
    heightRatio: 9, // 높이 비율
    sectionHeight: 0, // 스크롤 섹션 높이 (브라우저 크기 * 높이 비율)
    objs: {
      // 섹션 및 섹션 내의 객체
      section: scrollSection,
    },
    values: {
      // 애니메이션 변화 값 및 시작, 종료 지점
      artDescFadeIn: [0, 1, { start: 0.2, end: 0.25 }],
      imageFadeIn: [250, -50, { start: 0.05, end: 0.25 }],

      imageFadeOut0: [1, 0.5, { start: 0.26, end: 0.5 }],
      imageOut0: [50, 0, { start: 0.26, end: 0.5 }],
      imageOutScale0: [1, 0.4, { start: 0.26, end: 0.5 }],

      imageFadeIn1: [0.5, 1, { start: 0.26, end: 0.5 }],
      imageIn1: [100, 50, { start: 0.26, end: 0.5 }],
      imageInScale1: [0.4, 1, { start: 0.26, end: 0.5 }],

      imageInRight2: [150, 100, { start: 0.26, end: 0.5 }],

      imageFadeOut1: [1, 0.5, { start: 0.51, end: 0.75 }],
      imageOut1: [50, 0, { start: 0.51, end: 0.75 }],
      imageOutScale1: [1, 0.4, { start: 0.51, end: 0.75 }],

      imageOutWindow: [0, -100, { start: 0.51, end: 0.75 }],

      imageFadeIn2: [0.5, 1, { start: 0.51, end: 0.75 }],
      imageIn2: [100, 50, { start: 0.51, end: 0.75 }],
      imageInScale2: [0.4, 1, { start: 0.51, end: 0.75 }],

      artDescFadeOut: [1, 0, { start: 0.76, end: 0.8 }],
      imageFadeOut: [-50, -200, { start: 0.76, end: 1 }],
    },
  };
  // 스크롤 위치에 따른 애니메이션 수치 계산
  const calcAnimationValues = (values, sectionYOffset) => {
    let resultValue = 0; // 애니메이션 수치 계산 결과 값
    const scrollHeight = scrollSectionInfo.sectionHeight; // 현재 섹션의 높이

    const animationStartPoint = values[2].start * scrollHeight; // 애니메이션이 시작되는 지점의 yOffset
    const animationEndPoint = values[2].end * scrollHeight; // 애니메이션이 종료되는 지점의 yOffset
    const animationLength = animationEndPoint - animationStartPoint; // 애니메이션 구간의 길이

    // 스크롤이 애니메이션 실행 구간 안인 경우
    if (
      sectionYOffset >= animationStartPoint &&
      sectionYOffset <= animationEndPoint
    ) {
      resultValue =
        ((sectionYOffset - animationStartPoint) / animationLength) * // 애니메이션 진행률
          (values[1] - values[0]) + // 애니메이션의 총 변화 값
        values[0]; // 애니메이션 초기 값
    }
    // 스크롤이 애니메이션 시작 지점보다 전인 경우
    else if (sectionYOffset < animationStartPoint) {
      resultValue = values[0];
    }
    // 스크롤이 애니메이션 종료 지점보다 후인 경우
    else {
      resultValue = values[1];
    }

    return resultValue;
  };

  // 애니메이션 동작
  const playAnimation = () => {
    const objs = scrollSectionInfo.objs; // 현재 섹션의 애니메이션 요소들
    const values = scrollSectionInfo.values; // 현재 섹션의 애니메이션 값들
    const scrollHeight = scrollSectionInfo.sectionHeight; // 현재 섹션의 높이
    const sectionYOffset = delayedYOffset; // 현재 섹션 안에서의 스크롤 위치

    const scrollRatio = sectionYOffset / scrollHeight; // 현재 섹션 안에서의 스크롤이 진행된 비율
    const delayedTotalScrollRatio =
      (delayedYOffset / (document.body.offsetHeight - window.innerHeight)) *
      100;

    // 스크롤 진행률 표시
    if (progressRef.current) {
      progressRef.current.style.width = `${delayedTotalScrollRatio}%`;
    }

    if (scrollRatio < 0.375) {
      setArtIndex(0);
    } else if (scrollRatio > 0.375 && scrollRatio < 0.625) {
      setArtIndex(1);
    } else {
      setArtIndex(2);
    }

    if (scrollRatio < 0.25) {
      objs.artDesc.style.opacity = calcAnimationValues(
        values.artDescFadeIn,
        sectionYOffset
      );

      objs.image0.style.opacity = 1;
      objs.image0.style.transform = `translate3d(-50%, ${calcAnimationValues(
        values.imageFadeIn,
        sectionYOffset
      )}%, 0) scale(1)`;
      objs.image1.style.transform = `translate3d(-50%, ${calcAnimationValues(
        values.imageFadeIn,
        sectionYOffset
      )}%, 0) scale(0.4)`;

      objs.image1.style.left = "100%";
      objs.image2.style.left = "150%";
    } else if (scrollRatio > 0.25 && scrollRatio < 0.5) {
      objs.image0.style.opacity = calcAnimationValues(
        values.imageFadeOut0,
        sectionYOffset
      );
      objs.image0.style.transform = `translate3d(-50%, -50%, 0) scale(${calcAnimationValues(
        values.imageOutScale0,
        sectionYOffset
      )})`;
      objs.image0.style.left = `${calcAnimationValues(
        values.imageOut0,
        sectionYOffset
      )}%`;

      objs.image1.style.opacity = calcAnimationValues(
        values.imageFadeIn1,
        sectionYOffset
      );
      objs.image1.style.transform = `translate3d(-50%, -50%, 0) scale(${calcAnimationValues(
        values.imageInScale1,
        sectionYOffset
      )})`;
      objs.image1.style.left = `${calcAnimationValues(
        values.imageIn1,
        sectionYOffset
      )}%`;

      objs.image2.style.left = `${calcAnimationValues(
        values.imageInRight2,
        sectionYOffset
      )}%`;
    } else if (scrollRatio > 0.5 && scrollRatio < 0.75) {
      objs.image0.style.left = `${calcAnimationValues(
        values.imageOutWindow,
        sectionYOffset
      )}%`;

      objs.image1.style.opacity = calcAnimationValues(
        values.imageFadeOut1,
        sectionYOffset
      );
      objs.image1.style.transform = `translate3d(-50%, -50%, 0) scale(${calcAnimationValues(
        values.imageOutScale1,
        sectionYOffset
      )})`;
      objs.image1.style.left = `${calcAnimationValues(
        values.imageOut1,
        sectionYOffset
      )}%`;

      objs.image2.style.opacity = calcAnimationValues(
        values.imageFadeIn2,
        sectionYOffset
      );
      objs.image2.style.transform = `translate3d(-50%, -50%, 0) scale(${calcAnimationValues(
        values.imageInScale2,
        sectionYOffset
      )})`;
      objs.image2.style.left = `${calcAnimationValues(
        values.imageIn2,
        sectionYOffset
      )}%`;
    } else {
      objs.artDesc.style.opacity = calcAnimationValues(
        values.artDescFadeOut,
        sectionYOffset
      );

      objs.image1.style.transform = `translate3d(-50%, ${calcAnimationValues(
        values.imageFadeOut,
        sectionYOffset
      )}%, 0) scale(0.4)`;
      objs.image2.style.transform = `translate3d(-50%, ${calcAnimationValues(
        values.imageFadeOut,
        sectionYOffset
      )}%, 0) scale(1)`;
    }
  };

  // 스크롤 섹션 정보 설정
  const setScrollSectionInfo = () => {
    // 스크롤 섹션의 높이 설정
    scrollSectionInfo.sectionHeight =
      scrollSectionInfo.heightRatio * window.innerHeight;
    scrollSectionInfo.objs.section.current.style.height = `${scrollSectionInfo.sectionHeight}px`;

    // 스크롤 섹션 내의 객체 설정
    artsInSection.current.map(
      (value, index) => (scrollSectionInfo.objs[`image${index}`] = value)
    );
    scrollSectionInfo.objs["artDesc"] = artDescRef.current;
    console.log(scrollSectionInfo);
  };

  let duration = 0.1;
  // 부드러운 애니메이션 감속을 위한 처리 (requestAnimationFrame 사용)
  const loopAnimation = () => {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * duration;
    rafId = requestAnimationFrame(loopAnimation);

    // 해당 섹션에 해당하는 애니메이션 동작
    playAnimation();

    // 현재 스크롤 위치와 delayedYOffset(현재 스크롤 위치까지 점차 증가하는 스크롤)이 거의 동일해지면 애니메이션 중지
    if (Math.abs(yOffset - delayedYOffset) < 0.1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  };

  // 페이지 스크롤 시 이벤트 핸들링
  const handlePageScroll = () => {
    yOffset = window.pageYOffset; // 스크롤 위치 설정

    // 애니메이션 동작
    if (!rafState) {
      requestAnimationFrame(loopAnimation);
      rafState = true;
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

  // 휴대폰 가로 세로 방향 변경 시 이벤트 핸들링
  const handleChangeOrientation = () => {
    // 방향 변경 시 소요되는 시간을 고려하여 Time Out
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  // 마우스 이동 시 이벤트 핸들링
  const handleMoveMouse = e => {
    // 사용자가 컴퓨터 환경인지 모바일 환경인지 판단
    const userInfo = navigator.userAgent;
    let isMobile = false;
    if (userInfo.indexOf("iPhone") > -1 || userInfo.indexOf("Android") > -1) {
      isMobile = true;
    }

    // 컴퓨터 환경일 때만 손전등 효과 추가
    if (isMobile === false && cursorRef.current) {
      if (cursorRef.current.style.display === "")
        cursorRef.current.style.display = "block";
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;

      // 커서가 a태그 혹은 스크롤가이드(마우스 모양)를 호버하는 중이라면
      if (
        e.srcElement.nodeName === "A" ||
        e.srcElement.nodeName === "BUTTON" ||
        e.srcElement.classList.contains(styles["guide__mouse"]) ||
        e.srcElement.classList.contains(styles["theme-button__icon"]) ||
        e.srcElement.classList.contains(headerStyles["link"]) ||
        e.srcElement.classList.contains(headerStyles["title__word"]) ||
        e.srcElement.classList.contains(styles["detail-message__link"]) ||
        e.srcElement.classList.contains(footerStyles["hidden-message"])
      ) {
        // 커서에 호버 이펙트 추가
        cursorRef.current.classList.remove("cursor-none");
        cursorRef.current.classList.add("cursor-hover");
      }
      // a태그를 호버하지 않는다면
      else {
        // 커서에 호버 이펙트 제거
        cursorRef.current.classList.remove("cursor-hover");
        cursorRef.current.classList.add("cursor-none");
      }
    }
  };

  // 이벤트 리스너, 섹션 정보 등 초기화 (initializing)
  const init = () => {
    // 스크롤 섹션 정보 설정 및 스크롤 섹션 판단
    setScrollSectionInfo();
    handlePageScroll();

    // 페이지 스크롤 시 이벤트 핸들링
    window.addEventListener("scroll", handlePageScroll);

    // 화면 크기 변경 시 이벤트 핸들링
    // window.addEventListener("resize", handleResizeWindow);

    // 휴대폰 가로 세로 방향 변경 시 이벤트 핸들링
    window.addEventListener("orientationchange", handleChangeOrientation);

    // 마우스 이동 시 이벤트 핸들링 (커서 손전등 효과 추가)
    window.addEventListener("mousemove", handleMoveMouse);
  };

  useEffect(() => {
    // 이벤트 리스너, 섹션 정보 등 초기화 작업
    window.addEventListener("load", init);
    init();

    return () => {
      // 컴포넌트 UnMount 시 등록했던 모든 이벤트 리스너 제거
      window.removeEventListener("load", init);
      window.removeEventListener("scroll", handlePageScroll);
      window.removeEventListener("resize", handleResizeWindow);
      window.removeEventListener("orientationchange", handleChangeOrientation);
      window.removeEventListener("mousemove", handleMoveMouse);
    };
    /* eslint-disable-next-line */
  }, []);

  const test = [
    <p key={1}>Love</p>,
    <p key={2}>Anxious</p>,
    <p key={3}>Painful</p>,
  ];

  return (
    <div className={styles["content"]}>
      <Loading />
      <Cursor ref={cursorRef} />
      <Header scrollSectionInfo={scrollSectionInfo} />
      <Progress ref={progressRef} />

      <div className={styles["title__wrap"]}>
        <p className={styles["title__wrap--main"]}>
          EXHIBITION
          <br />
          :VARIOUS
        </p>
        <p className={styles["title__wrap--sub"]}>
          Exhibits the expression of various emotions.
          <br />
          Love, Anxious, Painful.
        </p>
      </div>

      <div className={styles["guide"]}>
        <ScrollGuide scrollSectionInfo={scrollSectionInfo} />
      </div>
      <section
        ref={scrollSection}
        className={styles["scroll-section"]}
        id={styles["scroll-section-0"]}
      >
        <img
          src={art1}
          alt=""
          ref={ref => artsInSection.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
          onClick={() => {
            alert("asd");
          }}
        />
        <img
          src={art2}
          alt=""
          ref={ref => artsInSection.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <img
          src={art3}
          alt=""
          ref={ref => artsInSection.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <div
          ref={artDescRef}
          className={`${styles["sticky-elem"]} ${styles["art-desc"]}`}
        >
          {test[artIndex]}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Main;
