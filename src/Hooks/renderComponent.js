/* 렌더링 애니메이션 효과 및 페이지 이동 */
const renderComponent = (history, url) => {
  document.body.classList.add("render");
  setTimeout(() => {
    history.push(url);
    setTimeout(() => {
      document.body.classList.remove("render");
    }, 500);
  }, 500);
};

export default renderComponent;
