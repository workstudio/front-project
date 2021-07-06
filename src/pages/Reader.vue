<template>
  <div id="reader" v-if="detailData.chapter">
    <top-nav></top-nav>
    <div class="read-container" :bg="reader.bg_color" :night="reader.bg_night" ref="fz_size">
      <h4>{{detailData.chapter.name}}</h4>
      <div class="chapterContent" v-show="!loading">
        <p v-for="(c,i) in formatContent(detailData.chapter.content)" :key="i">{{c}}</p>
      </div>
      <div class="btn-bar" v-show="!loading">
        <ul class="btn-tab">
          <li class="prev-btn" @click="prevChapter">上一章</li>
          <li class="next-btn" @click="nextChapter">下一章</li>
        </ul>
      </div>
    </div>
    <div class="page-up" @click="pageUp()"></div>
    <div class="click-mask" @click="clickBar"></div>
    <div class="page-down" @click="pageDown()"></div>
    <div class="top-nav-pannel-bk font-container" v-show="reader.font_panel"></div>
    <font-nav></font-nav>
    <bottom-nav></bottom-nav>
    <!--<transition name="fade">-->
    <cover :class="{hide:!reader.list_panel}"></cover>
    <list-panel :class="{show: reader.list_panel}" :cLists="detailData.book.chapters" :bookCode="detailData.book.code"></list-panel>
    <loading v-show="loading"></loading>
    <!--</transition>-->
  </div>
</template>

<script type="text/ecmascript-6">
require('animate.css');
import {mapState, mapGetters} from 'vuex'

import Loading from './common/Loading.vue'

import TopNav from './reader/TopNav'
import BottomNav from './reader/BottomNav.vue'
import FontNav from './reader/FontNav.vue'
import ListPanel from './reader/ListPanel.vue'
import Cover from './reader/Cover.vue'
//import {model} from '@/components/model';
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  //'mixins': [model],
  'mixins': [fetchData],
  components: {
    TopNav,
    BottomNav,
    FontNav,
    ListPanel,
    Cover,
    Loading
  },
  data() {
    return {
      bar: false,
      loading: false,
      bookCode: this.$route.params.code,
      curChapter: this.$route.params.id ? this.$route.params.id : 1,
      bookInfo: {},
      detailData: {},
    }
  },
  created() {
    // 当前书籍以前读过并有阅读进度
    let localBook = this.localCache.getCache('book_' + this.bookCode);
    this.$store.dispatch('reader/curChapter', this.curChapter)

    if (Object.keys(localBook).length == 0) {
      localBook = {
        curCapter: this.curChapter,
        code: this.bookCode,
        fz_size: this.reader.fz_size,
        bg_color: this.reader.bg_color,
      }
    } else {
      this.$store.dispatch('reader/fzSize', localBook.fz_size); // 阅读器文字大小
      this.$store.dispatch('reader/bgColor', localBook.bg_color); // 阅读器主题色
    }

    this.getChapterData({code: this.$route.params.code, id: this.curChapter});
    this.reader.windowHeight = window.screen.height
  },
  computed: {
    ...mapGetters({
      //detailData: 'entities/chapters/datas',
    }),
    ...mapState({
      chapterModel: state => state.baseData.cDatabases.Chapter,
      //readerModel: state => state.baseData.cDatabases.Reader,
      //reader: state => state.entities.readers,
      //reader: state => state.baseData,//entities.readers,
      reader: state => state.reader,//baseData,//entities.readers,
    }),
    /*chapterDetailRequest() {
      return this.remoteRequest(this.chapterModel, 'show');
    },*/
    readerModel() {
      return this.getModel('culture', 'reader');
    }
  },
  mountedold() {
    // 因为要获取dom元素，所以不能放到created中
    //this.$refs.fz_size.style.fontSize = this.fz_size + 'px'
  },
  methods: {
    formatContent(content) {
      return content.split('\n')
    },
    // 切换上下工具栏，如果字体面板显示点击也关闭
    clickBar() {
      this.$store.dispatch('reader/toggleBar')
      this.reader.font_panel = false
    },
    // 向上翻页
    pageUp() {
        console.log('pageUp');
      let target = document.body.scrollTop - window.screen.height - 80
      this.startScroll(target, -20)
    },
    // 向下翻页
    pageDown() {
        console.log('pageDown');
      let target = document.body.scrollTop + window.screen.height - 80
      this.startScroll(target, 20)
    },
    startScroll(target, speed) {
        console.log('startScroll');
      let times = null
      times = setInterval(function () {
        if (speed > 0) {
          if (document.body.scrollTop <= target) {
            document.body.scrollTop += speed
          }
          if (document.body.scrollTop > target || document.body.scrollTop + window.screen.height >= document.body.scrollHeight) {
            clearInterval(times)
          }
        } else {
          if (document.body.scrollTop >= target) {
            document.body.scrollTop += speed
          }
          if (document.body.scrollTop < target || document.body.scrollTop <= 0) {
            clearInterval(times)
          }
        }
      }, 1)
    },
    prevChapter() {
      this.$store.dispatch('reader/prevChapter')
      //this.saveBooksInfo()
      this.curChapter = this.reader.curChapter
      setTimeout(() => {
        document.body.scrollTop = 0
      }, 300)
    },
    // 更换章节时保存阅读进度到localStorage
    nextChapter() {
      this.$store.dispatch('reader/nextChapter', 50)
      //this.saveBooksInfo()
      this.curChapter = this.reader.curChapter
      setTimeout(() => {
        document.body.scrollTop = 0
      }, 300)
    },
    saveBooksInfo() {
      // 可用localStorage保存每本小说阅读进度
      let id = this.$route.params.id
      this.booksReadInfo[id] = {
        book: id,
        chapter: this.curChapter
      }
      //localEvent.StorageSetter('bookreaderinfo', this.booksReadInfo)
    },
    page(e) {
      if (e.keyCode === 39) {
        console.log(this.nextChapter)
        this.nextChapter()
      } else if (e.keyCode === 37) {
        this.prevChapter()
      }
    },
    getChapterData(query) {
      this.fetchRequest(this.getModel('culture', 'chapter'), {query: query, params: {action: 'detail'}}).then(response => {
        this.detailData = response.data;
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    }
  },
  watch: {
    // 监听fz_size的值更改背景色
    fz_size(val, oldVal) {
      //this.$refs.fz_size.style.fontSize = val + 'px'
      //localEvent.StorageSetter('fz_size', val)
    },
    // 监听当前章节的改变，保存到本地并获取数据
    curChapter(val, oldVal) {
      //localEvent.StorageSetter('cur_chapter', val)
      //this.saveBooksInfo()
      //this.getData(this.$route.params.id, val)
      this.$router.replace({path: '/reader/' + this.detailData.book.code + '/' + this.curChapter});
    },
    /*chapterDetailRequest(val, oldVal) {
      let rDatas = this.watchCommon(val, this.chapterModel, 'show');
      this.detailData = rDatas;
    },*/
  }
}
</script>

<style lang="less" type="text/less">
@import '../assets/vbook/css/reset.css';
.read-container {
  font-size: 16px;
  color: #555;
  line-height: 31px;
  min-height: 600px;
  padding: 15px;
  h4 {
    position: fixed;
    top: 0;
    left: 15px;
    right: 15px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #736357;
    /*border-bottom: solid 1px #736357;*/
    margin: 0 0 1em 0;
    letter-spacing: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    text-indent: 2em;
    margin: 0.5em 0;
    text-align: justify;
    letter-spacing: 0px;
    line-height: 1.5;
  }
  p:first-of-type {
    margin-top: 43px;
  }
  .btn-bar {
    z-index: 80;
    width: 80%;
    margin: 20px auto 0;
    max-width: 800px;
    .btn-tab {
      padding-left: 0;
      height: 34px;
      line-height: 34px;
      background-color: #000;
      border-radius: 8px;
      border: 1px solid #858382;
      font-size: 14px;
      opacity: 0.9;
      li {
        list-style-type: none;
        display: inline-block;
        width: 49%;
        text-align: center;
        color: #fff;
        &:nth-child(1) {
          border-right: 1px solid #858382;
        }
      }
    }
  }
}

.bac(@color) {
  background-color: @color;
}

.read-container[bg='1'] {
  .bac(#e9dfc7);
  h4 {
    .bac(#e9dfc7);
  }
}

.read-container[bg='2'] {
  .bac(#e7eee5);
  h4 {
    .bac(#e7eee5);
  }
}

.read-container[bg='3'] {
  .bac(#a4a4a4);
  h4 {
    .bac(#a4a4a4);
  }
}

.read-container[bg='4'] {
  .bac(#cdefcd);
  h4 {
    .bac(#cdefcd);
  }
}

.read-container[bg='5'] {
  .bac(#283548);
  h4 {
    .bac(#283548);
  }
}

.read-container[bg='6'] {
  .bac(#0f1410);
  h4 {
    .bac(#0f1410);
  }
}

.read-container[night='true'] {
  .bac(#0f1410);
  h4 {
    .bac(#0f1410);
  }
}

.page-up {
  position: fixed;
  width: 100%;
  height: 35%;
  top: 0;
  color: rgba(0, 0, 0, .1);
  z-index: 5;
}

.click-mask {
  position: fixed;
  width: 100%;
  height: 30%;
  top: 35%;
  color: rgba(0, 0, 0, .1);
}

.page-down {
  position: fixed;
  width: 100%;
  height: 35%;
  bottom: 65px;
  color: rgba(0, 0, 0, .1);
  z-index: 5;
}

.top-nav-pannel-bk {
  position: fixed;
  bottom: 70px;
  height: 135px;
  background: #000;
  width: 100%;
  color: #fff;
  opacity: 0.9;
  z-index: 10003
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
