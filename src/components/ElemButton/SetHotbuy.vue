<template>
  <span style="font-size: 12px;">
    存放在料箱中的物料 ‘最近 <span style='color:red'>{{hotbuyDay}}</span> 天拣货总量’ 大于 ‘ <span style='color:red'>{{hotbuyNumber}}</span> ’ 时统计入热销物料表！！！<span style='color:blue;' @click="handleSetHotbuy">修改提醒规则</span>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'setHotbuy',
      hotbuyDay: 0,
      hotbuyNumber: 0,
    }
  },
  mounted() {
    this.getSettingInfo();
  },
  methods: {
    handleSetHotbuy() {
      this.dealTopAction({});
    },
    getSettingInfo() {
      this.model.$fetch({params: {action: 'setting-info'}}).then(response => {
        if (response === false) {
          return ;
        }
        this.hotbuyDay = response.data.hotbuyDay;
        this.hotbuyNumber = response.data.hotbuyNumber;
      })
    },
  },
}
</script>
