<template>
  <div class="classify-main">
    <scroll :top="48" :bottom="10" @onScroll="onScroll">
      <van-list>
        <van-cell-group class="user-group">
          <van-cell icon="records" title="书籍阅读记录" />
        </van-cell-group>
        <div v-for="item in bookRecords" :key="item.id" :name="item.id">
          <van-card
            :title="item.bookName"
            :desc="item.author"
            :num="item.readStatus"
            :price="item.read_num"
            currency="阅读次数:"
            centered="true"
            :thumb="item.cover"
          >
            <template #tags>
              <van-tag plain type="danger">首次阅读时间: {{item.read_first}}</van-tag>
              <div style="display:block;">
              <van-tag plain type="danger">上次阅读时间: {{item.read_last}}</van-tag>
              </div>
            </template>
          </van-card>
          <van-cell-group class="goods-cell-group">
            <van-cell title="章节记录" icon="notes-o" is-link @click="showChapterRecords(item)" />
            <van-cell title="全部记录" icon="notes-o" is-link @click="showRecordDetails(item)" />
            <!--<van-button icon="notes-o" round plain size="small" type="primary">章节记录</van-button>-->
          </van-cell-group>
        </div>
      </van-list>
    </scroll>
    <van-popup v-model="showRecordDetail" :style="{ width: '90%' }" closeable="true">
      <van-list>
        <van-cell-group class="user-group">
          <van-cell icon="records" :title="currentItem.bookName + ' 阅读记录'" />
        </van-cell-group>
        <div v-for="item in records" :key="item.id" :name="item.id">
          <van-cell :title="item.name"></van-cell>
          <van-cell>
            <div :class="'goods-price goods-status' + item.readRecord.read_status">阅读状态：{{ item.readRecord.readStatus }}</div>
            <div class="goods-title">阅读次数：{{ item.readRecord.read_num }}</div>
            <van-tag plain type="danger">首次阅读时间: {{item.readRecord.read_first}}</van-tag>
            <div style="display:block;">
              <van-tag plain type="danger">上次阅读时间: {{item.readRecord.read_last}}</van-tag>
            </div>
            <van-button icon="notes-o" round plain size="small" type="primary">开始阅读</van-button>
          </van-cell>
        </div>
      </van-list>
    </van-popup>
    <van-popup v-model="showChapter" :style="{ width: '90%' }" closeable="true">
      <van-list>
        <van-cell-group class="user-group">
          <van-cell icon="records" :title="currentItem.bookName + ' 章节阅读记录'" />
        </van-cell-group>
        <div v-for="item in chapterRecords" :key="item.id" :name="item.id">
          <van-cell :title="item.name">
          </van-cell>
          <van-cell>
            <div :class="'goods-price goods-status' + item.readRecord.read_status">阅读状态：{{ item.readRecord.readStatus }}</div>
            <div class="goods-title">阅读次数：{{ item.readRecord.read_num }}</div>
              <van-tag plain type="danger">首次阅读时间: {{item.readRecord.read_first}}</van-tag>
              <div style="display:block;">
              <van-tag plain type="danger">上次阅读时间: {{item.readRecord.read_last}}</van-tag>
              </div>
            <van-button icon="notes-o" round plain size="small" type="primary">开始阅读</van-button>
          </van-cell>
        </div>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll";
import {Popup, List, Row, Col, Button, Icon, Cell, CellGroup, Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  'mixins': [fetchData],
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    [Popup.name]: Popup,
    Scroll,
  },

  data() {
    return {
      bookRecords:[], 
      records:[], 
      chapterRecords:[], 
      showChapter: false,
      showRecordDetail: false,
      currentItem: {},
    };
  },
  created() {
    this.getBookList();
  },

  computed: {
  },
  methods: {
    getBookList() {
      this.fetchRequest(this.getModel('culture', 'bookRecord'), {query: {}, params: {action: 'my-record'}}).then(response => {
        const data = response.data;
        this.bookRecords = data;
        return data;
      })
    },
    getChapterList() {
      let query = {book_code: this.currentItem.bookCode};
      this.fetchRequest(this.getModel('culture', 'chapterRecord'), {query: query, params: {action: 'my-record'}}).then(response => {
        const data = response.data;
        this.chapterRecords = data;
        return data;
      })
    },
    getRecordList() {
      let query = {book_code: this.currentItem.bookCode};
      this.fetchRequest(this.getModel('culture', 'record'), {query: query, params: {action: 'my-record'}}).then(response => {
        const data = response.data;
        this.records = data;
        return data;
      })
    },

    showRecordDetails(bookRecord) {
      this.showRecordDetail = true;
      this.currentItem = bookRecord;
      this.getRecordList();
    },
    showChapterRecords(bookRecord) {
      this.showChapter = true;
      this.currentItem = bookRecord;
      this.getChapterList();
    }
  }
};
</script>

<style lang="less">
.classify-main {
  height: 100%;
}
.isShadow {
  box-shadow: 0 0 5px #ccc;
}
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }
  &-status {
    color: #f44;
  }
  &-status0 {
    color: #999;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    /*text-align: center;
    padding: 5px 15px;*/
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
