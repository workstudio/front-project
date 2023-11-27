<template>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleImport">
    {{elem.name}} 
  </el-button>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'import',
    }
  },
  methods: {
    handleImport() {
      this.dealTopAction({});
      //this.$refs.listForm.handleCreate();
    },
  },
}
</script>
