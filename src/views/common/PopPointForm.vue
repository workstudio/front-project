<template>
  <div>
    <el-dialog 
      :visible.sync="popPointFormVisible" 
      :destroy-on-close="destroyOnClose" 
      :title="popTitle" 
      width="90%" 
      :append-to-body="appendToBody"
    >
      <el-form 
        v-if="popPointFormVisible"
        ref="popPointForm"
        label-width="80px"
        class="putinForm"
        label-position="left"
      >
        <el-form-item label="工作站" style="margin-bottom: 6px;" >
          <el-select
            v-model="workstation_code"
            filterable
            reserve-keyword
            placeholder="工作站代码"
            clearable 
            >
            <el-option
              v-for="(item, key) in workstationDatas"
              :key="key"
              :label="item"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>

        <hr />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {fetchData} from '@/applications/mixins/fetchData';
import elemForms from '@/components/ElemForm'

export default {
  'mixins': [fetchData],
  name: 'ListForm',
  data() {
    return {
      workstation_code: '',
      workstationDatas: {},
      selectElem: {},
      operationData: {},
      popTitle: '',
      destroyOnClose: false,
      popPointFormVisible: false,
    }
  },
  computed: {
    rules() {
      return this.addFormFields;
    },
  },
  props:{
    appendToBody: {type: Boolean, default: false}
  },
  methods: {
    handlePopPointForm(params) {
        console.log('ppppppppppppaaaaaaaa', params);
      this.operationData = params.operation;
      this.popPointFormVisible = true
      this.popTitle = this.operationData.name;
      this.selectElem = params.selectElem;
      this.workstationDatas = this.operationData.defaultParams.workstationDatas;
    },
    onSubmit() {
      if (!this.workstation_code) {
        this.$notify({title: '工作站不能为空', message: '工作站不能为空', type: 'error', duration: 1000});
        return ;
      }
      this.model = this.getModel(this.operationData.app, this.operationData.resource);
      let qParams = {workstation_code: this.workstation_code, select_elems: this.selectElem};
      console.log('qqqqpp', qParams);
      this.model.$fetch({params: {action: this.operationData['action']}, query: qParams}).then(response => {
        if (response === false) {
          return ;
        }

        this.$notify({
          title: '操作成功',
          message: '操作成功',
          type: 'success',
          duration: 2000
        });
        this.popPointFormVisible = false;

        return ;
      })
    },
  }
}
</script>
