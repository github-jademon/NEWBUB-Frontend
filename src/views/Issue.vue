<template>
  <div class="issue-page page">
    <div class="title">ISSUE</div>

    <div class="content">
      <div class="item">
        <div class="text">
          <div>관심있는 키워드를</div>
          <div>쉽고 빠르게 찾아보세요</div>
        </div>
        <!-- 🔍 검색창 -->
        <div class="search-box">
          <label>
            <input
              v-model="searchQuery"
              @keyup.enter="goToSearch"
              type="text"
              placeholder="키워드를 입력하세요"
            />
            <button @click="goToSearch">
              <img src="../assets/ic-search.png" />
            </button>
          </label>
        </div>
      </div>

      <div class="img">
        <img src="../assets/issueImg.png" />
      </div>
    </div>

    <!-- 카테고리 선택 영역 (가로 스크롤 가능) -->
    <div class="category-scroll">
      <div
        class="category"
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ category }}
      </div>
    </div>

    <!-- 필터링된 키워드 리스트 -->
    <ul class="keyword-list">
      <li
        v-for="(keyword, index) in filteredKeywords"
        :key="keyword.name"
        @click="goToKeyword(keyword.name)"
        class="keyword-item"
      >
        {{ index + 1 }}. #{{ keyword.name }}
      </li>
    </ul>

    <!-- 더보기 버튼 -->
    <div class="load-more" v-if="hasMore == true">
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
import { fetchIssueData } from "../functions/fetch";
import { useRoute } from "vue-router";

const exampleData = {
  has_more: false,
  data: [
    { name: "키워드2", category: "정치" },
    { name: "키워드4", category: "정치" },
    { name: "키워드6", category: "정치" },
    { name: "키워드8", category: "정치" },
    { name: "키워드10", category: "정치" },
    { name: "키워드12", category: "정치" },
    { name: "키워드14", category: "정치" },
    { name: "키워드16", category: "정치" },
    { name: "키워드18", category: "정치" },
  ],
};

export default {
  name: "IssuePage",
  setup() {
    const route = useRoute();

    const categories = ref([
      "전체",
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

    const searchQuery = ref(route.query.q || ""); // 사용자가 입력한 검색어
    const selectedCategory = ref(
      route.query.category in categories.value ? route.query.category : "전체"
    ); // 현재 선택된 카테고리
    const page = ref(1); // 현재 페이지
    const hasMore = ref(false); // 더보기 여부
    const keywordList = ref([]); // 뉴스 리스트

    // filteredNews는 searchQuery와 selectedCategory에 따라 필터링된 뉴스
    const filteredKeywords = computed(() => {
      let filtered = keywordList.value;

      console.log(filtered);

      return filtered;
    });

    console.log(selectedCategory.value);

    // 뉴스 더보기 함수
    const loadMore = () => {
      fetchIssueData(
        page.value,
        searchQuery.value,
        selectedCategory.value === "전체" ? "" : selectedCategory.value,
        (newPage) => {
          page.value = newPage;
        },
        (newKeywordList) => {
          keywordList.value = [...keywordList.value, ...newKeywordList];
        },
        (more) => {
          hasMore.value = more; // 더 이상 데이터가 없으면 false
        }
      );
      if (keywordList.value.length == 0) {
        keywordList.value = exampleData.data;
        hasMore.value = exampleData.has_more;
      }
    };

    // 검색어로 뉴스 필터링
    const goToSearch = () => {
      goToSearchFromCommon(
        "/issue",
        searchQuery.value,
        (newKeywordsList) => {
          keywordList.value = newKeywordsList;
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
        "/issue",
        category,
        (category) => {
          selectedCategory.value = category;
        },
        (newKeywordsList) => {
          keywordList.value = newKeywordsList;
        },
        (query) => {
          searchQuery.value = query;
        },
        loadMore
      );
    };

    // 뉴스 상세 페이지로 이동
    const goToKeyword = (name) => {
      window.location.href = `/keyword/${name}`;
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
      keywordList,
      loadMore,
      filteredKeywords,
      hasMore,
      page,
      goToSearch,
      selectCategory,
      goToKeyword,
    };
  },
};
</script>

<style src="../css/Issue.css" scoped></style>
