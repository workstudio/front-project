<template>
  <el-form-item :label="elem.options.name" prop="field">
    <el-date-picker
      v-model="input"
      align="right"
      type="datetime"
      placeholder="选择日期"
      @change="handleFormChange"
      :value-format="valueFormat"
    >
    </el-date-picker>
  </el-form-item>
</template>

<script>
import {form} from '@/applications/mixins/form';

export default {
  mixins: [form],
  data() {
    return {
      input: this.inputInfos[this.field],
      valueFormat: 'yyyy-MM-dd HH:mm:ss',
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>
