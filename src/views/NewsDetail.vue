<template>
  <div class="news-page page">
    <div class="title">
      <span @click="goToNewsListPage()" style="cursor: pointer">NEWS LIST</span>
      <span class="img"><img src="@/assets/shape.png" /></span>
      <span
        class="title-item"
        v-for="(item, idx) in news.categories"
        :key="idx"
        @click="goToNewsListPage(item)"
        style="cursor: pointer"
      >
        <span>{{ item }}</span>
        <span v-if="idx < item.length" class="newslist-line"
          ><img src="@/assets/line.png"
        /></span>
      </span>
    </div>

    <div class="news-detail">
      <!-- 콘텐츠 좌우 배치 -->
      <div class="main-content-wrapper">
        <div class="main-content-wrapper2">
          <!-- 왼쪽 주요 뉴스 내용 -->
          <div class="news-main-block">
            <h1 class="news-title">{{ news.title }}</h1>
            <div class="news-meta">
              <span>
                <span
                  class="news-item"
                  v-for="(item, idx) in news.author"
                  :key="idx"
                  style="cursor: pointer"
                >
                  <span v-if="idx > 0" style="width: 5px">, </span>
                  <span>{{ item }}</span>
                </span>
              </span>
              <span>{{ news.date }}</span>
            </div>

            <div class="news-image" v-if="news.image">
              <img :src="news.image" />
            </div>

            <p class="news-summary">{{ news.text }}</p>

            <div class="more-link" @click="goToOriginalLink(news.link)">
              뉴스 자세히 보기 &gt;
            </div>
          </div>
          <!-- 카테고리 관련 뉴스 -->

          <div v-for="(items, index) in newsList" :key="index">
            <div class="related-news-section">
              <h3 @click="goToNewsListPage(category)" style="cursor: pointer">
                <strong>{{ index }}</strong>
                <span> 관련 뉴스 더보기</span>
              </h3>
              <div :class="[items.length == 0 ? 'news-none' : '']">
                <span v-if="newsList.length != 0" class="related-news-list">
                  <div
                    class="related-news-item"
                    v-for="(item, idx) in items"
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
                </span>
                <span v-if="items.length == 0" class="related-news-item">
                  뉴스가 없습니다.
                </span>
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
                v-for="(kw, idx) in news.keywords"
                :key="idx"
                class="keyword"
                @click="goToKeywordPage(kw)"
              >
                # {{ kw }}
              </span>
            </div>
          </div>

          <!-- 관련 법안 -->
          <div class="related-laws">
            <h3>법안</h3>
            <div class="law-items">
              <div
                class="law-item"
                v-for="(law, idx) in lawList"
                :key="idx"
                @click="goToLawDetail(law.id)"
                style="cursor: pointer"
              >
                {{ law.title }}
              </div>
              <div class="law-none" v-if="lawList.length == 0">
                법안이 없습니다.
              </div>
            </div>

            <div class="more-law-button" v-if="hasMore" @click="loadMoreLaws">
              법안 더보기
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchNewsData, fetchNewsListData } from "@/functions/fetch";
import {
  goToOriginalLink,
  goToLawDetail,
  goToNewsDetail,
  goToNewsListPage,
  goToKeywordPage,
} from "@/functions/goToLink";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

// const exampleData = {
//   id: 1,
//   title: "뉴스1",
//   date: "2025-05-22 05:22",
//   related_bills: [
//     { id: 1, name: "법안1" },
//     { id: 2, name: "법안2" },
//   ],
//   // 데이터 부족
//   reporter: ["김도윤 기자", "우왕 기자"],
//   image: "https://placehold.co/600x400",
//   text: `매월 마지막 주 수요일 미림극장서 무료 상영\n인천투데이=인투아이(INTO-AI)·김도윤 기자｜인천 동구(구청장 김찬진)가 치매 환자와 가족 등 지역 주민을 대상으로 ‘가치함께 시네마’를 지난 4월 30일부터 6월 25일까지 매월 마지막 주 수요일에 운영하고 있다고 밝혔다.`,
//   category: ["복지", "정치"],
//   link: "",
//   keywords: ["치매", "노인복지", "문화생활", "영화", "극장"],
// };

// const exampleData1 = [
//   {
//     key: "복지",
//     data: [
//       {
//         id: "news1",
//         image: "https://placehold.co/600x400",
//         title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news2",
//         image: "https://placehold.co/600x400",
//         title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news3",
//         image: "https://placehold.co/600x400",
//         title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news1",
//         image: "https://placehold.co/600x400",
//         title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news2",
//         image: "https://placehold.co/600x400",
//         title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news3",
//         image: "https://placehold.co/600x400",
//         title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
//         date: "2025.05.06 04:20",
//       },
//       // 추가 뉴스도 id 포함해서 넣으면 됨
//     ],
//   },
//   {
//     key: "정치",
//     data: [
//       {
//         id: "news1",
//         image: "https://placehold.co/600x400",
//         title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news2",
//         image: "https://placehold.co/600x400",
//         title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news3",
//         image: "https://placehold.co/600x400",
//         title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news1",
//         image: "https://placehold.co/600x400",
//         title: "청주시, 어린이집 집단급식소 식중독 예방 대책 강화",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news2",
//         image: "https://placehold.co/600x400",
//         title: "반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책",
//         date: "2025.05.06 04:20",
//       },
//       {
//         id: "news3",
//         image: "https://placehold.co/600x400",
//         title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
//         date: "2025.05.06 04:20",
//       },
//       // 추가 뉴스도 id 포함해서 넣으면 됨
//     ],
//   },
// ];

// const exampleData2 = [
//   { id: "law1", title: "예시법안 제목 1" },
//   { id: "law2", title: "예시법안 제목 2" },
//   { id: "law3", title: "예시법안 제목 3" },
//   { id: "law4", title: "예시법안 제목 4" },
//   { id: "law5", title: "예시법안 제목 5" },
//   { id: "law6", title: "예시법안 제목 6" },
//   { id: "law7", title: "예시법안 제목 7" },
// ];

export default {
  name: "NewsDetail",
  setup() {
    const route = useRoute();
    const newsId = ref(route.params.id || "");
    const news = ref({});
    const newsList = ref({});
    const lawList = ref([]);
    const page = ref(1);
    const hasMore = ref(true);

    const loadData = async () => {
      await fetchNewsData(newsId.value, (newNews) => {
        news.value = newNews;
      });
    };

    const loadNewsListData = () => {
      for (const i in news.value.categories) {
        fetchNewsListData(
          1,
          "",
          news.value.categories[i],
          null,
          (newNews) => {
            newsList.value[news.value.categories[i]] = newNews;
          },
          null,
          4
        );
      }
    };

    const loadMoreLaws = () => {
      // lawList.value = [...lawList.value, ...exampleData2];
    };

    onMounted(async () => {
      await loadData();
      await loadNewsListData();
      await console.log("aa", newsList.value);
      await console.log("aa", newsList.value["정치"]);
    });

    return {
      news,
      newsList,
      lawList,
      hasMore,
      page,
      goToNewsListPage,
      goToKeywordPage,
      goToNewsDetail,
      goToLawDetail,
      loadMoreLaws,
      goToOriginalLink,
    };
  },
};
</script>

<style src="@/css/NewsDetail.css" scoped></style>
