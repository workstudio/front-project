<template>
  <span style="margin-left: 0px;">
  <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
    {{ $t('table.search') }}
  </el-button>
  <el-button class="filter-item" @click="resetForm('searchForm')">重置</el-button>
  </span>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import {button} from '@/applications/mixins/button';

export default {
  directives: { waves },
  mixins: [button],
  data() {
    return {
      actionType: 'search',
    }
  },
  methods: {
    handleFilter() {
      this.$emit('update.listQuery');
      //this.$emit('handleFilter');
      this.dealAction({});
    },
    resetForm(formName) {
      this.$emit('resetForm', formName);
    }
  },
}
</script>
