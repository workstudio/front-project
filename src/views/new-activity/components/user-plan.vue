<template>
  <div class="userPlan">
    <!-- <div class="new-activity-list">
      <div>打卡活动</div>
    </div> -->
    <el-form :inline="true" :model="formSearch" class="steps-pops-top">
      <el-form-item label="ID：">
        <el-input v-model="formSearch.id" placeholder="请输入ID"></el-input>
      </el-form-item>
      <el-form-item label="用户：">
        <el-input v-model="formSearch.name" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="年级：">
        <el-select v-model="formSearch.grade" placeholder="请选择年级">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="item in grades"
            :key="item.label"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="领取时间：">
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

      <el-form-item>
        <el-button type="primary" @click="handleCurrentChange(1)"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="clear">重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warn" @click="backList">返回列表</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="userTable"
      v-loading="loading"
      :height="height"
      ref="table"
    >
      <el-table-column
        :label="col.name"
        :prop="col.type"
        :width="col.name == 'id' ? 80 : col.name == '名称' ? 600 : ''"
        :header-cell-stype="{ 'text-align': 'center' }"
        v-for="col in tableColumns"
        v-show="col.hidden != 1"
        :key="col.name"
      >
      </el-table-column>
      <el-table-column label="操作" width="320">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pag"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-size="20"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getPlanUser } from "@/api/plan";
export default {
  name: "newActivity",
  data() {
    return {
      formSearch: {
        id: "",
        name: "",
        grade: "",
        created_at: "",
        page: 1,
        planId: "",
      },
      dateArr: [],
      grades: [],
      tableData: [],
      tableColumns: [],
      loading: false,
      total: 0,
      currentPage: 1,
      height: 0,
      showPlan: false, // 展示计划
    };
  },
  props: {
    planId: {
      type: Number,
      default: null,
    },
  },
  created() {
    this.height = document.body.clientHeight - 300;
  },
  mounted() {
    this.getList();
    console.log(this.height, "height");
  },
  watch: {
    dateArr: function (newV, oldV) {
      console.log(newV);
      if (newV.length != 0) {
        console.log("saaa");
        this.formSearch.created_at =
          newV[0] + " 00:00:00|" + newV[1] + " 23:59:59";
      } else {
        this.formSearch.created_at = "";
      }
    },
  },
  methods: {
    getList() {
      this.loading = true;
      console.log(this.dataArr);
      if (this.dateArr.length == 0) {
        this.formSearch.created_at = "";
      }
      this.formSearch.planId = this.planId;
      getPlanUser(this.formSearch).then((res) => {
        console.log(res, "res");
        this.tableColumns = [];
        this.tableData = [];
        let gradeOpt = res.searchFields.grade_id.infos;
        this.grades = [];
        // 获取年级数据
        for (let k in gradeOpt) {
          let j = {
            label: gradeOpt[k],
            value: k,
          };
          this.grades.push(j);
        }
        let table = res.fieldNames;
        // 获取表格表头数据
        for (let j in table) {
          let json = {
            type: j,
            name: table[j].name,
            width: "",
          };
          if (json.name != "processType") {
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
      this.currentPage = val;
      this.formSearch.page = val;
      this.getList();
    },
    backList() {
      this.$emit("back", true);
    },
    // 重置
    clear() {
      this.formSearch = {
        id: "",
        name: "",
        grade: "",
        created_at: "",
        page: 1,
      };
      this.dateArr = [];
      this.getList();
    },
  },
};
</script>
<style lang="scss">
.userPlan {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  .pag {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
  // .userTable {
  //   height: calc(100% - 120px);
  //   overflow: auto;
  // }
}
</style>

