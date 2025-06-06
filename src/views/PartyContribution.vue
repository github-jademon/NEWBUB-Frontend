<template>
  <div class="party-contribution page">
    <div class="title">
      <span>POLITICAL PARTY</span>
      <div class="img">
        <img src="../assets/shape.png" />
      </div>
      <span style="font-weight: 600">PARTY CONTRIBUTION</span>
    </div>

    <div class="sub-title" @click="goToPartyDetail" style="cursor: pointer">
      <div class="img">
        <img src="../assets/party2.png" />
      </div>
      <span>정당별 키워드 기여도</span>
      <div class="img arrow">
        <img src="../assets/arrow.png" />
      </div>
      <div class="party-logos">
        <div class="party-logo">
          <img :src="partyLogos[partyName]" :alt="partyName" />
        </div>
      </div>
      <span>{{ partyName }}</span>
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
            v-for="(keyword, index) in keywords"
            :key="index"
            class="bar-item"
            @mouseover="showBarHeight(index)"
            @mouseleave="hideBarHeight"
          >
            <div class="bar" :style="{ height: barHeights[index] + '%' }"></div>
            <div class="keyword">{{ keyword }}</div>
            <!-- Hover 상태에서 높이를 보여주는 부분 -->
            <div v-if="hoverIndex === index" class="bar-height-tooltip">
              {{ barHeights[index] }}%
            </div>
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
import { enableMouseScroll } from "@/functions/common";
import { onMounted, ref } from "vue";

export default {
  name: "PartyContribution",
  setup() {
    const partyName = ref("더불어민주당");
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
      "# 선거",
      "# 탄핵",
      "# 오염수",
      "# 부동산",
      "# 복지",
      "# 청년",
      "# 선거",
      "# 탄핵",
      "# 오염수",
      "# 부동산",
      "# 복지",
      "# 청년",
      "# 선거",
      "# 탄핵",
      "# 오염수",
      "# 부동산",
      "# 복지",
      "# 청년",
    ]);
    const barHeights = ref([
      80, 60, 90, 50, 70, 40, 80, 60, 90, 50, 70, 40, 80, 60, 90, 50, 70, 40,
      80, 60, 90, 50, 70, 40,
    ]); // 예시 높이 (%)

    const hoverIndex = ref(null);
    console.log(hoverIndex.value);

    // Hover 시 바 높이 보여주기
    const showBarHeight = (index) => {
      console.log(index);
      hoverIndex.value = index;
    };

    // Hover가 벗어나면 바 높이 숨기기
    const hideBarHeight = () => {
      hoverIndex.value = null;
    };

    onMounted(() => {
      // loadMore();
      const el = document.querySelector(".bars");
      enableMouseScroll(el); // 'category-scroll'에 마우스 드래그로 스크롤 기능 추가
    });

    return {
      partyName,
      partyLogos,
      yLabels,
      keywords,
      barHeights,
      hoverIndex,
      showBarHeight,
      hideBarHeight,
    };
  },
};
</script>

<style src="../css/PartyContribution.css" scoped></style>
