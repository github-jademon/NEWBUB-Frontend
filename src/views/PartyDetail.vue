<template>
  <div class="party-page page">
    <!-- 제목 -->
    <div class="title">Political party > PARTY TOP 5</div>
    <!-- <div class="title">📊 키워드 별 관여도 높은 정당 Top 5</div> -->

    <!-- 키워드 Top 5 그래프 -->
    <div class="keyword-top5">
      <div v-for="(item, index) in top5Data" :key="index" class="keyword-row">
        <strong class="keyword-name" @click="goToKeyword(item.keyword)">
          # {{ item.keyword }}
        </strong>
        <div class="bars">
          <div
            v-for="(party, idx) in item.parties"
            :key="idx"
            class="bar"
            :style="{
              width: party.percentage + '%',
              backgroundColor: getPartyColor(party.name),
            }"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="load-more" v-if="hasMore == true">
      <button @click="loadMore">+ 더보기</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

const exampleData = [
  {
    keyword: "대통령",
    parties: [
      { name: "더불어민주당", percentage: 30 },
      { name: "국민의힘", percentage: 25 },
      { name: "개혁신당", percentage: 20 },
      { name: "진보당", percentage: 15 },
      { name: "기본소득당", percentage: 10 },
    ],
  },
  {
    keyword: "윤석열",
    parties: [
      { name: "국민의힘", percentage: 28 },
      { name: "개혁신당", percentage: 24 },
      { name: "진보당", percentage: 18 },
      { name: "더불어민주당", percentage: 17 },
      { name: "기본소득당", percentage: 13 },
    ],
  },
  {
    keyword: "복지",
    parties: [
      { name: "기본소득당", percentage: 35 },
      { name: "진보당", percentage: 25 },
      { name: "더불어민주당", percentage: 20 },
      { name: "사회민주당", percentage: 15 },
      { name: "국민의힘", percentage: 5 },
    ],
  },
  {
    keyword: "경제",
    parties: [
      { name: "국민의힘", percentage: 30 },
      { name: "더불어민주당", percentage: 25 },
      { name: "개혁신당", percentage: 20 },
      { name: "국민의미래", percentage: 15 },
      { name: "기본소득당", percentage: 10 },
    ],
  },
  {
    keyword: "청년",
    parties: [
      { name: "기본소득당", percentage: 32 },
      { name: "더불어민주당", percentage: 28 },
      { name: "조국혁신당", percentage: 20 },
      { name: "국민의힘", percentage: 10 },
      { name: "새미래민주당", percentage: 10 },
    ],
  },
  {
    keyword: "탄핵",
    parties: [
      { name: "진보당", percentage: 40 },
      { name: "더불어민주당", percentage: 25 },
      { name: "국민의힘", percentage: 15 },
      { name: "개혁신당", percentage: 10 },
      { name: "사회민주당", percentage: 10 },
    ],
  },
  {
    keyword: "공정",
    parties: [
      { name: "국민의힘", percentage: 35 },
      { name: "더불어민주당", percentage: 30 },
      { name: "조국혁신당", percentage: 20 },
      { name: "진보당", percentage: 10 },
      { name: "사회민주당", percentage: 5 },
    ],
  },
  {
    keyword: "노동",
    parties: [
      { name: "진보당", percentage: 50 },
      { name: "사회민주당", percentage: 20 },
      { name: "더불어민주당", percentage: 15 },
      { name: "기본소득당", percentage: 10 },
      { name: "개혁신당", percentage: 5 },
    ],
  },
  {
    keyword: "환경",
    parties: [
      { name: "기본소득당", percentage: 30 },
      { name: "사회민주당", percentage: 25 },
      { name: "진보당", percentage: 20 },
      { name: "더불어민주당", percentage: 15 },
      { name: "국민의힘", percentage: 10 },
    ],
  },
  {
    keyword: "부동산",
    parties: [
      { name: "국민의힘", percentage: 40 },
      { name: "더불어민주당", percentage: 35 },
      { name: "개혁신당", percentage: 15 },
      { name: "진보당", percentage: 5 },
      { name: "기본소득당", percentage: 5 },
    ],
  },
];

export default {
  name: "PartyDetailPage",
  setup() {
    const top5Data = ref(exampleData);
    const hasMore = ref(true);
    const visibleItems = computed(() => {
      return top5Data.value;
    });
    console.log(top5Data.value);
    const getPartyColor = (name) => {
      const colorMap = {
        더불어민주당: "#A7C7E7",
        국민의힘: "#F8A5A5",
        개혁신당: "#FFD59E",
        진보당: "#C8E6C9",
        기본소득당: "#E3D0FF",
        조국혁신당: "#FFFACD",
        사회민주당: "#B2EBF2",
        국민의미래: "#E1BEE7",
        새미래민주당: "#D7CCC8",
      };
      return colorMap[name] || "#ccc";
    };
    const goToKeyword = (name) => {
      console.log(name);
      window.location.href = `/keyword/${name}`;
    };
    const loadMore = () => {};
    return {
      top5Data,
      hasMore,
      loadMore,
      visibleItems,
      getPartyColor,
      goToKeyword,
    };
  },
};
</script>

<style src="../css/PartyDetail.css" scoped></style>
