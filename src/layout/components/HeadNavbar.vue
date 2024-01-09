<template>
  <div
    class="head-bar-wrap clearfix"
    :style="{ 'background-color': variables.menuBg, color: variables.menuText }"
  >
    <div class="head-menu">
      <el-menu
        class="_layout-header"
        :default-active="modulePath"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="horizontal"
      >
        <span v-for="item in permission_routes" :key="item.path" class="nav-item" style="display: inline-block;">
          <app-link :to="resolvePath(item)">
            <el-menu-item
              v-if="!item.hidden"
              :index="item.path"
              >{{ item.meta ? item.meta.title : item.children[0].meta.title }}</el-menu-item>
          </app-link>
        </span>
      </el-menu>
    </div>
    <div v-if="device !== 'mobile'" class="right-menu">
      <!--<el-badge :value="1012" style="margin-right:30px">
        <el-button size="small">料箱缺货</el-button>
      </el-badge>-->
      <template>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <span class="name">{{ userData.name || '匿名用户' }}</span>
      </template>
      <span style="margin-top:3px;">
        <role-select class="right-menu-item hover-effect" />
      </span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userData.avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{$t('navbar.logOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AppLink from './AppLink'
import variables from '@/styles/variables.scss';
import Screenfull from '@/components/Screenfull';
import { isExternal } from '@/utils/validate'
import {currentUser} from "@/applications/mixins/currentUser";
import RoleSelect from './RoleSelect'

export default {
  mixins: [currentUser],
  components: {
    Screenfull,
    RoleSelect,
    AppLink
  },
  computed: {
    ...mapGetters(['permission_routes', 'sidebar', 'avatar', 'device', 'name']),
    variables() {
      return variables;
    },
    modulePath() {
      return this.$route.matched.length === 0
        ? this.$route.path
        : this.$route.matched[0].path || '/';
    }
  },
  methods: {
    async logout() {
      await this.logoutRequest();
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    resolvePath(item) {
      if (item.hidden) {
          return '';
      }
      // 如果是个完成的url直接返回
      if (isExternal(item.path)) {
        return item.path
      }
      // 如果是首页，就返回重定向路由
      if (item.path === '/') {
        const path = item.redirect
        return path
      }

      let cRoute = item.children[0].children[0];
      let path = item.children[0].path + '/' + cRoute.path;

      return path
    },
    // 设置侧边栏的显示和隐藏
    setSidebarHide(route) {
      if (!route.children || route.children.length === 1) {
        this.$store.dispatch('app/toggleSideBarHide', true)
      } else {
        this.$store.dispatch('app/toggleSideBarHide', false)
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.head-bar-wrap {
  .head-title {
    float: left;
    height: 60px;
    line-height: 60px;
    width: $sideBarWidth;
    text-align: center;
    font-size: 22px;
    font-weight: bold;
  }
  .head-menu {
    float: left;
  }
  .right-menu {
    float: right;
    height: 60px;
    display: flex;
    align-items: center;
    color: white;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      margin-left: 15px;
      .avatar-wrapper {
        position: relative;
        .user-avatar {
          margin-top: 10px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
          color: white;
        }
      }
    }
  }
}
</style>
