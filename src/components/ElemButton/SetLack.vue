<template>
  <span style="font-size: 12px;">
    当物料库存数低于 “最近 <span style='color:red'>{{lackDay}}</span> 天拣货量” 时纳入补货提醒！！！<span style='color:blue;' @click="handleSetLack">修改提醒规则</span>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'setLack',
      lackDay: 0,
    }
  },
  mounted() {
    this.getSettingInfo();
  },
  methods: {
    handleSetLack() {
      this.dealTopAction({});
    },
    getSettingInfo() {
      this.model.$fetch({params: {action: 'setting-info'}}).then(response => {
        if (response === false) {
          return ;
        }
        this.lackDay = response.data.lackDay;
      })
    },
  },
}
</script>
