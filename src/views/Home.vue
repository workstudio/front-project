<template>
  <div class="container">
    <nav class="nav-header">
      <header>
        <a onclick="javascript: void(0)" class="brand">王灿书屋</a>
        <a href="javascript: void(0);" class="avatar"></a>
      </header>
      <div class="swipe">
        <mt-swipe :auto="5000">
          <mt-swipe-item><img src="../assets/vbook/images/1.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="../assets/vbook/images/2.jpg" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
    </nav>
    <nav class="home-nav">
      <a class="guide-nav-div" v-for="item in type" :href="item.path" >
        <i class="icon icon-sort"></i>
        <h4 class="guide-nav-h">{{item.word}}</h4>
      </a>
    </nav>
    <div v-if="!loading">
      <recommend :recommendDatas="bookIndexDatas"></recommend>
      <book-list :bookDatas="bookTagNavDatas"></book-list>
    </div>
    <loading v-show="loading"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
//import Common from 'assets/js/utils.js';
require('animate.css');
import {mapState, mapGetters} from "vuex";

import Recommend from './common/Recommend.vue'
import BookList from './common/BookList.vue'
import Loading from './common/Loading.vue'
import {model} from '@/components/model';

export default {
  components: {
    Recommend,
    BookList,
    Loading
  },
  'mixins': [model],
  data() {
    return {
      type: [
        {path: '/book/list', word: '书单'},
        {path: '/figure/list', word: '作者'},
        {path: '/tag/list', word: '标签'},
        {path: '/tag-学术', word: '学术'},
        {path: 'http://wiki.acanstudio.com', word: '百科'}
      ],
      bookTagNavDatas: {},
      bookIndexDatas: {},
      loading: true,
    }
  },
  mounted() {
    this.bookModel.$fetch({params: {action: 'index-datas'}})
    this.tagModel.$fetch({params: {action: 'nav-datas'}})
  },
  computed: {
    ...mapState({
      bookModel: state => state.baseData.cDatabases.Book,
      tagModel: state => state.baseData.cDatabases.BookTag,
    }),
    bookTagRequest() {
      return this.remoteRequest(this.tagModel, 'navdatas');
    },
    bookIndexRequest() {
      return this.remoteRequest(this.bookModel, 'indexdatas');
    },
  },
  created() {
    this.loading = false // 获取数据完成后隐藏loading
  },
  filters: {
    hot(value) {
      if (!value) return ''
      var arr = []
      value.forEach((item, index) => {
        if (index < 20) { if (index % 2 === 1) { arr.push(item) } }
      })
      return arr
    },
  },
  watch: {
    bookTagRequest(val, oldVal) {
      let rDatas = this.watchCommon(val, this.tagModel, 'navdatas');
      this.bookTagNavDatas = rDatas;
    },
    bookIndexRequest(val, oldVal) {
      let rDatas = this.watchCommon(val, this.bookModel, 'indexdatas');
      this.bookIndexDatas = rDatas;
    },
  },
}
</script>

<style lang="less" type="text/less">
@import '../assets/vbook/css/reset.css';
.container {
  background-color: #f6f7f9;
}

.nav-header {
  header {
    display: flex;
    height: 45px;
    padding: 0 15px;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    /*text-indent: -8888px;*/
    .brand {
      width: 100px;
      /*background: url(../assets/vbook/images/logo-qdm.0.50.svg) no-repeat left;*/
      background-size: 100%;
    }
    .avatar {
      width: 24px;
      height: 24px;
      background: url(../assets/vbook/images/avatar.png) no-repeat center;
      background-size: 100%;
    }
  }
}

.home-nav {
  display: flex;
  padding: 10px 0;
  margin: 10px 0;
  background-color: #fff;
  .guide-nav-div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > i {
      width: 24px;
      height: 24px;
      background-image: url(../assets/vbook/images/sprite.0.50.png);
    }
    &:nth-of-type(1) {
      i {
        background-position: -63px -28px;
      }
    }
    &:nth-of-type(2) {
      i {
        background-position: 0 0;
      }
    }
    &:nth-of-type(3) {
      i {
        background-position: 0 -30px;
      }
    }
    &:nth-of-type(4) {
      i {
        background-position: 0 -60px;
      }
    }
    &:nth-of-type(5) {
      i {
        background-position: -30px -30px;
      }
    }
  }
}

.swipe {
  height: 170px;
  img {
    width: 100%;
  }
}
</style>
