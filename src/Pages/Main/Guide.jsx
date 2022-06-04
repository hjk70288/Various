import React from "react";
import styles from "./main.module.scss";

// 스크롤 가이드
const ScrollGuide = props => {
  const { scrollSectionInfo } = props;

  // 스크롤 섹션의 높이 설정
  scrollSectionInfo.sectionHeight =
    scrollSectionInfo.heightRatio * window.innerHeight;

  // 스크롤 섹션들의 높이를 모두 합친 값 구하기
  let totalSectionHeight = scrollSectionInfo.sectionHeight;

  let delayedYOffset = 0; // 점차 증가하는 yOffset
  let yOffset = totalSectionHeight * 0.13; // 목표 yOffset
  let rafId; // requestAnimationFrame이 반환하는 값
  let duration = 0.05; // 증가 지속시간 비율

  // 부드러운 애니메이션 감속을 위한 처리 (requestAnimationFrame 사용)
  const smoothScrollTo = () => {
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * duration;
    console.log(delayedYOffset);
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

export default ScrollGuide;
