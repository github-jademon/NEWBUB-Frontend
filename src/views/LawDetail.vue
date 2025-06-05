<template>
  <div class="law-detail">
    <!-- 법안 제목 -->
    <h1 class="law-title">{{ law.title }}</h1>

    <!-- 처리 현황 -->
    <div class="process-status">
      <div
        v-for="(step, index) in processSteps"
        :key="index"
        :class="['process-step', isStepCompleted(index) ? 'completed' : 'pending']"
      >
        {{ step }}
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 법안 상세 정보 블럭 -->
      <div class="law-info-block">
        <table class="law-info-table">
          <tbody>
            <tr>
              <th>의안 번호</th>
              <td>{{ law.id }}</td>
              <th>대표 발의 의원</th>
              <td>{{ law.representative }}</td>
            </tr>
            <tr>
              <th>접수일자</th>
              <td>{{ law.receiptDate }}</td>
              <th>처리결과</th>
              <td>{{ law.result }}</td>
            </tr>
          </tbody>
        </table>

        <div class="proposal-content">
          <h2>제안 이유 및 주요 내용</h2>

          <h3>1. 제안 이유</h3>
          <p>{{ law.proposalReason }}</p>

          <h3>2. 주요 내용</h3>
          <p>{{ law.mainContent }}</p>

          <div class="more-link" @click="goToOriginalLink">
            법안 자세히 보기 &gt;
          </div>
        </div>
      </div>

      <!-- 오른쪽 연관 키워드 + 정당 기여도 블럭 -->
      <div class="side-blocks">
        <div class="related-keywords">
          <h3>연관 키워드</h3>
          <div class="keywords">
            <span
              v-for="(kw, idx) in relatedKeywords"
              :key="idx"
              class="keyword"
              @click="goToKeywordPage(kw)"
            >
              {{ kw }}
            </span>
          </div>
        </div>

        <div class="party-contribution-block">
          <h3>정당기여도</h3>
          <div class="party-list">
            <div
              v-for="(party, idx) in parties"
              :key="idx"
              class="party-item"
            >
              <img
                class="party-logo"
                :src="party.logo"
                :alt="party.name"
                @click="goToPartyContributionPage(party.name)"
                style="cursor: pointer"
              />
              <p>{{ party.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LawDetail',
  data() {
    return {
      law: {
        id: '2126589',
        title: '정치자금법 일부개정법률안(정치개혁특별위원장)',
        representative: '박광원',
        receiptDate: '2024-02-29',
        result: '원안 가결',
        proposalReason: `벌칙조항에서 인용하는 조문의 조 제목을 추가함.
또한, 제22대 국회의원선거를 앞두고 지역구국회의원예비후보자후원회의 등록과 예비 후보자 및 그 후원회의 회계책임자의 신고가 이루어졌으나, 「공직선거법」 이 개정되어 국회의원지역선거구의 선거구역이 변경된 경우 기존의 등록 및 신고에 대한 경과조치 를 두어 해당 후원회 등의 변경 등록 및 신고를 하지 않도록 함으로써 예비후보자 등의 편의를 도모하고 행정의 효율성을 제고하려는 것임. 벌칙조항에서 인용하는 조문의 조 제목을 추가함.`,
        mainContent: `가. 벌칙조항에서 인용하는 조문의 조 제목을 추가함(안 제49조제2항제8호).
나. 2024년 4월 10일 실시하는 국회의원선거에서 국회의원지역선거구구역표 개정에 따 라 선거구역이 변경된 국회의원지역구의 관할 선거관리위원회에 등록 또는 신고된 지 역구국회의원예비후보자후원회 또는 예비후보자 및 그 후원회의 회계책임자는 이 법 시행 당시 관할 선거관리위원회에 등록 또는 신고된 것으로 봄(안 부칙 제2조 및 제3조).`,
      },
      processSteps: ['접수', '소관위 심사', '본회의 심의', '공포'],
      currentProcessIndex: 2,
      relatedKeywords: ['치매환자', '노인', '가족', '문화생활', '영화', '극장', '여가'],
      parties: [
        { name: '더불어민주당', logo: 'https://placehold.co/600x400' },
      ],
    };
  },
  methods: {
    isStepCompleted(index) {
      return index <= this.currentProcessIndex;
    },
    goToOriginalLink() {
      window.open('', '_blank');
    },
    goToKeywordPage(keyword) {
      // ★ 파라미터 이름을 name으로 변경 (router index.js와 일치)
      this.$router.push({ name: 'Keyword', params: { name: keyword } });
    },
    goToPartyContributionPage(partyName) {
      // ★ 파라미터 이름을 name으로 변경 (router index.js와 일치)
      this.$router.push({ name: 'PartyContribution', params: { name: partyName } });
    },
  },
};
</script>

<style scoped>
/* 스타일은 그대로 유지 */
.law-detail {
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.law-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.process-status {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.process-step {
  padding: 8px 15px;
  border-radius: 20px;
  font-weight: 600;
  color: white;
  background-color: #ccc;
  user-select: none;
}

.process-step.completed {
  background-color: #007bff;
}

.content-wrapper {
  display: flex;
  gap: 30px;
}

.law-info-block {
  flex: 2;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
}

.law-info-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 25px;
}

.law-info-table th,
.law-info-table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.law-info-table th {
  background-color: #f0f0f0;
  width: 150px;
}

.proposal-content h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.proposal-content h3 {
  margin-top: 15px;
  margin-bottom: 8px;
}

.proposal-content p {
  font-size: 15px;
  line-height: 1.5;
  white-space: pre-line;
}

.more-link {
  margin-top: 20px;
  font-weight: 700;
  color: #007bff;
  cursor: pointer;
  user-select: none;
  width: fit-content;
}

.side-blocks {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.related-keywords h3 {
  margin-bottom: 10px;
  font-weight: 600;
}

.keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.keyword {
  background-color: #e1ecf4;
  color: #39739d;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.party-contribution-block h3 {
  margin-bottom: 15px;
  font-weight: 600;
}

.party-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.party-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.party-logo {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}
</style>
