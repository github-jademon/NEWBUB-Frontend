export const goToOriginalLink = (link) => {
  window.open(link || "", "_blank");
};

export const goToLawDetail = (lawId) => {
  window.location.href = `/law-detail/${lawId}`;
};

export const goToNewsDetail = (newsId) => {
  window.location.href = `/news-detail/${newsId}`;
};
export const goToNewsListPage = (category = "", keyword = "") => {
  window.location.href = `/news${
    category != "" ? `?category=${category}` : ""
  }${keyword != "" ? (category == "" ? "?" : "&") : ""}${
    keyword != "" ? `q=${keyword}` : ""
  }`;
};
export const goToLawPage = (keyword = "") => {
  window.location.href = `/law${keyword != "" ? `?q=${keyword}` : ""}`;
};

export const goToParty = () => {
  window.location.href = "/party";
};

export const goToKeywordPage = (keyword) => {
  window.location.href = `/keyword/${keyword}`;
};

export const goToPartyContribution = (party) => {
  window.location.href = `/party-contribution/${party}`;
};

export const goToPartyDetail = () => {
  window.location.href = "/party-detail";
};

export const goToIssue = () => {
  window.location.href = "/issue";
};
