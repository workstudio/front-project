<template>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCopy">
    复制
  </el-button>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'copy',
    }
  },
  methods: {
    handleCopy() {
      this.dealAction({});
      //this.$refs.listForm.handleCreate();
    },
  },
}
</script>
