<template>
  <div class="app-container">
    <list-search 
      @handleExport="handleExport" 
      @handleExportStatistic="handleExportStatistic" 
      @handleFilter="handleFilter" 
      @dealTopAction="dealTopAction"
      :currentResource="currentResource" 
      :searchFields="searchFields" 
      :listQuery="listQuery" 
      :sceneTabs="sceneTabs" 
      :currentSceneTab="currentSceneTab"
      :model="cModel"
    ></list-search>

    <div style="margin-top: 0px" v-if="topShowStr" v-html="topShowStr"></div>
    <pagination v-show="pageMeta.total>0" :total="pageMeta.total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />
    <div style="margin-top: 0px" v-if="haveSelection">
      <el-button 
        v-for="(operationItem, operation) in selectionOperations" 
        :key="operation" 
        @click="dealSelection(operationItem)"
      >{{operationItem.name}}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      size="mini"
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >

      <el-table-column v-if="haveSelection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column 
        v-for="(fieldItem, field) in fieldNames" 
        :key="field" :align="fieldItem.align" 
        :min-width="fieldItem.width" 
        :label="fieldItem.name" 
        :prop="field" 
        :sortable="getSortStatus(fieldItem)" 
        :fixed="getFixed(fieldItem)"
        :class-name="getSortClass(field)" 
        v-if="fieldItem.hidden!=1"
      >
        <template slot-scope="{row}">
          <component
            :row="row"
            :field="field"
            :fieldItem="fieldItem"
            :model="cModel"
            @dealAction="dealAction"
            @handleFilter="handleFilter"
            v-if="sonRefresh"
            :is="elemLists[row[field].showType]">
          </component>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="100" class-name="small-padding fixed-width" v-if="currentResource[5]">
        <template slot-scope="{row,$index}">
          <component
            v-for="button in currentResource[5]"
            :key="button.action"
            :elem="button"
            :model="cModel"
            :row="row"
            :index="$index"
            @dealAction="dealAction"
            :is="elemButtons[button.action]">
          </component>
        </template>
      </el-table-column>

    </el-table>
    <div style="margin-top: 0px" v-if="haveSelection">
      <el-button 
        v-for="(operationItem, operation) in selectionOperations" 
        :key="operation" 
        @click="dealSelection(operationItem)"
      >{{operationItem.name}}</el-button>
    </div>

    <pagination v-show="pageMeta.total>0" :total="pageMeta.total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />

    <!--<list-form ref="listForm" 
      @handleFilter="handleFilter" 
      :model="cModel" 
      :callEmptyLockerFormFields="callEmptyLockerFormFields" 
      :callAgvFormFields="callAgvFormFields" 
      :updateFormFields="updateFormFields" 
      :addFormFields="addFormFields" 
      :copyFormFields="copyFormFields" 
      :fieldNames="fieldNames"
      ></list-form>-->
    <list-form ref="listForm" 
      @handleFilter="handleFilter" 
      :model="cModel" 
      :formInfos="formInfos"
      :fieldNames="fieldNames"
    ></list-form>
    <!--<list-authority ref="listAuthority" @handleFilter="handleFilter" :model="cModel" :updateFormFields="updateFormFields" :fieldNames="fieldNames"></list-authority>-->
    <list-authority ref="listAuthority" @handleFilter="handleFilter" :model="cModel" :formInfos="formInfos" :fieldNames="fieldNames"></list-authority>

    <pop-table ref="popTable"></pop-table>
    <pop-point-form
      ref="popPointForm"
      @handleFilter="handleFilter" 
    ></pop-point-form>
    <pop-form 
      ref="popForm"
      @handleFilter="handleFilter" 
    ></pop-form>
    <list-view ref="listView" :fieldNames="fieldNames"></list-view>
  </div>
</template>

<script>
//import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils/base'
import ListSearch from '@/views/common/ListSearch'
import ListForm from '@/views/common/ListForm'
import ListView from '@/views/common/ListView'
import ListAuthority from '@/views/common/ListAuthority'
import PopTable from '@/views/common/PopTable'
import PopForm from '@/views/common/PopForm'
import PopPointForm from '@/views/common/PopPointForm'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {listinfo} from '@/applications/mixins/listinfo';
//import {fetchData} from '@/applications/mixins/fetchData';
import elemLists from '@/components/ElemList'
import elemButtons from '@/components/ElemButton'
import XLSX from 'xlsx';

export default {
  name: 'Default',
  mixins: [listinfo],
  components: {
    ListSearch,
    ListForm,
    ListView,
    PopForm,
    PopPointForm,
    ListAuthority,
    PopTable,
    Pagination,
  },
  directives: { waves },
  data() {
    return {
      topShowStr: '',
      appCode: this.$route.meta.app,
      modelCode: this.$route.meta.resource,
      currentAction: this.$route.meta.action,
      downloadLoading: false,
      sortElem: {},
        sonRefresh: true,
      searchFields: {},
      pageLinks: {},
      pageMeta: {total: 0},
      sceneTabs: {},
      currentSceneTab: '',
      listQuery: {
        page: 1,
        per_page: 20,
        sort_elem: {},
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listQuery = this.$route.query;
      this.listQuery.page = this.listQuery.page ? this.listQuery.page : 1;
      this.listQuery.per_page = this.listQuery.per_page ? this.listQuery.per_page : 20;
      this.listQuery.sort_elem = this.listQuery.sort_elem ? this.listQuery.sort_elem : {};
      this.listQuery.sort_elem = JSON.stringify(this.sortElem);
      //this.sortElem = {};
      this.listLoading = true
      let pParams = {};
      if (this.currentAction != 'listinfo') {
        pParams.action = this.currentAction;
      }
      this.fetchRequest(this.cModel, {query: this.listQuery, params: pParams}).then(response => {
        this.list = response.data;
        //this.updateFormFields = response.updateFormFields;
        this.formInfos = response.formInfos;
        this.ignoreOperations = response.ignoreOperations;
        this.fieldNames = response.fieldNames;
        this.pageLinks = response.links,
        this.pageMeta = response.meta,
        this.searchFields = response.searchFields,
        this.listQuery.per_page = this.pageMeta.per_page;
        this.sceneTabs = response.sceneTabs ? response.sceneTabs : {};
        this.currentSceneTab = response.currentSceneTab ? response.currentSceneTab : {};
        this.haveSelection = response.haveSelection;
        this.selectionOperations = response.selectionOperations;
        if (response.topShowStr) {
          this.topShowStr = response.topShowStr;
        }

        this.sonRefresh= false;
        this.$nextTick(() => {
          this.sonRefresh= true;
        });

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleExportStatistic() {
      this.listQuery = this.$route.query;
      let pParams = {action: 'export'};
      this.fetchRequest(this.cModel, {query: this.listQuery, params: pParams}).then(response => {
        window.open(response.data.url);
        this.$notify({
          title: '下载成功',
          message: '下载成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleExport() {
      this.listQuery = this.$route.query;
      let pParams = {action: 'export'};
      this.fetchRequest(this.cModel, {query: this.listQuery, params: pParams}).then(response => {
        let data = response.data.infos;
              console.log(data, response, 'ooooo');
        let ws = XLSX.utils.aoa_to_sheet(data);
        let wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, response.data.title + '.xlsx');
        //window.open(response.data.url);
        this.$notify({
          title: '下载成功',
          message: '下载成功',
          type: 'success',
          duration: 2000
        })
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
    getFixed: function(elem) {
      if (elem.fixed) {
        return elem.fixed;
      }
      return false;
    },
    getSortStatus: function(elem) {
      if (!elem.cansort) {
        return false;
      }
      return 'custom';
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
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .pagination-container {
  margin-top: 0 !important;
  padding: 20px 16px;
}
    /deep/ el-pagination {
  float: left;
    }
</style>
