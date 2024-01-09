import {fetchData} from '@/applications/mixins/fetchData';
import elemLists from '@/components/ElemList'
import elemButtons from '@/components/ElemButton'

export const listinfo = {
  'mixins': [fetchData],
  data() {
    return {
      elemLists: elemLists,
      elemButtons: elemButtons,
      tableKey: 0,
      listLoading: true,
      dialogStatus: '',
      dialogPvVisible: false,

      //updateFormFields: {},
      formInfos: {},
      ignoreOperations: {},
      haveSelection: false,
      selectionOperations: {},
      selectionElems: {},
      dialogFormVisible: false,
      list: [],
      fieldNames: {},
    }
  },
  methods: {
    handleAuthority(datas) {
      this.$refs.listAuthority.handleAuthority(datas);
    },
    handlePopTable(elems) {
      this.$refs.popTable.handlePopTable(elems);
    },
    handlePopPointForm(elems) {
      this.$refs.popPointForm.handlePopPointForm(elems);
    },
    handlePopForm(elems) {
      this.$refs.popForm.handlePopForm(elems);
    },
    handleUpdate(row) {
      let model = this.cModel;
      if (model.fetchDetail) {
        let keyField = model.keyField;
        model.$get({params: {keyField: row[keyField].valueSource}}).then(response => {
          if (response === false) {
            this.$notify({
              title: '错误',
              message: '信息有误',
              type: 'error',
              duration: 2000
            });
            return ;
          }
          this.$refs.listForm.handleUpdate(response.data);
        })
      } else {
        this.$refs.listForm.handleUpdate(row);
      }
    },
    handleView(row) {
      let model = this.cModel;
      if (model.fetchDetail) {
        let keyField = model.keyField;
        model.$get({params: {keyField: row[keyField].valueSource}}).then(response => {
          if (response === false) {
            this.$notify({
              title: '错误',
              message: '信息有误',
              type: 'error',
              duration: 2000
            });
            return ;
          }
          this.$refs.listView.handleView(response.data);
        })
      } else {
        this.$refs.listView.handleView(row);
      }
    },
    dealTopAction(params) {
      let actionType = params.actionType;
      return this.$refs.listForm.handleCommonForm(params);
    },
    dealAction(params) {
      let actionType = params.actionType;
  	  switch (actionType) {
      case 'authority':
        return this.handleAuthority(params.datas);
        break;
      case 'update':
        return this.handleUpdate(params.datas);
        break;
      case 'view':
        return this.handleView(params.datas);
        break;
      case 'delete':
        return this.handleFilter();
        break;
      case 'popTable':
        return this.handlePopTable(params.datas);
        break;
      case 'popForm':
        return this.handlePopForm(params.datas);
        break;
      case 'popPointForm':
        return this.handlePopPointForm(params);
        break;
      }
    },
    handleSelectionChange: function(selectionElems) {
      this.selectionElems = selectionElems;
    },
    dealSelection(operation, rowData) {
      let formatedSelected = [];
      let sField = operation.pointSelectField ? operation.pointSelectField : 'id';
      for (let pKey in this.selectionElems) {
        formatedSelected.push(this.selectionElems[pKey][sField].value);
      }
      //let actionType = operation.
      switch (operation.operation){
        case 'select':
          this.$emit("dealSelection", this.selectionElems);
          this.dialogPopTableVisible = false;
          break;
        case 'popPointForm':
          this.dealAction({actionType: 'popPointForm', selectElem: formatedSelected, operation: operation});
          break;
        case 'api':
          let dModel = this.getModel(operation.app, operation.resource);
          let data = operation.defaultParams;
          let params = {};
          if (operation.action) {
            params.action = operation.action;
          }
          let actionMethod = operation.method ? operation.method : 'get';
          for (let pKey in operation.pointParams) {
            let dpField = operation.pointParams[pKey];
            if (actionMethod == 'get') {
              params[dpField] = rowData[dpField].value;
            } else {
              data[dpField] = rowData[dpField].value;
            }
          }
          data.select_elems = formatedSelected;
          if (actionMethod == 'get') {
            params.select_elems = formatedSelected;
          }

          if (actionMethod == 'get') {
          dModel.$fetch({query: params, params: params}).then(response => {
            if (response === false) {
              return ;
            }
            //this.list.unshift(this.inputInfos)
            this.dialogFormVisible = false
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 10000
            });
            if (operation.dealed == 'closePopTable') {
              this.dialogPopTableVisible = false;
            }
          })
          } else {
          dModel.$create({params: params, data: data}).then(response => {
            if (response === false) {
              return ;
            }
            //this.list.unshift(this.inputInfos)
            this.dialogFormVisible = false
            this.$notify({
              title: '操作成功',
              message: '操作成功',
              type: 'success',
              duration: 10000
            });
            if (operation.dealed == 'closePopTable') {
              this.dialogPopTableVisible = false;
            }
          })
          break;
        }
      }
    },
  }
}
