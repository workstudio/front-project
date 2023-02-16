<template>
  <div class="classify">
    <div class="classify-top">
      <el-button type="primary" @click="addDialog(0, 0)"
        >添加一级类目</el-button
      >
    </div>
    <div class="classify-table">
      <el-table
        :data="dataList"
        row-key="id"
        :default-expand-all="false"
        border
        fit
        v-loading="loading"
        :max-height="tableHeight"
        :row-class-name="rowClass"
        :tree-props="{
          children: 'children',
          hasChildren: 'hasChildren',
        }"
      >
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="pid" label="层级">
          <template slot-scope="scope">
            {{
              scope.row.level == 1
                ? "一级类目"
                : scope.row.level == 2
                ? "二级类目"
                : "三级类目"
            }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="role_id" label="适用角色">
          <template slot-scope="scope">
            {{
              scope.row.role_id == 0
                ? "老师"
                : scope.row.role_id == 1
                ? "学生"
                : ""
            }}
          </template></el-table-column
        >
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="addDialog(1, scope.row.level, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="deleteRow(scope.$index, scope.row)"
              >删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="addDialog(0, scope.row.level, scope.row)"
              >{{
                scope.row.level == 1
                  ? "添加二级分类"
                  : scope.row.level == 2
                  ? "添加三级分类"
                  : ""
              }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="formData">
        <el-form-item label="课程分类名称" :label-width="formLabelWidth">
          <el-input
            placeholder="请输入课程分类名称"
            v-model="formData.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="适用角色"
          :label-width="formLabelWidth"
          v-show="showSelect"
        >
          <el-select
            v-model="formData.role_id"
            placeholder="请选择适用角色"
            multiple
          >
            <el-option label="老师端" value="0"></el-option>
            <el-option label="学生端" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      class="pag"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-size="25"
    >
    </el-pagination>
  </div>
</template>
<script>
import {
  getClassify,
  addClassify,
  editClassify,
  deleteClassify,
} from "@/api/course";
export default {
  name: "courseClassify",
  components: {},
  data() {
    return {
      dataList: [],
      dialogFormVisible: false,
      dialogTitle: "",
      formLabelWidth: "140px",
      total: 0,
      currentPage: 1,
      tableHeight: 0,
      showSelect: true,
      loading: false,
      formData: {
        pid: 0,
        name: "",
        role_id: [],
        page: 1,
      },
    };
  },
  created() {
    let height = document.body.clientHeight;
    this.tableHeight = height - 300 + "px";
  },
  mounted() {
    this.getList();
  },
  watch: {
    "formData.name": function (nv, ov) {
      if (nv.length > 10) {
        this.formData.name = nv.slice(0, 10);
      }
    },
  },
  methods: {
    getList() {
      this.loading = true;
      getClassify(this.formData.page).then((res) => {
        console.log(res, "lisr");
        this.loading = false;
        this.total = res.data.totalNum;
        res.data.infos.map((item) => {
          item.level = 1;
          item.children = item.course_category;
          if (item.children) {
            item.children.map((item2) => {
              item2.level = 2;
              item2.children = item2.course_category;
              if (item2.children) {
                item2.children.map((item3) => {
                  item3.level = 3;
                });
              }
            });
          }
        });

        this.dataList = res.data.infos;
        console.log(this.dataList, "aaa");
      });
    },
    handleCurrentChange(val) {
      this.formData.page = this.currentPage = val;
      this.getList();
    },
    addDialog(type, z, info) {
      this.dialogFormVisible = true;
      z == 0 ? (this.showSelect = true) : (this.showSelect = false);
      if (type == 0) {
        this.formData = {
          pid: 0,
          name: "",
          role_id: [],
          page: 1,
        };
        this.dialogTitle =
          z == 0 ? "新增一级类目" : z == 1 ? "新增二级类目" : "新增三级类目";
        info
          ? info.pid == 0
            ? (this.formData.pid = 0)
            : (this.formData.pid = info.pid)
          : "";
        this.formData.id = info ? info.id : "";
        this.formData.name = "";
        this.formData.role_id = [];
        console.log(this.formData, "formData");
      } else {
        this.showSelect = false;
        this.dialogTitle =
          z == 0 ? "编辑一级类目" : z == 1 ? "编辑二级类目" : "编辑三级类目";
        this.formData.name = info.name;
        this.formData.role_id = [info.role_id];
        this.formData.id = info.id;
        this.formData.edit = true;
      }
    },
    submitForm() {
      if (this.formData.name == "") {
        this.$message.error("请输入分类名称");
        return;
      }
      console.log(this.formData, "f");
      if (this.formData.edit) {
        editClassify(this.formData).then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("编辑成功");
            this.getList();
            this.dialogFormVisible = false;
          }
        });
        return;
      }
      if (
        this.dialogTitle == "新增一级类目" &&
        this.formData.role_id.length == 0
      ) {
        this.$message.error("请选择适用角色");
        return;
      }
      addClassify(this.formData).then((res) => {
        console.log(res, "add");
        if (res.code == 200) {
          this.$message.success("添加成功");
          this.currentPage = this.formData.page = 1;
          this.dialogFormVisible = false;
          this.getList();
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    deleteRow(i, info) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log(info, "aaaa");
          deleteClassify(info.id).then((res) => {
            console.log(res, "res");
            if (res.code == 200) {
              this.$message.success("删除成功");
              this.getList();
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
    rowClass({ row, index }) {
      console.log(row, index, "row");
      if (row.level == 2) {
        return "level2";
      } else if (row.level == 3) {
        return "level3";
      }
    },
  },
};
</script>
<style lang="scss">
.classify {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 30px;
  // background: #ccc;
  &-top {
    width: 100%;
    margin-bottom: 20px;
  }
  .pag {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
  .level2 {
    background: rgba(240, 255, 255, 0.8);
  }
  .level3 {
    background: rgba(250, 250, 210, 0.2);
  }
}
</style>

