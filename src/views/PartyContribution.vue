<template>
  <div class="party-contribution page">
    <div class="title">Political party > PARTY CONTRIBUTION</div>
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
        <div
          v-for="(keyword, index) in keywords"
          :key="keyword"
          class="bar-item"
        >
          <div class="bar" :style="{ height: barHeights[index] + '%' }"></div>
          <div class="keyword">{{ keyword }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { useRoute } from "vue-router";

export default {
  name: "PartyContribution",
  setup() {
    const route = useRoute();
    const partyName = ref(route.params.name || "더불어민주당");
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
    const yLabels = ref([100, 80, 60, 40, 20, 0]);
    const keywords = ref([
      "# 선거",
      "# 탄핵",
      "# 오염수",
      "# 부동산",
      "# 복지",
      "# 청년",
    ]);
    const barHeights = ref([80, 60, 90, 50, 70, 40]); // 예시 높이 (%)
    return { partyName, partyLogos, yLabels, keywords, barHeights };
  },
};
</script>

<style src="../css/PartyContribution.css" scoped></style>
