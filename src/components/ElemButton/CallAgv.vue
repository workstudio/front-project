<template>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCallAgv">
    {{elem.name}} 
  </el-button>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'callAgv',
    }
  },
  methods: {
    handleCallAgv() {
      this.dealTopAction({});
    },
  },
}
</script>
