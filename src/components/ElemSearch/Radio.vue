<template>
  <el-form-item :label="elem.options.name + '：'" style="margin-bottom: 6px;">
    <el-radio-group v-model="fieldValue">
      <el-radio v-for="(option, optionKey) in elem.infos" :key="optionKey" :label="optionKey">{{option}}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  data () {
    return {
      fieldValue: '',
    };
  },
  props: {
    elem: {type: Object, default() {}},
    field: {type: String, default: ''},
    value: {type: String, default: ''},
  },
}
</script>
