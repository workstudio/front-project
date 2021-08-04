<template>
  <div class="book-list-wrapper" ref="searchBox">
    <search-title
      :title="title"
      :showShelf="true"
      @back="back"
      ref="title"
    ></search-title>
    <scroll
      class="book-list-scroll-wrapper"
      :top="42"
      @onScroll="onScroll"
      ref="scroll"
    >
      <featured
        class="category-book"
        :data="list"
        :titleText="getCategoryText(key)"
        :btnText="''"
        :key="index"
      ></featured>
    </scroll>
  </div>
</template>

<script>
import SearchTitle from "@/components/detail/detaiTitle";
import Scroll from "@/components/common/Scroll";
import Featured from "@/components/home/featured";
import { realPx } from "@/utils/utils";
//import { listApi, searchBookApi, flatListApi } from "@/api/bookList";
import { categoryList, categoryText } from "@/utils/home";
import { StoreHomeMixin } from "@/mixins/home";
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  name: "BookList",
  components: {
    SearchTitle,
    Scroll,
    Featured
  },
  mixins: [StoreHomeMixin, fetchData],
  computed: {
    title() {
      if (JSON.stringify(this.list) !== "{}") {
        return this.$t("home.allBook").replace("$1", this.total);
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      titleText: ""
    };
  },
  methods: {
    getCategoryText(key) {
      return categoryText(categoryList[key], this);
    },
    back() {
      this.$router.go(-1);
    },
    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow();
      } else {
        this.$refs.title.hideShadow();
      }
    },
    /*getBookList() {
      this.continueShow("请稍等...")
      const category = this.$route.query.category;
      const keyword = this.$route.query.keyword;
      if (category) {
        listApi({ categoryName: category }).then(res => {
          this.list = res.data.data;
          this.total = res.data.total;
          this.toastHide();
        });
      } else if (keyword) {
        searchBookApi({ searchText: keyword }).then(res => {
          this.list = res.data.data;
          this.total = res.data.total;
          this.toastHide();
        });
      } else {
        flatListApi().then(res => {
          this.list = res.data.data;
          this.total = res.data.total;
          this.toastHide();
        });
      }
    },*/
    getList() {
      this.continueShow("请稍等...")
      const category = this.$route.query.category ? this.$route.query.category : '';
      const keyword = this.$route.query.keyword ? this.$route.query.keyword : '';
      this.fetchRequest(this.getModel('culture', 'book'), {query: {category: category, keyword: keyword}, params: {action: 'front-list'}}).then(response => {
        const data = response.data;
        //this.categories = data;
        this.list = data.books;
        this.total = data.total;
        this.toastHide();
      })
    },
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.book-list-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  overflow: hidden;
  .category-book {
    margin: -30px 0 50px 10px;
  }
}
</style>
