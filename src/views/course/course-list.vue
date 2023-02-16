<template>
  <div class="course">
    <div class="addCourse" @click="addNew">新建课程</div>
    <el-form :inline="true" ref="form" :model="formInline" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="formInline.id" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="课程名称">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="适用年级">
        <el-select
          v-model="formInline.grade_id"
          placeholder="请选择年级"
          clearable
        >
          <el-option
            :label="opt.label"
            :value="opt.value"
            v-for="opt in grade"
            :key="opt.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="适用对象">
        <el-select
          v-model="formInline.student_course"
          placeholder="请选择对象"
          clearable
        >
          <el-option label="老师" value="0"></el-option>
          <el-option label="学生" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" v-if="isPullDown">
        <el-select
          v-model="formInline.status"
          placeholder="请选择状态"
          clearable
        >
          <el-option label="未发布" value="0"></el-option>
          <el-option label="已发布" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型"  v-if="isPullDown">
        <el-select v-model="formInline.type" placeholder="请选择类型" clearable>
          <el-option
            :label="opt.label"
            :value="opt.value"
            v-for="opt in type"
            :key="opt.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="书写材料" v-if="isPullDown">
        <el-cascader
          v-model="materials"
          :options="materialData"
          :props="propsOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="创建时间" v-if="isPullDown">
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
        <el-button type="primary" @click="search">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onReset" plain>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="toOpenDown">{{ isPullDown ? '收起' : '展开'}}</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-divider class="hand-c" @click="toOpenDown"><i :class="['color-bl',isPullDown ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> <span class="color-bl">{{ isPullDown ? '收起' : '展开'}}</span></el-divider> -->
    <div style="margin-top:15px" class="course-table">
      <el-table
        v-loading="loading"
        :data="formData"
        fit
        :max-height="tableHeight"
        border
      >
        <el-table-column
          align="center"
          prop="id"
          label="ID"
          width="60"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="课程名称"
          width="300"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="section_count"
          label="课节数"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="class_count"
          label="排班数"
          width="80"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="grade_name"
          label="适用年级"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="课程类型"
          width="120"
        ></el-table-column>
        <el-table-column align="center" label="书写材料/书体/字体" width="160">
          <template slot-scope="scope">
            {{ scope.row.material }} / {{ scope.row.calligraphy }} /
            {{ scope.row.typeface }}
          </template></el-table-column
        >
        <el-table-column
          align="center"
          prop="student_course"
          label="适用对象"
          width="120"
        ></el-table-column>
        <el-table-column align="center" prop="id" label="原价/现价" width="120">
          <template slot-scope="scope">
            {{ scope.row.price }} / {{ scope.row.present_price }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="operator_name"
          label="创建者"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          label="创建时间"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="id"
          label="操作"
          width="200"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              编辑
            </el-button>

            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              v-show="scope.row.status == '未发布'"
              type="text"
              size="small"
            >
              删除
            </el-button>

            <el-button
              @click.native.prevent="updateRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              {{ scope.row.status == "已发布" ? "取消发布" : "发布" }}
            </el-button>
            <el-button
              @click.native.prevent="goLesson(scope.row)"
              type="text"
              size="small"
            >
              课节
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <add-course
      :grades="grade"
      :types="type"
      :labels="labels"
      :schools="schools"
      :channels="channels"
      :materialData="materialData"
      :courseList="formData"
      :info="editInfo"
      :tCategory="teacher_category"
      :sCategory="student_category"
      @back="back"
      v-if="showAdd"
    ></add-course>
    <lesson
      :type="chosen.type_source"
      :id="chosen.id"
      v-if="showLesson"
      @back="back"
    ></lesson>
  </div>
</template>
<script>
import {
  getCourseList,
  deleteourse,
  updateCourse,
  getChannels,
  getSchools,
} from "@/api/course";
import addCourse from "./course-add.vue";
import lesson from "./lesson-list.vue";
export default {
  name: "courseClassify",
  components: { addCourse, lesson },
  data() {
    return {
      isPullDown: false,
      formInline: {
        grade_id: "",
        id: "",
        name: "",
        type: "",
        material: "",
        calligraphy: "",
        typeface: "",
        created_at: "",
        page: 1,
        student_course: "",
        status: "",
      },
      formData: [],
      total: 0,
      currentPage: 1,
      loading: false,
      grade: [],
      dateArr: [],
      propsOptions: {
        label: "name",
        value: "id",
      },
      materials: [], // 选择
      materialData: [], // 数据
      type: [], // 课程类型
      suit: [], // 适用对象
      labels: [], // 标签
      editInfo: {},
      tableHeight: "",
      // 子页面
      showAdd: false,
      showLesson: false,
      chosen: {}, // 被選中的
      teacher_category: [],
      student_category: [],
      channels: [], // 渠道
      schools: [], // 学校
    };
  },
  watch: {
    dateArr: function (newV, oldV) {
      console.log(newV);
      if (newV && newV.length !== 0) {
        console.log("saaa");
        this.formInline.created_at =
          newV[0] + " 00:00:00|" + newV[1] + " 23:59:59";
      } else {
        this.formInline.created_at = "";
      }
    },
  },
  created() {
    let height = document.body.clientHeight;
    this.tableHeight = height - 300 + "px";
  },
  mounted() {
    this.getList();
    this.getChannels();
    this.getSchools();
  },
  methods: {
    toOpenDown(){
      this.isPullDown = !this.isPullDown
    },
    search() {
      this.formInline.page = this.currentPage = 1;
      this.getList();
    },
    getList() {
      this.loading = true;
      getCourseList(this.formInline).then((res) => {
        console.log(res, "res");
        this.formData = [];
        // 分頁信息
        this.total = res.meta.total;
        this.loading = false;
        // 获取表格内容数据
        let tableInfo = res.data;
        tableInfo.map((item) => {
          let form = {};
          for (let key in item) {
            form[key] = item[key].value;
            if (key == "calligraphy") {
              form["calligraphy_source"] = item[key].valueSource;
            }
            if (key == "material") {
              form["material_source"] = item[key].valueSource;
            }
            if (key == "typeface") {
              form["typeface_source"] = item[key].valueSource;
            }
            if (key == "type") {
              form["type_source"] = item[key].valueSource;
            }
            if (key == "student_course") {
              form["student_course_source"] = item[key].valueSource;
            }
            if (key == "grade_name") {
              form["grade_name_source"] = item[key].valueSource;
            }
            if (key == "course_label") {
              form["course_label_source"] = item[key].valueSource;
            }
            if (key == "relation_course") {
              form["relation_course_source"] = item[key].valueSource;
            }
          }
          this.formData.push(form);
        });
        // 年级赋值
        this.grade = res.updateFormFields.grade.infos;
        // 课程类型
        this.type = [];
        for (let a in res.updateFormFields.type.infos) {
          let json = {
            label: res.updateFormFields.type.infos[a],
            value: a,
          };
          this.type.push(json);
        }
        // 材料
        this.materialData = res.updateFormFields.writing_material.infos;
        this.labels = res.updateFormFields.course_label.infos;
        this.teacher_category = res.addFormFields.teacher_category_id;
        this.student_category = res.addFormFields.student_category_id;
      });
    },
    goLesson(info) {
      console.log(info, "info");
      this.chosen = info;
      this.showLesson = true;
    },
    // 新建 / 编辑
    addNew() {
      this.showAdd = true;
      this.editInfo = {};
    },
    handleChange(e) {
      if (e && e.length === 3) {
        this.formInline.material = e[0];
        this.formInline.calligraphy = e[1];
        this.formInline.typeface = e[2];
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.formInline.page = val;
      this.getList();
    },
    onReset() {
      this.dateArr = [];
      this.formInline = {
        grade_id: "",
        id: "",
        name: "",
        type: "",
        material: "",
        calligraphy: "",
        typeface: "",
        created_at: "",
      };
      this.materials = [];
      this.$nextTick();
      this.getList();
    },
    deleteRow(i, info) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteourse(info.id).then((res) => {
            this.$message.success("已删除");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 編輯
    editRow(i, info) {
      this.editInfo = info;
      this.showAdd = true;
    },
    updateRow(i, info) {
      let status = "";
      info.status == "已发布" ? (status = "0") : (status = "1");
      updateCourse({ id: info.id, status: status }).then((res) => {
        console.log(res, "res");
        this.getList();
      });
    },
    back() {
      this.showAdd = false;
      this.getList();
      this.showLesson = false;
    },
    getChannels() {
      getChannels().then((res) => {
        res.data.map((item) => {
          let json = {};
          json.label = item.title.value;
          json.value = item.id.value.toString();
          this.channels.push(json);
        });
      });
    },
    getSchools() {
      getSchools().then((res) => {
        res.data.map((item) => {
          let json = {};
          json.label = item.name.value;
          json.value = item.id.value.toString();
          this.schools.push(json);
        });
      });
    },
  },
};
</script>
<style lang="scss">
.course {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: 40px 30px;
  // background: #ccc;
  &-top {
    width: 100%;
  }
  .addCourse {
    position: absolute;
    right: -70px;
    top: -70px;
    background: #1890ff;
    color: #fff;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    padding-right: 70px;
    padding-top: 80px;
    padding-left: 42px;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  .pag {
    // position: fixed;
    margin-top: 20px;
    bottom: 20px;
    right: 20px;
  }
}
</style>

