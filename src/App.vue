<template>
  <div id="app" class="container">
    <!-- 사이드바 + 페이지 컨텐츠 영역 -->
    <div class="main-container">
      <aside class="sidebar">
        <!-- 상단 헤더 바 (router-link로 변경해서 클릭 시 /issue로 이동) -->
        <router-link to="/issue" class="topbar" aria-label="Go to ISSUE tab">
          NEWBUB
        </router-link>
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

<style src="./css/App.css" scoped></style>
<style src="./css/style.css"></style>
