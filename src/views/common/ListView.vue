<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :destroy-on-close="destroyOnClose" width="90%">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="field" label="字段" width="160"></el-table-column>
      <el-table-column prop="value" label="值" width="280"></el-table-column>
      <el-table-column prop="valueSource" label="原始值"></el-table-column>
    </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}{{test}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchData} from '@/applications/mixins/fetchData';

export default {
  name: 'ListView',
  'mixins': [fetchData],
  data() {
    return {
      fileData: [],
      tableData: [],
      dialogStatus: '',
      dialogFormVisible: false,
      destroyOnClose: false,
      loadSurvey: true,
      currentRow: {},
      currentRowSource: {},
    }
  },
  computed: {
    test() {
        console.log(this.currentRow, this.fieldNames);
    },
  },
  props:{                     
    model: {type: Function},  
    //info: {type: Object},     
    fieldNames: {type: Object},
    title: {type: String, default: '详情'},
    //showBack: {type: String, default: ''},
  },
  methods: {
    getCurrentValue(field) {
      return this.currentRow[field] ? this.currentRow[field].value : '';
    },
    handleView(row) {
      this.tableData = [];
      this.currentRow = row;
      this.destroyOnClose = true;
      let data = {};
      for (let field in this.fieldNames) {

        let item = this.fieldNames[field];
        let info = {"field": item.name, "value": row[field]['value'], "valueSource": row[field]['valueSource']};
        this.tableData.push(info);
      }
      this.dialogStatus = 'view'
      this.dialogFormVisible = true
      this.loadSurvey = false;
      this.$nextTick(() => {
        this.loadSurvey = true;
      })
    },
  }
}
</script>
