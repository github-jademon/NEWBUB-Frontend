<template>
  <div class="news-page page">
    <div class="title">
      <span @click="goToNewsListPage()" style="cursor: pointer">NEWS LIST</span>
      <span class="img"><img src="@/assets/shape.png" /></span>
      <span
        class="title-item"
        v-for="(item, idx) in news.categories"
        :key="idx"
        @click="goToNewsListPage(item)"
        style="cursor: pointer"
      >
        <span>{{ item }}</span>
        <span v-if="checkLine(idx + 1)" class="newslist-line"
          ><img src="@/assets/line.png"
        /></span>
      </span>
    </div>

    <div class="news-detail">
      <!-- 콘텐츠 좌우 배치 -->
      <div class="main-content-wrapper">
        <div class="main-content-wrapper2">
          <!-- 왼쪽 주요 뉴스 내용 -->
          <div class="news-main-block">
            <h1 class="news-title">{{ news.title }}</h1>
            <div class="news-meta">
              <span>
                <span class="news-item">
                  <span v-if="idx > 0" style="width: 5px">, </span>
                  <span>{{ news.author }}</span>
                </span>
              </span>
              <span>{{ news.date }}</span>
            </div>

            <div class="news-image" v-if="news.img">
              <img :src="news.img" />
            </div>

            <p class="news-text" v-html="text"></p>

            <div class="more-link" @click="goToOriginalLink(news.link)">
              뉴스 자세히 보기 &gt;
            </div>
          </div>
          <!-- 카테고리 관련 뉴스 -->

          <div v-for="(items, index) in newsList" :key="index">
            <div class="related-news-section">
              <h3 @click="goToNewsListPage(index)" style="cursor: pointer">
                <strong>{{ index }}</strong>
                <span> 관련 뉴스 더보기</span>
              </h3>
              <div :class="[items.length == 0 ? 'news-none' : '']">
                <span v-if="newsList.length != 0" class="related-news-list">
                  <div
                    class="related-news-item"
                    v-for="(item, idx) in items"
                    :key="idx"
                    @click="goToNewsDetail(item.id)"
                    style="cursor: pointer"
                  >
                    <img :src="item.img" class="related-news-image" />
                    <div class="related-news-info">
                      <p class="related-news-title">{{ item.title }}</p>
                      <p class="related-news-meta">{{ item.date }}</p>
                    </div>
                  </div>
                </span>
                <span v-if="items.length == 0" class="related-news-item">
                  뉴스가 없습니다.
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 오른쪽 사이드 블럭 -->
        <div class="side-blocks">
          <!-- 연관 키워드 -->
          <div class="related-keywords">
            <h3>연관 키워드</h3>
            <div class="keywords">
              <span
                v-for="(kw, idx) in news.keywords"
                :key="idx"
                class="keyword"
                @click="goToKeywordPage(kw)"
              >
                # {{ kw }}
              </span>
            </div>
          </div>

          <!-- 관련 법안 -->
          <div class="related-laws">
            <h3>법안</h3>
            <div class="law-items">
              <div
                class="law-item"
                v-for="(law, idx) in lawList"
                :key="idx"
                @click="goToLawDetail(law.id)"
                style="cursor: pointer"
              >
                {{ law.name }}
              </div>
              <div class="law-none" v-if="lawList.length == 0">
                법안이 없습니다.
              </div>
              <div class="more-law-button" v-if="hasMore" @click="loadMoreLaws">
                법안 더보기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  fetchNewsData,
  fetchNewsListData,
  fetchRelationLawListData,
} from "@/functions/fetch";
import {
  goToOriginalLink,
  goToLawDetail,
  goToNewsDetail,
  goToNewsListPage,
  goToKeywordPage,
} from "@/functions/goToLink";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default {
  name: "NewsDetail",
  setup() {
    const route = useRoute();
    const newsId = ref(route.params.id || "");
    const news = ref({});
    const newsList = ref({});
    const lawList = ref([]);
    const page = ref(1);
    const hasMore = ref(false);

    const text = computed(() => {
      return (news.value?.text?.slice(0, 400) + "..." ?? "").replace(
        /\\n/g,
        "<br>"
      );
    });

    const checkLine = (idx) => {
      return idx < news.value.categories.length;
    };

    const loadData = async () => {
      await fetchNewsData(newsId.value, (newNews) => {
        news.value = newNews;
      });
    };

    const loadNewsListData = () => {
      for (const i in news.value.categories) {
        fetchNewsListData(
          1,
          "",
          news.value.categories[i],
          (newNews) => {
            newsList.value[news.value.categories[i]] = newNews;
          },
          null,
          4
        );
      }
    };

    const loadMoreLaws = () => {
      fetchRelationLawListData(
        page.value,
        news.value.keywords,
        (newPage) => {
          page.value = newPage;
        },
        (newLawList) => {
          lawList.value = [...lawList.value, ...newLawList];
        },
        (more) => {
          hasMore.value = more; // 더 이상 데이터가 없으면 false
        }
      );
    };

    onMounted(async () => {
      await loadData();
      await loadNewsListData();
      // await loadMoreLaws();
    });

    return {
      news,
      newsList,
      lawList,
      hasMore,
      page,
      goToNewsListPage,
      goToKeywordPage,
      goToNewsDetail,
      goToLawDetail,
      loadMoreLaws,
      goToOriginalLink,
      text,
      checkLine,
    };
  },
};
</script>

<style src="@/css/NewsDetail.css" scoped></style>
