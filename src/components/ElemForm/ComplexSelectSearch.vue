<template>
  <el-form-item :label="elem.options.name" prop="field">
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" class="input-with-select">
        <el-select v-model="showValue" slot="prepend" multiple placeholder="" style="margin-right: 15px;" @change="handleChange()">
          <el-option
            v-for="(option, optionKey) in showInfos"
            :key="optionKey"
            :label="option"
            :value="optionKey">
          </el-option>
        </el-select>
        <el-select v-model="typeValue" slot="prepend" placeholder="请选择" style="margin-right: 15px;" @change="changeType(value)">
          <el-option
            v-for="(option, optionKey) in typeInfos"
            :key="optionKey"
            :label="option"
            :value="optionKey">
          </el-option>
        </el-select>
        <el-select 
          v-model="resultValue" 
          slot="prepend" 
          placeholder="请选择"
          filterable
          @change="changeInfo()"
          remote
          reserve-keyword
          :remote-method="remoteMethod"
          :loading="loading">
      <el-option
        v-for="(item, optionKey) in infos"
        :key="item[keyField]"
        :label="item[nameField]"
        :value="optionKey">
      </el-option>
        </el-select>
      </el-input>
    </div>
  </el-form-item>
</template>

<script>
import {form} from '@/applications/mixins/form';
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  mixins: [form, fetchData],
  data() {
    return {
      infos: {},
      typeInfos: this.elem.typeInfos,
      loading: false,
      disabledInput: true,
      resultValue: '',
      keyField: 'id',
      nameField: 'name',
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
    changeType(value) {
      this.handleSelect();
    },
    changeInfo() {
      this.handleSelect();
    },
    handleSelect() {
      if ((this.resultValue !== 0 && !this.resultValue) || !this.typeValue) {
        return ;
      }
      let currentKey = this.infos[this.resultValue][this.keyField];
      let currentValue = this.infos[this.resultValue][this.nameField];
      let typeKey = this.typeValue;
      let typeValue = this.typeInfos[this.typeValue];
      let cIndex = typeKey + ':' + currentKey;
      let cValue = typeValue + ':' + currentValue;

      this.showInfos[cIndex] = cValue;
      if (!this.showValue.includes(cIndex)) {
        this.showValue.push(cIndex);
      }
      this.handleChange();
    },
    handleChange() {
      this.input = this.showValue.join('||');
      this.handleFormChange();
    },
    remoteMethod(query) {
      if (query == '') {
        this.options = this.elem.infos;
        return ;
      }
      let model = this.getModel(this.elem.searchApp, this.elem.searchResource);
      model.$fetch({query: {keyword: query, action: 'list', 'point_scene': 'keyvalueExt'}}).then(response => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.infos = response.data;
          this.keyField = response.key;
          this.nameField = response.name;

        }, 200);
      })
    }
  },
}
</script>
