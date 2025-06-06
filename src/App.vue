<template>
  <div id="app" class="container">
    <!-- 사이드바 + 페이지 컨텐츠 영역 -->
    <div class="main-container">
      <aside class="header">
        <!-- 상단 헤더 바 (router-link로 변경해서 클릭 시 /issue로 이동) -->
        <div class="header-content">
          <div class="logo">
            <router-link
              to="/issue"
              class="topbar"
              aria-label="Go to ISSUE tab"
            >
              <!-- NEWBUB -->
              <img src="./assets/logo.png" />
            </router-link>
          </div>
          <div class="sidebar">
            <router-link to="/issue" class="nav-link">
              <div class="icon"><img src="./assets/issue_icon.png" /></div>
              <span>ISSUE</span>
            </router-link>
            <router-link to="/law" class="nav-link">
              <div class="icon"><img src="./assets/law_icon.png" /></div>
              <span>LAW</span>
            </router-link>
            <router-link to="/party" class="nav-link">
              <div class="icon"><img src="./assets/party_icon.png" /></div>
              <span>POLITICAL PARTY</span>
            </router-link>
            <router-link to="/news" class="nav-link">
              <div class="icon"><img src="./assets/news_icon.png" /></div>
              <span>NEWS LIST</span>
            </router-link>
          </div>
        </div>
        <div class="copyright">
          <div>저작권 안내</div>
          <div>
            본 서비스는 국회사무처의 열린국회정보 Open API에서 제공되는
            공공데이터를 활용합니다.
            <br />
            (공공누리 제1유형)
          </div>
          <div>데이터의 저작권은 국회사무처에 있습니다.</div>
        </div>
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
