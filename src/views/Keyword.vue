<template>
  <div class="keyword-page">
    <!-- 키워드 제목 블럭 -->
    <div class="keyword-header">
      <span class="keyword-box"># {{ keyword }}</span>
    </div>

    <!-- LAW 섹션 -->
    <div class="law-section">
      <div class="section-header" @click="goToLawTab">LAW &gt;</div>
      <ul class="law-list">
        <li v-for="(law, index) in lawList" :key="index" @click="goToLawDetail(law.id)">
          {{ index + 1 }} {{ law.title }}
        </li>
      </ul>
    </div>

    <!-- NEWS 섹션 -->
    <div class="news-section">
      <div class="section-header" @click="goToNewsList">NEWS &gt;</div>
      <div class="news-list">
        <div
          v-for="(news, index) in newsList"
          :key="index"
          class="news-item"
          @click="goToNewsDetail(news.id)"
        >
          <img :src="news.image" alt="뉴스 이미지" class="news-img" />
          <div class="news-info">
            <p class="news-title">{{ news.title }}</p>
            <p class="news-date">{{ news.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeywordPage',
  data() {
    return {
      keyword: this.$route.query.keyword || '',
      lawList: [
        { id: 1, title: '신에너지 및 재생에너지 개발·이용·보급 촉진법 일부개정법' },
        { id: 2, title: '전기안전관리법 일부개정법률안(대안)' },
        { id: 3, title: '전통시장 및 상점가 육성을 위한 특별법 일부개정법률안(대안)' },
        { id: 4, title: '장애인기업활동 촉진법 일부개정법률안(대안)' },
        { id: 5, title: '부동산투자회사법 일부개정법률안(대안)' }
      ],
      newsList: [
        {
          id: 1,
          image: 'https://placehold.co/600x400',
          title: '청주시, 어린이집 집단급식소 식중독 예방 대책 강화',
          date: '2025.05.05 04:20'
        },
        {
          id: 2,
          image: 'https://placehold.co/600x400',
          title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
          date: '2025.05.05 04:20'
        },
        {
          id: 3,
          image: 'https://placehold.co/600x400',
          title: '반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책',
          date: '2025.05.05 04:20'
        },
        {
          id: 4,
          image: 'https://placehold.co/600x400',
          title: '청주시, 어린이집 집단급식소 식중독 예방 대책 강화',
          date: '2025.05.05 04:20'
        },
        {
          id: 5,
          image: 'https://placehold.co/600x400',
          title: '청주시, 어린이집 집단급식소 식중독 예방 대책 강화',
          date: '2025.05.05 04:20'
        }
      ]
    };
  },
  methods: {
    goToLawTab() {
      this.$router.push({ path: '/law' });
    },
    goToLawDetail(lawId) {
      this.$router.push({ path: '/law-detail', query: { id: lawId } });
    },
    goToNewsList() {
      this.$router.push({ path: '/news-list' });
    },
    goToNewsDetail(newsId) {
      this.$router.push({ path: '/news', query: { id: newsId } });
    }
  }
};
</script>

<style scoped>
.keyword-page {
  padding: 20px;
}

.keyword-header {
  margin-bottom: 20px;
}

.keyword-box {
  background-color: #f0f0f0;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 8px;
  display: inline-block;
  font-size: 20px;
}

.section-header {
  font-weight: bold;
  font-size: 18px;
  margin: 20px 0 10px;
  cursor: pointer;
}

.law-list li {
  margin: 5px 0;
  cursor: pointer;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  display: flex;
  gap: 10px;
  cursor: pointer;
}

.news-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.news-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.news-title {
  font-weight: bold;
}

.news-date {
  font-size: 12px;
  color: gray;
}
</style>

