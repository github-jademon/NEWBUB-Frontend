// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router'

// 📌 페이지 컴포넌트 import
import Issue from '@/views/Issue.vue'   // ✅ 이슈 키워드 페이지 추가
import Keyword from '@/views/Keyword.vue'               // ✅ 키워드 페이지 추가

import Law from '@/views/Law.vue'
import LawDetail from '@/views/LawDetail.vue'
import Party from '@/views/Party.vue'
import PartyDetail from '@/views/PartyDetail.vue'
import PartyContribution from '@/views/PartyContribution.vue'
import NewsList from '@/views/NewsList.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import IssueSearch from '@/views/IssueSearch.vue'
import LawSearch from '@/views/LawSearch.vue'
import NewsSearch from '@/views/NewsSearch.vue'

const routes = [
  { path: '/', redirect: '/issue' },
  { path: '/issue', component: Issue }, // ✅ 이슈 키워드
  { path: '/keyword/:name', name: 'Keyword', component: Keyword },                 // ✅ 키워드 상세
  { path: '/law', component: Law },
  { path: '/law-detail', name: 'LawDetail', component: LawDetail },
  { path: '/party', component: Party },
  { path: '/party-detail', name: 'PartyDetail', component: PartyDetail },
  { path: '/party-contribution', component: PartyContribution },
  { path: '/news', component: NewsList },
  { path: '/news-detail', component: NewsDetail },
  { path: '/issue-search', component: IssueSearch },
  { path: '/law-search', component: LawSearch },
  { path: '/news-search', component: NewsSearch },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
