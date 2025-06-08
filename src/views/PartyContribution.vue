<template>
  <div class="party-contribution page">
    <div class="title">
      <span @click="goToParty" style="cursor: pointer">POLITICAL PARTY</span>
      <div class="img">
        <img src="@/assets/shape.png" />
      </div>
      <span
        @click="goToPartyContribution1"
        style="font-weight: 600; cursor: pointer"
        >PARTY CONTRIBUTION</span
      >
    </div>

    <div class="sub-title">
      <div class="img">
        <img src="@/assets/party2.png" />
      </div>
      <span @click="goToParty" style="cursor: pointer"
        >정당별 키워드 기여도</span
      >
      <div class="img arrow">
        <img src="@/assets/arrow.png" />
      </div>
      <div class="party-logos">
        <div
          class="party-logo"
          @click="goToPartyContribution1"
          style="cursor: pointer"
        >
          <img :src="party.img" :alt="party.name" />
        </div>
      </div>
      <span @click="goToPartyContribution1" style="cursor: pointer">{{
        party.name
      }}</span>
    </div>

    <div class="bar-chart-container">
      <div class="legend">
        <span></span>
        기여도
      </div>
      <div class="bar-chart-main">
        <div class="y-axis">
          <div v-for="y in yLabels" :key="y" class="y-label">{{ y }}</div>
        </div>
        <div class="bars">
          <div
            v-for="(item, index) in party.contribution"
            :key="index"
            class="bar-item"
            @mouseover="showBarHeight(index)"
            @mouseleave="hideBarHeight"
          >
            <div
              class="bar"
              :style="{ height: getHeight(item.count) + '%' }"
            ></div>
            <div
              class="keyword"
              @click="goToKeywordPage(item.keyword)"
              style="cursor: pointer"
            >
              # {{ item.keyword }}
            </div>
            <!-- Hover 상태에서 높이를 보여주는 부분 -->
            <div v-if="hoverIndex === index" class="bar-height-tooltip">
              <span>{{ item.count }}개</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { enableMouseScroll } from "@/functions/common";
import { fetchPartyContribution } from "@/functions/fetch";
import {
  goToKeywordPage,
  goToParty,
  goToPartyContribution,
} from "@/functions/goToLink";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "PartyContribution",
  setup() {
    const route = useRoute();
    const partyId = ref(route.params.id[0] || 1);

    const partyLogos = ref({
      더불어민주당: "https://placehold.co/600x400",
      국민의힘: "https://placehold.co/600x400",
      정의당: "https://placehold.co/600x400",
      녹색당: "https://placehold.co/600x400",
      기본소득당: "https://placehold.co/600x400",
      사회민주당: "https://placehold.co/600x400",
      미래당: "https://placehold.co/600x400",
      민주연합당: "https://placehold.co/600x400",
      새미래당: "https://placehold.co/600x400",
    });
    const yLabels = ref([]);
    // const keywords = ref([
    //   "선거",
    //   "탄핵",
    //   "오염수",
    //   "부동산",
    //   "복지",
    //   "청년",
    //   "선거",
    //   "탄핵",
    //   "오염수",
    //   "부동산",
    //   "복지",
    //   "청년",
    //   "선거",
    //   "탄핵",
    //   "오염수",
    //   "부동산",
    //   "복지",
    //   "청년",
    //   "선거",
    //   "탄핵",
    //   "오염수",
    //   "부동산",
    //   "복지",
    //   "청년",
    // ]);
    // const barHeights = ref([
    //   80, 60, 99, 50, 70, 40, 80, 60, 99, 50, 70, 40, 80, 60, 98, 50, 70, 40,
    //   80, 60, 99, 50, 70, 40,
    // ]); // 예시 높이 (%)
    const maxCount = ref(0);
    const party = ref("");

    const goToPartyContribution1 = () => {
      goToPartyContribution(partyId.value);
    };

    const hoverIndex = ref(null);
    console.log(hoverIndex.value);

    // Hover 바 높이 보여주기
    const showBarHeight = (index) => {
      hoverIndex.value = index;
    };

    // Hover가 벗어나면 바 높이 숨기기
    const hideBarHeight = () => {
      hoverIndex.value = null;
    };

    const getHeight = (count) => {
      return (count / maxCount.value) * 100;
    };

    const loadData = async () => {
      await fetchPartyContribution(
        partyId.value,
        (newMaxCount) => {
          maxCount.value = newMaxCount;
        },
        (newParty) => {
          party.value = newParty;
        }
      );
    };

    const setYLabel = () => {
      for (let i = 0; i < 5; i++) {
        const yLabel = (maxCount.value / 4) * i;
        console.log(yLabel);
        yLabels.value = [yLabel, ...yLabels.value];
      }
    };

    onMounted(async () => {
      await loadData();
      await setYLabel();
      console.log(yLabels.value);
      console.log(maxCount.value);
      const el = document.querySelector(".bars");
      enableMouseScroll(el); // 'category-scroll'에 마우스 드래그로 스크롤 기능 추가
    });

    return {
      goToPartyContribution1,
      getHeight,
      partyLogos,
      yLabels,
      party,
      hoverIndex,
      showBarHeight,
      hideBarHeight,
      goToKeywordPage,
      goToParty,
    };
  },
};
</script>

<style src="@/css/PartyContribution.css" scoped></style>
