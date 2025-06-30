<template>
  <div class="law-detail page">
    <div class="title" @click="goToLawPage" style="cursor: pointer">LAW</div>

    <!-- 법안 제목 -->
    <h1 class="law-title">{{ law.name }}</h1>

    <div class="content-wrapper">
      <!-- 법안 상세 정보 블럭 -->
      <div class="law-content">
        <div class="process-status">
          <div class="process-status-content">
            <div
              v-for="(step, index) in processSteps"
              :key="index"
              :class="[
                'process-step',
                isStepCompleted(index) == true ? 'completed' : 'pending',
              ]"
            >
              <div :class="['line', index < 1 ? 'line-none' : '']"></div>
              <div class="icon"><img :src="step.icon" /></div>
              <div
                :class="[
                  'line',
                  index > 3 ? 'line-none' : '',
                  isStepCompletedEnd(index) ? 'line-end' : '',
                ]"
              ></div>
              <div class="process-name">{{ step.name }}</div>
            </div>
          </div>
        </div>
        <div class="law-info-block">
          <div class="law-info-table">
            <div class="table-item">
              <div class="col-head">의안 번호</div>
              <div class="col-data">{{ law.number }}</div>
            </div>
            <div class="table-item">
              <div class="col-head">대표 발의 의원</div>
              <div class="col-data">{{ law.proponent }}</div>
            </div>
            <div class="table-item">
              <div class="col-head">접수일자</div>
              <div class="col-data">{{ law.date }}</div>
            </div>
            <div class="table-item">
              <div class="col-head">처리결과</div>
              <div class="col-data">{{ law.processing_result }}</div>
            </div>
          </div>
          <div class="proposal-content">
            <h2>제안 이유 및 주요 내용</h2>

            <p v-html="summary"></p>

            <div class="more-link" @click="goToOriginalLink(law.link)">
              <span>법안 자세히 보기</span>
              <span class="img"><img src="@/assets/shape1.png" /></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 오른쪽 연관 키워드 + 정당 기여도 블럭 -->
      <div class="side-blocks">
        <div class="related-keywords">
          <h3>연관 키워드</h3>
          <div class="keywords">
            <span
              v-for="(kw, idx) in law.keywords"
              :key="idx"
              class="keyword"
              @click="goToKeywordPage(kw)"
            >
              # {{ kw }}
            </span>
          </div>
        </div>

        <div class="party-contribution-block">
          <h3>정당기여도</h3>
          <div class="party-list">
            <div
              v-for="(party, idx) in law.parties"
              :key="idx"
              class="party-item"
              @click="goToPartyContribution(party.id)"
              style="cursor: pointer"
            >
              <div class="party-logo">
                <img :src="party.img" />
              </div>
              <p>{{ party.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchLawData } from "@/functions/fetch";
import {
  goToLawPage,
  goToOriginalLink,
  goToKeywordPage,
  goToPartyContribution,
} from "@/functions/goToLink";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "LawDetail",
  setup() {
    const route = useRoute();
    const lawId = ref(route.params.id || "");
    const law = ref({});

    const summary = computed(() => {
      // return law.value.summary;
      return law.value?.summary?.replace(/\\n/g, "<br>") ?? "";
    });

    const processSteps = ref([
      {
        name: "접수",
        icon: require("@/assets/process1.png"),
      },
      {
        name: "소관위 처리",
        icon: require("@/assets/process2.png"),
      },
      {
        name: "법사위 처리",
        icon: require("@/assets/process3.png"),
      },
      {
        name: "본회의 처리",
        icon: require("@/assets/process4.png"),
      },
      {
        name: "공포",
        icon: require("@/assets/process5.png"),
      },
    ]);

    const isStepCompleted = (index) => {
      return index + 1 <= law.value.processing_status;
    };

    const isStepCompletedEnd = (index) => {
      return index + 1 === law.value.processing_status;
    };

    const loadData = () => {
      fetchLawData(lawId.value, (newLaw) => {
        law.value = newLaw;
      });
    };

    onMounted(() => {
      loadData();
    });

    return {
      law,
      loadData,
      processSteps,
      isStepCompleted,
      goToOriginalLink,
      goToKeywordPage,
      goToPartyContribution,
      isStepCompletedEnd,
      goToLawPage,
      summary,
    };
  },
};

// const exampleData = {
//   id: 1,
//   name: "법안11",
//   keyword: [
//     "키워드1",
//     "키워드2",
//     "키워드3",
//     "키워드2",
//     "키워드3",
//     "키워드2",
//     "키워드3",
//   ],
//   date: "2025-05-22",
//   // link: "링크1",
//   link: "https://naver.com",
//   result: "원안 가결",
//   // 빠짐
//   representative: "박광원",
//   text: `1. 제안이유\n벌칙조항에서 인용하는 조문의 조 제목을 추가함.\n또한, 제22대 국회의원선거를 앞두고 지역구국회의원예비후보자후원회의 등록과 예비 후보자 및 그 후원회의 회계책임자의 신고가 이루어졌으나, 「공직선거법」 이 개정되어 국회의원지역선거구의 선거구역이 변경된 경우 기존의 등록 및 신고에 대한 경과조치 를 두어 해당 후원회 등의 변경 등록 및 신고를 하지 않도록 함으로써 예비후보자 등의 편의를 도모하고 행정의 효율성을 제고하려는 것임. 벌칙조항에서 인용하는 조문의 조 제목을 추가함.\n\n2. 주요 내용\n가. 벌칙조항에서 인용하는 조문의 조 제목을 추가함(안 제49조제2항제8호).\n나. 2024년 4월 10일 실시하는 국회의원선거에서 국회의원지역선거구구역표 개정에 따 라 선거구역이 변경된 국회의원지역구의 관할 선거관리위원회에 등록 또는 신고된 지 역구국회의원예비후보자후원회 또는 예비후보자 및 그 후원회의 회계책임자는 이 법 시행 당시 관할 선거관리위원회에 등록 또는 신고된 것으로 봄(안 부칙 제2조 및 제3조).`,
//   // parties: [{ name: "더불어민주당", logo: "https://placehold.co/600x400" }],
//   parties: [
//     {
//       name: "더불어민주당",
//       logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/2024_Logo_of_the_Democratic_Party_of_Korea.svg/600px-2024_Logo_of_the_Democratic_Party_of_Korea.svg.png",
//     },
//   ],
// };
</script>

<style src="@/css/LawDetail.css" scoped></style>
