<template>
  <div id="app" class="container">
    <!-- 왼쪽 사이드바 -->
    <aside class="sidebar">
      <h2>NEWB 대시보드</h2>

      <!-- 홈 버튼: 활성화 스타일 없음 -->
      <router-link
        to="/issue"
        class="nav-link home-link"
        exact-active-class=""
        aria-label="Home"
      >
        🏠
      </router-link>

      <router-link to="/issue" class="nav-link">
        ISSUE
      </router-link>
      <router-link to="/law" class="nav-link">
        LAW
      </router-link>
      <router-link to="/party" class="nav-link">
        POLITICAL PARTY
      </router-link>
      <router-link to="/news" class="nav-link">
        NEWS LIST
      </router-link>
    </aside>

    <!-- 오른쪽 페이지 내용 -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
/* 전체를 좌우로 나눔 */
.container {
  display: flex;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

/* 왼쪽 사이드바 스타일 */
.sidebar {
  width: 200px;
  background-color: #f4f6f8;
  padding: 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* 사이드바 제목 스타일 */
.sidebar h2 {
  margin: 0 0 16px 0;
  font-weight: bold;
  font-size: 1.2em;
  color: #333;
}

/* 사이드바 링크 기본 스타일 */
.nav-link {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  padding-left: 4px;
}

/* 선택된 메뉴에 스타일 적용 */
.nav-link.router-link-exact-active {
  color: #1976d2;
  border-left: 4px solid #1976d2;
  padding-left: 8px;
  background-color: #eaf1fb;
}

/* 홈 버튼은 활성화 스타일 없음 */
.home-link.router-link-exact-active {
  color: inherit;
  border: none;
  padding-left: 4px;
  background-color: transparent;
  font-weight: bold;
}

/* 오른쪽 페이지 내용 스타일 */
.content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  text-align: left;
}
</style>
