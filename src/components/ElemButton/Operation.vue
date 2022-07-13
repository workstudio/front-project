<template>
  <span>
  <template v-if="splitInfos">
  <el-button v-for="(item, index) in splitInfos" :key="index" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-s-operation" @click="handleOperation(splitInfos[index])">
    {{item.name}}
  </el-button>
  </template>
  <template v-else>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-s-operation" @click="handleOperation">
    {{elem.name}}
  </el-button>
  </template>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'operation',
    }
  },
  computed:{
    splitInfos() {
      let infos = this.elem.extparam ? JSON.parse(this.elem.extparam) : false;
      return infos ? infos['split'] : {};
    }
  },
  methods: {
    handleOperation() {
      this.dealAction({});
      //this.$refs.listForm.handleCreate();
    },
  },
}
</script>
