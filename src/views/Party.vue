<template>
  <div class="party-page">
    <h1 class="page-title">POLITICAL PARTY</h1>

    <div class="section-title" @click="goToPartyDetail" style="cursor: pointer;">
      <span>📊 키워드 별 관여도 높은 정당 Top 5 ></span>
    </div>

    <div class="keyword-top5">
      <div
        v-for="(item, index) in top5Data"
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
            :style="{ width: party.percentage + '%', backgroundColor: party.color }"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="section-title"
      @click="goToPartyContribution('전체')"
      style="cursor: pointer;"
    >
      <span>🚩 정당별 키워드 관여도 ></span>
    </div>

    <div class="party-logos">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="party-circle"
        @click="goToPartyContribution(party.name)"
        style="cursor: pointer;"
      >
        <img :src="party.logo" :alt="party.name" />
        <div class="party-name">{{ party.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PartyPage',
  data() {
    return {
      top5Data: [
        {
          keyword: '대통령',
          parties: [
            { name: '더불어민주당', percentage: 30, color: '#A7C7E7' },
            { name: '국민의힘', percentage: 25, color: '#F8A5A5' },
            { name: '개혁신당', percentage: 20, color: '#FFD59E' },
            { name: '진보당', percentage: 15, color: '#C8E6C9' },
            { name: '기본소득당', percentage: 10, color: '#E3D0FF' },
          ],
        },
        {
          keyword: '윤석열',
          parties: [
            { name: '국민의힘', percentage: 28, color: '#F8A5A5' },
            { name: '개혁신당', percentage: 24, color: '#FFD59E' },
            { name: '진보당', percentage: 18, color: '#C8E6C9' },
            { name: '더불어민주당', percentage: 17, color: '#A7C7E7' },
            { name: '기본소득당', percentage: 13, color: '#E3D0FF' },
          ],
        },
        {
          keyword: '복지',
          parties: [
            { name: '기본소득당', percentage: 35, color: '#E3D0FF' },
            { name: '진보당', percentage: 25, color: '#C8E6C9' },
            { name: '더불어민주당', percentage: 20, color: '#A7C7E7' },
            { name: '사회민주당', percentage: 15, color: '#B2EBF2' },
            { name: '국민의힘', percentage: 5, color: '#F8A5A5' },
          ],
        },
        {
          keyword: '경제',
          parties: [
            { name: '국민의힘', percentage: 30, color: '#F8A5A5' },
            { name: '더불어민주당', percentage: 25, color: '#A7C7E7' },
            { name: '개혁신당', percentage: 20, color: '#FFD59E' },
            { name: '국민의미래', percentage: 15, color: '#E1BEE7' },
            { name: '기본소득당', percentage: 10, color: '#E3D0FF' },
          ],
        },
        {
          keyword: '청년',
          parties: [
            { name: '기본소득당', percentage: 32, color: '#E3D0FF' },
            { name: '더불어민주당', percentage: 28, color: '#A7C7E7' },
            { name: '조국혁신당', percentage: 20, color: '#FFFACD' },
            { name: '국민의힘', percentage: 10, color: '#F8A5A5' },
            { name: '새미래민주당', percentage: 10, color: '#D7CCC8' },
          ],
        },
        {
          keyword: '탄핵',
          parties: [
            { name: '진보당', percentage: 40, color: '#C8E6C9' },
            { name: '더불어민주당', percentage: 25, color: '#A7C7E7' },
            { name: '국민의힘', percentage: 15, color: '#F8A5A5' },
            { name: '개혁신당', percentage: 10, color: '#FFD59E' },
            { name: '사회민주당', percentage: 10, color: '#B2EBF2' },
          ],
        },
      ],
      parties: [
        { name: '더불어민주당', logo: '/logos/democratic.png' },
        { name: '국민의힘', logo: '/logos/pp.png' },
        { name: '조국혁신당', logo: '/logos/innovation.png' },
        { name: '개혁신당', logo: '/logos/reform.png' },
        { name: '진보당', logo: '/logos/progressive.png' },
        { name: '기본소득당', logo: '/logos/basic.png' },
        { name: '사회민주당', logo: '/logos/social.png' },
        { name: '국민의미래', logo: '/logos/future.png' },
        { name: '더불어민주연합', logo: '/logos/united.png' },
        { name: '새미래민주당', logo: '/logos/newfuture.png' },
      ],
    };
  },
  methods: {
    goToPartyDetail() {
      this.$router.push('/party-detail');
    },
    goToKeyword(keywordName) {
      this.$router.push({ name: 'Keyword', params: { name: keywordName } });
    },
    goToPartyContribution(partyName) {
      this.$router.push({ path: '/party-contribution', query: { party: partyName } });
    },
  },
};
</script>

<style scoped>
/* 그대로 유지 */
.party-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.page-title {
  font-size: 32px;
  margin-bottom: 20px;
}
.section-title {
  font-size: 20px;
  margin: 20px 0 10px;
}
.keyword-top5 {
  margin-bottom: 30px;
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
.party-logos {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  margin-top: 20px;
  justify-items: center;
}
.party-circle {
  text-align: center;
}
.party-circle img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.party-name {
  margin-top: 8px;
  font-size: 14px;
}
</style>
