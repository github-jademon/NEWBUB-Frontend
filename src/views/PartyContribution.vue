<template>
  <div class="party-contribution">
    <h1>정당 디테일 기여도 페이지</h1>
    <div class="party-logos">
      <div class="party-logo">
        <img :src="partyLogos[partyName]" :alt="partyName" />
        <p>{{ partyName }}</p>
      </div>
    </div>

    <!-- 추가된 세로 막대 그래프 -->
    <div class="bar-chart-container">
      <div class="y-axis">
        <div v-for="y in yLabels" :key="y" class="y-label">{{ y }}</div>
      </div>
      <div class="bars">
        <div v-for="(keyword, index) in keywords" :key="keyword" class="bar-item">
          <div class="bar" :style="{ height: barHeights[index] + '%' }"></div>
          <div class="keyword">{{ keyword }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartyContribution',
  data() {
    return {
      partyName: this.$route.query.party || '',
      partyLogos: {
        '더불어민주당': 'https://placehold.co/600x400',
        '국민의힘': 'https://placehold.co/600x400',
        '정의당': 'https://placehold.co/600x400',
        '녹색당': 'https://placehold.co/600x400',
        '기본소득당': 'https://placehold.co/600x400',
        '사회민주당': 'https://placehold.co/600x400',
        '미래당': 'https://placehold.co/600x400',
        '민주연합당': 'https://placehold.co/600x400',
        '새미래당': 'https://placehold.co/600x400',
      },
      yLabels: [100, 80, 60, 40, 20, 0],
      keywords: ['# 선거', '# 탄핵', '# 오염수', '# 부동산', '# 복지', '# 청년'],
      barHeights: [80, 60, 90, 50, 70, 40], // 예시 높이 (%)
    };
  },
  created() {
    console.log(`${this.$route}`);
    console.log(`PartyContribution created for ${this.partyName}`);
  }
};
</script>

<style scoped>
.party-contribution {
  padding: 5px;
}

.party-logos {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.party-logo {
  width: 100px;
  text-align: center;
}

.party-logo img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

/* 그래프 스타일 */
.bar-chart-container {
  display: flex;
  margin-top: 40px;
  align-items: flex-end;
  height: 300px;
}

.y-axis {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-right: 10px;
  font-size: 14px;
  color: #555;
}

.y-label {
  height: calc(100% / 5);
  text-align: right;
  padding-right: 5px;
}

.bars {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  flex: 1;
  height: 100%;
  border-left: 1px solid #ccc;
  padding-left: 10px;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 50px;
}

.bar {
  width: 100%;
  background-color: #4caf50;
  transition: height 0.5s;
}

.keyword {
  margin-top: 8px;
  font-size: 13px;
  text-align: center;
  word-break: keep-all;
}
</style>
