/* 스크롤 위치에 따른 애니메이션 수치 계산 */
const calcAnimationValues = (values, sectionHeight, sectionYOffset) => {
  let resultValue = 0; // 애니메이션 수치 계산 결과 값

  const animationStartPoint = values[2].start * sectionHeight; // 애니메이션이 시작되는 지점의 yOffset
  const animationEndPoint = values[2].end * sectionHeight; // 애니메이션이 종료되는 지점의 yOffset
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

export default calcAnimationValues;
