<template>
  <div class="newCourseWare">
    <div class="addCourse" @click="back">返回列表</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
      <el-form-item label="课程名称：" prop="name">
        <el-input
          placeholder="请输入课程名称"
          v-model="form.name"
          maxlength="20"
        ></el-input>
      </el-form-item>
      <el-form-item label="副标题：">
        <el-input
          placeholder="请输入副标题"
          maxlength="20"
          v-model="form.vice_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="适用年级：" prop="grade">
        <el-select v-model="form.grade" placeholder="请选择年级" multiple>
          <el-option
            :label="opt.label"
            :value="opt.value"
            v-for="opt in grades"
            :key="opt.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课程类型：" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option
            :label="opt.label"
            :value="opt.value"
            v-for="opt in types"
            :key="opt.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="书写材料/书体/字体：" prop="material">
        <el-cascader
          v-model="materials"
          :options="materialData"
          :props="propsOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="在学人数：">
        <el-input
          placeholder="选填"
          v-model="form.student_count"
          maxlength="5"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否免登陆：">
        <el-switch v-model="form.is_login_free_source"></el-switch>
      </el-form-item>
      <el-form-item label="是否入班可学：">
        <el-switch v-model="form.is_join_study_source"></el-switch>
      </el-form-item>
      <el-form-item label="适用对象：" prop="student_course">
        <el-select
          v-model="form.student_course"
          placeholder="请选择类型"
          multiple
        >
          <el-option label="老师端" value="0"></el-option>
          <el-option label="学生端" value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="老师课程分类：">
        <el-select v-model="chosenClassify.teacher[0]">
          <el-option
            v-for="(item, index) in classify.teacher.first"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item
        v-show="form.student_course.includes('0')"
        label="前端课程分类（老师）："
      >
        <div class="selectBox">
          <el-select
            placeholder="请选择一级分类"
            v-model="chosenClassify.teacher[0]"
            @change="getClassifyTFirst"
          >
            <el-option
              v-for="(item, index) in classify.teacher.first"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>

          <el-select
            placeholder="请选择二级分类"
            v-show="
              chosenClassify.teacher[0] && classify.teacher.second.length > 0
            "
            v-model="chosenClassify.teacher[1]"
            @change="getClassifyTSecond"
          >
            <el-option
              v-for="(item, index) in classify.teacher.second"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>

          <el-select
            placeholder="请选择三级分类"
            v-show="
              chosenClassify.teacher[1] && classify.teacher.third.length > 0
            "
            v-model="chosenClassify.teacher[2]"
          >
            <el-option
              v-for="(item, index) in classify.teacher.third"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        v-show="form.student_course.includes('1')"
        label="前端课程分类（学生）："
      >
        <div class="selectBox">
          <el-select
            placeholder="请选择一级分类"
            v-model="chosenClassify.student[0]"
            @change="getClassifySFirst"
          >
            <el-option
              v-for="(item, index) in classify.student.first"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>

          <el-select
            placeholder="请选择二级分类"
            v-show="
              chosenClassify.student[0] && classify.student.second.length > 0
            "
            v-model="chosenClassify.student[1]"
            @change="getClassifySSecond"
          >
            <el-option
              v-for="(item, index) in classify.student.second"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>

          <el-select
            placeholder="请选择三级分类"
            v-show="
              chosenClassify.student[1] && classify.student.third.length > 0
            "
            v-model="chosenClassify.student[2]"
          >
            <el-option
              v-for="(item, index) in classify.student.third"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="课程标签：" prop="course_label">
        <el-button @click="connectLabels" type="primary">关联标签</el-button>
      </el-form-item>
      <el-form-item label="推荐课程：">
        <el-button @click="search('clear')" type="primary">关联课程</el-button>
      </el-form-item>

      <el-form-item label="已选课程：" v-show="lessons.length > 0">
        <div class="bechosen" v-for="co in lessons" :key="co.name">
          {{ co.name }}
        </div>
      </el-form-item>
      <el-form-item label="封面图：" class="course_box" prop="cover_pic">
        <upload-button
          :uploadType="'image'"
          @uploadFinish="getImg"
        ></upload-button>
      </el-form-item>
      <el-form-item label="已选图片：" v-show="form.cover_pic">
        <img class="imgChosen" :src="form.cover_pic" alt="" />
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <tinymce v-model="form.content" :height="300" />
      </el-form-item>
      <!-- 商品信息 -->
      <div class="course_title">设置商品信息</div>

      <el-form-item label="原价：">
        <el-input v-model="form.price" placeholder="选题，单位：元"></el-input>
      </el-form-item>

      <el-form-item label="现价：">
        <el-input
          v-model="form.present_price"
          placeholder="选题，单位：元"
        ></el-input>
      </el-form-item>
      <!-- 其他信息 -->
      <div class="course_title">其他信息</div>
      <el-form-item label="关联渠道：" prop="relation_channel">
        <el-checkbox-group v-model="form.relation_channel">
          <el-checkbox
            v-for="cb in channelsData"
            :key="cb.value"
            :label="cb.value"
            :checked="cb.check"
          >
            {{ cb.label }}</el-checkbox
          >
          <!-- <el-checkbox
            v-for="cb in channelsData"
            :key="cb.vlaue"
            :label="cb.value"
          ></el-checkbox> -->
        </el-checkbox-group>
      </el-form-item>
      <!-- 学校 -->
      <el-form-item label="关联所有学校：">
        <el-switch v-model="form.is_all_school_source"></el-switch>
      </el-form-item>

      <el-form-item v-show="!form.is_all_school_source" label="关联学校：">
        <el-checkbox-group v-model="form.relation_school">
          <el-checkbox
            v-for="cb in schools"
            :key="cb.value"
            :label="cb.value"
            :value="cb.value"
          >
            {{ cb.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item align="center">
        <el-button size="medium" type="primary" class="certain" @click="finish"
          >完成</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 穿梭框 -->
    <x-pop title="课程标签" v-if="showTransfer" @closeTag="close">
      <el-transfer
        v-show="form.student_course.includes('0')"
        :data="transferData_teacher"
        :titles="['老师标签选项', '已选标签']"
        v-model="form.course_label.teacher"
      ></el-transfer>
      <el-transfer
        v-show="form.student_course.includes('1')"
        class="transfer2"
        :titles="['学生标签选项', '已选标签']"
        :data="transferData_student"
        v-model="form.course_label.student"
      ></el-transfer>
      <!-- <div class="transfer-buttons">
        <el-button type="primary" @click="close">确认</el-button>
      </div> -->
    </x-pop>
    <!-- 关联课程 -->
    <x-pop
      title="关联课程"
      v-show="showCourseList"
      :width="'60%'"
      @closeTag="close"
      class="coursePop"
    >
      <el-form :inline="true">
        <el-form-item label="课程名称">
          <el-input
            v-model="courseForm.name"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="适用年级">
          <el-select
            v-model="courseForm.grade_id"
            placeholder="请选择年级"
            clearable
          >
            <el-option
              :label="opt.label"
              :value="opt.value"
              v-for="opt in grades"
              :key="opt.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="适用对象">
          <el-select
            v-model="courseForm.student_course"
            placeholder="请选择对象"
            clearable
          >
            <el-option label="老师" value="0"></el-option>
            <el-option label="学生" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="课程类型">
          <el-select
            v-model="courseForm.type"
            placeholder="请选择类型"
            clearable
          >
            <el-option
              :label="opt.label"
              :value="opt.value"
              v-for="opt in types"
              :key="opt.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书写材料">
          <el-cascader
            v-model="formMaterials"
            :options="materialData"
            :props="propsOptions"
            @change="handleChange2"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">搜索</el-button>
          <el-button type="primary" @click="onreset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :data="courses"
        v-loading="loading"
        height="400px"
        border
      >
        <el-table-column
          align="center"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="课程名称"
        ></el-table-column>
        <el-table-column
          prop="grade_name"
          align="center"
          label="适用年级"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="student_course"
          label="适用对象"
          align="center"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="material"
          align="center"
          label="书写材料"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="calligraphy"
          align="center"
          label="书体"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="typeface"
          align="center"
          label="字体"
          width="100"
        ></el-table-column>
      </el-table>
      <div class="transfer-buttons">
        <el-button type="primary" @click="certern">确认</el-button>
      </div>

      <el-pagination
        class="pag"
        background
        layout="total, prev, pager, next"
        :total="total"
        :current-page="courseForm.page"
        @current-change="handleCurrentChange"
        :page-size="25"
      >
      </el-pagination>
    </x-pop>
  </div>
</template>
<script>
import { addCourse, editCourse, innerCourseList } from "@/api/course";
import xPop from "@/components/xPop";
import Tinymce from "@/components/Tinymce";
import uploadButton from "@/components/uploadButton";
export default {
  name: "courseClassify",
  components: { xPop, Tinymce, uploadButton },
  data() {
    return {
      form: {
        name: "", // 标题
        vice_name: "", // 副标题
        grade: [], // 年级
        material: "", // 材料
        calligraphy: "", // 书体
        typeface: "", // 字体
        type: "", // 类型
        price: 0, // 原价
        present_price: 0, // 现价
        student_count: "", // 学生数
        student_course: [], // 适用对象
        course_label: {
          teacher: [],
          student: [],
        }, // 标签
        cover_pic: "", // 圖片
        content: "", // 内容
        relation_course: [], // 關聯課程
        relation_channel: [], // 關聯渠道
        relation_school: [], // 關聯學校
        is_all_school: false, // 學校全選
        is_all_school_source: true, // 学校全选
        is_login_free: false, // 免費登錄
        is_login_free_source: false, // 免费登录
        is_join_study: false, // 是否入班可學
        is_join_study_source: false, // 入班科学
        teacher_category_id: null, // 老師端分類id
        student_category_id: null, // 學生端分類id
      },
      loading: false,
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        grade: [
          { required: true, message: "请选择适用年级", trigger: "change" },
        ],
        type: [
          {
            required: true,
            message: "请选择课程类型",
            trigger: "change",
          },
        ],
        material: [
          { required: true, message: "请选择书写材料", trigger: "change" },
        ],
        student_course: [
          { required: true, message: "请选择适用对象", trigger: "change" },
        ],
        cover_pic: [{ required: true }],
        course_label: [{ required: true }],
        content: [{ required: true }],
        relation_channel: [
          { required: true, message: "请选择关联渠道", trigger: "change" },
        ],
      },
      materials: [],
      formMaterials: [],
      propsOptions: {
        label: "name",
        value: "id",
      },
      courseName: "", // 课程名称
      courses: [], //
      schoolsList: [], // 学校列表
      transferData_student: [],
      transferData_teacher: [],
      channelsData: [], // 渠道列表
      showTransfer: false, // 展示穿梭框
      showCourseList: false, // 展示
      chosen: [], // 选中的数据
      chosenCourse: [], // 现在的课程
      selected: [], // 表格中被选中的
      courseList: [],
      courseForm: {
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
      total: 0,
      // 暂存
      lessons: [],
      chosenLesson: [],
      // 课程分类相关字段
      classify: {
        teacher: {
          first: [],
          second: [],
          third: [],
        },
        student: {
          first: [],
          second: [],
          third: [],
        },
      },
      chosenClassify: {
        teacher: ["", "", ""],
        student: ["", "", ""],
      },
    };
  },
  props: {
    grades: {
      type: Array,
      default: () => {
        return [];
      },
    },
    types: {
      type: Array,
      default: () => {
        return [];
      },
    },
    materialData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    labels: {
      type: Object,
      default: () => {
        return {};
      },
    },
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tCategory: {
      type: Object,
      default: () => {
        return {};
      },
    },
    sCategory: {
      type: Object,
      default: () => {
        return {};
      },
    },
    schools: {
      type: Array,
      default: () => {
        return [];
      },
    },
    channels: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  created() {},
  mounted() {
    this.channelsData = this.channels;
    this.schoolsList = this.schools;
    console.log(this.channels, "ccc");
    console.log(this.schoolsList);
    console.log(this.tCategory, this.sCategory, "sss");
    this.classify.teacher.first = this.tCategory.infos;
    this.classify.student.first = this.sCategory.infos;
    this.classify.teacher.first.map((item) => {
      item.id = item.id.toString();
    });
    this.classify.student.first.map((item) => {
      item.id = item.id.toString();
    });

    console.log(this.form.relation_channel, "channel");
    this.$nextTick(() => {
      if (!this.info.id) {
        this.reset();
      } else {
        console.log(this.info, "info");
        this.form = {
          id: this.info.id,
          name: this.info.name, // 标题
          vice_name: this.info.vice_name, // 副标题
          grade: this.info.grade_name_source, // 年级
          material: this.info.material_source, // 材料
          calligraphy: this.info.calligraphy_source, // 书体
          typeface: this.info.typeface_source, // 字体
          type: this.info.type_source, // 类型
          price: this.info.price, // 原价
          present_price: this.info.present_price, // 现价
          student_count: this.info.student_count, // 学生数
          student_course:
            this.info.student_course_source == 0
              ? ["0"]
              : this.info.student_course_source == 1
              ? ["1"]
              : ["0", "1"], // 适用对象
          course_label: this.info.course_label_source, // 标签
          cover_pic: this.info.cover_pic, // 圖片
          content: this.info.content, // 内容
          relation_course: this.info.relation_course, // 關聯課程
          relation_channel: this.info.relation_channel, // 關聯渠道
          relation_school: this.info.relation_school, // 關聯學校
          is_all_school_source: this.info.is_all_school == 1 ? true : false, // 學校全選
          is_login_free_source: this.info.is_login_free == 1 ? true : false, // 免費登錄
          is_join_study_source: this.info.is_join_study == 1 ? true : false, // 是否入班可學
          teacher_category_id: this.info.teacher_category_id, // 老師端分類id
          student_category_id: this.info.student_category_id, // 學生端分類id
        };
        this.materials = [
          this.info.material_source,
          this.info.calligraphy_source,
          this.info.typeface_source,
        ];
        this.info.relation_course.split(",").map((item, index) => {
          let json = {
            id: item,
            name: this.info.relation_course_source[index],
          };
          this.lessons.push(json);
        });
        console.log(this.lessons);
        let studentArr = this.info.student_category_id
          ? this.info.student_category_id.split(",")
          : [];
        studentArr.map((item, index) => {
          item = item.toString();
          if (item && index == 0) {
            this.getClassifySFirst(item);
          } else if (item && index == 1) {
            this.getClassifySSecond(item);
          }
        });
        this.chosenClassify.student = studentArr;
        let teacherArr = this.info.teacher_category_id
          ? this.info.teacher_category_id.split(",")
          : [];
        teacherArr.map((item, index) => {
          item = item.toString();
          if (item && index == 0) {
            this.getClassifyTFirst(item);
          } else if (item && index == 1) {
            this.getClassifyTSecond(item);
          }
        });
        console.log(teacherArr, "tea");
        this.chosenClassify.teacher = teacherArr;
      }
      this.chosenLesson = [...this.lessons];
    });
  },
  methods: {
    handleChange(e) {
      if (e && e.length === 3) {
        this.form.material = e[0];
        this.form.calligraphy = e[1];
        this.form.typeface = e[2];
      }
    },

    handleChange2(e) {
      if (e && e.length === 3) {
        this.courseForm.material = e[0];
        this.courseForm.calligraphy = e[1];
        this.courseForm.typeface = e[2];
      }
    },
    getImg(val) {
      console.log(val, "img");
      this.form.cover_pic = JSON.parse(val).original_url;
    },
    // 选项框
    handleSelectionChange(val) {
      console.log(val, "val");
      this.chosen = val;
    },
    close() {
      this.showTransfer = false;
      this.showCourseList = false;
      this.joinLesson();
    },
    certern() {
      this.joinLesson();
      this.showCourseList = false;
      this.lessons = this.chosenLesson;
    },
    connectLabels() {
      if (this.form.student_course.length == 0) {
        this.$message.error("请先选择适用对象");
        return;
      }
      console.log(this.form.student_course, "labels");
      if (this.form.student_course.join().includes("0")) {
        console.log("xxx");
        this.transferData_teacher = [];
        this.labels[0].list.map((item) => {
          this.transferData_teacher.push({
            key: item.value,
            label: "老师-" + item.label,
          });
        });
      }

      if (this.form.student_course.join().includes("1")) {
        console.log("xxx2");
        this.transferData_student = [];
        this.labels[1].list.map((item) => {
          this.transferData_student.push({
            key: item.value,
            label: "学生-" + item.label,
          });
        });
      }

      this.showTransfer = true;
    },
    search(a) {
      if (a == "clear") {
        this.courseForm = {
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
        };
      }
      this.courseForm.page = 1;
      this.getList();
    },
    // 课程列表
    getList() {
      this.showCourseList = true;
      this.loading = true;
      innerCourseList(this.courseForm).then((res) => {
        this.courses = [];
        this.loading = false;
        // 分頁信息
        this.total = res.meta.total;
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
          }
          this.courses.push(form);
        });
        setTimeout(() => {
          this.toggleSelection();
        }, 300);
      });
    },

    onreset() {
      this.courseForm = {
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
      };
      this.formMaterials = [];
      this.getList();
    },

    handleCurrentChange(val) {
      this.courseForm.page = val;
      this.joinLesson();
      this.getList();
    },

    // joinLesson
    joinLesson() {
      this.chosen.map((item) => {
        let join = true;
        this.chosenLesson.map((course) => {
          if (item.id == course.id) {
            join = false;
          }
        });
        join ? this.chosenLesson.push(item) : "";
      });
    },
    check() {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.finish();
        } else {
          this.$message.error("新建失败，请完整填写");
          return false;
        }
      });
    },
    finish() {
      if (this.form.name == "") {
        this.$message.error("请输入课程名称");
        return;
      }
      if (this.form.grade == "" || this.form.grade.length == 0) {
        this.$message.error("请选择适用年级");
        return;
      }
      if (this.form.type == "") {
        this.$message.error("请选择课程类型");
        return;
      }
      if (this.form.material == "") {
        this.$message.error("请选择书写材料");
        return;
      }
      if (this.form.student_course.length == 0) {
        this.$message.error("请选择适用对象");
        return;
      }
      this.form.course_label.teacher = this.form.course_label.teacher || [];
      this.form.course_label.student = this.form.course_label.student || [];
      if (
        this.form.course_label.student.length == 0 &&
        this.form.course_label.teacher.length == 0
      ) {
        this.$message.error("请选择课程标签");
        return;
      }

      if (this.form.cover_pic == "") {
        this.$message.error("请上传图片");
        return;
      }
      if (this.form.content == "") {
        this.$message.error("请输入内容");
        return;
      }

      if (parseFloat(this.form.price) < parseFloat(this.form.present_price)) {
        this.$message.error("现价应小于原价");
        return;
      }
      if (this.form.is_all_school_source) {
        this.form.relation_school = [];
      }

      if (this.form.relation_channel.length == 0) {
        this.$message.error("请至少选择一个渠道");
        return;
      }

      if (
        !this.form.is_all_school_source &&
        this.form.relation_school.length == 0
      ) {
        this.$message.error("请至少选择一个学校");
        return;
      }

      // 课程分类必须到最后一级
      if (this.form.student_course.includes("0")) {
        if (!this.chosenClassify.teacher[0]) {
          this.$message.error("请选择前端分类");
          return;
        }
        if (
          (!this.chosenClassify.teacher[1] &&
            this.classify.teacher.second.length > 0) ||
          (!this.chosenClassify.teacher[2] &&
            this.classify.teacher.third.length > 0)
        ) {
          this.$message.error("前端分类请选择至最后一级");
          return;
        }
      }

      if (this.form.student_course.includes("1")) {
        if (!this.chosenClassify.student[0]) {
          this.$message.error("请选择前端分类");
          return;
        }
        if (
          (!this.chosenClassify.student[1] &&
            this.classify.student.second.length > 0) ||
          (!this.chosenClassify.student[2] &&
            this.classify.student.third.length > 0)
        ) {
          this.$message.error("前端分类请选择至最后一级");
          return;
        }
      }

      this.form.teacher_category_id = this.form.student_course.includes("0")
        ? this.chosenClassify.teacher.join(",")
        : "";
      this.form.student_category_id = this.form.student_course.includes("1")
        ? this.chosenClassify.student.join(",")
        : "";
      this.form.relation_course = [];
      this.form.student_count = parseInt(this.form.student_count) || "";
      this.form.is_all_school_source
        ? (this.form.is_all_school = 1)
        : (this.form.is_all_school = 0);
      this.form.is_login_free_source
        ? (this.form.is_login_free = 1)
        : (this.form.is_login_free = 0);
      this.form.is_join_study_source
        ? (this.form.is_join_study = 1)
        : (this.form.is_join_study = 0);
      this.lessons.map((item) => {
        this.form.relation_course.push(item.id);
      });
      if (!this.info.id) {
        addCourse(this.form).then((res) => {
          console.log(res, "res");
          if (res.code == 200) {
            this.$message.success("新建成功");
            this.$emit("back");
          } else {
            this.$message.success("新建失败");
            setTimeout(() => {
              this.$emit("back");
            }, 500);
          }
        });
      } else {
        editCourse(this.form).then((res) => {
          console.log(res, "edit");
          if (res.code == 200) {
            this.$message.success("编辑成功");
            setTimeout(() => {
              this.$emit("back");
            }, 500);
          } else {
            this.$message.success("编辑失败");
            setTimeout(() => {
              this.$emit("back");
            }, 500);
          }
        });
      }
    },
    reset() {
      this.form = {
        name: "", // 标题
        vice_name: "", // 副标题
        grade: [], // 年级
        material: "", // 材料
        calligraphy: "", // 书体
        typeface: "", // 字体
        type: "", // 类型
        price: 0, // 原价
        present_price: 0, // 现价
        student_count: "", // 学生数
        student_course: [], // 适用对象
        course_label: {
          teacher: [],
          student: [],
        }, // 标签
        cover_pic: "", // 圖片
        content: "", // 内容
        relation_course: [], // 關聯課程
        relation_channel: [], // 關聯渠道
        relation_school: [], // 關聯學校
        is_all_school: false, // 學校全選
        is_all_school_source: true,
        is_login_free: false, // 免費登錄
        is_login_free_source: false,
        is_join_study: false, // 是否入班可學
        is_join_study_source: false,
        teacher_category_id: null, // 老師端分類id
        student_category_id: null, // 學生端分類id
      };
    },
    toggleSelection() {
      this.courses.map((course) => {
        this.chosenLesson.map((item, index) => {
          if (course.id == item.id) {
            this.$refs.multipleTable.toggleRowSelection(course);
            this.chosenLesson.splice(index, 1);
          }
        });
      });
    },
    back() {
      this.$emit("back");
    },
    // 课程分类
    getClassifyTFirst(val) {
      this.chosenClassify.teacher[2] = this.chosenClassify.teacher[1] = "";
      for (let info of this.classify.teacher.first) {
        if (info.id == val) {
          this.classify.teacher.second = info.course_category;

          this.classify.teacher.second.map((item) => {
            item.id = item.id.toString();
          });
          return;
        }
      }
    },
    getClassifySFirst(val) {
      this.chosenClassify.student[2] = this.chosenClassify.student[1] = "";

      // this.classify.student.second = val.course_category;
      console.log(val, "val");
      this.chosenClassify.student[2] = "";
      for (let info of this.classify.student.first) {
        if (info.id == val) {
          this.classify.student.second = info.course_category;
          this.classify.student.second.map((item) => {
            item.id = item.id.toString();
          });
          console.log(info.course_category);
          return;
        }
      }
    },
    getClassifyTSecond(val) {
      this.chosenClassify.teacher[2] = "";
      for (let info of this.classify.teacher.second) {
        if (info.id == val) {
          this.classify.teacher.third = info.course_category || [];
          this.classify.teacher.third.map((item) => {
            item.id = item.id.toString();
          });
          return;
        }
      }
    },
    getClassifySSecond(val) {
      this.chosenClassify.student[2] = "";
      for (let info of this.classify.student.second) {
        if (info.id == val) {
          this.classify.student.third = info.course_category || [];
          this.classify.student.third.map((item) => {
            item.id = item.id.toString();
          });
          return;
        }
      }
    },
  },
};
</script>
<style lang="scss">
.newCourseWare {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  padding: 40px 120px 40px 30px;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 11;
  overflow-y: auto;
  overflow-x: hidden;
  // background: #ccc;
  &-top {
    width: 100%;
  }
  .transfer-buttons {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    z-index: 1111;
  }
  .transfer2 {
    margin-top: 20px;
  }
  .course_title {
    font-size: 24px;
    font-weight: bold;
    margin: 20px 0;
  }
  .course_box {
    position: relative;
    input {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      opacity: 0;
    }
  }
  .bechosen {
    font-size: 18px;
    font-weight: bold;
    color: #46a6ff;
  }
  .certain {
    width: 180px;
    font-size: 20px;
    height: 50px;
    margin-top: 20px;
  }
  .imgChosen {
    width: 400px;
  }
  .coursePop {
    // position: relative;
    .pag {
      position: absolute;
      left: 10px;
      width: 200px;
      bottom: 0;
    }
  }
}
</style>

