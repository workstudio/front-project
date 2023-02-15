<template>
  <el-button type="primary" size="mini" @click="handleView(row)">
  {{elem.name}}
  </el-button>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'view',
    }
  },
  computed: {
    test() {
        console.log(this.elem, 'vvvvvv');
    }
  },
  methods: {
    handleView(data) {
      this.dealAction(data);
    },
  },
}
</script>
