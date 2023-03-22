<template>
  <span>
  <el-cascader
    ref="cascadersimple"
    :options="infos"
    :props="props"
    placeholder="name"
    :value="currentValue"
    v-model="currentValue"
    @change="changeRowSelect"
    clearable></el-cascader>
  </el-form-item>
  </span>
</template>

<script>
import {column} from '@/applications/mixins/column';
export default {
  mixins: [column],
  data() {
    return {
      disabled: false,
      infos: this.row[this.field].infos,
      props: this.row[this.field].props,
      currentValue: this.row[this.field].valueSource,
      rows: this.fieldItem.rowNum ? this.fieldItem.rowNum : 1,
      withPop: this.fieldItem.withPop ? this.fieldItem.withPop : 0,
    }
  },
  methods: {
    changeRowSelect() {
      let selectNode = this.$refs["cascadersimple"].getCheckedNodes();
      let vLength = this.currentValue.length;
      this.currentValue = vLength ? this.currentValue[vLength - 1] : '';
      this.handleRowChange();
    },
  }
}
</script>
