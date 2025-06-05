<template>
  <div class="issue-page">
    <h1>ISSUE</h1>

    <!-- 🔍 검색창 영역 -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        @keyup.enter="goToSearch"
        placeholder="키워드를 입력하세요"
      />
      <!-- 검색 버튼 클릭 시 goToSearch 메서드 호출 -->
      <button @click="goToSearch">검색</button>
    </div>

    <!-- 카테고리 선택 영역 (가로 스크롤 가능) -->
    <div class="category-scroll">
      <div
        class="category"
        v-for="category in categories"
        :key="category"
        :class="{ selected: selectedCategory === category }"
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

export default {
  name: "IssuePage",
  setup() {
    const searchQuery = ref(""); // 사용자가 입력한 검색어
    const selectedCategory = ref("전체"); // 현재 선택된 카테고리
    const page = ref(1); // 현재 페이지
    const hasMore = ref(true); // 더보기 여부
    const keywordList = ref([]); // 뉴스 리스트

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

    // filteredNews는 searchQuery와 selectedCategory에 따라 필터링된 뉴스
    const filteredKeywords = computed(() => {
      let filtered = keywordList.value;

      console.log(filtered);

      return filtered;
    });

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
