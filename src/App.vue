<template>
  <div id="app" class="container">
    <!-- 상단 헤더 바 (router-link로 변경해서 클릭 시 /issue로 이동) -->
    <router-link to="/issue" class="topbar" aria-label="Go to ISSUE tab">
      NEWBUB
    </router-link>

    <!-- 사이드바 + 페이지 컨텐츠 영역 -->
    <div class="main-container">
      <aside class="sidebar">
        <!-- 사이드바 제목은 헤더로 옮겼으니 삭제 -->
        <!-- <h2>NEWB 대시보드</h2> -->

        <!-- 홈 버튼: 활성화 제거 -->
        <!-- <router-link
          to="/issue"
          class="nav-link home-link"
          exact-active-class=""
          aria-label="Home"
        >
          🏠
        </router-link> -->

        <router-link to="/issue" class="nav-link"> ISSUE </router-link>
        <router-link to="/law" class="nav-link"> LAW </router-link>
        <router-link to="/party" class="nav-link">
          POLITICAL PARTY
        </router-link>
        <router-link to="/news" class="nav-link"> NEWS LIST </router-link>
      </aside>

      <!-- 오른쪽 페이지 내용 -->
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
/* 전체 세로 방향 flex 컨테이너 */
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* 상단 바 스타일 - 사이드바 색상과 같게 */
.topbar {
  background-color: #f4f6f8;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-weight: bold;
  font-size: 1.2em;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  user-select: none;
  text-decoration: none; /* 링크 기본 밑줄 제거 */
  color: #2c3e50; /* 링크 색상 */
  cursor: pointer;
  display: flex;
  align-items: center;
}

/* 헤더 밑 메인 컨테이너: 사이드바 + 컨텐츠 가로 flex */
.main-container {
  flex: 1;
  display: flex;
  overflow: hidden; /* 세로 스크롤은 content에서만 */
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
