<template>
  <span style="margin-right:40px;">
  <el-form-item :label="elem.options.name + '：'" style="margin-bottom: 6px;">
    <el-select v-model="input" :placeholder="elem.options.name" :multiple="multiple" clearable style="width: 90px" class="filter-item" @change="handleChange">
      <el-option v-for="(item, index) in elem.infos" :key="index" :label="item" :value="index" />
    </el-select>
  </el-form-item>
  </span>
</template>

<script>
import {form} from '@/applications/mixins/form';

export default {
  mixins: [form],
  data() {
    return {
      multiple: this.elem.multiple ? true : false,
      //input: this.value
      input: this.elem.infos[this.elem.value] ? this.elem.infos[this.elem.value] : this.value,
    }
  },
  computed: {
    test() {
    }
  },
  methods: {
    handleChange() {
      if (this.input === null || (this.multiple && this.input.length == 0)) {
        delete this.listQuery[this.field];
      } else {
        this.listQuery[this.field] = this.input;
      }
      this.$emit('update.listQuery');
      //this.$emit('handleFilter');
    },
    setDefaultValue(value) {
      this.input = value ? value : null;
      this.handleChange();
    },
  }
}
</script>
