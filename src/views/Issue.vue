<template>
  <div class="issue-page">
    <!-- 🔵 페이지 제목 -->
    <h1>ISSUE</h1>

    <!-- 🔍 검색창 영역 -->
    <div class="search-box">
      <!-- 사용자가 키워드를 입력하면 searchQuery에 바인딩됨. Enter 키 누르면 검색 실행 -->
      <input
        v-model="searchQuery"
        @keyup.enter="goToSearch"
        type="text"
        placeholder="키워드를 입력하세요"
      />
      <!-- 검색 버튼 클릭 시 goToSearch 메서드 호출 -->
      <button @click="goToSearch">검색</button>
    </div>

    <!-- 카테고리 선택 영역 (가로 스크롤 가능) -->
    <div class="category-scroll">
      <!-- 카테고리 리스트 렌더링 -->
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
      <!-- 클릭하면 해당 키워드 페이지로 이동 -->
      <li
        v-for="(keyword, index) in filteredKeywords"
        :key="keyword.name"
        @click="goToKeyword(keyword.name)"
        class="keyword-item"
      >
        {{ index + 1 }}. #{{ keyword.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IssuePage',
  data() {
    return {
      // 사용자가 입력한 검색어
      searchQuery: '',

      // 현재 선택된 카테고리
      selectedCategory: '전체',

      // 카테고리 목록 (이슈 분류용)
      categories: [
        '전체', '정치', '사회', '경제', '지역', '국제',
        '문화.라이프', '스포츠', '과학', '건강', '산업',
      ],

      // 키워드 데이터 (각 키워드의 이름과 소속 카테고리)
      keywords: [
        { name: '선거', category: '정치' },
        { name: '탄핵', category: '정치' },
        { name: '복지', category: '사회' },
        { name: '전쟁', category: '국제' },
        { name: '청년정책', category: '사회' },
        { name: '경제성장', category: '경제' },
        { name: '지역개발', category: '지역' },
      ]
    }
  },
  computed: {
    // 현재 선택된 카테고리에 따라 키워드 필터링
    filteredKeywords() {
      if (this.selectedCategory === '전체') {
        return this.keywords;
      }
      // 카테고리 일치하는 키워드만 반환
      return this.keywords.filter(k => k.category === this.selectedCategory);
    }
  },
  mounted() {
    // 마우스 드래그로 카테고리 스크롤 기능 활성화
    this.enableMouseScroll();

    // URL 쿼리로 넘어온 category 값이 있으면 초기 선택값으로 반영
    const queryCategory = this.$route.query.category;
    if (queryCategory && this.categories.includes(queryCategory)) {
      this.selectedCategory = queryCategory;
    }
  },
  methods: {
    // 검색 기능: 검색어가 있을 경우 검색 탭으로 라우팅
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/issue-search',
          query: { q: this.searchQuery } // 검색어를 쿼리로 전달
        });
      }
    },
    // 키워드 클릭 시 해당 키워드 상세 페이지로 이동
    goToKeyword(keyword) {
      this.$router.push({ name: 'Keyword', params: { name: keyword } });
    },
    // 카테고리 선택 시 해당 카테고리의 키워드만 보여줌
    selectCategory(category) {
      this.selectedCategory = category;
    },
    // 마우스 드래그로 카테고리 가로 스크롤 가능하게 처리
    enableMouseScroll() {
      const el = this.$el.querySelector('.category-scroll');
      let isDown = false;
      let startX;
      let scrollLeft;

      el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.classList.add('active'); // 스크롤 시작 시 시각적 효과 줄 수도 있음
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      });

      el.addEventListener('mouseleave', () => {
        isDown = false;
        el.classList.remove('active');
      });

      el.addEventListener('mouseup', () => {
        isDown = false;
        el.classList.remove('active');
      });

      el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.5; // 스크롤 이동량 조절
        el.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
</script>

<style scoped>
/* 전체 페이지 스타일 */
.issue-page {
  max-width: 800px;
  margin: 0 auto;
}

/* 검색창 스타일 */
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

/* 카테고리 가로 스크롤 영역 스타일 */
.category-scroll {
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding-bottom: 10px;
  margin-bottom: 20px;
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
  -ms-overflow-style: none; /* IE/Edge에서 스크롤바 숨김 */
  cursor: grab;
}

.category-scroll::-webkit-scrollbar {
  display: none; /* 크롬 등에서 스크롤바 숨김 */
}

/* 각 카테고리 스타일 */
.category {
  white-space: nowrap;
  padding: 8px 16px;
  background-color: #e0e0e0;
  border-radius: 20px;
  cursor: pointer;
  flex-shrink: 0;
  user-select: none;
}

/* 선택된 카테고리 강조 스타일 */
.category.selected {
  background-color: #4A90E2;
  color: white;
}

/* 키워드 리스트 스타일 */
.keyword-list {
  list-style: none;
  padding: 0;
}

/* 각 키워드 항목 스타일 */
.keyword-item {
  font-size: 18px;
  margin: 6px 0;
  cursor: pointer;
}

/* 키워드 hover 시 스타일 */
.keyword-item:hover {
  text-decoration: underline;
}
</style>
