<template>
  <div class="xPop" @click="hideTag">
    <div class="xPop-pop" :style="{ width: width }" @click.stop="">
      <div class="xPop-title">{{ title }}</div>
      <div class="xPop-inner" :style="{ maxHeight: maxHeight }">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "xPop",
  data() {
    return {
      maxHeight: 0,
    };
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "40%",
    },
  },
  created() {
    let height = document.body.clientHeight;
    this.maxHeight = height - 250 + "px";
  },
  methods: {
    hideTag() {
      this.$emit("closeTag");
    },
  },
};
</script>
<style lang="scss" scoped>
.xPop {
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1022;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-pop {
    box-sizing: border-box;
    // width: 40%;
    background: #fff;
    min-height: 200px;
    padding: 30px 40px 60px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 30px;
  }
  &-title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  &-inner {
    width: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
