<template>
  <span style="font-size: 12px;">
    存放在料箱中的物料 ‘最近 <span style='color:red'>{{fewbuyDay}}</span> 天拣货总量’ 低于 ‘ <span style='color:red'>{{fewbuyNumber}}</span> ’ 时统计入低销物料表！！！<span style='color:blue;' @click="handleSetFewbuy">修改提醒规则</span>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'setFewbuy',
      fewbuyDay: 0,
      fewbuyNumber: 0,
    }
  },
  mounted() {
    this.getSettingInfo();
  },
  methods: {
    handleSetFewbuy() {
      this.dealTopAction({});
    },
    getSettingInfo() {
      this.model.$fetch({params: {action: 'setting-info'}}).then(response => {
        if (response === false) {
          return ;
        }
        this.fewbuyDay = response.data.fewbuyDay;
        this.fewbuyNumber = response.data.fewbuyNumber;
      })
    },
  },
}
</script>
