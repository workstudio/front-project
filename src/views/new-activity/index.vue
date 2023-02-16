<template>
  <div class="new-activity">
    <!-- <div class="new-activity-list">
      <div>打卡活动</div>
    </div> -->
    <el-form :inline="true" :model="formSearch" class="steps-pops-top">
      <el-form-item label="ID：">
        <el-input v-model="formSearch.id" placeholder="请输入ID"></el-input>
      </el-form-item>
      <el-form-item label="名称：">
        <el-input v-model="formSearch.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="创建日期：">
        <el-date-picker
          v-model="dateArr"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="formSearch.status"
          clearable
          placeholder="请选择类型"
        >
          <el-option label="已上线" :value="1"></el-option>
          <el-option label="未上线" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleCurrentChange(1)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="addPlan">添加计划</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      v-loading="loading"
      :max-height="700"
      ref="table"
    >
      <el-table-column
        :label="col.name"
        :prop="col.type"
        :width="
          col.name == 'ID' || col.name == '状态'
            ? 80
            : col.name == '名称'
            ? 200
            : col.name == '适用年级'
            ? 200
            : col.name == '创建时间'
            ? 200
            : ''
        "
        :header-cell-stype="{ 'text-align': 'center' }"
        v-for="col in tableColumns"
        v-show="col.hidden != 1"
        :key="col.name"
      >
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-if="scope.row.status == '未上线'"
            >编辑</el-button
          >
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            v-else
            >详情</el-button
          >
          <el-button size="mini" @click="changeStatus(scope.row)">{{
            scope.row.status == "未上线" ? "上线" : "下线"
          }}</el-button>
          <el-button
            size="mini"
            type="danger"
            v-if="scope.row.status == '未上线'"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="showUser(scope.$index, scope.row)"
            >数据</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination
      class="plan-pag"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="handleCurrentChange"
      :page-size="10"
    >
    </el-pagination> -->
    <plan @back="hidePlan" v-if="showPlan" :planId="dealId"></plan>
    <user @back="hidePlan" v-if="showUserplan" :planId="dealId"></user>
  </div>
</template>
<script>
import plan from "./plan.vue";
import user from "./components/user-plan.vue";
import { getPlanList, deletePlan, emitPlan } from "@/api/plan";
export default {
  name: "newActivity",
  components: { plan, user },
  data() {
    return {
      formSearch: {
        id: "",
        name: "",
        created_at: "",
        status: "",
      },
      dateArr: [],
      tableData: [],
      tableColumns: [],
      loading: false,
      total: 0,
      showPlan: false, // 展示计划
      showUserplan: false, // 展示用户表单
      dealId: null,
    };
  },
  watch: {
    dateArr: function (newV, oldV) {
      console.log(newV);
      if (newV) {
        this.formSearch.created_at =
          newV[0] + " 00:00:00|" + newV[1] + " 23:59:59";
      } else {
        this.formSearch.created_at = "";
      }
    },
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      if (this.dateArr.length == 0) {
        this.formSearch.created_at = "";
      }
      getPlanList(this.formSearch).then((res) => {
        console.log(res, "res");
        this.tableColumns = [];
        this.tableData = [];
        let table = res.fieldNames;
        // 获取表格表头数据
        for (let j in table) {
          let json = {
            type: j,
            name: table[j].name,
            width: "",
          };
          if (
            json.name != "processType" &&
            json.name != "计划方式" &&
            json.name != "学习计划介绍"
          ) {
            this.tableColumns.push(json);
          }
        }
        // 获取表格内容数据
        let tableInfo = res.data;
        tableInfo.map((item) => {
          let form = {};
          for (let key in item) {
            form[key] = item[key].value;
          }
          this.tableData.push(form);
        });
        // 分页
        this.total = res.meta.total;
        this.loading = false;
      });
    },
    //
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    changeStatus(data) {
      emitPlan(
        { id: data.id, status: data.status == "未上线" ? 1 : 0 },
        "status"
      ).then((res) => {
        console.log(res, "sta");
        this.getList();
      });
    },
    addPlan() {
      this.showPlan = true;
      this.dealId = null;
      window.localStorage.removeItem("read");
    },
    showUser(i, row) {
      this.dealId = row.id;
      this.showUserplan = true;
    },
    handleEdit(i, row) {
      console.log(i, row);
      this.dealId = row.id;
      this.showPlan = true;
      if (row.status == "未上线") {
        window.localStorage.removeItem("read");
      } else {
        window.localStorage.setItem("read", "yes");
      }
    },
    handleDelete(i, row) {
      this.$confirm("即将删除，是否确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePlan(row.id).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              this.getList();
            } else {
              this.$message({
                type: "info",
                message: "删除失败",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    hidePlan() {
      this.showPlan = false;
      this.showUserplan = false;
      this.clear();
      this.getList();
    },
    // 重置
    clear() {
      this.formSearch = {
        id: "",
        name: "",
        created_at: "",
        status: "",
      };
      this.dateArr = [];
      this.getList();
    },
  },
};
</script>
<style lang="scss">
.new-activity {
  padding: 30px 40px;
  .el-select {
    width: 100%;
    .el-input {
      width: 100%;
    }
  }
  .plan-pag {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
}
.planTextarea {
  .el-textarea__inner {
    height: 160px;
  }
}
.el-table {
  &::before {
    height: 0;
  }
}
.questions {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    line-height: 178px;
    font-size: 30px;
    width: 100%;
    height: 100%;
    &:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader {
    width: 178px;
    height: 178px;
    margin-top: 20px;
    margin-right: 20px;
    display: block;
  }
}
.el-table::before {
  display: none;
}
</style>

