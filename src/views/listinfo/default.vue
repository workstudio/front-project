<template>
  <div class="app-container">
    <list-search @handleAdd="handleAdd" @handleCopy="handleCopy" @handleFilter="handleFilter" :currentResource="currentResource" :searchFields="searchFields" :listQuery="listQuery" :model="cModel"></list-search>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange"
    >

      <el-table-column v-if="haveSelection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column v-for="(fieldItem, field) in fieldNames" :key="field" :align="fieldItem.align" :min-width="fieldItem.width" :label="fieldItem.name" :prop="field" :sortable="getSortStatus(fieldItem)" :class-name="getSortClass(field)" v-if="fieldItem.hidden!=1">
        <template slot-scope="{row}">
          <component
            :row="row"
            :field="field"
            :fieldItem="fieldItem"
            :model="cModel"
            @dealAction="dealAction"
            v-if="sonRefresh"
            :is="elemLists[row[field].showType]">
          </component>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.actions')" align="center" min-width="180" class-name="small-padding fixed-width" v-if="currentResource[5]">
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
    <div style="margin-top: 20px" v-if="haveSelection">
      <el-button v-for="(operationItem, operation) in selectionOperations" :key="operation" @click="dealSelection(operationItem)">{{operationItem.name}}</el-button>
    </div>

    <pagination v-show="pageMeta.total>0" :total="pageMeta.total" :page.sync="listQuery.page" :limit.sync="listQuery.per_page" @pagination="getList" />

    <list-form ref="listForm" @handleFilter="handleFilter" :model="cModel" :updateFormFields="updateFormFields" :addFormFields="addFormFields" :copyFormFields="copyFormFields" :fieldNames="fieldNames"></list-form>
    <list-authority ref="listAuthority" @handleFilter="handleFilter" :model="cModel" :updateFormFields="updateFormFields" :fieldNames="fieldNames"></list-authority>

    <pop-table ref="popTable"></pop-table>
    <pop-form ref="popForm"></pop-form>
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
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {listinfo} from '@/applications/mixins/listinfo';
//import {fetchData} from '@/applications/mixins/fetchData';
import elemLists from '@/components/ElemList'
import elemButtons from '@/components/ElemButton'

export default {
  name: 'Default',
  mixins: [listinfo],
  components: {
    ListSearch,
    ListForm,
    ListView,
    PopForm,
    ListAuthority,
    PopTable,
    Pagination,
  },
  directives: { waves },
  data() {
    return {
      appCode: this.$route.meta.app,
      modelCode: this.$route.meta.resource,
      downloadLoading: false,
      sortElem: {},
        sonRefresh: true,
      searchFields: {},
      pageLinks: {},
      pageMeta: {total: 0},
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
      this.sortElem = {};
      this.listLoading = true
      let currentAction = this.$route.meta.action;
      let pParams = {};
      if (currentAction != 'listinfo') {
        pParams.action = currentAction;
      }
      this.fetchRequest(this.cModel, {query: this.listQuery, params: pParams}).then(response => {
        this.list = response.data;
        this.addFormFields = response.addFormFields;
        this.copyFormFields = response.copyFormFields;
        this.updateFormFields = response.updateFormFields;
        this.fieldNames = response.fieldNames;
        this.pageLinks = response.links,
        this.pageMeta = response.meta,
        this.searchFields = response.searchFields,
        this.listQuery.per_page = this.pageMeta.per_page;
        this.haveSelection = response.haveSelection;
        this.selectionOperations = response.selectionOperations;

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
    getSortStatus: function(elem) {
      if (elem.nosort) {
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
