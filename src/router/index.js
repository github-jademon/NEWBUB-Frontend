// src/router/index.js

import { createRouter, createWebHistory } from "vue-router";

// 📌 페이지 컴포넌트 import
import Issue from "@/views/Issue.vue"; // ✅ 이슈 키워드 페이지
import Keyword from "@/views/Keyword.vue"; // ✅ 키워드 상세 페이지
import Law from "@/views/Law.vue";
import LawDetail from "@/views/LawDetail.vue";
import Party from "@/views/Party.vue";
import PartyDetail from "@/views/PartyDetail.vue";
import PartyContribution from "@/views/PartyContribution.vue";
import NewsList from "@/views/NewsList.vue";
import NewsDetail from "@/views/NewsDetail.vue";

const routes = [
  { path: "/", redirect: "/issue" },

  { path: "/issue", name: "Issue", component: Issue },
  { path: "/keyword/:name", name: "Keyword", component: Keyword },

  { path: "/law", name: "Law", component: Law },
  { path: "/law-detail/:id(.*)*", name: "LawDetail", component: LawDetail },

  { path: "/party", name: "Party", component: Party },
  {
    path: "/party-detail",
    name: "PartyDetail",
    component: PartyDetail,
  },
  {
    path: "/party-contribution/:id(.*)*",
    name: "PartyContribution",
    component: PartyContribution,
  },

  { path: "/news", name: "NewsList", component: NewsList },
  { path: "/news-detail/:id(.*)*", name: "NewsDetail", component: NewsDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
