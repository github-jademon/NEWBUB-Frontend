<template>
  <div class="law-page page">
    <div class="title" @click="goToLawPage()" style="cursor: pointer">LAW</div>

    <div class="content">
      <div class="item">
        <div class="text">
          <div>찾고 싶은 법안을</div>
          <div>쉽고 빠르게 검색해보세요</div>
        </div>
        <!-- 🔍 검색창 -->
        <div class="search-box">
          <label>
            <input
              v-model="searchQuery"
              @keyup.enter="goToSearch"
              type="text"
              placeholder="제목 또는 키워드를 입력하세요"
            />
            <button @click="goToSearch">
              <img src="@/assets/ic-search.png" />
            </button>
          </label>
        </div>
      </div>

      <div class="content-img">
        <img src="@/assets/lawImg.png" />
      </div>
    </div>

    <!-- 📋 법안 리스트 -->
    <div class="sub-title">
      <div class="img">
        <img src="@/assets/ic-law.png" />
      </div>
      <span>법안 처리 현황</span>
    </div>

    <div class="table">
      <div class="table-head">
        <div class="table-row">
          <div class="col-number table-item">번호</div>
          <div class="col-title table-item">법안명</div>
          <div class="col-status table-item">처리 현황</div>
        </div>
      </div>
      <div class="table-body">
        <div
          class="table-row"
          v-for="(law, index) in filteredLaws"
          :key="index"
          @click="goToLawDetail(law.id)"
          style="cursor: pointer"
        >
          <div class="col-number table-item">
            <div>{{ index + 1 }}</div>
          </div>
          <div class="col-title table-item">
            {{ law.name }}
          </div>
          <div class="col-status table-item">
            <div
              :style="{
                backgroundColor:
                  colorList[law.processing_status - 1].background,
                color: colorList[law.processing_status - 1].font,
              }"
            >
              <!-- <div> -->
              {{
                ["접수", "소관위 처리", "법사위 처리", "본회의 처리", "공포"][
                  law.processing_status - 1
                ]
              }}
            </div>
          </div>
        </div>
        <div class="law-none" v-if="lawList.length == 0">법안이 없습니다.</div>

        <!-- 더보기 버튼 -->
        <div class="load-more" v-if="hasMore == true">
          <button @click="clickLoadMore">더보기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { goToSearchFromCommon } from "@/functions/common";
import { fetchLawListData } from "@/functions/fetch";
import { useRoute } from "vue-router";
import { goToLawPage, goToLawDetail } from "@/functions/goToLink";

export default {
  name: "LawPage",
  setup() {
    const route = useRoute();
    const searchQuery = ref(route.query.q || ""); // 사용자가 입력한 검색어
    const page = ref(1); // 현재 페이지
    const hasMore = ref(false); // 더보기 여부
    const lawList = ref([]); // 뉴스 리스트
    const colorList = [
      {
        // 접수
        background: "#EEF5FF",
        font: "#5097F2",
      },
      {
        // 소관위
        background: "#045DCF",
        font: "#FFFFFF",
      },
      {
        // 법사위
        background: "#EEF5FF",
        font: "#5097F2",
      },
      {
        // 본회의
        background: "#045DCF",
        font: "#FFFFFF",
      },
      {
        // 공포
        background: "#EEF5FF",
        font: "#5097F2",
      },
    ];

    const clickLoadMore = () => {
      if (hasMore.value) page.value += 1;
      loadMore();
    };

    const filteredLaws = computed(() => {
      let filtered = lawList.value;

      return filtered;
    });

    const loadMore = () => {
      fetchLawListData(
        page.value,
        searchQuery.value,
        (newLawList) => {
          lawList.value = [...lawList.value, ...newLawList];
        },
        (more) => {
          hasMore.value = more; // 더 이상 데이터가 없으면 false
        }
      );
    };

    // 검색어로 뉴스 필터링
    const goToSearch = () => {
      goToSearchFromCommon(
        "/law",
        searchQuery.value,
        (newLawList) => {
          lawList.value = newLawList;
        },
        loadMore
      );
    };

    // 최초 마운트 시 데이터 불러오기
    onMounted(() => {
      loadMore();
    });

    return {
      searchQuery,
      lawList,
      loadMore,
      filteredLaws,
      hasMore,
      page,
      goToSearch,
      goToLawDetail,
      colorList,
      goToLawPage,
      clickLoadMore,
    };
  },
};
</script>

<style src="@/css/Law.css" scoped></style>
