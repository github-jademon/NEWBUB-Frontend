export const enableMouseScroll = (el) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    el.classList.add("active"); // 스크롤 시작 시 시각적 효과 줄 수도 있음
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("mouseleave", () => {
    isDown = false;
    el.classList.remove("active");
  });

  el.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("active");
  });

  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5; // 스크롤 이동량 조절
    el.scrollLeft = scrollLeft - walk;
  });
};

export const selectCategoryFromCommon = (
  url,
  category,
  setCategory,
  setNewsList,
  setQuery,
  loadMore
) => {
  setCategory(category); // 카테고리 초기화
  setQuery(""); // 카테고리 초기화
  window.history.pushState(
    null,
    null,
    `${url}?category=${category}` // 쿼리로 검색어를 전달
  );
  setNewsList([]);
  loadMore(); // 새로운 검색 결과 불러오기
};

export const goToSearchFromCommon = (
  url,
  query,
  setList,
  loadMore,
  setCategory = null
) => {
  if (setCategory) {
    setCategory(""); // 카테고리 초기화
  }
  if (query.trim()) {
    window.history.pushState(
      null,
      null,
      `${url}?q=${query}` // 쿼리로 검색어를 전달
    );
    setList([]);
    loadMore(); // 새로운 검색 결과 불러오기
  }
};
