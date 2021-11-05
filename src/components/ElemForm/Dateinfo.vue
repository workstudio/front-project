<template>
  <el-form-item :label="elem.options.name" prop="field">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="dateValue" class="input-with-select" @change="handleSelect">
        <el-select v-model="eraValue" slot="prepend" placeholder="请选择" @change="handleSelect" style="margin-right: 15px;">
          <el-option
            v-for="(option, optionKey) in elem.eraInfos"
            :key="optionKey"
            :label="option"
            :value="optionKey">
          </el-option>
        </el-select>
        <el-select v-model="accurateValue" slot="prepend" placeholder="请选择" @change="handleSelect">
          <el-option
            v-for="(option, optionKey) in elem.accurateInfos"
            :key="optionKey"
            :label="option"
            :value="optionKey">
          </el-option>
        </el-select>
      </el-input>
    </div>
  </el-form-item>
</template>

<script>
import {form} from '@/applications/mixins/form';

export default {
  mixins: [form],
  data() {
    return {
      disabledInput: false,
      dateValue: this.initDateValue(),
      eraValue: this.initEraValue(),
      accurateValue: this.initAccurateValue(),
      input: this.inputInfos[this.field] + '',
      disabled: true,
    }
  },
  computed: {
  },
  mounted: function() {
    this.handleSelect(this.input);
  },
  methods: {
    initEraValue() {
      return this.formatPointValue('era');
    },
    initAccurateValue() {
      return this.formatPointValue('accurate');
    },
    initDateValue() {
      return this.formatPointValue('date');
    },
    formatPointValue(elem) {
      let currentValue = this.inputInfos[this.field] + '';
      let values = currentValue.split('|');
      let length = values.length;
      switch (elem) {
        case 'era':
          return length > 1 ? values[0] : '';
        case 'accurate':
          return length > 2 ? values[1] : '';
        case 'date':
          return length >= 3 ? values[2] : '';
      }
    },
    handleSelect(value) {
      this.input = this.eraValue + '|' + this.accurateValue + '|' + this.dateValue;
      this.handleFormChange();
    },
  },
}
</script>


<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
