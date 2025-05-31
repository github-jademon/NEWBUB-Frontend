<template>
  <div class="party-page">
    <!-- 제목 -->
    <h1 class="page-title">📊 키워드 별 관여도 높은 정당 Top 5</h1>

    <!-- 키워드 Top 5 그래프 -->
    <div class="keyword-top5">
      <div
        v-for="(item, index) in visibleItems"
        :key="index"
        class="keyword-row"
      >
        <strong class="keyword-name" @click="goToKeyword(item.keyword)">
          # {{ item.keyword }}
        </strong>
        <div class="bars">
          <div
            v-for="(party, idx) in item.parties"
            :key="idx"
            class="bar"
            :style="{ width: party.percentage + '%', backgroundColor: getPartyColor(party.name) }"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
    </div>

    <!-- 더보기 버튼 (항상 표시) -->
    <div class="load-more" @click="loadMore">
      + 더보기
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartyDetailPage',
  data() {
    return {
      visibleCount: 12,
      top5Data: [
        {
          keyword: '대통령',
          parties: [
            { name: '더불어민주당', percentage: 30 },
            { name: '국민의힘', percentage: 25 },
            { name: '개혁신당', percentage: 20 },
            { name: '진보당', percentage: 15 },
            { name: '기본소득당', percentage: 10 },
          ],
        },
        {
          keyword: '윤석열',
          parties: [
            { name: '국민의힘', percentage: 28 },
            { name: '개혁신당', percentage: 24 },
            { name: '진보당', percentage: 18 },
            { name: '더불어민주당', percentage: 17 },
            { name: '기본소득당', percentage: 13 },
          ],
        },
        {
          keyword: '복지',
          parties: [
            { name: '기본소득당', percentage: 35 },
            { name: '진보당', percentage: 25 },
            { name: '더불어민주당', percentage: 20 },
            { name: '사회민주당', percentage: 15 },
            { name: '국민의힘', percentage: 5 },
          ],
        },
        {
          keyword: '경제',
          parties: [
            { name: '국민의힘', percentage: 30 },
            { name: '더불어민주당', percentage: 25 },
            { name: '개혁신당', percentage: 20 },
            { name: '국민의미래', percentage: 15 },
            { name: '기본소득당', percentage: 10 },
          ],
        },
        {
          keyword: '청년',
          parties: [
            { name: '기본소득당', percentage: 32 },
            { name: '더불어민주당', percentage: 28 },
            { name: '조국혁신당', percentage: 20 },
            { name: '국민의힘', percentage: 10 },
            { name: '새미래민주당', percentage: 10 },
          ],
        },
        {
          keyword: '탄핵',
          parties: [
            { name: '진보당', percentage: 40 },
            { name: '더불어민주당', percentage: 25 },
            { name: '국민의힘', percentage: 15 },
            { name: '개혁신당', percentage: 10 },
            { name: '사회민주당', percentage: 10 },
          ],
        },
        {
          keyword: '공정',
          parties: [
            { name: '국민의힘', percentage: 35 },
            { name: '더불어민주당', percentage: 30 },
            { name: '조국혁신당', percentage: 20 },
            { name: '진보당', percentage: 10 },
            { name: '사회민주당', percentage: 5 },
          ],
        },
        {
          keyword: '노동',
          parties: [
            { name: '진보당', percentage: 50 },
            { name: '사회민주당', percentage: 20 },
            { name: '더불어민주당', percentage: 15 },
            { name: '기본소득당', percentage: 10 },
            { name: '개혁신당', percentage: 5 },
          ],
        },
        {
          keyword: '환경',
          parties: [
            { name: '기본소득당', percentage: 30 },
            { name: '사회민주당', percentage: 25 },
            { name: '진보당', percentage: 20 },
            { name: '더불어민주당', percentage: 15 },
            { name: '국민의힘', percentage: 10 },
          ],
        },
        {
          keyword: '부동산',
          parties: [
            { name: '국민의힘', percentage: 40 },
            { name: '더불어민주당', percentage: 35 },
            { name: '개혁신당', percentage: 15 },
            { name: '진보당', percentage: 5 },
            { name: '기본소득당', percentage: 5 },
          ],
        },
      ],
    };
  },
  computed: {
    visibleItems() {
      return this.top5Data.slice(0, this.visibleCount);
    },
  },
  methods: {
    getPartyColor(name) {
      const colorMap = {
        '더불어민주당': '#A7C7E7',
        '국민의힘': '#F8A5A5',
        '개혁신당': '#FFD59E',
        '진보당': '#C8E6C9',
        '기본소득당': '#E3D0FF',
        '조국혁신당': '#FFFACD',
        '사회민주당': '#B2EBF2',
        '국민의미래': '#E1BEE7',
        '새미래민주당': '#D7CCC8',
      };
      return colorMap[name] || '#ccc';
    },
    goToKeyword(keywordName) {
      this.$router.push({ name: 'Keyword', params: { name: keywordName } });
    },
    loadMore() {
      if (this.visibleCount < this.top5Data.length) {
        this.visibleCount = Math.min(this.visibleCount + 5, this.top5Data.length);
      }
    },
  },
};
</script>

<style scoped>
.party-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}

.keyword-top5 {
  margin-bottom: 20px;
}

.keyword-row {
  margin-bottom: 16px;
}

.bars {
  display: flex;
  gap: 6px;
  margin-top: 6px;
}

.bar {
  color: white;
  padding: 4px;
  font-size: 14px;
  text-align: center;
  border-radius: 4px;
  white-space: nowrap;
}

.keyword-name {
  cursor: pointer;
  color: #4A90E2;
}

.keyword-name:hover {
  text-decoration: underline;
}

.load-more {
  text-align: center;
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.load-more:hover {
  background-color: #e0e0e0;
}
</style>
