<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        <!--<sidebar-item v-for="route in currentSideMenus" :key="route.path" :item="route" :base-path="route.path" />-->
      </el-menu>
    </el-scrollbar>
    <button @click="exportJSON">导出jsonn{{test}}</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'formatedRoutes',
      'sidebar'
    ]),
    currentSideMenus() {
      let rootPath = this.$route.matched.length === 0 ? this.$route.path : this.$route.matched[0].path || '/';
      let defaultRoutes = false;
      let currentRoutes = false;
      for (let pKey in this.permission_routes) {
        let pRoute = this.permission_routes[pKey];
        let pPath = pRoute['path'];
        if (pRoute['hidden'] || pPath == '/') {
          continue;
        }
        if (!defaultRoutes) {
          defaultRoutes = pRoute['children'];
        }
        if (pPath == rootPath) {
          currentRoutes = pRoute['children'];
        }
      }
      if (currentRoutes) {
        return currentRoutes;
      }
      return defaultRoutes;
	},
	test() {
	},
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    exportJSON () {
      // 将json转换成字符串
      const data = JSON.stringify(this.routes)
      const blob = new Blob([data], {type: ''})
      // const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(blob, '/tmp/hahaha.txt')
    },
    exportText () {
      const textStr = 'aaaaa,bbbbbbb,cccccc'
      FileSaver.saveAs(textStr, '/tmp/a.txt')
    }
  }
}
</script>
