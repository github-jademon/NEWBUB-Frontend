<template>
  <div class="news-page">
    <h1>NEWS LIST</h1>

    <!-- 🔍 검색창 -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="goToSearch"
        type="text"
        placeholder="뉴스 제목을 입력하세요"
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
        @click="goToNewsDetail(news)"
      >
        <img :src="news.image" alt="뉴스 이미지" class="news-image" />
        <div class="news-title">{{ news.title }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsList',
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      categories: [
        '정치', '사회', '경제', '지역', '국제',
        '문화.라이프', '스포츠', '과학', '건강', '산업'
      ],
      newsList: [
        {
          title: '인천 동구, 치매환자 대상 영화 상영 프로그램 운영',
          image: 'https://via.placeholder.com/100',
          category: '건강'
        },
        {
          title: '청주시, 어린이집 급식소 식중독 예방 대책 강화',
          image: 'https://via.placeholder.com/100',
          category: '사회'
        },
        {
          title: '한국, AI 반도체 연구 집중 투자 발표',
          image: 'https://via.placeholder.com/100',
          category: '과학'
        }
      ]
    };
  },
  computed: {
    filteredNews() {
      if (!this.selectedCategory) return this.newsList;
      return this.newsList.filter(news => news.category === this.selectedCategory);
    }
  },
  methods: {
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/news-search',
          query: { q: this.searchQuery }
        });
      }
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    goToNewsDetail(news) {
      this.$router.push({
        path: '/news-detail',
        query: {
          title: news.title
        }
      });
    },
    enableMouseScroll() {
      const el = this.$refs.scrollContainer;
      let isDown = false;
      let startX;
      let scrollLeft;

      el.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      });

      el.addEventListener('mouseleave', () => {
        isDown = false;
      });

      el.addEventListener('mouseup', () => {
        isDown = false;
      });

      el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.5;
        el.scrollLeft = scrollLeft - walk;
      });
    }
  },
  mounted() {
    this.enableMouseScroll();
  }
};
</script>

<style scoped>
.news-page {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
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

/* 카테고리 가로 스크롤 */
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
.category.active {
  background-color: #1976d2;
  color: white;
}

/* 뉴스 리스트 */
.news-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.news-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #fafafa;
  padding: 8px;
  border-radius: 8px;
}

.news-image {
  width: 100px;
  height: 70px;
  object-fit: cover;
  margin-right: 12px;
}

.news-title {
  font-size: 16px;
  flex: 1;
}
</style>
