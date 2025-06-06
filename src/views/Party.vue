<template>
  <div class="party-page page">
    <h1 class="title">POLITICAL PARTY</h1>

    <div class="sub-title" @click="goToPartyDetail" style="cursor: pointer">
      <div class="img">
        <img src="../assets/party1.png" />
      </div>
      <span>키워드 별 관여도 높은 정당 Top 5</span>
      <div class="img title-img">
        <img src="../assets/arrow.png" />
      </div>
    </div>

    <div class="keyword-top5">
      <div v-for="(item, index) in top5Data" :key="index" class="keyword-row">
        <strong class="keyword-name" @click="goToKeyword(item.keyword)">
          <span>#</span> {{ item.keyword }}
        </strong>
        <div class="bars">
          <div
            v-for="(party, idx) in item.parties"
            :key="idx"
            class="bar"
            :style="{
              width: party.percentage + '%',
              backgroundColor: party.color,
              cursor: 'pointer',
            }"
            @click="goToPartyContribution(party.name)"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="sub-title">
      <div class="img">
        <img src="../assets/party2.png" />
      </div>
      <span>정당별 키워드 관여도</span>
    </div>

    <div class="party-logos">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="party-circle"
        @click="goToPartyContribution(party.name)"
        style="cursor: pointer"
      >
        <div class="img">
          <img src="https://placehold.co/600x400" :alt="party.name" />
        </div>
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
      { name: "더불어민주당", percentage: 30, color: "#7AB3E1" },
      { name: "국민의힘", percentage: 25, color: "#FF9090" },
      { name: "개혁신당", percentage: 20, color: "#F5AC58" },
      { name: "진보당", percentage: 15, color: "#FCB4B4" },
      { name: "기본소득당", percentage: 10, color: "#93DBCF" },
    ],
  },
  {
    keyword: "윤석열",
    parties: [
      { name: "국민의힘", percentage: 28, color: "#FF9090" },
      { name: "개혁신당", percentage: 24, color: "#F5AC58" },
      { name: "진보당", percentage: 18, color: "#FCB4B4" },
      { name: "더불어민주당", percentage: 17, color: "#7AB3E1" },
      { name: "기본소득당", percentage: 13, color: "#93DBCF" },
    ],
  },
  {
    keyword: "복지",
    parties: [
      { name: "기본소득당", percentage: 35, color: "#93DBCF" },
      { name: "진보당", percentage: 25, color: "#FCB4B4" },
      { name: "더불어민주당", percentage: 20, color: "#7AB3E1" },
      { name: "사회민주당", percentage: 15, color: "#F4BC7A" },
      { name: "국민의힘", percentage: 5, color: "#FF9090" },
    ],
  },
  {
    keyword: "경제",
    parties: [
      { name: "국민의힘", percentage: 30, color: "#FF9090" },
      { name: "더불어민주당", percentage: 25, color: "#7AB3E1" },
      { name: "개혁신당", percentage: 20, color: "#F5AC58" },
      { name: "무소속", percentage: 15, color: "#CACFD3" },
      { name: "기본소득당", percentage: 10, color: "#93DBCF" },
    ],
  },
  {
    keyword: "청년",
    parties: [
      { name: "기본소득당", percentage: 32, color: "#93DBCF" },
      { name: "더불어민주당", percentage: 28, color: "#7AB3E1" },
      { name: "조국혁신당", percentage: 20, color: "#AFD4FC" },
      { name: "국민의힘", percentage: 10, color: "#FF9090" },
      { name: "무소속", percentage: 10, color: "#CACFD3" },
    ],
  },
  {
    keyword: "탄핵",
    parties: [
      { name: "진보당", percentage: 40, color: "#C8E6C9" },
      { name: "더불어민주당", percentage: 25, color: "#7AB3E1" },
      { name: "국민의힘", percentage: 15, color: "#FF9090" },
      { name: "개혁신당", percentage: 10, color: "#F5AC58" },
      { name: "사회민주당", percentage: 10, color: "#F4BC7A" },
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
  { name: "무소속", logo: "/logos/future.png" },
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
