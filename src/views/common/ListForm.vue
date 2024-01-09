<template>
  <div>
    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" :destroy-on-close="destroyOnClose" width="90%">
      <el-form v-if="dialogFormVisible" ref="dataForm" :rules="rules" :model="inputInfos" label-position="left" label-width="150px" style="width: 800px; margin-left:30px;">
        <component
          v-for="(formField, field) in formFields"
          v-if="loadSurvey"
          :ref="'upload-' + field"
          :key="field"
          :field="field"
          :model="model"
          :value="getCurrentValue(field)"
          @beforeUpload="beforeUpload"
          :elem="formField"
          :inputInfos.sync="inputInfos"
          :is="elemForms[formField.type]">
        </component>
        <!--<span v-for="(item, index) in formFields" :key="index">
            {{index}}-{{item.type}}-{{fieldNames[index]}}
        </span>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button type="primary" @click="clickMethod">
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import localCache from '@/applications/common/LocalCache'
import {fetchData} from '@/applications/mixins/fetchData';
import elemForms from '@/components/ElemForm'

export default {
  name: 'ListForm',
  'mixins': [fetchData],
  data() {
    return {
      elemForms: elemForms,
      fileData: [],

      //radio: 3,
      //input: '',
      dialogStatus: '',
      dialogFormVisible: false,
      formTitle: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      uploadFileData: {},
      formType: 'add',
      currentFormInfo: {},
      destroyOnClose: false,
      loadSurvey: true,
      currentRow: {},
      currentRowSource: {},
      inputInfos: {},
      /*rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },*/
      //inputExts: {},
      /*inputInfos: {
        id: undefined,
        importance: 1,
        controller: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },*/
    }
  },
  computed: {
    formFields() {
      return this.currentFormInfo ? this.currentFormInfo['formFields'] : {};
      /*if (this.formType == 'update') {
        return this.updateFormFields;
      }*/
    },
    rules() {
      if (this.formType == 'update') {
        return this.updateFormFields;
      }
      return this.addFormFields;
    },
    /*inputInfos() {
      let data = {};
      for (let field in this.formFields) {
        let item = this.formFields[field];
        data[field] = item.defaultValue ? item.defaultValue : '';
      }
      return data;
    }*/
  },
  props:{
    elem: {type: Object},
    model: {type: Function},  
    //info: {type: Object},     
    //updateFormFields: {type: Object},
    formInfos: {type: Object},
    fieldNames: {type: Object},
    title: {type: String, default: ''},
    //showBack: {type: String, default: ''},
  },
  methods: {
    getCurrentValue(field) {
      return this.currentRow[field] ? this.currentRow[field].value : '';
    },
    handleCommonForm(sourceParams) {
      //this.$refs['dataForm'].resetFields();
      //this.resetTemp()
      this.formType = sourceParams.actionType;
      this.currentFormInfo = this.formInfos[this.formType];

      this.formTitle = this.currentFormInfo ? this.currentFormInfo.title : '表单';
      this.dialogFormVisible = true
      for (let field in this.formFields) {
        let item = this.formFields[field];
        this.inputInfos[field] = item.defaultValue ? item.defaultValue : '';
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    commonFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
            return ;
        }
        //let formFields = this.formType == 'copy' ? this.copyFormFields : this.addFormFields;
        let {data, fileData, params} = this.model.formatAddDirtData(this.inputInfos, this.formFields);
        if (this.formType !== 'add') {
          params.action = this.formType;
        }

        if (params.action == 'import') {
          let pointUrl = this.model.currentBaseUrl() + '/' + params.action;
          return this.importFormSubmit(this, pointUrl, params, data);
        }
        this.model.$create({headers: {'Content-Type': 'multipart/form-data'},params: params, data: data}).then(response => {
          if (response === false) {
            return ;
          }
          //this.list.unshift(this.inputInfos)
          this.dialogFormVisible = false
          let responseTitle = this.currentFormInfo.responseTitle ? this.currentFormInfo.responseTitle : '成功';
          let responseMessage = this.currentFormInfo.responseMessage ? this.currentFormInfo.responseMessage : '操作成功';
          this.$notify({
            title: responseTitle,
            message: responseMessage,
            type: 'success',
            duration: 2000
          });
          if (!this.baseMethod.emptyObject(fileData)) {
            let keyField = this.model.keyField;
            let keyValue = response.data[keyField];
            this.updateAttachmentInfo(keyValue, fileData, this.addFormFields);
          }
          if (this.formType == 'setLack' || this.formType == 'setFewbuy' || this.formType == 'setHotbuy') {
            location.reload();
          } else {
            return this.$emit('handleFilter');
          }
        })
      })
    },
    handleUpdate(row) {
      this.currentRow = row;
      this.currentRowSource = this.baseMethod.cloneObj(row);
      //this.inputInfos.timestamp = new Date(this.inputInfos.timestamp)
      this.destroyOnClose = true;
      this.formType = 'update';
      this.currentFormInfo = this.formInfos[this.formType];
      //this.inputInfos = Object.assign({}, row) // copy obj
      let data = {};
      for (let field in row) {
        let item = row[field];
        this.inputInfos[field] = item.valueSource || item.valueSource === 0 || item.valueSource === '0' ? item.valueSource : '';
      }
      this.dialogStatus = 'update';
      this.formTitle = this.updateFormTitle ? this.updateFormTitle : '编辑';
      this.formTitle += this.updateFormField ? ' ' + row[this.updateFormField] : '';
      this.dialogFormVisible = true
      this.loadSurvey = false;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.loadSurvey = true;
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let keyField = this.model.keyField;
          let keyValue = this.currentRowSource[keyField].valueSource;
          //tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          let {data, fileData} = this.model.formatDirtData(this.inputInfos, this.currentRowSource, this.formFields);
          this.fileData = fileData;
          if (!this.baseMethod.emptyObject(fileData)) {
            this.updateAttachmentInfo(keyValue, fileData, this.formFields);
          }
          if (!this.baseMethod.emptyObject(data)) {
          this.model.$update({params: {keyField: keyValue, action: 'update'}, data: data}).then(response => {
            if (response === false) {
              return ;
            }
            //const index = this.list.findIndex(v => v.id === this.inputInfos.id)
            //this.list.splice(index, 1, this.inputInfos)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            return this.$emit('handleFilter');
          })
          } 
        }
      })
    },
    clickMethod() {
      if (this.formType == 'update') {
        return this.updateData();
      }
      return this.commonFormSubmit();
    },

    /*handleAdd() {
      //this.$refs['dataForm'].resetFields();
      //this.resetTemp()
      this.dialogStatus = 'add';
      this.formTitle = this.addFormTitle ? this.addFormTitle : '添加';
      this.formType = 'add'
      this.dialogFormVisible = true
      for (let field in this.formFields) {
        let item = this.formFields[field];
        this.inputInfos[field] = item.defaultValue ? item.defaultValue : '';
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addData() {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
            return ;
        }
        let formFields = this.formType == 'copy' ? this.copyFormFields : this.addFormFields;
        let {data, fileData, params} = this.model.formatAddDirtData(this.inputInfos, formFields);
        this.model.$create({params: params, data: data}).then(response => {
          if (response === false) {
            return ;
          }
          //this.list.unshift(this.inputInfos)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
          if (!this.baseMethod.emptyObject(fileData)) {
            let keyField = this.model.keyField;
            let keyValue = response.data[keyField];
            this.updateAttachmentInfo(keyValue, fileData, this.addFormFields);
          }
          return this.$emit('handleFilter');
        })
      })
    },*/
  }
}
</script>
