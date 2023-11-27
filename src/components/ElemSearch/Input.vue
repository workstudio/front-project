<template>
  <el-form-item :label="elem.options.name + '：'" style="margin-bottom: 6px;">
  <el-input v-model="input" :placeholder="elem.options.name" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" @change="handleChange()" :attr="test" />
  </el-form-item>
</template>

<script>
import {form} from '@/applications/mixins/form';

export default {
  mixins: [form],
  data() {
    return {
      input: this.elem.value
    }
  },
  computed: {
    test() {
      //console.log(this.$route, this.value, this.elem, 'eeeeeeee');
    }
  },
  methods: {
    handleChange() {
      this.listQuery[this.field] = this.input;
      this.$emit('update.listQuery');
      //this.$emit('handleFilter');
    },
    setDefaultValue(value) {
      this.input = value ? value : '';
      this.handleChange();
    },
  }
}
</script>
