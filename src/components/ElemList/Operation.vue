<template>
  <div>
  <span v-for="operation in operations">
  <el-popconfirm v-if="operation.popconfirm" :title="operation.poptitle" @onConfirm="handleOperation(operation)"
>
  <span slot="reference" type="primary" style="margin-left: 5px;font-size:12px;color:red">
    {{operation.name}}</span>
  </el-popconfirm>
  <el-link v-else type="primary" style="margin-left: 5px;font-size:12px" @click="handleOperation(operation)">{{operation.name}}</el-link>
  </span>
    <el-dialog
      title="查看货区 / 货位2"
      :visible.sync="dialogVisible"
      width="90%"
    >

  <div id="app">
    <!-- 表格部分 -->
    <el-table
      ref="table"
      :data="tableData"
      @filter-change="_filterChange"
      border
    >
      <template v-for="(item, index) in dataList">
        <el-table-column
          sortable
          :show-overflow-tooltip="true"
          :key="index"
          :label="item.label"
          align="center"
          :prop="item.value"
          :filter-multiple="true"
          :filters="filterData(item)"
          :filter-method="filterTag"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import {button} from '@/applications/mixins/button';
import {fetchData} from '@/applications/mixins/fetchData';
export default {
  mixins: [fetchData, button],
  data() {
    return {
      //actionType: 'popTable',
      dialogVisible: false,
      tableData: [],
      dataList: [
        {
          label: "仓库",
          value: "warehouse_no",
        },
        {
          label: "货区",
          value: "zone_no",
        },
        {
          label: "库位",
          value: "position_no",
        },
        {
          label: "库存量",
          value: "stock_num",
        },
      ],
    }
  },
  computed: {
    operations() {
      return this.row[this.field].operations;
    },

    filterData() {
      return function (data) {
        let obj = [];
        //找到对应的数据 并添加到obj
        this.tableData.filter((item) => {
          obj.push({
            text: item[data.value],
            value: item[data.value],
          });
        });
        //因为column有重复数据，所以要进行去重
        return this.deWeight(obj);
      };
    },
  },
  methods: {
    handleOperation(operation) {
      let oType = operation.type ? operation.type : false;
      if (!oType) {
        return ;
      }
      if (oType == 'newRoute') {
        this.$store.dispatch('permission/checkJumpPath', operation).then((response) => {
          let jumpPath = response.jumpPath;
          if (!jumpPath) {
             this.$message.error("无法操作");
          } else {
            this.$router.push({path: jumpPath, query: operation.params});
          }
        });
        return ;
      } else if (oType == 'api') {
        let model = this.getModel(operation.app, operation.resource);
        this.fetchRequest(model, {query: operation.params, params: {action: operation['action']}}).then(response => {
          
          let responseType = response.data.type;
          switch (responseType) {
            case 'newPage':
              window.open(response.data.url, '_blank');
            break;
            default:
              let message = response.data.message ? response.data.message : '操作成功';
              this.$message({message: message, type: 'success'})
              this.$emit('handleFilter');
          }
        })
      } else if (oType == 'link') {
        window.open(operation.url, '_blank');
      } else if (oType == 'popAreaInfo') {
        this.dialogVisible = true;
        let model = this.getModel(operation.app, operation.resource);
        this.fetchRequest(model, {query: operation.params, params: {action: operation['action']}}).then(response => {
          let areaInfos = response.data;
          this.tableData = areaInfos.data;
        })
      } else {
        this.actionType = oType;
        this.dealAction({row:this.row, operation: operation});
      }
    },

    //返回符合条件的数据
    // 参数分别是：选中的条件 、当前行 、当前列
    filterTag(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 数组对象去重
    deWeight(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].text == arr[j].text) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
    _filterChange() {
      this.totalSize = this.$refs.table.tableData.length;
      console.log(this.totalSize);
    },
  },
}
</script>
