<template>
  <div
    class="party-page page"
    :class="parties.length == 0 && top5Data.length == 0 ? 'data-none' : ''"
  >
    <h1 class="title" @click="goToParty" style="cursor: pointer">
      POLITICAL PARTY
    </h1>

    <div class="sub-title" @click="goToPartyDetail" style="cursor: pointer">
      <div class="img">
        <img src="@/assets/party1.png" />
      </div>
      <span>키워드 별 관여도 높은 정당 Top 5</span>
      <div class="img title-img">
        <img src="@/assets/arrow.png" />
      </div>
    </div>

    <div :class="['keyword-top5', top5Data.length == 0 ? 'data-none' : '']">
      <div v-for="(item, index) in top5Data" :key="index" class="keyword-row">
        <strong class="keyword-name" @click="goToKeywordPage(item.keyword)">
          <span>#</span> {{ item.keyword }}
        </strong>
        <div class="bars">
          <div
            v-for="(party, idx) in item.top5_party"
            :key="idx"
            class="bar"
            :style="{
              width: party.rate + '%',
              backgroundColor: getPartyColor(party.name),
              cursor: 'pointer',
            }"
            @click="goToPartyContribution(party.id)"
          >
            {{ party.name }}
          </div>
        </div>
      </div>
      <span v-if="top5Data == 0"> 데이터가 없습니다 </span>
    </div>

    <div class="sub-title">
      <div class="img">
        <img src="@/assets/party2.png" />
      </div>
      <span>정당별 키워드 관여도</span>
    </div>

    <div :class="['party-logos', parties.length == 0 ? 'data-none' : '']">
      <div
        v-for="(party, index) in parties"
        :key="index"
        class="party-circle"
        @click="goToPartyContribution(party.id)"
        style="cursor: pointer"
      >
        <div class="img">
          <img :src="party.img" :alt="party.name" />
        </div>
        <div class="party-name">{{ party.name }}</div>
      </div>
      <span v-if="parties == 0"> 데이터가 없습니다 </span>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  goToPartyDetail,
  goToKeywordPage,
  goToPartyContribution,
  goToParty,
} from "@/functions/goToLink";
import { fetchPartyData, fetchTop5Data } from "@/functions/fetch";
// const exampleData2 = [
//   { name: "더불어민주당", logo: "/logos/democratic.png", id: 1 },
//   { name: "국민의힘", logo: "/logos/pp.png", id: 1 },
//   { name: "조국혁신당", logo: "/logos/innovation.png", id: 1 },
//   { name: "개혁신당", logo: "/logos/reform.png", id: 1 },
//   { name: "진보당", logo: "/logos/progressive.png", id: 1 },
//   { name: "기본소득당", logo: "/logos/basic.png", id: 1 },
//   { name: "사회민주당", logo: "/logos/social.png", id: 1 },
//   { name: "무소속", logo: "/logos/future.png", id: 1 },
// ];

export default {
  name: "PartyPage",
  setup() {
    const top5Data = ref([]);
    const parties = ref([]);

    const getPartyColor = (name) => {
      const colorMap = {
        더불어민주당: "#7AB3E1",
        국민의힘: "#FF9090",
        개혁신당: "#F5AC58",
        진보당: "#FCB4B4",
        기본소득당: "#93DBCF",
        조국혁신당: "#AFD4FC",
        사회민주당: "#F4BC7A",
      };
      return colorMap[name] || "#ccc";
    };

    const loadData = () => {
      fetchTop5Data(
        1,
        (newTop5Data) => {
          top5Data.value = newTop5Data;
        },
        null,
        null,
        5
      );
      fetchPartyData((newParties) => {
        parties.value = newParties;
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      top5Data,
      parties,
      goToPartyDetail,
      goToKeywordPage,
      goToPartyContribution,
      goToParty,
      getPartyColor,
    };
  },
};

// const exampleData1 = [
//   {
//     keyword: "대통령",
//     parties: [
//       { name: "더불어민주당", percentage: 30, color: "#7AB3E1" },
//       { name: "국민의힘", percentage: 25, color: "#FF9090" },
//       { name: "개혁신당", percentage: 20, color: "#F5AC58" },
//       { name: "진보당", percentage: 15, color: "#FCB4B4" },
//       { name: "기본소득당", percentage: 10, color: "#93DBCF" },
//     ],
//   },
//   {
//     keyword: "윤석열",
//     parties: [
//       { name: "국민의힘", percentage: 28, color: "#FF9090" },
//       { name: "개혁신당", percentage: 24, color: "#F5AC58" },
//       { name: "진보당", percentage: 18, color: "#FCB4B4" },
//       { name: "더불어민주당", percentage: 17, color: "#7AB3E1" },
//       { name: "기본소득당", percentage: 13, color: "#93DBCF" },
//     ],
//   },
//   {
//     keyword: "복지",
//     parties: [
//       { name: "기본소득당", percentage: 35, color: "#93DBCF" },
//       { name: "진보당", percentage: 25, color: "#FCB4B4" },
//       { name: "더불어민주당", percentage: 20, color: "#7AB3E1" },
//       { name: "사회민주당", percentage: 15, color: "#F4BC7A" },
//       { name: "국민의힘", percentage: 5, color: "#FF9090" },
//     ],
//   },
//   {
//     keyword: "경제",
//     parties: [
//       { name: "국민의힘", percentage: 30, color: "#FF9090" },
//       { name: "더불어민주당", percentage: 25, color: "#7AB3E1" },
//       { name: "개혁신당", percentage: 20, color: "#F5AC58" },
//       { name: "무소속", percentage: 15, color: "#CACFD3" },
//       { name: "기본소득당", percentage: 10, color: "#93DBCF" },
//     ],
//   },
//   {
//     keyword: "청년",
//     parties: [
//       { name: "기본소득당", percentage: 32, color: "#93DBCF" },
//       { name: "더불어민주당", percentage: 28, color: "#7AB3E1" },
//       { name: "조국혁신당", percentage: 20, color: "#AFD4FC" },
//       { name: "국민의힘", percentage: 10, color: "#FF9090" },
//       { name: "무소속", percentage: 10, color: "#CACFD3" },
//     ],
//   },
//   {
//     keyword: "탄핵",
//     parties: [
//       { name: "진보당", percentage: 40, color: "#C8E6C9" },
//       { name: "더불어민주당", percentage: 25, color: "#7AB3E1" },
//       { name: "국민의힘", percentage: 15, color: "#FF9090" },
//       { name: "개혁신당", percentage: 10, color: "#F5AC58" },
//       { name: "사회민주당", percentage: 10, color: "#F4BC7A" },
//     ],
//   },
// ];
</script>

<style src="@/css/Party.css" scoped></style>
