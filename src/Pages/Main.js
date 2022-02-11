import React, { useEffect, useRef } from "react";
import styles from "./main.module.scss";
import Header from "Components/Header/Header";

function Main() {
  const section0 = useRef(); // 0 번째 스크롤 섹션
  const section1 = useRef(); // 1 번째 스크롤 섹션
  let yOffset = 0; // 현재 스크롤 위치
  let currentSection = 0; // 현재 스크롤 섹션 Index

  // 스크롤 섹션 정보
  const scrollSectionInfo = [
    {
      // 스크롤 섹션 0
      heightRatio: 5,
      sectionHeight: 0,
      objs: {
        section: section0,
      },
      values: {},
    },
    {
      // 스크롤 섹션 1
      heightRatio: 5,
      sectionHeight: 0,
      objs: {
        section: section1,
      },
      values: {},
    },
  ];

  // 애니메이션 동작
  const playAnimation = () => {
    // const objs = scrollSectionInfo[currentSection].objs; // 현재 섹션의 애니메이션 요소들
    // const values = scrollSectionInfo[currentSection].values; // 현재 섹션의 애니메이션 값들
    // const scrollHeight = scrollSectionInfo[currentSection].sectionHeight; // 현재 섹션의 높이
    // let prevSectionHeight = 0; // 현재 섹션 이전 섹션들의 높이의 합 ex) 지금이 2 섹션이라면 -> 0 섹션 높이 + 1 섹션 높이
    // for (let i = 0; i < currentSection; i++) {
    //   prevSectionHeight += scrollSectionInfo[i].sectionHeight;
    // }
    // let currentYOffset = yOffset - prevSectionHeight; // 현재 섹션 안에서의 스크롤 위치
  };

  // 스크롤 섹션의 높이 설정
  const setScrollSectionInfo = () => {
    scrollSectionInfo.map(value => {
      value.sectionHeight = value.heightRatio * window.innerHeight;
      value.objs.section.current.style.height = `${value.sectionHeight}px`;
      return null;
    });
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
    document.body.setAttribute("id", `${styles[`show-section-${currentSection}`]}`);

    // 해당 섹션에 해당하는 애니메이션 동작
    playAnimation();
  };

  useEffect(() => {
    // 스크롤 섹션 높이 설정 및 스크롤 섹션 판단
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
      <section ref={section0} className={styles["scroll-section"]} id={styles["scroll-section-0"]}>
        <h1 className={styles["title"]}>iiIIiIiIiiiiI</h1>
        <div className={`${styles["sticky-elem"]} ${styles["main-message"]}`}>
          <p>
            온전히 빠져들게 하는
            <br />
            부드러운 털
          </p>
        </div>
        <div className={`${styles["sticky-elem"]} ${styles["main-message"]}`}>
          <p>
            집사에게 찾아온
            <br />
            매혹
          </p>
        </div>
        <div className={`${styles["sticky-elem"]} ${styles["main-message"]}`}>
          <p>
            온종일 편안한
            <br />
            자세
          </p>
        </div>
        <div className={`${styles["sticky-elem"]} ${styles["main-message"]}`}>
          <p>
            주변 맛을 느끼게 해주는
            <br />
            까끌까끌 혓바닥
          </p>
        </div>
      </section>
      <section ref={section1} className={styles["scroll-section"]} id={styles["scroll-section-1"]}>
        <div className={`${styles["sticky-elem"]} ${styles["main-message"]}`}>
          <p>
            <small>하나되다</small>
            편안한 촉감
          </p>
        </div>
        <div className={`${styles["sticky-elem"]} ${styles["desc-message"]}`}>
          <p>
            편안한 쓰다듬을 완성하는 디테일한 여러 구성 요소들, 우리는 이를 하나하나 새롭게 살피고 재구성하는 과정을
            거쳐 새로운 수준의 Cat, MaruCherry Pro를 만들었습니다. 손에 뭔가 댔다는 감각은 어느새 사라지고 오롯이 당신과
            고양이만 남게 되죠.
          </p>
          <div className="pin"></div>
        </div>
        <div className={`${styles["sticky-elem"]} ${styles["desc-message"]}`}>
          <p>
            디자인 앤 퀄리티 오브 고양이,
            <br />
            메이드 인 방구석
          </p>
          <div className={styles["pin"]}></div>
        </div>
      </section>
    </div>
  );
}

export default Main;
