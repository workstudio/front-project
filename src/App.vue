<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
/*@import url('./assets/css/base.css');*/
.el-menu.el-menu--horizontal {
    border-bottom: none !important;
    .el-menu-item {
        height: 60px;
        line-height: 60px;
    }
    .is-active {
        border-bottom: 4px solid #409eff;
        background-color: #ecf5ff;
    }
}
.el-drawer__header > span:focus {
    outline: none;
}
.el-image-viewer__close {
    color: white;
}
</style>
