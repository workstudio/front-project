<template>
  <div class="store-home">
    <search-bar @getRandom="getRandom"></search-bar>
    <flap-card :randomBook="randomBook"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll" :bottom="50">
      <div class="banner-wrapper">
        <swiper
          class="banner-swiper"
          :options="swiperOption"
          ref="mySwiper"
          v-if="bannerList.length>0"
        >
          <swiper-slide v-for="item in bannerList" :key="item.id">
            <div class="banner-img" :style="`backgroundImage:url(${item.url})`"></div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <recommend :data="recommend"></recommend>
      <!--<featured :data="featured" :titleText="$t('home.featured')" :btnText="null"></featured>-->
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book class="category-book" :data="item"></category-book>
      </div>
      <guess-you-like :data="guessYouLike"></guess-you-like>
    </scroll>
  </div>
</template>

<script>
import { Grid, Image, GridItem } from 'vant';
import guessYouLike from "../../components/home/guessYouLike";
import recommend from "../../components/home/recommend";
import featured from "../../components/home/featured";
import categoryBook from "../../components/home/categoryBook";
import SearchBar from "../../components/home/SearchBar";
import flapCard from "../../components/home/flapCard";
import Scroll from "../../components/common/Scroll";
import { StoreHomeMixin } from "../../mixins/home";
//import { homeApi } from "@/api/home";
import {fetchData} from '@/applications/mixins/fetchData';

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "StoreHome",
  mixins: [StoreHomeMixin, fetchData],
  components: {
    Grid,
    GridItem,
    Image,
    SearchBar,
    Scroll,
    flapCard,
    guessYouLike,
    recommend,
    featured,
    categoryBook,
    swiper,
    swiperSlide
  },
  props: {},
  data() {
    return {
      scrollTop: 94,
      random: null,
      bannerList: [
        {"id": 1,"url":"http://ossfile.canliang.wang/book/common/adb4b3ec-8661-4587-b0ed-207ecdda1503.jpeg"},
        {"id": 2,"url":"http://ossfile.canliang.wang/book/common/c7a2349d-a812-467d-83f5-3812b5a03c7e.jpeg"},
        {"id": 3,"url":"http://ossfile.canliang.wang/book/common/47649c76-c8a3-4dc9-8247-3d29ea07ec09.jpeg"},
        {"id": 4,"url":"http://ossfile.canliang.wang/book/common/a9baadff-cce2-4192-9bef-d37c62fdc594.jpeg"},
      ],
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null,
      randomBook: null,
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination"
        }
      },
      swiper: null
    };
  },
  watch: {},
  computed: {
    // swiper() {
    //   this.$nextTick(() => {
    //     return this.$refs.mySwiper.swiper;
    //   });
    // }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY);
      this.setHomeOffsetY(offsetY);
      if (offsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
    },

    getRandom() {
      const randomIndex = Math.floor(Math.random() * this.random.length);
      this.randomBook = this.random[randomIndex];
    },

    //返回之前的滚动位置
    reset() {
      if (this.homeOffsetY > 0) {
        this.scrollTop = 52;
      } else {
        this.scrollTop = 94;
      }
      this.$refs.scroll.refresh();
      this.$nextTick(() => {
        this.$refs.scroll.scrollTo(0, this.homeOffsetY);
      });
    },
    getList() {
      this.listLoading = true
      this.fetchRequest(this.getModel('culture', 'book'), {query: {}, params: {action: 'home'}}).then(response => {
        const data = response.data;
        //this.random = data.positionBooks.reading;
        //this.bannerList = data.banner;
        this.guessYouLike = data.positionBooks.reading.books;
        this.recommend = data.positionBooks.favor.books;
        this.featured = data.positionBooks.favor.books;
        this.categoryList = data.navBooks;
        /*this.$nextTick(() => {
          this.swiper = this.$refs.mySwiper.swiper;
        });*/


        this.positionBooks = response.data.positionBooks;
        this.navBooks = response.data.navBooks;
      })
    },
  },
  created() {
    this.getList()
  },
  mounted() {
    /*homeApi().then(response => {
      if (response && response.status === 200) {
        const data = response.data;
        this.random = data.random;
        this.bannerList = data.banner;
        this.guessYouLike = data.guessYouLike;
        this.recommend = data.recommend;
        this.featured = data.featured;
        this.categoryList = data.categoryList;
        this.$nextTick(() => {
          this.swiper = this.$refs.mySwiper.swiper;
        });
      }
    });*/
  },
  activated() {
    this.reset();
  },
  deactivated() {}
};
</script>
<style lang="scss" scoped>
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    padding: 10px;
    height: 150px;
    box-sizing: border-box;
    .banner-img {
      width: 100%;
      height: 130px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .category-book {
    margin: 20px 0;
  }
}
</style>
