<template>
  <div class="app-container">
    <el-dialog 
      :visible.sync="dialogPopTableVisible" 
      v-if="dialogPopTableVisible" 
      :title="popTitle" 
      :append-to-body="appendToBody" 
      :before-close="handleClose" 
      width="90%"
    >
    <list-search 
      @handleFilter="handleFilter" 
      :currentResource="currentResource" 
      :searchFields="searchFields" 
      :listQuery="listQuery" 
      :model="model"
    ></list-search>
    {{test}}
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      size="mini"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="haveSelection"
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column  v-for="(fieldItem, field) in fieldNames" :key="field" :align="fieldItem.align" :min-width="fieldItem.width" :label="fieldItem.name" :prop="field" sortable="custom" :class-name="getSortClass(field)" v-if="fieldItem.hidden!=1">
        <template slot-scope="{row}">
          <component
            :row="row"
            :field="field"
            :fieldItem="fieldItem"
            :model="model"
            @dealAction="dealAction"
            :is="elemLists[row[field].showType]">
          </component>
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top: 20px" v-if="haveSelection">
      <el-button 
        v-for="(operationItem, operation) in selectionOperations" 
        :key="operation" 
        @click="dealSelection(operationItem, rowData)" 
      >{{operationItem.name}}</el-button>
    </div>
    <!--<span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
    </span>-->

    <pagination v-show="pageMeta.total>0" :total="pageMeta.total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />
    </el-dialog>
  </div>
</template>
<script>
import {listinfo} from '@/applications/mixins/listinfo';
import ListSearch from '@/views/common/ListSearch'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'PopTable',
  mixins: [listinfo],
  components: {
    ListSearch,
    Pagination,
  },
  data() {
    return {
      appCode: '',
      modelCode: '',
      popTitle: '',
      dialogPopTableVisible: false,
      pvData: [],
      sortElem: {},
      rowData: {},
      searchFields: {},
      pageLinks: {},
      model: {},
      operation: {},
      pageMeta: {total: 0},
      listQuery: {
        page: 1,
        per_page: 20,
        sort_elem: {},
      },
    }
  },
  props:{                     
    appendToBody: {type: Boolean, default: false}
  },
  computed: {
    test() {
    },
  },
  methods: {
    handlePopTable(params) {
      this.operation = params.operation;
      this.popTitle = this.operation.params.popTitle ? this.operation.params.popTitle : this.operation.name;
      this.listQuery = {page:1, per_page: 20, sort_elem: {}};
      this.listQuery = Object.assign(this.listQuery, this.operation.params);

      this.appCode = this.operation.app;
      this.modelCode = this.operation.resource;
      this.dialogPopTableVisible = true
      let row = params.row;
      this.rowData = row;
      this.model = this.getModel(this.operation.app, this.operation.resource);
      this.getList(row, this.operation);
    },
    getList() {
      this.listQuery.sort_elem = JSON.stringify(this.sortElem);
      this.sortElem = {};
      this.listLoading = true
      let params = {};
      if (this.operation.action) {
        params = {action: this.operation.action};
      }
      this.fetchRequest(this.model, {query: this.listQuery, params: params}).then(response => {
        this.list = response.data;
        this.formInfos = response.formInfos;
        this.ignoreOperations = response.ignoreOperations;
        this.fieldNames = response.fieldNames;
        this.pageLinks = response.links,
        this.pageMeta = response.meta,
        this.searchFields = response.searchFields,
        this.listQuery.per_page = this.pageMeta.per_page;
        this.haveSelection = response.haveSelection;
        this.selectionOperations = response.selectionOperations;

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      if (order === 'ascending') {
        this.sortElem[prop] = 'asc';
      } else {
        this.sortElem[prop] = 'desc';
      }
      this.handleFilter()
    },
    handleClose(done) {
      this.dialogPopTableVisible = false;
    },
    getSortClass: function(key) {
      const sort = this.sortElem;
      if (!sort[key]) {
        return '';
      }
      if (sort[key] == 'asc') {
        return 'ascending';
      }
      return 'descending'
    },
  }
}
</script>
