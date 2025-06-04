<template>
  <div class="issue-search-page">
    <h1>ISSUE</h1>

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

    <!-- 📂 카테고리 선택 (가로 스크롤) -->
    <div class="category-scroll">
      <div
        class="category"
        v-for="category in categories"
        :key="category"
        @click="goToIssueTab(category)"
      >
        {{ category }}
      </div>
    </div>

    <!-- 🔢 키워드 리스트 -->
    <ul class="keyword-list">
      <li
        v-for="(keyword, index) in filteredKeywords"
        :key="keyword.name"
        class="keyword-item"
        @click="goToKeyword(keyword.name)"
      >
        {{ index + 1 }}. #{{ keyword.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IssueSearch',
  data() {
    return {
      searchQuery: this.$route.query.q || '',
      categories: [
        '전체', '정치', '사회', '경제', '지역', '국제',
        '문화.라이프', '스포츠', '과학', '건강', '산업',
      ],
      keywords: [
        { name: '선거', category: '정치' },
        { name: '탄핵', category: '정치' },
        { name: '복지', category: '사회' },
        { name: '전쟁', category: '국제' },
        { name: '청년정책', category: '사회' },
        { name: '경제성장', category: '경제' },
        { name: '지역개발', category: '지역' },
      ]
    };
  },
  computed: {
    filteredKeywords() {
      const query = this.searchQuery.trim().toLowerCase();
      return this.keywords.filter(k =>
        k.name.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/issue-search',
          query: { q: this.searchQuery }
        });
      }
    },
    goToIssueTab(category) {
      this.$router.push({
        path: '/issue',
        query: { category }
      });
    },
    goToKeyword(keyword) {
      this.$router.push({ name: 'IssueKeyword', params: { name: keyword } });
    }
  }
};
</script>

<style scoped>
.issue-search-page {
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.search-box input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

.search-box button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

.category-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  cursor: grab;
}

.category-scroll::-webkit-scrollbar {
  display: none;
}

.category {
  white-space: nowrap;
  padding: 8px 16px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}

.keyword-list {
  list-style: none;
  padding: 0;
}

.keyword-item {
  font-size: 18px;
  margin: 6px 0;
  cursor: pointer;
}

.keyword-item:hover {
  text-decoration: underline;
}
</style>
