<template>
  <div class="party-page page">
    <h1 class="title">POLITICAL PARTY</h1>

    <div class="section-title" @click="goToPartyDetail" style="cursor: pointer">
      <span>📊 키워드 별 관여도 높은 정당 Top 5 ></span>
    </div>

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
              backgroundColor: party.color,
            }"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
    </div>

    <div
      class="section-title"
      @click="goToPartyContribution('전체')"
      style="cursor: pointer"
    >
      <span>🚩 정당별 키워드 관여도 </span>
    </div>

    <div class="party-logos">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="party-circle"
        @click="goToPartyContribution(party.name)"
        style="cursor: pointer"
      >
        <img :src="party.logo" :alt="party.name" />
        <div class="party-name">{{ party.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

const exampleData1 = [
  {
    keyword: "대통령",
    parties: [
      { name: "더불어민주당", percentage: 30, color: "#A7C7E7" },
      { name: "국민의힘", percentage: 25, color: "#F8A5A5" },
      { name: "개혁신당", percentage: 20, color: "#FFD59E" },
      { name: "진보당", percentage: 15, color: "#C8E6C9" },
      { name: "기본소득당", percentage: 10, color: "#E3D0FF" },
    ],
  },
  {
    keyword: "윤석열",
    parties: [
      { name: "국민의힘", percentage: 28, color: "#F8A5A5" },
      { name: "개혁신당", percentage: 24, color: "#FFD59E" },
      { name: "진보당", percentage: 18, color: "#C8E6C9" },
      { name: "더불어민주당", percentage: 17, color: "#A7C7E7" },
      { name: "기본소득당", percentage: 13, color: "#E3D0FF" },
    ],
  },
  {
    keyword: "복지",
    parties: [
      { name: "기본소득당", percentage: 35, color: "#E3D0FF" },
      { name: "진보당", percentage: 25, color: "#C8E6C9" },
      { name: "더불어민주당", percentage: 20, color: "#A7C7E7" },
      { name: "사회민주당", percentage: 15, color: "#B2EBF2" },
      { name: "국민의힘", percentage: 5, color: "#F8A5A5" },
    ],
  },
  {
    keyword: "경제",
    parties: [
      { name: "국민의힘", percentage: 30, color: "#F8A5A5" },
      { name: "더불어민주당", percentage: 25, color: "#A7C7E7" },
      { name: "개혁신당", percentage: 20, color: "#FFD59E" },
      { name: "국민의미래", percentage: 15, color: "#F8C8C4" },
      { name: "기본소득당", percentage: 10, color: "#E3D0FF" },
    ],
  },
  {
    keyword: "청년",
    parties: [
      { name: "기본소득당", percentage: 32, color: "#E3D0FF" },
      { name: "더불어민주당", percentage: 28, color: "#A7C7E7" },
      { name: "조국혁신당", percentage: 20, color: "#FFFACD" },
      { name: "국민의힘", percentage: 10, color: "#F8A5A5" },
      { name: "새미래민주당", percentage: 10, color: "#D7CCC8" },
    ],
  },
  {
    keyword: "탄핵",
    parties: [
      { name: "진보당", percentage: 40, color: "#C8E6C9" },
      { name: "더불어민주당", percentage: 25, color: "#A7C7E7" },
      { name: "국민의힘", percentage: 15, color: "#F8A5A5" },
      { name: "개혁신당", percentage: 10, color: "#FFD59E" },
      { name: "사회민주당", percentage: 10, color: "#B2EBF2" },
    ],
  },
];
const exampleData2 = [
  { name: "더불어민주당", logo: "/logos/democratic.png" },
  { name: "국민의힘", logo: "/logos/pp.png" },
  { name: "조국혁신당", logo: "/logos/innovation.png" },
  { name: "개혁신당", logo: "/logos/reform.png" },
  { name: "진보당", logo: "/logos/progressive.png" },
  { name: "기본소득당", logo: "/logos/basic.png" },
  { name: "사회민주당", logo: "/logos/social.png" },
  { name: "국민의미래", logo: "/logos/future.png" },
  { name: "더불어민주연합", logo: "/logos/united.png" },
  { name: "새미래민주당", logo: "/logos/newfuture.png" },
];

export default {
  name: "PartyPage",
  setup() {
    const top5Data = ref(exampleData1);
    const parties = ref(exampleData2);
    const goToPartyDetail = () => {
      window.location.href = "/party-detail";
    };
    const goToKeyword = (name) => {
      window.location.href = `/keyword/${name}`;
    };
    const goToPartyContribution = (party) => {
      window.location.href = `/party-contribution/${party}`;
    };
    return {
      top5Data,
      parties,
      goToPartyDetail,
      goToKeyword,
      goToPartyContribution,
    };
  },
};
</script>

<style src="../css/Party.css" scoped></style>
