import React, { useEffect, useRef } from "react";
import styles from "./main.module.scss";
import Header from "Components/Header/Header";

function Main() {
  const section0 = useRef(); // 0 번째 스크롤 섹션
  const section1 = useRef(); // 1 번째 스크롤 섹션
  const objsInSection0 = useRef([]); // 0 번째 스크롤 섹션 내의 객체 목록
  const objsInSection1 = useRef([]); // 1 번째 스크롤 섹션 내의 객체 목록
  let yOffset = 0; // 현재 스크롤 위치
  let currentSection = 0; // 현재 스크롤 섹션 Index

  // 스크롤 섹션 정보
  const scrollSectionInfo = [
    {
      // 스크롤 섹션 0
      heightRatio: 5, // 높이 비율
      sectionHeight: 0, // 스크롤 섹션 높이 (브라우저 크기 * 높이 비율)
      objs: {
        // 섹션 및 섹션 내의 객체
        section: section0,
      },
      values: {
        // 애니메이션 변화 값 및 시작, 종료 지점
        fadeIn0: [0, 1, { start: 0.1, end: 0.2 }],
        fadeIn1: [0, 1, { start: 0.3, end: 0.4 }],
        fadeIn2: [0, 1, { start: 0.5, end: 0.6 }],
        fadeIn3: [0, 1, { start: 0.7, end: 0.8 }],
        fadeOut0: [1, 0, { start: 0.25, end: 0.3 }],
        fadeOut1: [1, 0, { start: 0.45, end: 0.5 }],
        fadeOut2: [1, 0, { start: 0.65, end: 0.7 }],
        fadeOut3: [1, 0, { start: 0.85, end: 0.9 }],
        in0: [20, 0, { start: 0.1, end: 0.2 }],
        in1: [20, 0, { start: 0.3, end: 0.4 }],
        in2: [20, 0, { start: 0.5, end: 0.6 }],
        in3: [20, 0, { start: 0.7, end: 0.8 }],
        out0: [0, -20, { start: 0.25, end: 0.3 }],
        out1: [0, -20, { start: 0.45, end: 0.5 }],
        out2: [0, -20, { start: 0.65, end: 0.7 }],
        out3: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // 스크롤 섹션 1
      heightRatio: 5,
      sectionHeight: 0,
      objs: {
        section: section1,
      },
      values: {
        fadeIn0: [0, 1, { start: 0.1, end: 0.2 }],
        fadeIn1: [0, 1, { start: 0.3, end: 0.4 }],
        fadeIn2: [0, 1, { start: 0.5, end: 0.6 }],
        fadeOut0: [1, 0, { start: 0.25, end: 0.3 }],
        fadeOut1: [1, 0, { start: 0.45, end: 0.5 }],
        fadeOut2: [1, 0, { start: 0.65, end: 0.7 }],
        in0: [20, 0, { start: 0.1, end: 0.2 }],
        in1: [20, 0, { start: 0.3, end: 0.4 }],
        in2: [20, 0, { start: 0.5, end: 0.6 }],
        out0: [0, -20, { start: 0.25, end: 0.3 }],
        out1: [0, -20, { start: 0.45, end: 0.5 }],
        out2: [0, -20, { start: 0.65, end: 0.7 }],
      },
    },
  ];

  // 스크롤 위치에 따른 애니메이션 수치 계산
  const calcAnimationValues = (values, sectionYOffset) => {
    let resultValue = 0; // 애니메이션 수치 계산 결과 값
    const scrollHeight = scrollSectionInfo[currentSection].sectionHeight; // 현재 섹션의 높이

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
    const objs = scrollSectionInfo[currentSection].objs; // 현재 섹션의 애니메이션 요소들
    const values = scrollSectionInfo[currentSection].values; // 현재 섹션의 애니메이션 값들
    const scrollHeight = scrollSectionInfo[currentSection].sectionHeight; // 현재 섹션의 높이

    let prevSectionHeight = 0; // 현재 섹션 이전 섹션들의 높이의 합 ex) 지금이 2 섹션이라면 -> 0 섹션 높이 + 1 섹션 높이
    for (let i = 0; i < currentSection; i++) {
      prevSectionHeight += scrollSectionInfo[i].sectionHeight;
    }
    const sectionYOffset = yOffset - prevSectionHeight; // 현재 섹션 안에서의 스크롤 위치

    const scrollRatio = sectionYOffset / scrollHeight; // 현재 섹션 안에서의 스크롤이 진행된 비율

    switch (currentSection) {
      case 0:
        if (scrollRatio < 0.22) {
          objs.message0.style.opacity = calcAnimationValues(
            values.fadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.fadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.42) {
          objs.message1.style.opacity = calcAnimationValues(
            values.fadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in1,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message1.style.opacity = calcAnimationValues(
            values.fadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out1,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.62) {
          objs.message2.style.opacity = calcAnimationValues(
            values.fadeIn2,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in2,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message2.style.opacity = calcAnimationValues(
            values.fadeOut2,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out2,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.82) {
          objs.message3.style.opacity = calcAnimationValues(
            values.fadeIn3,
            sectionYOffset
          );
          objs.message3.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in3,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message3.style.opacity = calcAnimationValues(
            values.fadeOut3,
            sectionYOffset
          );
          objs.message3.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out3,
            sectionYOffset
          )}%, 0)`;
        }

        break;
      case 1:
        if (scrollRatio < 0.22) {
          objs.message0.style.opacity = calcAnimationValues(
            values.fadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.fadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.42) {
          objs.message1.style.opacity = calcAnimationValues(
            values.fadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in1,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message1.style.opacity = calcAnimationValues(
            values.fadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out1,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.62) {
          objs.message2.style.opacity = calcAnimationValues(
            values.fadeIn2,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.in2,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message2.style.opacity = calcAnimationValues(
            values.fadeOut2,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.out2,
            sectionYOffset
          )}%, 0)`;
        }

        break;
      default:
        return;
    }
  };

  // 스크롤 섹션 정보 설정
  const setScrollSectionInfo = () => {
    // 스크롤 섹션의 높이 설정
    scrollSectionInfo.map(value => {
      value.sectionHeight = value.heightRatio * window.innerHeight;
      value.objs.section.current.style.height = `${value.sectionHeight}px`;
      return null;
    });

    // 스크롤 섹션 내의 객체 설정
    objsInSection0.current.map(
      (value, index) => (scrollSectionInfo[0].objs[`message${index}`] = value)
    );
    objsInSection1.current.map(
      (value, index) => (scrollSectionInfo[1].objs[`message${index}`] = value)
    );
  };

  // 페이지 스크롤 시 이벤트 핸들링
  const handlePageScroll = () => {
    yOffset = window.pageYOffset; // 스크롤 위치 설정

    // 현재 스크롤 섹션이 몇 번째 인지 판단
    let totalSectionHeight = 0;
    for (let i = 0; i < scrollSectionInfo.length; i++) {
      totalSectionHeight += scrollSectionInfo[i].sectionHeight;

      if (yOffset < totalSectionHeight) {
        currentSection = i;
        break;
      }
    }

    // Body에 현재 스크롤 섹션 정보 추가
    document.body.setAttribute(
      "id",
      `${styles[`show-section-${currentSection}`]}`
    );

    // 해당 섹션에 해당하는 애니메이션 동작
    playAnimation();
  };

  useEffect(() => {
    // 스크롤 섹션 정보 설정 및 스크롤 섹션 판단
    setScrollSectionInfo();
    handlePageScroll();

    window.addEventListener("scroll", () => {
      handlePageScroll();
    });

    window.addEventListener("resize", () => {
      setScrollSectionInfo();
      handlePageScroll();
    });
  });

  return (
    <div className={styles["content"]}>
      <Header></Header>
      <section
        ref={section0}
        className={styles["scroll-section"]}
        id={styles["scroll-section-0"]}
      >
        <h1 className={styles["title"]}>iiIIiIiIiiiiI</h1>
        <div
          ref={ref => objsInSection0.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>첫 번째 메시지</p>
        </div>
        <div
          ref={ref => objsInSection0.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>두 번째 메시지</p>
        </div>
        <div
          ref={ref => objsInSection0.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>세 번째 메시지</p>
        </div>
        <div
          ref={ref => objsInSection0.current.splice(3, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>네 번째 메시지</p>
        </div>
      </section>
      <section
        ref={section1}
        className={styles["scroll-section"]}
        id={styles["scroll-section-1"]}
      >
        <div
          ref={ref => objsInSection1.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>두 번째 섹션 1</p>
        </div>
        <div
          ref={ref => objsInSection1.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>두 번째 섹션 2</p>
        </div>
        <div
          ref={ref => objsInSection1.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>두 번째 섹션 3</p>
        </div>
      </section>
    </div>
  );
}

export default Main;
