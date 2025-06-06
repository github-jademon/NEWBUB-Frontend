<template>
  <div class="news-detail">
    <!-- 콘텐츠 좌우 배치 -->
    <div class="main-content-wrapper">
      <!-- 왼쪽 주요 뉴스 내용 -->
      <div class="news-main-block">
        <h1 class="news-title">{{ news.title }}</h1>
        <div class="news-meta">
          <span>{{ news.reporter }}</span>
          <span>{{ news.date }}</span>
        </div>

        <img :src="news.image" alt="뉴스 이미지" class="news-image" />

        <p class="news-summary">{{ news.text }}</p>

        <div class="more-link" @click="goToOriginalLink">
          뉴스 자세히 보기 &gt;
        </div>

        <!-- 카테고리 관련 뉴스 -->
        <div class="related-news-section">
          <h3>
            <strong>{{ news.category }}</strong>
            <span> 관련 뉴스 더보기</span>
          </h3>
          <div class="related-news-list">
            <div
              class="related-news-item"
              v-for="(item, idx) in newsList"
              :key="idx"
              @click="goToNewsDetail(item.id)"
              style="cursor: pointer"
            >
              <img :src="item.image" class="related-news-image" />
              <div class="related-news-info">
                <p class="related-news-title">{{ item.title }}</p>
                <p class="related-news-meta">{{ item.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 사이드 블럭 -->
      <div class="side-blocks">
        <!-- 연관 키워드 -->
        <div class="related-keywords">
          <h3>연관 키워드</h3>
          <div class="keywords">
            <span
              v-for="(kw, idx) in keywordList"
              :key="idx"
              class="keyword"
              @click="goToKeywordPage(kw)"
            >
              {{ kw }}
            </span>
          </div>
        </div>

        <!-- 관련 법안 -->
        <div class="related-laws">
          <h3>법안</h3>
          <div
            class="law-item"
            v-for="(law, idx) in visibleLaws"
            :key="idx"
            @click="goToLawDetail(law.id)"
            style="cursor: pointer"
          >
            [법안 {{ idx + 1 }} - {{ law.title }}]
          </div>
          <div class="more-law-button" @click="loadMoreLaws">
            &lt;법안 더보기&gt;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const exampleData = {
  id: 1,
  title: "뉴스1",
  date: "2025-05-22 05:22",
  related_bills: [
    { id: 1, name: "법안1" },
    { id: 2, name: "법안2" },
  ],
  // 데이터 부족족
  reporter: ["김도윤 기자"],
  image: "https://placehold.co/600x400",
  text: `매월 마지막 주 수요일 미림극장서 무료 상영\n인천투데이=인투아이(INTO-AI)·김도윤 기자｜인천 동구(구청장 김찬진)가 치매 환자와 가족 등 지역 주민을 대상으로 ‘가치함께 시네마’를 지난 4월 30일부터 6월 25일까지 매월 마지막 주 수요일에 운영하고 있다고 밝혔다.`,
  category: ["복지"],
  link: "",
  keywords: ["치매", "노인복지", "문화생활", "영화", "극장"],
};

const exampleData1 = [
  {
    id: "news1",
    image: "https://placehold.co/600x400",
    title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
    date: "2025.05.06 04:20",
  },
  {
    id: "news2",
    image: "https://placehold.co/600x400",
    title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
    date: "2025.05.06 04:20",
  },
  {
    id: "news3",
    image: "https://placehold.co/600x400",
    title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
    date: "2025.05.06 04:20",
  },
  // 추가 뉴스도 id 포함해서 넣으면 됨
];

const exampleData2 = [
  { id: "law1", title: "예시법안 제목 1" },
  { id: "law2", title: "예시법안 제목 2" },
  { id: "law3", title: "예시법안 제목 3" },
  { id: "law4", title: "예시법안 제목 4" },
  { id: "law5", title: "예시법안 제목 5" },
  { id: "law6", title: "예시법안 제목 6" },
  { id: "law7", title: "예시법안 제목 7" },
];

export default {
  name: "NewsDetail",
  setup() {
    const route = useRoute();
    const newsId = ref(route.params.id || "");
    const news = ref(exampleData);
    const newsList = ref(exampleData1);
    const lawList = ref(exampleData2);
    const page = ref(1);
    const visibleLaws = computed(() => {
      return lawList.value;
    });
    const goToOriginalLink = () => {
      window.open(this.news.link || "", "_blank");
    };
    const goToKeywordPage = (keyword) => {
      window.location.href = `/keyword/${keyword}`;
    };
    const goToNewsDetail = (newsId) => {
      window.location.href = `/news-detail/${newsId}`;
    };
    const goToLawDetail = (lawId) => {
      window.location.href = `/law-detail/${lawId}`;
    };
    const loadMoreLaws = () => {
      this.lawDisplayCount += 5;
    };
    return {
      newsId,
      news,
      newsList,
      lawList,
      page,
      visibleLaws,
      goToOriginalLink,
      goToKeywordPage,
      goToNewsDetail,
      goToLawDetail,
      loadMoreLaws,
    };
  },
};
</script>

<style src="../css/NewsDetail.css" scoped></style>
