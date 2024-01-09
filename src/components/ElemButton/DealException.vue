<template>
  <span>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleDealException">
      {{elem.name}}
    </el-button>
    <el-dialog
      title="处理异常出库单"
      :visible.sync="dialogVisible"
      width="90%"
    >
    <div v-if="exceptionMark">
      <span style="color:green">库存不足分配异常订单
      <span >
        <el-button type="primary" @click="restoreDispatch">已紧急补充库存，重新分配AGV任务</el-button>
      </span>
    </span>
    <el-table
      :data="exceptionOrders"
      style="width: 100%">
      <el-table-column prop="orderid_code" label="出库单" width="200">
        <template slot-scope="scope"><div v-html="scope.row.orderid_code"></div></template>
      </el-table-column>
      <el-table-column prop="exception_material" label="库存不足物料" width="580">
        <template slot-scope="scope"><div v-html="scope.row.exception_material"></div> </template>
      </el-table-column>
      <el-table-column prop="normal_material" label="正常物料" width="580">
        <template slot-scope="scope"><div v-html="scope.row.normal_material"></div></template>
      </el-table-column>
    </el-table>
    </div>
    <hr />
    <hr />
    <div>
      <span style="color:green">剩余绿灯数量: <span style="color:red">{{greenCount}}</span>
      <span v-if="greenCount <= 50">
        <el-button type="primary" @click="lightGreen">点亮绿灯</el-button>
      </span>
    </span>
    <el-table
      :data="taskDetailPutoutDatas"
      style="width: 100%">
      <el-table-column prop="orderid_code" label="出库单" width="180"></el-table-column>
      <el-table-column prop="seed_wall_code" label="播种墙" width="180"></el-table-column>
      <el-table-column prop="workstation_number" label="工作站" width="180"></el-table-column>
      <el-table-column prop="material_code" label="物料代码" width="180"></el-table-column>
      <el-table-column prop="material_name" label="物料名称" width="180"></el-table-column>
      <el-table-column prop="material_barcode" label="物料条码" width="180"></el-table-column>
      <el-table-column prop="locker_code" label="料箱号" width="180"></el-table-column>
      <el-table-column prop="robot_job_id" label="任务号" width="180"></el-table-column>
      <el-table-column prop="seed_wall_code" label="播种墙任务号" width="180"></el-table-column>
      <el-table-column prop="created_at" label="分配时间" width="180"></el-table-column>
    </el-table>
    </div>

    </el-dialog>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
import {fetchData} from '@/applications/mixins/fetchData'

export default {
  mixins: [button, fetchData],
  data() {
    return {
      greenCount: 0,
      lackCount: 0,
      defaultDisabled: true,
      taskDetailPutoutDatas: [],
      seedWallPutouts: [],
      exceptionMark: false,
      exceptionOrders: [],
      dialogVisible: false,
      actionType: 'dealException',
    }
  },
  mounted() {
    //this.getTaskDetailPutouts();
    //this.getWorkstations();
  },
  methods: {
    handleDealException() {
      this.dialogVisible = true;
      this.getTaskDetailPutouts();
    },
    getTaskDetailPutouts() {
      let model = this.getModel('wmsystem', 'taskDetailPutout');
      model.$fetch({params: {action: 'listUnreachable'}}).then(response => {
        this.taskDetailPutoutDatas = response.data.infos;
        this.greenCount = response.data.greenCount;
        this.exceptionMark = response.data.exceptionMark;
        this.exceptionOrders = response.data.exceptionOrders;
      })
    },
    restoreDispatch() {
      this.$confirm('确定要恢复订单分配槽位吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let model = this.getModel('wmsystem', 'seedWallPutout');
          model.$create({params: {action: 'restoreDispatch'}, data: {}}).then(response => {
          this.$message({
            type: 'success',
            message: '成功恢复' + response.data.count + '个槽位订单的分配!'
          });
          this.dialogVisible = false;
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消点重新分配'
        });          
      });
    },
    lightGreen() {
      this.$confirm('危险操作，确定要点亮绿灯吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let model = this.getModel('wmsystem', 'taskDetailPutout');
          model.$create({params: {action: 'lightGreen'}, data: {}}).then(response => {
          this.$message({
            type: 'success',
            message: '成功点亮' + response.data.count + '绿等!'
          });
          this.dialogVisible = false;
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消点亮'
        });          
      });
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
</style>
