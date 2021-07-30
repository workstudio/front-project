<template>
  <div class="classify-main">
    <title-view
      :class="`${isShadow ? 'isShadow' : ''}`"
      :label="$t('home.category')"
      :btn="$t('home.seeAll')"
      @onClick="showBookList"
    ></title-view>
    <scroll :top="48" :bottom="50" @onScroll="onScroll">
      <category class="category" :data="categories"></category>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll";
import TitleView from "@/components/home/title";
//import { classifyListApi } from "@/api/classify.js";
import Category from "@/components/classify/category";
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  name: "Classify",
  mixins: [fetchData],
  components: {
    Category,
    TitleView,
    Scroll,
  },
  props: {},
  data() {
    return {
      categories: [],
      isShadow: false,
    };
  },
  created() {
    this.continueShow("请稍等...");
    /*classifyListApi().then((res) => {
      this.categories = res.data.data;
      this.toastHide();
    });*/
    this.getList();
  },
  methods: {
    onScroll(offsetY) {
      if (offsetY > 20) {
        this.isShadow = true;
      } else {
        this.isShadow = false;
      }
    },
    showBookList() {
      this.$router.push({
        name: "bookList",
      });
    },
    getList() {
      this.fetchRequest(this.getModel('culture', 'category'), {query: {}, params: {action: 'home'}}).then(response => {
        const data = response.data;
        console.log(data);
        this.categories = data;
        this.toastHide();
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.classify-main {
  height: 100%;
}
.isShadow {
  box-shadow: 0 0 5px #ccc;
}
</style>
