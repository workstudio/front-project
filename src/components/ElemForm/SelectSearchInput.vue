<template>
  <el-form-item :label="elem.options.name" prop="field">
    <el-select
      v-model="select"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      @change="handleSelectChange"
      :loading="loading">
      <el-option
        v-for="item in options"
        :key="item[keyField]"
        :label="item[nameField]"
        :value="item[keyField]">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import {form} from '@/applications/mixins/form';
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  mixins: [form, fetchData],
  data() {
    return {
        options: this.elem.infos,
        loading: false,
        keyField: 'id',
        nameField: 'name',
        input: this.value,

        disabledInput: true,
        select: this.initSelect(),
        input: this.inputInfos[this.field] + '',
        disabled: true,
    }
  },
  mounted() {
    //this.handleSelect(this.input);
    this.remoteMethod('');
    return [];
  },
  methods: {
    initSelect() {
      let currentValue = this.inputInfos[this.field] + '';
      for (let option in this.elem.infos) {
        if (currentValue == option) {
          return currentValue;
        }
      }
      return this.elem.customValue + '';
    },
    handleSelect(value) {
      this.input = value;
      if (this.elem.customValue == this.select) {
        this.disabledInput = false;
      } else {
        this.disabledInput = true;
      }
      this.handleFormChange();
    },
    remoteMethod(query) {
      if (query == '') {
        this.options = this.elem.infos;
        //return ;
      }
      console.log(this.options, 'oooooo');
      let model = this.getModel(this.elem.searchApp, this.elem.searchResource);;
      model.$fetch({query: {keyword: query, action: 'list', 'point_scene': 'keyvalueExt'}}).then(response => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = response.data;
          this.keyField = response.key;
          this.nameField = response.name;
      console.log(this.options, this.keyField, this.nameField, 'aaaa');

        }, 200);
      })
    }
  }
}
</script>
