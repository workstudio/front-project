<template>
  <div>
    <div class="recommend" v-for="(item, index) in recommendDatas" :key=index>
      <h2 class="title">{{item.name}}</h2>
      <div class="list">
        <ul class="list-ul">
          <li class="list-li" v-for="(subItem, subIndex) in item.books" :key=subIndex>
            <router-link :to="{ path: '/bdetail/' + subItem.code}">
              <img :src="subItem.coverUrl" alt="subItem.name" :onerror="errorImg">
              <p class="book-name">{{subItem.name}}</p>
              <p class="book-author">{{subItem.authorName}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorImg: 'this.src="' + require('../../assets/vbook/images/nobook.jpg') + '"'
    }
  },
  props: ['recommendDatas'],
}
</script>

<style lang="less" type="text/less">
.recommend {
  padding: 15px 0;
  margin-bottom: 15px;
  background-color: #fff;
  .title {
    margin-left: 15px;
    margin-bottom: 10px;
    border-left: 2px solid #ed424b;
    text-indent: 5px;
    font-size: 16px;
    line-height: 16px;
  }
  .list {
    .list-ul {
      position: relative;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      text-indent: 7px;
      .list-li {
        display: inline-block;
        margin-right: 8px;
        width: 100px;
        /*white-space: normal;*/
        img {
          width: 100%;
          height:125px;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
