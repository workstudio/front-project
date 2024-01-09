<template>
  <div>
    <el-dialog 
      :visible.sync="popFormVisible" 
      :destroy-on-close="destroyOnClose" 
      :title="popTitle" 
      width="90%" 
      :append-to-body="appendToBody"
    >
      <el-form ref="dataForm" v-if="popFormVisible" :rules="rules" :model="inputInfos" label-position="left" label-width="150px" style="width: 800px; margin-left:30px;">
        <component
          v-for="(formField, field) in formFields"
          v-if="loadSurvey"
          :key="field"
          :field="field"
          :ref="'upload-' + field"
          :elem="formField"
          @beforeUpload="beforeUpload"
          :inputInfos.sync="inputInfos"
          :is="elemForms[formField.type]">
        </component>
        <!--<span v-for="(item, index) in formFields" :key="index">
            {{index}}-{{item.type}}-{{fieldNames[index]}}
        </span>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="popFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" :disabled="buttonDisabled" @click="addData()">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
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
      elemForms: elemForms,
      fileData: [],
      formFields: {},
      popTitle: '',
      buttonDisabled: false,

      //radio: 3,
      //input: '',
      dialogStatus: '',
      operationData: {},
      popFormVisible: false,
      importDeal: false,
      textMap: {
        create: 'Create'
      },
      destroyOnClose: false,
      loadSurvey: true,
      currentRow: {},
      inputInfos: {},
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
    handlePopForm(params) {
      this.popFormVisible = true
      this.buttonDisabled = false;
      let row = params.row;
      this.inputInfos = {};
      this.formFields = {};
      this.operationData = params.operation;
      this.popTitle = this.operationData.params.popTitle ? this.operationData.params.popTitle : this.operationData.name;
      this.model = this.getModel(this.operationData.app, this.operationData.resource);
      this.model.$create({params: {action: this.operationData['action']}, data: this.operationData.params}).then(response => {
        if (response === false) {
          return ;
        }
        this.formFields = response.data.formFields;
        this.fieldNames = response.data.fieldNames;
        for (let field in this.formFields) {
          let item = this.formFields[field];
          this.inputInfos[field] = item.defaultValue ? item.defaultValue : '';
        }

        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })

        return ;
      })
    },
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
            return ;
        }
        let inputDatas = this.model.formatAddDirtData(this.inputInfos, this.formFields, this.getModel('passport', 'attachmentInfo'));
        let data = inputDatas.data;
        data.do_operation = 1;
        data = Object.assign(data, this.operationData.params);
        if (this.operationData.params.isImport) {
          let pointUrl = this.model.currentBaseUrl() + '/' + this.operationData.action;
          let importResult = this.importFormSubmit(this, pointUrl, inputDatas.params, data);
          return true;
        }
        this.buttonDisabled = true;
        this.model.$create({params: {action: this.operationData['action']}, data: data}).then(response => {
          if (response === false) {
            this.buttonDisabled = false;
            return ;
          }
          //this.list.unshift(this.inputInfos)
          this.popFormVisible = false
          this.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          });
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
          return this.$emit('handleFilter');
        })
      })
    },
  }
}
</script>
