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
          <th>#</th>
          <th>법안명</th>
          <th>처리 현황</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(law, index) in laws" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ law.name }}</td>
          <td>{{ law.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LawPage',
  data() {
    return {
      searchQuery: '',
      laws: [
        { name: '디자인보호법 일부개정법률안(대안)', status: '접수' },
        { name: '전기안전관리법 일부개정법률안(대안)', status: '공포' },
        { name: '도로교통법 일부개정법률안', status: '의결' },
        { name: '공공기관 운영에 관한 법률안', status: '계류' },
      ]
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
    }
  }
}
</script>

<style scoped>
.law-page {
  max-width: 800px;
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
</style>
