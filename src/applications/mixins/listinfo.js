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

      addFormFields: {},
      copyFormFields: {},
      updateFormFields: {},
      haveSelection: false,
      selectionOperations: {},
      selectionElems: {},
      dialogFormVisible: false,
      list: [],
      fieldNames: {},
    }
  },
  methods: {
    handleCopy() {
      this.$refs.listForm.handleCopy();
    },
    handleAdd() {
      this.$refs.listForm.handleAdd();
    },
    handleAuthority(datas) {
      this.$refs.listAuthority.handleAuthority(datas);
    },
    handlePopTable(elems) {
      this.$refs.popTable.handlePopTable(elems);
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
      }
    },
    handleSelectionChange: function(selectionElems) {
      this.selectionElems = selectionElems;
    },
    dealSelection(operation) {
      //let actionType = operation.
      switch (operation.operation){
        case 'select':
          this.$emit("dealSelection", this.selectionElems);
          this.dialogPopTableVisible = false;
          break;
      }
    }
  }
}
