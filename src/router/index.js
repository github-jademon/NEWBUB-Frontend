import { createRouter, createWebHistory } from 'vue-router'

// 📌 페이지 컴포넌트 import
import Issue from '@/views/Issue.vue'
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
import Keyword from '@/views/Keyword.vue' // ✅ 키워드 페이지 import

const routes = [
  { path: '/', redirect: '/issue' }, // 홈 → /issue로 이동
  { path: '/issue', component: Issue },
  { path: '/law', component: Law },
  { path: '/law-detail', component: LawDetail },
  { path: '/party', component: Party },
  { path: '/party-detail', component: PartyDetail },
  { path: '/party-contribution', component: PartyContribution },
  { path: '/news', component: NewsList },
  { path: '/news-detail', component: NewsDetail },
  { path: '/issue-search', component: IssueSearch },
  { path: '/law-search', component: LawSearch },
  { path: '/news-search', component: NewsSearch },
  { path: '/keyword/:name', name: 'Keyword', component: Keyword }, // ✅ 키워드 페이지 라우트 추가
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
