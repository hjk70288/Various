import React, { useEffect, useRef } from "react";
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
import art4 from "Images/art4.jpg";

// 스크롤 가이드
const ScrollGuide = props => {
  const { scrollSectionInfo } = props;

  // 스크롤 섹션의 높이 설정
  scrollSectionInfo.map(value => {
    value.sectionHeight = value.heightRatio * window.innerHeight;
    return null;
  });

  // 스크롤 섹션들의 높이를 모두 합친 값 구하기
  let totalSectionHeight = 0;
  for (let i = 0; i < scrollSectionInfo.length; i++) {
    totalSectionHeight += scrollSectionInfo[i].sectionHeight;
  }

  let delayedYOffset = 0; // 점차 증가하는 yOffset
  let yOffset = totalSectionHeight * 0.09; // 목표 yOffset
  let rafId; // requestAnimationFrame이 반환하는 값
  let duration = 0.05; // 증가 지속시간 비율

  // 부드러운 애니메이션 감속을 위한 처리 (requestAnimationFrame 사용)
  const smoothScrollTo = () => {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * duration;
    rafId = requestAnimationFrame(smoothScrollTo);

    window.scrollTo(0, delayedYOffset); // 스크롤 이동
    duration += 0.001; // 증가 지속시간 비율을 점차 높여 목표를 빠르게 도달할 수 있게끔 함

    // 목표 스크롤 위치와 delayedYOffset(목표 스크롤 위치까지 점차 증가하는 스크롤)이 거의 동일해지면 애니메이션 중지
    if (Math.abs(yOffset - delayedYOffset) < 0.1) {
      cancelAnimationFrame(rafId);
      duration = 0.05;
    }
  };

  return (
    <svg
      onClick={() => {
        requestAnimationFrame(smoothScrollTo);
      }}
      className={styles["guide__mouse"]}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 76 130"
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="none" fillRule="evenodd">
        <rect
          width="70"
          height="118"
          x="1.5"
          y="1.5"
          stroke="#FFF"
          strokeWidth="3"
          rx="36"
        />
        <circle
          className={styles["mouse__scroll"]}
          cx="36.5"
          cy="31.5"
          r="4.5"
          fill="#FFF"
        />
      </g>
    </svg>
  );
};

const Main = ({ history }) => {
  // Parameter
  const cursorRef = useRef(); // 마우스 커서 컴포넌트의 Ref
  const progressRef = useRef(); // 스크롤 진행률 Ref
  const section0 = useRef(); // 0 번째 스크롤 섹션
  const section1 = useRef(); // 1 번째 스크롤 섹션
  const section2 = useRef(); // 2 번째 스크롤 섹션
  const section3 = useRef(); // 3 번째 스크롤 섹션
  const messagesInSection0 = useRef([]); // 0 번째 스크롤 섹션 내의 메시지 목록
  const imagesInSection0 = useRef([]);
  const messagesInSection1 = useRef([]); // 1 번째 스크롤 섹션 내의 메시지 목록
  const imagesInSection1 = useRef([]);
  const messagesInSection2 = useRef([]); // 2 번째 스크롤 섹션 내의 메시지 목록
  const imagesInSection2 = useRef([]);
  const messagesInSection3 = useRef([]); // 3 번째 스크롤 섹션 내의 메시지 목록
  const imagesInSection3 = useRef([]);
  let yOffset = 0; // 현재 스크롤 위치
  let currentSection = 0; // 현재 스크롤 섹션 Index
  let delayedYOffset = 0; // 부드러운 애니메이션에 사용되는 yOffset (점점 커지다가 yOffset과 동일해짐)
  let screenHeight = window.innerHeight; // 화면 높이
  let rafId; // requestAnimationFrame이 반환하는 값
  let rafState = false; // 부드러운 애니메이션 동작 상태

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
        messageFadeIn0: [0, 1, { start: 0.28, end: 0.35 }],
        messageFadeIn1: [0, 1, { start: 0.65, end: 0.8 }],
        messageFadeOut0: [1, 0, { start: 0.45, end: 0.6 }],
        messageFadeOut1: [1, 0, { start: 0.9, end: 1 }],
        messageIn0: [20, 0, { start: 0.28, end: 0.35 }],
        messageIn1: [20, 0, { start: 0.65, end: 0.8 }],
        messageOut0: [0, -20, { start: 0.45, end: 0.6 }],
        messageOut1: [0, -20, { start: 0.9, end: 1 }],
        imageFadeIn: [0, 1, { start: 0.18, end: 0.28 }],
        imageFadeOut: [1, 0, { start: 0.88, end: 1 }],
        imageOut: [0, -20, { start: 0.65, end: 0.95 }],
      },
    },
    {
      // 스크롤 섹션 1
      heightRatio: 5, // 높이 비율
      sectionHeight: 0, // 스크롤 섹션 높이 (브라우저 크기 * 높이 비율)
      objs: {
        // 섹션 및 섹션 내의 객체
        section: section1,
      },
      values: {
        // 애니메이션 변화 값 및 시작, 종료 지점
        messageFadeIn0: [0, 1, { start: 0.1, end: 0.25 }],
        messageFadeIn1: [0, 1, { start: 0.55, end: 0.7 }],
        messageFadeOut0: [1, 0, { start: 0.35, end: 0.5 }],
        messageFadeOut1: [1, 0, { start: 0.8, end: 0.95 }],
        messageIn0: [20, 0, { start: 0.1, end: 0.25 }],
        messageIn1: [20, 0, { start: 0.55, end: 0.7 }],
        messageOut0: [0, -20, { start: 0.35, end: 0.5 }],
        messageOut1: [0, -20, { start: 0.8, end: 0.95 }],
        imageFadeIn: [0, 1, { start: 0, end: 0.1 }],
        imageFadeOut: [1, 0, { start: 0.88, end: 1 }],
        imageOut: [0, -20, { start: 0.55, end: 0.95 }],
      },
    },
    {
      // 스크롤 섹션 2
      heightRatio: 5, // 높이 비율
      sectionHeight: 0, // 스크롤 섹션 높이 (브라우저 크기 * 높이 비율)
      objs: {
        // 섹션 및 섹션 내의 객체
        section: section2,
      },
      values: {
        // 애니메이션 변화 값 및 시작, 종료 지점
        messageFadeIn0: [0, 1, { start: 0.1, end: 0.25 }],
        messageFadeIn1: [0, 1, { start: 0.55, end: 0.7 }],
        messageFadeOut0: [1, 0, { start: 0.35, end: 0.5 }],
        messageFadeOut1: [1, 0, { start: 0.8, end: 0.95 }],
        messageIn0: [20, 0, { start: 0.1, end: 0.25 }],
        messageIn1: [20, 0, { start: 0.55, end: 0.7 }],
        messageOut0: [0, -20, { start: 0.35, end: 0.5 }],
        messageOut1: [0, -20, { start: 0.8, end: 0.95 }],
        imageFadeIn: [0, 1, { start: 0, end: 0.1 }],
        imageFadeOut: [1, 0, { start: 0.88, end: 1 }],
        imageOut: [0, -20, { start: 0.55, end: 0.95 }],
      },
    },
    {
      // 스크롤 섹션 3
      heightRatio: 5, // 높이 비율
      sectionHeight: 0, // 스크롤 섹션 높이 (브라우저 크기 * 높이 비율)
      objs: {
        // 섹션 및 섹션 내의 객체
        section: section3,
      },
      values: {
        // 애니메이션 변화 값 및 시작, 종료 지점
        messageFadeIn0: [0, 1, { start: 0.1, end: 0.25 }],
        messageFadeIn1: [0, 1, { start: 0.55, end: 0.7 }],
        messageFadeOut0: [1, 0, { start: 0.35, end: 0.5 }],
        messageFadeOut1: [1, 0, { start: 0.8, end: 0.95 }],
        messageIn0: [20, 0, { start: 0.1, end: 0.25 }],
        messageIn1: [20, 0, { start: 0.55, end: 0.7 }],
        messageOut0: [0, -20, { start: 0.35, end: 0.5 }],
        messageOut1: [0, -20, { start: 0.8, end: 0.95 }],
        imageFadeIn: [0, 1, { start: 0, end: 0.1 }],
        imageFadeOut: [1, 0, { start: 0.88, end: 1 }],
        imageOut: [0, -20, { start: 0.55, end: 0.95 }],
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
    const sectionYOffset = delayedYOffset - prevSectionHeight; // 현재 섹션 안에서의 스크롤 위치

    const scrollRatio = sectionYOffset / scrollHeight; // 현재 섹션 안에서의 스크롤이 진행된 비율

    // 스크롤 진행률 표시
    if (progressRef.current) {
      progressRef.current.style.width = `${
        (delayedYOffset / (document.body.offsetHeight - window.innerHeight)) *
        100
      }%`;
    }

    switch (currentSection) {
      case 0:
        /* 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우 처리 */
        if (
          values.imageOut[1] === -20 &&
          screenHeight / objs.image0.height < 1
        ) {
          // 이미지를 윈도우 화면 최상단에 고정
          objs.image0.style.top = 0;
          // Translate Y 값을 화면에 표시되지 않은 이미지의 비율만큼 상승시키도록 애니메이션 값 변경
          values.imageOut[1] = -(1 - screenHeight / objs.image0.height) * 100;
          // 이미지가 화면 높이보다 작은 경우보다 out 애니메이션을 더욱 빨리 실행시키도록 함
          values.imageOut[2].start -= 0.18;
        }

        /* 배경 이미지 애니메이션 */
        if (scrollRatio < 0.4) {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeIn,
            sectionYOffset
          );

          // 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50%, 0%, 0)`;
          }
          // 배경 이미지의 높이가 현재 윈도우 높이보다 작은 경우
          else {
            // 이미지를 윈도우 높이만큼 가득 채움
            objs.image0.style.transform = `translate3d(-50%, -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        } else {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeOut,
            sectionYOffset
          );
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50% , ${calcAnimationValues(
              values.imageOut,
              sectionYOffset
            )}%, 0)`;
          } else {
            objs.image0.style.transform = `translate3d(-50% , -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        }

        /* 상세보기 메시지 클릭 가능하도록 z-index 처리 */
        if (scrollRatio >= 0.35 && scrollRatio <= 0.9) {
          objs.message2.style.zIndex = `999`;
        } else {
          objs.message2.style.zIndex = `0`;
        }

        /* 텍스트(메시지) 애니메이션 */
        if (scrollRatio < 0.4) {
          // 작품 메인 메시지
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;

          // 상세보기 메시지
          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.85) {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn1,
            sectionYOffset
          )}%, 0)`;
        } else {
          // 작품 메인 메시지
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;

          // 상세보기 메시지
          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;
        }
        break;
      case 1:
        /* 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우 처리 */
        if (
          values.imageOut[1] === -20 &&
          screenHeight / objs.image0.height < 1
        ) {
          // 이미지를 윈도우 화면 최상단에 고정
          objs.image0.style.top = 0;
          // Translate Y 값을 화면에 표시되지 않은 이미지의 비율만큼 상승시키도록 애니메이션 값 변경
          values.imageOut[1] = -(1 - screenHeight / objs.image0.height) * 100;
          // 이미지가 화면 높이보다 작은 경우보다 out 애니메이션을 더욱 빨리 실행시키도록 함
          values.imageOut[2].start -= 0.18;
        }

        /* 배경 이미지 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeIn,
            sectionYOffset
          );

          // 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50%, 0%, 0)`;
          }
          // 배경 이미지의 높이가 현재 윈도우 높이보다 작은 경우
          else {
            // 이미지를 윈도우 높이만큼 가득 채움
            objs.image0.style.transform = `translate3d(-50%, -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        } else {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeOut,
            sectionYOffset
          );
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50% , ${calcAnimationValues(
              values.imageOut,
              sectionYOffset
            )}%, 0)`;
          } else {
            objs.image0.style.transform = `translate3d(-50% , -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        }

        /* 상세보기 메시지 클릭 가능하도록 z-index 처리 */
        if (scrollRatio >= 0.25 && scrollRatio <= 0.8) {
          objs.message2.style.zIndex = `999`;
        } else {
          objs.message2.style.zIndex = `0`;
        }

        /* 텍스트(메시지) 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.75) {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn1,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;
        }
        break;
      case 2:
        /* 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우 처리 */
        if (
          values.imageOut[1] === -20 &&
          screenHeight / objs.image0.height < 1
        ) {
          // 이미지를 윈도우 화면 최상단에 고정
          objs.image0.style.top = 0;
          // Translate Y 값을 화면에 표시되지 않은 이미지의 비율만큼 상승시키도록 애니메이션 값 변경
          values.imageOut[1] = -(1 - screenHeight / objs.image0.height) * 100;
          // 이미지가 화면 높이보다 작은 경우보다 out 애니메이션을 더욱 빨리 실행시키도록 함
          values.imageOut[2].start -= 0.18;
        }

        /* 배경 이미지 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeIn,
            sectionYOffset
          );

          // 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50%, 0%, 0)`;
          }
          // 배경 이미지의 높이가 현재 윈도우 높이보다 작은 경우
          else {
            // 이미지를 윈도우 높이만큼 가득 채움
            objs.image0.style.transform = `translate3d(-50%, -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        } else {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeOut,
            sectionYOffset
          );
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50% , ${calcAnimationValues(
              values.imageOut,
              sectionYOffset
            )}%, 0)`;
          } else {
            objs.image0.style.transform = `translate3d(-50% , -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        }

        /* 상세보기 메시지 클릭 가능하도록 z-index 처리 */
        if (scrollRatio >= 0.25 && scrollRatio <= 0.8) {
          objs.message2.style.zIndex = `999`;
        } else {
          objs.message2.style.zIndex = `0`;
        }

        /* 텍스트(메시지) 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.75) {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn1,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;
        }
        break;
      case 3:
        /* 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우 처리 */
        if (
          values.imageOut[1] === -20 &&
          screenHeight / objs.image0.height < 1
        ) {
          // 이미지를 윈도우 화면 최상단에 고정
          objs.image0.style.top = 0;
          // Translate Y 값을 화면에 표시되지 않은 이미지의 비율만큼 상승시키도록 애니메이션 값 변경
          values.imageOut[1] = -(1 - screenHeight / objs.image0.height) * 100;
          // 이미지가 화면 높이보다 작은 경우보다 out 애니메이션을 더욱 빨리 실행시키도록 함
          values.imageOut[2].start -= 0.18;
        }

        /* 배경 이미지 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeIn,
            sectionYOffset
          );

          // 배경 이미지의 높이가 현재 윈도우 높이보다 큰 경우
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50%, 0%, 0)`;
          }
          // 배경 이미지의 높이가 현재 윈도우 높이보다 작은 경우
          else {
            // 이미지를 윈도우 높이만큼 가득 채움
            objs.image0.style.transform = `translate3d(-50%, -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        } else {
          objs.image0.style.opacity = calcAnimationValues(
            values.imageFadeOut,
            sectionYOffset
          );
          if (screenHeight / objs.image0.height < 1) {
            objs.image0.style.transform = `translate3d(-50% , ${calcAnimationValues(
              values.imageOut,
              sectionYOffset
            )}%, 0)`;
          } else {
            objs.image0.style.transform = `translate3d(-50% , -50%, 0) scale(${
              screenHeight / objs.image0.height
            })`;
          }
        }

        /* 상세보기 메시지 클릭 가능하도록 z-index 처리 */
        if (scrollRatio >= 0.25 && scrollRatio <= 0.8) {
          objs.message2.style.zIndex = `999`;
        } else {
          objs.message2.style.zIndex = `0`;
        }

        /* 텍스트(메시지) 애니메이션 */
        if (scrollRatio < 0.3) {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeIn0,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn0,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message0.style.opacity = calcAnimationValues(
            values.messageFadeOut0,
            sectionYOffset
          );
          objs.message0.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut0,
            sectionYOffset
          )}%, 0)`;
        }

        if (scrollRatio < 0.75) {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeIn1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageIn1,
            sectionYOffset
          )}%, 0)`;
        } else {
          objs.message1.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message1.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
            sectionYOffset
          )}%, 0)`;

          objs.message2.style.opacity = calcAnimationValues(
            values.messageFadeOut1,
            sectionYOffset
          );
          objs.message2.style.transform = `translate3d(0, ${calcAnimationValues(
            values.messageOut1,
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
    messagesInSection0.current.map(
      (value, index) => (scrollSectionInfo[0].objs[`message${index}`] = value)
    );
    imagesInSection0.current.map(
      (value, index) => (scrollSectionInfo[0].objs[`image${index}`] = value)
    );
    messagesInSection1.current.map(
      (value, index) => (scrollSectionInfo[1].objs[`message${index}`] = value)
    );
    imagesInSection1.current.map(
      (value, index) => (scrollSectionInfo[1].objs[`image${index}`] = value)
    );
    messagesInSection2.current.map(
      (value, index) => (scrollSectionInfo[2].objs[`message${index}`] = value)
    );
    imagesInSection2.current.map(
      (value, index) => (scrollSectionInfo[2].objs[`image${index}`] = value)
    );
    messagesInSection3.current.map(
      (value, index) => (scrollSectionInfo[3].objs[`message${index}`] = value)
    );
    imagesInSection3.current.map(
      (value, index) => (scrollSectionInfo[3].objs[`image${index}`] = value)
    );
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

    // 현재 스크롤 섹션이 몇 번째 인지 판단
    let totalSectionHeight = 0;
    for (let i = 0; i < scrollSectionInfo.length; i++) {
      totalSectionHeight += scrollSectionInfo[i].sectionHeight;

      if (yOffset < totalSectionHeight) {
        currentSection = i;
        break;
      }
    }

    // 현재 스크롤 섹션의 리소스만 화면에 표시될 수 있도록 body에 색션 정보 삽입
    document.body.setAttribute("id", styles[`show-section-${currentSection}`]);

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
    } else {
      screenHeight = window.innerHeight;
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
      cursorRef.current.style.left = `${e.clientX - 250}px`;
      cursorRef.current.style.top = `${e.clientY - 250}px`;

      // 커서가 a태그 혹은 스크롤가이드(마우스 모양)를 호버하는 중이라면
      if (
        e.srcElement.nodeName === "A" ||
        e.srcElement.classList.contains(styles["guide__mouse"]) ||
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
    // 화면 높이 설정
    screenHeight = window.innerHeight;

    // 스크롤 섹션 정보 설정 및 스크롤 섹션 판단
    setScrollSectionInfo();
    handlePageScroll();

    // 페이지 스크롤 시 이벤트 핸들링
    window.addEventListener("scroll", handlePageScroll);

    // 화면 크기 변경 시 이벤트 핸들링
    window.addEventListener("resize", handleResizeWindow);

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
  });

  return (
    <div className={styles["content"]}>
      <Loading />
      <Cursor ref={cursorRef} />
      <Header scrollSectionInfo={scrollSectionInfo} />
      <Progress ref={progressRef} />
      <section
        ref={section0}
        className={styles["scroll-section"]}
        id={styles["scroll-section-0"]}
      >
        <p className={styles["title"]}>
          EXHIBITION:
          <br />
          VARIOUS
        </p>
        <p className={styles["guide"]}>
          <ScrollGuide scrollSectionInfo={scrollSectionInfo} />
        </p>
        <img
          src={art1}
          alt=""
          ref={ref => imagesInSection0.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <div
          ref={ref => messagesInSection0.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            사랑인피니티
            <br />
            596 x 842
            <br />
            2021
          </p>
        </div>
        <div
          ref={ref => messagesInSection0.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            LOVE INFINITY
            <br />
            596 x 842
            <br />
            2021
          </p>
        </div>
        <div
          ref={ref => messagesInSection0.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["detail-message"]}`}
          onClick={() => {
            renderComponent(history, "/art1");
          }}
        >
          <p className={styles["detail-message__link"]}>DP</p>
        </div>
      </section>
      <section
        ref={section1}
        className={styles["scroll-section"]}
        id={styles["scroll-section-1"]}
      >
        <img
          src={art2}
          alt=""
          ref={ref => imagesInSection1.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <div
          ref={ref => messagesInSection1.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            유리땅
            <br />
            2732 x 2048
            <br />
            2022
          </p>
        </div>
        <div
          ref={ref => messagesInSection1.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            GLASS GROUND
            <br />
            2732 x 2048
            <br />
            2022
          </p>
        </div>
        <div
          ref={ref => messagesInSection1.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["detail-message"]}`}
          onClick={() => {
            renderComponent(history, "/art2");
          }}
        >
          <p className={styles["detail-message__link"]}>DP</p>
        </div>
      </section>
      <section
        ref={section2}
        className={styles["scroll-section"]}
        id={styles["scroll-section-2"]}
      >
        <img
          src={art3}
          alt=""
          ref={ref => imagesInSection2.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <div
          ref={ref => messagesInSection2.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            멜롱
            <br />
            2480 x 3508
            <br />
            2021
          </p>
        </div>
        <div
          ref={ref => messagesInSection2.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            :P
            <br />
            2480 x 3508
            <br />
            2021
          </p>
        </div>
        <div
          ref={ref => messagesInSection2.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["detail-message"]}`}
          onClick={() => {
            renderComponent(history, "/art3");
          }}
        >
          <p className={styles["detail-message__link"]}>DP</p>
        </div>
      </section>
      <section
        ref={section3}
        className={styles["scroll-section"]}
        id={styles["scroll-section-3"]}
      >
        <img
          src={art4}
          alt=""
          ref={ref => imagesInSection3.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-image"]}`}
        />
        <div
          ref={ref => messagesInSection3.current.splice(0, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            離人症
            <br />
            642 x 822
            <br />
            2022
          </p>
        </div>
        <div
          ref={ref => messagesInSection3.current.splice(1, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["main-message"]}`}
        >
          <p>
            DEPERSONALIZATION
            <br />
            642 x 822
            <br />
            2022
          </p>
        </div>
        <div
          ref={ref => messagesInSection3.current.splice(2, 1, ref)}
          className={`${styles["sticky-elem"]} ${styles["detail-message"]}`}
          onClick={() => {
            renderComponent(history, "/art4");
          }}
        >
          <p className={styles["detail-message__link"]}>DP</p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Main;
