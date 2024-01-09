<template>
  <div>
    <div class="filter-container">
      <el-form ref="searchForm" :model="formatSearchFields" :inline="true">
      <component
        v-for="(searchField, field) in searchFields"
        :key="field"
        :field="field"
        :ref="'searchform_' + field"
        :listQuery.sync="listQuery"
        :elem="searchField"
        @dealAction="dealAction"
        :is="elemSearchs[searchField.type]">
      </component>
      <br />
      <component
        v-if="Object.keys(searchFields).length!=0"
        key="search"
        @dealAction="dealAction"
        @resetForm="resetForm"
        :is="elemButtons.search">
      </component>
      <el-divider style="height:100px" direction="vertical"></el-divider>
      <component
        v-for="button in currentResource[4]"
        :key="button.action"
        :elem="button"
        :model="model"
        @dealAction="dealAction"
        @dealTopAction="dealTopAction"
        :is="elemButtons[button.action]">
      </component>
      </el-form>
    </div>
  <el-tabs v-model="activeSceneName" type="card" @tab-click="handleClickScene">
    <el-tab-pane v-for="(sceneCode, sceneName) in sceneTabs" :key="sceneCode" :label="sceneCode" :name="sceneName"></el-tab-pane>
  </el-tabs>
    {{test}}
  </div>
</template>
<script>
import elemButtons from '@/components/ElemButton'
import elemSearchs from '@/components/ElemSearch'
import _ from "lodash"

export default {
  name: 'ListSearch',
  data() {
    return {
      elemSearchs: elemSearchs,
      elemButtons: elemButtons,
      activeSceneName: 'list',
      firstQuery: {},
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
    }
  },
  props:{                     
    model: {type: Function},  
    searchFields: {type: Object},
    listQuery: {type: Object},
    sceneTabs: {type: Object},
    currentResource: {type: Object},
  },
  mounted() {
    this.firstQuery = _.cloneDeep(this.$route.query);
  },
  computed: {
    test() {
      console.log(this.currentResource, 'rrrrrrrrrrrrrr');
    },
    formatSearchFields() {
      for (let pKey in this.searchFields) {
        if (this.listQuery[pKey]) {
          this.searchFields[pKey]['value'] = this.listQuery[pKey];
          this.searchFields[pKey]['sourceValue'] = this.listQuery[pKey];
        }
      }
    }
  },
  methods: {
    handleClickScene() {
      this.listQuery.page = 1
      this.listQuery.point_scene = this.activeSceneName;
      return this.$emit('handleFilter');
      //console.log('cccc-scene', this.activeSceneName, scene.value, scene);
    },
    dealTopAction(params) {
      return this.$emit('dealTopAction', params);
    },
    dealAction(params) {
      let actionType = params.actionType;
  	  switch (actionType) {
      case 'exportStatistic':
        return this.$emit('handleExportStatistic');
        break;
      case 'export':
        return this.$emit('handleExport');
        break;
      case 'search':
        this.listQuery.page = 1
        return this.$emit('handleFilter');
        break;
      }
    },
    resetForm(formName) {
      for (let pKey in this.searchFields) {
        let defaultValue = this.firstQuery[pKey] ? this.firstQuery[pKey] : null;
        this.$refs['searchform_' + pKey][0].setDefaultValue(defaultValue);
      }
      this.listQuery.page = 1
      return this.$emit('handleFilter');
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
  }
}
</script>
