<template>
  <el-form-item :label="elem.options.name" prop="field">
    <el-select
      v-model="input"
      filterable
      remote
      reserve-keyword
      allow-create=true
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
        currentQuery: '',
        input: this.value
    }
  },
  mounted() {
    this.remoteMethod('');
    return [];
  },
  methods: {
    handleSelectChange() {
      console.log('ccccc', this.currentQuery, this.input);
      if (!this.input) {
        let allowCustom = this.elem.allowCustom;
        if (allowCustom) {
          this.input = this.currentQuery;
        }
      }
      this.handleFormChange();
    },
    remoteMethod(query) {
      this.currentQuery = query;
      this.handleSelectChange();
      if (query == '') {
        this.options = this.elem.infos;
        //return ;
      }
      let model = this.getModel(this.elem.searchApp, this.elem.searchResource);;
      model.$fetch({query: {keyword: query, action: 'list', 'point_scene': 'keyvalueExt'}}).then(response => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = response.data;
          this.keyField = response.key;
          this.nameField = response.name;

        }, 200);
      })
    }
  }
}
</script>
