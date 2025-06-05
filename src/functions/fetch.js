// fetchNewsData.js (혹은 common.js)
export const fetchNewsData = async (
  page,
  searchQuery,
  selectedCategory,
  setPage,
  setNewsList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/news?page=${page}&q=${searchQuery}&category=${selectedCategory}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setNewsList(result.data);
    setHasMore(result.has_more);

    console.log(result);

    if (result.has_more) {
      setPage(page + 1);
      page += 1;
    }
  } catch (error) {
    console.log("Error:", error);
    setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

// fetchNewsData.js (혹은 common.js)
export const fetchIssueData = async (
  page,
  searchQuery,
  selectedCategory,
  setPage,
  setKeywordList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/issue?page=${page}&q=${searchQuery}&category=${selectedCategory}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setKeywordList(result.data);
    setHasMore(result.has_more);

    console.log(result);

    if (result.has_more) {
      setPage(page + 1);
    }
  } catch (error) {
    console.log("Error:", error);
    setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

export const fetchLawData = async (
  page,
  searchQuery,
  setPage,
  setLawList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/laws?page=${page}&q=${searchQuery}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setLawList(result.data);
    setHasMore(result.has_more);

    console.log(result);

    if (result.has_more) {
      setPage(page + 1);
    }
  } catch (error) {
    console.log("Error:", error);
    setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};
