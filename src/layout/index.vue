<template>
  <div :class="classObj" class="app-wrapper">
    <!--<div class="head-nav-bar">
      <head-navbar />
    </div>-->
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!--<topbar />-->
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!--<right-panel v-if="showSettings"><settings /></right-panel>-->
      <right-notice :noticeStr="noticeStr"><notices :noticeElems="noticeElems" /></right-notice>
    </div>
  </div>
</template>

<script>
//import RightPanel from '@/components/RightPanel'
import RightNotice from '@/components/RightNotice'
//import {AppMain, Navbar, Settings, HeadNavbar, Sidebar, TagsView, Topbar} from './components'
import {AppMain, Navbar, Notices, HeadNavbar, Sidebar, TagsView} from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
import {fetchData} from '@/applications/mixins/fetchData'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar,
    //RightPanel,
    RightNotice,
    HeadNavbar,
    //Settings,
    Notices,
    Sidebar,
    //Topbar,
    TagsView
  },
  mixins: [ResizeMixin, fetchData],
  data() {
    return {
      noticeStr: '-',
      noticeElems: [],
    }
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  mounted() {
    //this.getNoticeData();
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    getNoticeData() {
      let model = this.getModel('wmsystem', 'materialInventory');
      model.$fetch({params: {action: 'backend-notice'}}).then(response => {
        this.noticeStr = response.data.noticeStr;
        this.noticeElems = response.data.elems;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .head-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1002;
    box-shadow: 0 1px 4px 3px rgba(0, 21, 41, 0.3);
  }

  .app-wrapper {
    @include clearfix;
    /*position: relative;*/
    position: relative;
    height: 100%;
    width: 100%;
    /*top: 60px;*/

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
