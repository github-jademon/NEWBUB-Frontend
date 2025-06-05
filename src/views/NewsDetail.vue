<template>
  <div class="news-detail">
    <!-- 콘텐츠 좌우 배치 -->
    <div class="main-content-wrapper">
      <!-- 왼쪽 주요 뉴스 내용 -->
      <div class="news-main-block">
        <h1 class="news-title">{{ news.title }}</h1>
        <div class="news-meta">
          <span>{{ news.reporter }}</span>
          <span>{{ news.date }}</span>
          <span>{{ news.time }}</span>
        </div>

        <img :src="news.image" alt="뉴스 이미지" class="news-image" />

        <p class="news-summary">{{ news.summary }}</p>

        <div class="more-link" @click="goToOriginalLink">
          뉴스 자세히 보기 &gt;
        </div>

        <!-- 카테고리 관련 뉴스 -->
        <div class="related-news-section">
          <h3>
            <strong>{{ news.category }}</strong>
            <span> 관련 뉴스 더보기</span>
          </h3>
          <div class="related-news-list">
            <div
              class="related-news-item"
              v-for="(item, idx) in relatedNews"
              :key="idx"
              @click="goToNewsDetail(item.id)"
              style="cursor: pointer;"
            >
              <img :src="item.image" class="related-news-image" />
              <div class="related-news-info">
                <p class="related-news-title">{{ item.title }}</p>
                <p class="related-news-meta">{{ item.date }} {{ item.time }}</p>
              </div>
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
              v-for="(kw, idx) in relatedKeywords"
              :key="idx"
              class="keyword"
              @click="goToKeywordPage(kw)"
            >
              {{ kw }}
            </span>
          </div>
        </div>

        <!-- 관련 법안 -->
        <div class="related-laws">
          <h3>법안</h3>
          <div
            class="law-item"
            v-for="(law, idx) in visibleLaws"
            :key="idx"
            @click="goToLawDetail(law.id)"
            style="cursor: pointer;"
          >
            [법안 {{ idx + 1 }} - {{ law.title }}]
          </div>
          <div class="more-law-button" @click="loadMoreLaws">
            &lt;법안 더보기&gt;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsDetail',
  data() {
    return {
      news: {
        title: '인천 동구, 치매환자 대상 영화 상영 프로그램 운영',
        reporter: '김도윤 기자',
        date: '2025.05.08',
        time: '04:20',
        image: 'https://placehold.co/600x400',
        summary: `매월 마지막 주 수요일 미림극장서 무료 상영
인천투데이=인투아이(INTO-AI)·김도윤 기자｜인천 동구(구청장 김찬진)가 치매 환자와 가족 등 지역 주민을 대상으로 ‘가치함께 시네마’를 지난 4월 30일부터 6월 25일까지 매월 마지막 주 수요일에 운영하고 있다고 밝혔다.`,
        category: '복지',
        link: '', // 외부 뉴스 링크
      },
      relatedKeywords: ['치매', '노인복지', '문화생활', '영화', '극장'],
      relatedNews: [
        {
          id: 'news1',
          image: 'https://placehold.co/600x400',
          title: '청주시, 어린이집 집단급식소 식중독 예방 대책 강화',
          date: '2025.05.06',
          time: '04:20',
        },
        {
          id: 'news2',
          image: 'https://placehold.co/600x400',
          title: '반지하 밀집 지역에 침수 경보 신기술...서울시 집중호우 대책',
          date: '2025.05.06',
          time: '04:20',
        },
        {
          id: 'news3',
          image: 'https://placehold.co/600x400',
          title: "강남 아파트 '평당 1억원' 시대…정부 정책이 집값 밀어 올렸다",
          date: '2025.05.06',
          time: '04:20',
        },
        // 추가 뉴스도 id 포함해서 넣으면 됨
      ],
      laws: [
        { id: 'law1', title: '예시법안 제목 1' },
        { id: 'law2', title: '예시법안 제목 2' },
        { id: 'law3', title: '예시법안 제목 3' },
        { id: 'law4', title: '예시법안 제목 4' },
        { id: 'law5', title: '예시법안 제목 5' },
        { id: 'law6', title: '예시법안 제목 6' },
        { id: 'law7', title: '예시법안 제목 7' },
      ],
      lawDisplayCount: 5,
    };
  },
  computed: {
    visibleLaws() {
      return this.laws.slice(0, this.lawDisplayCount);
    },
  },
  methods: {
    goToOriginalLink() {
      window.open(this.news.link || '', '_blank');
    },
    goToKeywordPage(keyword) {
      this.$router.push({ name: 'Keyword', params: { keyword } });
    },
    goToNewsDetail(newsId) {
      this.$router.push({ name: 'NewsDetail', params: { id: newsId } });
    },
    goToLawDetail(lawId) {
      this.$router.push({ name: 'LawDetail', params: { id: lawId } });
    },
    loadMoreLaws() {
      this.lawDisplayCount += 5;
    },
  },
};
</script>

<style scoped>
.news-detail {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.main-content-wrapper {
  display: flex;
  gap: 30px;
}

/* 왼쪽 메인 뉴스 */
.news-main-block {
  flex: 2;
}

.news-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.news-meta {
  font-size: 14px;
  color: gray;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.news-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin: 20px 0;
}

.news-summary {
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-line;
}

.more-link {
  margin-top: 20px;
  font-weight: 700;
  color: #007bff;
  cursor: pointer;
  user-select: none;
  width: fit-content;
}

/* 오른쪽 사이드 블럭 */
.side-blocks {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.related-keywords h3,
.related-laws h3 {
  font-weight: 600;
  margin-bottom: 10px;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword {
  background-color: #e1ecf4;
  color: #39739d;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
}

.related-laws .law-item {
  margin-bottom: 8px;
  font-size: 15px;
}

.more-law-button {
  margin-top: 10px;
  font-weight: 600;
  color: #007bff;
  cursor: pointer;
  width: fit-content;
}

/* 관련 뉴스 더보기 */
.related-news-section {
  margin-top: 40px;
}

.related-news-section h3 {
  font-size: 18px;
  margin-bottom: 15px;
}

.related-news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.related-news-item {
  display: flex;
  gap: 15px;
  align-items: center;
}

.related-news-image {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.related-news-title {
  font-weight: 500;
  font-size: 15px;
}

.related-news-meta {
  font-size: 13px;
  color: gray;
}
</style>

