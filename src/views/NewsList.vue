<template>
  <div class="news-page">
    <h1>NEWS LIST</h1>

    <!-- 🔍 검색창 -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="goToSearch"
        type="text"
        placeholder="키워드를 입력하세요"
      />
      <button @click="goToSearch">검색</button>
    </div>

    <!-- 📂 카테고리 선택 (가로 스크롤, 마우스로 드래그 가능) -->
    <div class="category-scroll" ref="scrollContainer">
      <div
        class="category"
        v-for="category in categories"
        :key="category"
        :class="{ active: category === selectedCategory }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </div>
    </div>

    <!-- 📰 뉴스 리스트 -->
    <div class="news-list">
      <div
        class="news-item"
        v-for="(news, index) in filteredNews"
        :key="index"
        @click="goToNewsDetail(news.id)"
      >
        <img :src="news.img_url" alt="뉴스 이미지" class="news-image" />
        <div class="news-title">{{ news.title }}</div>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div class="load-more" v-if="hasMore">
      <button @click="loadMore">더보기</button>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import {
  enableMouseScroll,
  goToSearchFromCommon,
  selectCategoryFromCommon,
} from "../functions/common";
import { fetchNewsData } from "../functions/fetch";

export default {
  name: "NewsList",
  setup() {
    const searchQuery = ref(""); // 사용자가 입력한 검색어
    const selectedCategory = ref("정치"); // 현재 선택된 카테고리
    const page = ref(1); // 현재 페이지
    const hasMore = ref(true); // 더보기 여부
    const newsList = ref([]); // 뉴스 리스트

    const categories = ref([
      "정치",
      "사회",
      "경제",
      "지역",
      "국제",
      "문화.라이프",
      "스포츠",
      "과학",
      "건강",
      "산업",
    ]);

    // filteredNews는 searchQuery와 selectedCategory에 따라 필터링된 뉴스
    const filteredNews = computed(() => {
      let filtered = newsList.value;

      console.log(filtered);

      return filtered;
    });

    // 뉴스 더보기 함수
    const loadMore = () => {
      fetchNewsData(
        page.value,
        searchQuery.value,
        selectedCategory.value,
        (newPage) => {
          page.value = newPage;
        },
        (newNews) => {
          newsList.value = [...newsList.value, ...newNews];
        },
        (more) => {
          hasMore.value = more; // 더 이상 데이터가 없으면 false
        }
      );
    };

    // 검색어로 뉴스 필터링
    const goToSearch = () => {
      goToSearchFromCommon(
        "/news",
        searchQuery.value,
        (news) => {
          newsList.value = news;
        },
        loadMore,
        (category) => {
          selectedCategory.value = category;
        }
      );
    };

    // 카테고리 선택
    const selectCategory = (category) => {
      selectCategoryFromCommon(
        "/news",
        category,
        (category) => {
          selectedCategory.value = category;
        },
        (news) => {
          newsList.value = news;
        },
        (query) => {
          searchQuery.value = query;
        },
        loadMore
      );
    };

    // 뉴스 상세 페이지로 이동
    const goToNewsDetail = (id) => {
      window.location.href = `/news-detail?id=${id}`;
    };

    // 최초 마운트 시 데이터 불러오기
    onMounted(() => {
      loadMore();
      const el = document.querySelector(".category-scroll");
      enableMouseScroll(el); // 'category-scroll'에 마우스 드래그로 스크롤 기능 추가
    });

    return {
      searchQuery,
      selectedCategory,
      categories,
      newsList,
      loadMore,
      filteredNews,
      hasMore,
      page,
      goToSearch,
      selectCategory,
      goToNewsDetail,
    };
  },
};
</script>

<style src="../css/NewsList.css" scoped></style>
