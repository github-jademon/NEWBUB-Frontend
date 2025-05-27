<template>
  <div class="issue-page">
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
      <div class="category" v-for="category in categories" :key="category">
        {{ category }}
      </div>
    </div>

    <!-- 🔢 키워드 리스트 -->
    <ul class="keyword-list">
      <li
        v-for="(keyword, index) in keywords"
        :key="keyword"
        @click="goToKeyword(keyword)"
        class="keyword-item"
      >
        {{ index + 1 }}. #{{ keyword }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IssuePage',
  data() {
    return {
      searchQuery: '',
      categories: [
        '전체', '정치', '사회', '경제', '지역', '국제',
        '문화.라이프', '스포츠', '과학', '건강', '산업',
      ],
      keywords: ['선거', '탄핵', '복지', '전쟁', '청년정책']
    }
  },
  mounted() {
    this.enableMouseScroll()
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
    goToKeyword(keyword) {
      this.$router.push({ name: 'Keyword', params: { name: keyword } });
    },
    enableMouseScroll() {
      const el = this.$el.querySelector('.category-scroll');
      let isDown = false;
      let startX;
      let scrollLeft;

      el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.classList.add('active');
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
        const walk = (x - startX) * 1.5;
        el.scrollLeft = scrollLeft - walk;
      });
    }
  }
}
</script>

<style scoped>
.issue-page {
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

/* 📂 카테고리 영역 */
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
}

/* 🔢 키워드 리스트 */
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
