<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">重点关注信息</h3>
      <div class="drawer-item"
        v-for="(noticeElem) in noticeElems" 
      >
        <el-link type="warning" :href="noticeElem['link']">
          <span>{{noticeElem['name']}}</span>
          <span style="color:red;">{{noticeElem['number']}}</span>
        </el-link>
      </div>


    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  props: {
    noticeElems: {type: Array},
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  computed: {
    test() {
      console.log(this.noticeElems, this.$store.state.settings, 'sssssssss');
    },
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }

  .job-link{
    display: block;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
