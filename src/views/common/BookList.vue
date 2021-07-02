<template>
  <div>
    <div class="book-list" v-for="(bDatas, key) in bookDatas" :key=key>
      <h2 class="title">{{bDatas.name}}</h2>
      <ul>
        <li v-for="(item, index) in bDatas.books" :key=index>
          <router-link :to="{ path: '/bdetail/' + item.code}">
            <div class="book-image">
              <img :src="item.coverUrl" alt="" :onerror="errorImg">
            </div>
            <div class="book-detail">
              <h3>{{item.name}}</h3>
              <p>标签：<span v-for="(tItem, tIndex) in item.tagDatas" :key=tIndex>{{tItem}}  </span></p>
              <div class="author">
                <i></i>
                <span>{{item.authorName}}</span>
              </div>
              <!--<div class="category-r"><span></span></div>-->
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      typeArr: [],
      errorImg: 'this.src="' + require('../../assets/vbook/images/nobook.jpg') + '"'
    }
  },
  props: ['bookDatas'],
}
</script>

<style lang="less" type="text/less">
.book-list {
  margin-top: 15px;
  padding: 15px;
  background-color: #fff;
  .title {
    margin-left: 0px;
    margin-bottom: 10px;
    border-left: 2px solid #ed424b;
    text-indent: 5px;
    font-size: 16px;
    line-height: 16px;
  }
  ul li {
    display: flex;
    padding-bottom: 10px;
    margin-bottom: 14px;
    border-bottom: 1px solid #ddd;
    &:last-of-type {
      border-bottom: none;
    }
    a {
      display: flex;
    }
    .book-image {
      width: 80px;
      img {
        width: 100%;
      }
    }
    .book-detail {
      position: relative;
      flex: 1;
      padding: 0;
      margin-left: 20px;
      h3 {
        font-size: 18px;
        margin-bottom: 10px;
      }
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        line-clamp: 2;
        font-size: 14px;
        color: #969ba3;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .author {
        position: absolute;
        left: 0px;
        bottom: 5px;
        color: #969ba3;
        font-size: 13px;
        i {
          position: relative;
          bottom: -3px;
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("../../assets/vbook/images/man.png") no-repeat;
        }
      }
      .category-r {
        position: absolute;
        right: 0;
        bottom: 5px;
        float: right;
        color: #969ba3;
        font-size: 10px;
        span {
          border: 1px solid #ccc;
          border-radius: 2px;
          padding: 0 2px;
        }
        span:nth-child(2) {
          color: #ed424b;
        }
        span:nth-child(3) {
          color: #4284ed;
        }
      }
    }
  }
}
</style>
