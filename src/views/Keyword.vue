<template>
  <div class="keyword-page page">
    <div class="title">
      <span>ISSUE</span>
      <span><img src="../assets/shape.png" /></span>
      <span># keyword</span>
    </div>

    <!-- 키워드 제목 블럭 -->
    <div class="boxs">
      <div class="box"></div>
      <div class="box1"></div>
      <div class="keyword-header">
        <span class="keyword-box"># {{ keyword }}</span>
      </div>
    </div>

    <!-- LAW 섹션 -->
    <div class="law-section section">
      <div class="sub-title" @click="goToLawTab" style="cursor: pointer">
        <div class="img title-img">
          <img src="../assets/ic-law.png" />
        </div>
        <span>LAWS</span>
        <div class="img arrow-img">
          <img src="../assets/arrow.png" />
        </div>
      </div>
      <div class="table">
        <div class="table-body">
          <div
            class="table-row"
            v-for="(law, index) in lawList"
            :key="index"
            style="cursor: pointer"
          >
            <div class="col-number table-item">
              <div>{{ index + 1 }}</div>
            </div>
            <div class="col-title table-item" @click="goToLawDetail(law.id)">
              {{ law.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEWS 섹션 -->
    <div class="news-section section">
      <div class="sub-title" @click="goToNewsList" style="cursor: pointer">
        <div class="img title-img">
          <img src="../assets/newslist.png" />
        </div>
        <span>NEWS</span>
        <div class="img arrow-img">
          <img src="../assets/arrow.png" />
        </div>
      </div>
      <div class="table">
        <div class="news-list table-body">
          <div
            v-for="(news, index) in newsList"
            :key="index"
            @click="goToNewsDetail(news.id)"
            class="table-row"
            style="cursor: pointer"
          >
            <div class="news-image">
              <img :src="news.img_url" alt="뉴스 이미지" />
            </div>
            <div class="news-item">
              <div class="news-title">{{ news.title }}</div>
              <div class="news-date">{{ news.date }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

const exampleData1 = [
  {
    id: 1,
    title: "신에너지 및 재생에너지 개발·이용·보급 촉진법 일부개정법",
  },
  { id: 2, title: "전기안전관리법 일부개정법률안(대안)" },
  {
    id: 3,
    title: "전통시장 및 상점가 육성을 위한 특별법 일부개정법률안(대안)",
  },
  { id: 4, title: "장애인기업활동 촉진법 일부개정법률안(대안)" },
  { id: 5, title: "부동산투자회사법 일부개정법률안(대안)" },
];

const exampleData2 = [
  {
    id: 1,
    img_url: "https://placehold.co/600x400",
    title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
    date: "2025.05.05 04:20",
  },
  {
    id: 2,
    img_url: "https://placehold.co/600x400",
    title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
    date: "2025.05.05 04:20",
  },
  {
    id: 3,
    img_url: "https://placehold.co/600x400",
    title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
    date: "2025.05.05 04:20",
  },
  {
    id: 4,
    img_url: "https://placehold.co/600x400",
    title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
    date: "2025.05.05 04:20",
  },
  {
    id: 5,
    img_url: "https://placehold.co/600x400",
    title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
    date: "2025.05.05 04:20",
  },
];

export default {
  name: "KeywordPage",
  setup() {
    const route = useRoute();
    const keyword = ref(route.params.name || "");
    const newsList = ref(exampleData2);
    const lawList = ref(exampleData1);
    const goToLawTab = () => {
      window.location.href = `/law`;
    };
    const goToLawDetail = (lawId) => {
      window.location.href = `/law-detail/${lawId}`;
    };
    const goToNewsList = () => {
      window.location.href = `/news`;
    };
    const goToNewsDetail = (newsId) => {
      window.location.href = `/news-detail/${newsId}`;
    };

    return {
      keyword,
      newsList,
      lawList,
      goToLawTab,
      goToLawDetail,
      goToNewsList,
      goToNewsDetail,
    };
  },
};
</script>

<style src="../css/Keyword.css" scoped></style>
