<template>
  <el-form-item :label="elem.options.name" prop="field">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="resultValue" class="input-with-select" @blur="handleSelect">
        <el-select v-model="showValue" slot="prepend" multiple placeholder="" style="margin-right: 15px;" @change="handleChange()">
          <el-option
            v-for="(option, optionKey) in showInfos"
            :key="optionKey"
            :label="option"
            :value="optionKey">
          </el-option>
        </el-select>
        <el-select v-model="typeValue" slot="prepend" placeholder="请选择" @change="handleSelect">
          <el-option
            v-for="(option, optionKey) in elem.infos"
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
      resultValue: '',
      typeValue: '',
      input: this.inputInfos[this.field] + '',
      disabled: true,
      showInfos: this.inputInfos[this.field] ? this.inputInfos[this.field] : {},
      showValue: this.initShowValue(),
    }
  },
  methods: {
    initShowValue() {
      let showValue = [];
      for (let key in this.inputInfos[this.field]) {
        showValue.push(key);
      }
      return showValue;
    },
    handleSelect(value) {
      let cIndex = this.typeValue + ':' + this.resultValue;
      let cValue = this.elem.infos[this.typeValue] + ':' + this.resultValue;
      this.showInfos[cIndex] = cValue;
      if (!this.showValue.includes(cIndex)) {
        this.showValue.push(cIndex);
      }
    },
    handleChange() {
      this.input = this.showValue.join('||');
      this.handleFormChange();
    }
  },
}
</script>
