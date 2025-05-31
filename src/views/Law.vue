<template>
  <div class="law-page">
    <h1>LAW</h1>

    <!-- 🔍 검색창 -->
    <div class="search-box">
      <input
        v-model="searchQuery"
        @keyup.enter="goToSearch"
        type="text"
        placeholder="법안명을 입력하세요"
      />
      <button @click="goToSearch">검색</button>
    </div>

    <!-- 📋 법안 리스트 -->
    <table class="law-table">
      <thead>
        <tr>
          <th class="col-number">#</th>
          <th class="col-title">법안명</th>
          <th class="col-status">처리 현황</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(law, index) in visibleLaws" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <router-link :to="{ name: 'LawDetail', params: { id: index + 1 } }">
              {{ law.name }}
            </router-link>
          </td>
          <td>{{ law.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 더보기 버튼 -->
    <div class="load-more" v-if="visibleCount < laws.length">
      <button @click="loadMore">더보기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LawPage',
  data() {
    return {
      searchQuery: '',
      visibleCount: 30,
      laws: [
        // 예시 데이터 50개
        ...Array.from({ length: 50 }, (_, i) => ({
          name: `법안 ${i + 1} - 예시법안 제목`,
          status: ['접수', '소관위 심사', '본회의 심의', '공포'][i % 4]
        }))
      ]
    };
  },
  computed: {
    visibleLaws() {
      return this.laws.slice(0, this.visibleCount);
    }
  },
  methods: {
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/law-search',
          query: { q: this.searchQuery }
        });
      }
    },
    loadMore() {
      this.visibleCount += 30;
    }
  }
};
</script>

<style scoped>
.law-page {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  margin-top: 20px;
  font-size: 32px;
}

.search-box {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.search-box input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

.search-box button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}

/* 📋 법안 테이블 스타일 */
.law-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.law-table th,
.law-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}

.law-table th {
  background-color: #f2f2f2;
}

/* 📏 칼럼 크기 조정 */
.col-number {
  width: 50px;
}

.col-status {
  width: 120px;
}

.col-title {
  width: auto;
}

/* 더보기 버튼 */
.load-more {
  text-align: center;
  margin-top: 20px;
}

.load-more button {
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
}
</style>
