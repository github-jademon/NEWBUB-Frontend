<template>
  <div class="law-page">
    <div class="law-title">LAW</div>

    <div class="law-content">
      <div class="law-item">
        <div class="law-text">
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
              placeholder="키워드를 입력하세요"
            />
            <button @click="goToSearch">
              <img src="../assets/ic-search.png" />
            </button>
          </label>
        </div>
      </div>

      <div class="law-img">
        <img src="../assets/lawImg.png" />
      </div>
    </div>

    <!-- 📋 법안 리스트 -->
    <div class="law-sub-title">
      <img src="../assets/ic-law.png" />
      <span></span>법안 처리 현황
    </div>

    <div class="law-table">
      <div class="law-table-head">
        <div class="law-table-row">
          <div class="col-number law-table-item">번호</div>
          <div class="col-title law-table-item">법안명</div>
          <div class="col-status law-table-item">처리 현황</div>
        </div>
      </div>
      <div class="law-table-body">
        <div
          class="law-table-row"
          v-for="(law, index) in filteredLaws"
          :key="index"
        >
          <div class="col-number law-table-item">
            <div>{{ index + 1 }}</div>
          </div>
          <div class="col-title law-table-item" @click="goToLawDetail(law.id)">
            {{ law.name }}
          </div>
          <div class="col-status law-table-item">
            <div
              :style="{
                backgroundColor:
                  colorList[law.processing_status - 1].background,
                color: colorList[law.processing_status - 1].font,
              }"
            >
              <!-- <div> -->
              {{
                ["접수", "소관위 처리", "법사위처리", "본회의 처리", "공포"][
                  law.processing_status - 1
                ]
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 더보기 버튼 -->
    <div class="load-more" v-if="hasMore == true">
      <button @click="loadMore">더보기</button>
    </div>
  </div>
</template>

<!-- <script>
export default {
  name: "LawPage",
  data() {
    return {
      searchQuery: this.$route.query.q || "",
      page: 1,
      hasMore: true,
      laws: [
        // 예시 데이터 10개
        // ...Array.from({ length: 10 }, (_, i) => ({
        //   name: `법안 ${i + 1} - 예시법안 제목`,
        //   processing_status: [(i % 5) + 1],
        //   id: i,
        // })),
      ],
    };
  },
  created() {
    // 컴포넌트가 마운트될 때 데이터를 불러옵니다.
    this.fetchLawsData();
  },
  computed: {
    visibleLaws() {
      return this.laws;
    },
  },
  methods: {
    fetchLawsData() {
      const data = async () => {
        try {
          const response = await fetch(
            `/api/laws?page=${this.page}&q=${this.searchQuery}`,
            {
              method: "GET",
              credentials: "include",
            }
          );
          const result = await response.json();

          return result;
        } catch (error) {
          console.log("error:", error);
          this.laws = [...this.laws];
          this.hasMore = false;
        }
      };

      data().then((response) => {
        console.log(response);

        this.laws = [...this.laws, ...response.data];
        console.log(this.laws);

        this.hasMore = response.has_more;

        if (response.hasMore == true) {
          this.page += 1;
        }
      });
    },
    goToSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: "/law",
          query: { q: this.searchQuery },
        });
        this.laws = [];
        this.fetchLawsData();
      }
    },
  },
};
</script> -->

<script>
import { ref, computed, onMounted } from "vue";
import { goToSearchFromCommon } from "../functions/common";
import { fetchLawData } from "../functions/fetch";

const exampleData = {
  has_more: false,
  data: [
    {
      id: 1,
      name: "법안1",
      processing_status: 2,
      processing_result: "임기만료폐기",
      date: "2025-06-05",
      keywords: ["키워드1", "키워드2"],
    },
    {
      id: 2,
      name: "법안2",
      processing_status: 3,
      processing_result: "원안가결",
      date: "2025-06-05",
      keywords: ["키워드2", "키워드3"],
    },
    {
      id: 19,
      name: "법안19",
      processing_status: 5,
      processing_result: "임기만료폐기",
      date: "2025-06-05",
      keywords: ["키워드19", "키워드20"],
    },
  ],
};

export default {
  name: "LawPage",
  setup() {
    const searchQuery = ref(""); // 사용자가 입력한 검색어
    const page = ref(1); // 현재 페이지
    const hasMore = ref(true); // 더보기 여부
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

    // filteredNews는 searchQuery와 selectedCategory에 따라 필터링된 뉴스
    const filteredLaws = computed(() => {
      let filtered = lawList.value;

      console.log(filtered);

      return filtered;
    });

    // 뉴스 더보기 함수
    const loadMore = () => {
      fetchLawData(
        page.value,
        searchQuery.value,
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
      if (lawList.value.length == 0) {
        lawList.value = exampleData.data;
        hasMore.value = exampleData.has_more;
      }
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

    // 뉴스 상세 페이지로 이동
    const goToKeyword = (name) => {
      window.location.href = `/keyword/${name}`;
    };

    const goToLawDetail = (id) => {
      window.location.href = `/law-detail?id=${id}`;
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
      goToKeyword,
      goToLawDetail,
      colorList,
    };
  },
};
</script>

<style src="../css/Law.css" scoped></style>
