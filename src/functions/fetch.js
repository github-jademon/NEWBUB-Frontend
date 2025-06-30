export const fetchNewsListData = async (
  page,
  searchQuery,
  selectedCategory,
  setNewsList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/news/?page=${page}&q=${searchQuery}&category=${selectedCategory}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setNewsList(result.news);
    if (setHasMore) setHasMore(result.has_more);
  } catch (error) {
    console.log("Error:", error);
    if (setHasMore) setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

export const fetchIssueData = async (
  page,
  searchQuery,
  selectedCategory,
  setKeywordList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/issue/?page=${page}&q=${searchQuery}&category=${selectedCategory}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setKeywordList(result.keywords);
    setHasMore(result.has_more);
  } catch (error) {
    console.log("Error:", error);
    setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

export const fetchLawListData = async (
  page,
  searchQuery,
  setLawList,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(
      `/api/laws/?page=${page}&q=${searchQuery}&limit=${limit}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setLawList(result.laws);
    if (setHasMore) setHasMore(result.has_more);
  } catch (error) {
    console.log("Error:", error);
    if (setHasMore) setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

export const fetchNewsData = async (id, setNews) => {
  try {
    const response = await fetch(`/api/news/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setNews(result);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchLawData = async (id, setLaw) => {
  try {
    const response = await fetch(`/api/laws/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setLaw(result);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchTop5Data = async (
  page,
  setParty,
  setPage,
  setHasMore,
  limit = 30
) => {
  try {
    const response = await fetch(`/api/party/party_detail?page=${page}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    result.issues = result.issues.slice(0, limit);
    setParty(result.issues);

    if (setPage) setPage(page + 1);
    if (setHasMore) setHasMore(result.has_more);
  } catch (error) {
    console.log("Error:", error);
    if (setHasMore) setHasMore(false);
  }
};

export const fetchPartyContribution = async (id, setMaxCount, setParty) => {
  try {
    const response = await fetch(`/api/party/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setParty(result);
    setMaxCount(result.max_count);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchPartyData = async (setParty) => {
  try {
    const response = await fetch(`/api/party/`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setParty(result);
  } catch (error) {
    console.log("Error:", error);
  }
};

export const fetchRelationLawListData = async (
  page,
  keywords,
  setPage,
  setLawList,
  setHasMore
) => {
  try {
    const data = {
      keywords: keywords,
    };

    const response = await fetch(`/api/news/match-laws/?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await response.json();

    // 결과를 반환할 때 상태를 업데이트
    setLawList(result.matched_laws);
    if (setHasMore) setHasMore(result.has_more);

    console.log(result);

    if (result.has_more) {
      if (setHasMore) setPage(page + 1);
    }
  } catch (error) {
    console.log("Error:", error);
    if (setHasMore) setHasMore(false); // 더 이상 불러올 데이터가 없음을 표시
  }
};

export const fetchKeywordData = async (keywordnm, setNewsList, setLawList) => {
  try {
    const response = await fetch(`/api/issue/${keywordnm}`, {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();

    console.log(result);

    // 결과를 반환할 때 상태를 업데이트
    setLawList(result[0].laws);
    setNewsList(result[1].news);
  } catch (error) {
    console.log("Error:", error);
  }
};
