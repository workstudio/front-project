<template>
  <div ref="rightPanel" :class="{show:show}" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="handle-button" style="bottom:30px; background-color:red" @click="show=!show">
        <i v-if="show" class="el-icon-close" />
        <el-button v-else type="danger" circle style="margin-top:0px;" @click="ignoreClick"><span v-html="noticeStr" @click="ignoreClick"></span></el-button>
        <!--<i v-else class="el-icon-sold-out" />-->
      </div>
      <div class="rightPanel-items" style="margin-top:50%">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import { addClass, removeClass } from '@/utils/base'

export default {
  name: 'RightPanel',
  props: {
    noticeStr: {type: String, default: ''},
    clickNotClose: {
      default: false,
      type: Boolean
    },
    buttonTop: {
      default: 250,
      type: Number
    }
  },
  data() {
    return {
      show: false,
      isButtonClick: false,
    }
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme
    }
  },
  watch: {
    show(value) {
      if (value && !this.clickNotClose) {
        this.addEventClick()
      }
      if (value) {
        addClass(document.body, 'showRightPanel')
      } else {
        removeClass(document.body, 'showRightPanel')
      }
    }
  },
  mounted() {
    this.insertToBody();
  },
  beforeDestroy() {
    const elx = this.$refs.rightPanel
    elx.remove()
  },
  methods: {
    addEventClick() {
      window.addEventListener('click', this.closeSidebar)
    },
    closeSidebar(evt) {
      let parent = evt.target.closest('.rightPanel')
      if (!parent && !this.isButtonClick) {
        this.show = false
        window.removeEventListener('click', this.closeSidebar)
      }
      this.isButtonClick = !this.isButtonClick;
    },
    insertToBody() {
      const elx = this.$refs.rightPanel
      const body = document.querySelector('body')
      body.insertBefore(elx, body.firstChild)
    },
    ignoreClick() {
      this.isButtonClick = true;
    }
  }
}
</script>

<style>
.showRightPanel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity .3s cubic-bezier(.7, .3, .1, 1);
  background: rgba(0, 0, 0, .2);
  z-index: -1;
}

.rightPanel {
  width: 100%;
  max-width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  transition: all .25s cubic-bezier(.7, .3, .1, 1);
  transform: translate(100%);
  background: #e6ebf5;
  z-index: 40000;
}

.show {
  transition: all .3s cubic-bezier(.7, .3, .1, 1);

  .rightPanel-background {
    z-index: 20000;
    opacity: 1;
    width: 100%;
    height: 100%;
  }

  .rightPanel {
    transform: translate(0);
  }
}

.handle-button {
  width: 58px;
  height: 58px;
  position: absolute;
  left: -58px;
  text-align: center;
  font-size: 24px;
  border-radius: 6px 0 0 6px !important;
  z-index: 0;
  pointer-events: auto;
  cursor: pointer;
  color: #fff;
  line-height: 35px;
  i {
    font-size: 24px;
    line-height: 48px;
  }
}
</style>
