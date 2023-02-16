<template>
  <div class="coursewareList">
    <el-form :inline="true" ref="form" :model="formInline" label-width="80px">
      <!-- <el-form-item label="课件id">
        <el-input
          v-model="formInline.section_id"
          placeholder="请输入"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="课件名称">
        <el-input v-model="formInline.name" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="适用年级" clearable>
        <el-select v-model="formInline.grade_id" placeholder="请选择年级">
          <el-option
            :label="opt.label"
            :value="opt.value"
            v-for="opt in grade"
            :key="opt.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课件类型">
        <el-select v-model="formInline.type" placeholder="请选择类型" clearable>
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
        <el-button type="primary" @click="getList('1')">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onReset" plain>重置</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="toOpenDown">{{ isPullDown ? '收起' : '展开'}}</el-button>
      </el-form-item>
    </el-form>
    <!-- <el-divider class="hand-c" @click="toOpenDown"><i :class="['color-bl',isPullDown ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i> <span class="color-bl">{{ isPullDown ? '收起' : '展开'}}</span></el-divider> -->
    <div class="courseware_operate"> 
      <el-button type="primary" @click="newCourseware"> + 新建课件</el-button>
      <el-button type="primary" @click="uploadCourseware">
        + 上传课件</el-button
      >
    </div>
    <div>
      <el-table
        :data="formData"
        fit
        :max-height="tableHeight"
        border
        v-loading="loading"
      >
        <el-table-column
          align="center"
          prop="id"
          label="课件ID"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="课程名称"
          min-width="300"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="grade_name"
          label="适用年级"
          width="200"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="material"
          label="书写材料"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="calligraphy"
          label="书体"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="typeface"
          label="字体"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="type_name"
          label="课件类型"
          width="120"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="operator_name"
          label="创建者"
          width="140"
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
              @click.native.prevent="uploadCourseware(scope.row)"
              type="text"
              size="small"
            >
              编辑
            </el-button>

            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              删除
            </el-button>
            <el-button
              @click.native.prevent="copyRow(scope.row)"
              type="text"
              size="small"
              v-show="scope.row.type_name == '自定义课件'"
            >
              复制
            </el-button>
            <el-button
              @click.native.prevent="go(scope.row)"
              type="text"
              size="small"
              v-show="scope.row.type_name !== '自定义课件'"
            >
              查看
            </el-button>
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
    <x-pop title="课件操作" v-if="showCoursewarePop" @closeTag="close">
      <el-form
        label-width="120px"
        ref="coursewareForm"
        v-model="coursewareForm"
        class="addPop"
      >
        <el-form-item label="课件名称" prop="name">
          <el-input
            v-model="coursewareForm.name"
            maxlength="14"
            placeholder="请输入课件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="适用年级" prop="grade_id">
          <el-select
            v-model="coursewareForm.grade_id"
            placeholder="请选择类型"
            multiple
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
        <el-form-item label="书写材料" prop="material">
          <el-cascader
            v-model="materials2"
            :options="materialData"
            :props="propsOptions"
            @change="handleChangeInner"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="文件类型">
          <el-select
            v-model="coursewareForm.type"
            disabled
            placeholder="请选择类型"
          >
            <el-option label="PPT" value="2"> </el-option>
            <el-option label="视频" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文件上传" prop="file_id">
          <upload-button
            :uploadType="'video'"
            @uploadFinish="getVideo"
          ></upload-button>
        </el-form-item>

        <el-form-item label="上传文件名称">
          {{ videoName }}
        </el-form-item>
        <el-form-item align="center">
          <el-button class="finishButton" @click="finish" type="primary"
            >完成</el-button
          >
        </el-form-item>
      </el-form>
    </x-pop>
  </div>
</template>
<script>
import {
  coursewareList,
  coursewareDelete,
  coursewareCopy,
  coursewareEdit,
  coursewareAdd,
  coursewareDetail,
} from "@/api/course";
import xPop from "@/components/xPop";
import uploadButton from "@/components/uploadButton";
export default {
  components: { xPop, uploadButton },
  data() {
    return {
      isPullDown: false,
      dateArr: [],
      formInline: {
        section_id: "",
        page: 1,
        name: "",
        material: "",
        calligraphy: "",
        typeface: "",
        type: "",
        time: "",
      },
      formData: [],
      grade: [],
      types: [],
      materialData: [],
      materials: [],
      materials2: [],
      loading: false,
      propsOptions: {
        label: "name",
        value: "id",
      },
      rules: {
        name: [{ required: true, message: "请填写课件名称", trigger: "blur" }],
        grade_id: [
          { required: true, message: "请选择年级", trigger: "change" },
        ],
        material: [
          { required: true, message: "请选择书写材料", trigger: "blur" },
        ],
        file_id: [{ required: true }],
      },
      tableHeight: 0,
      total: 0,
      currentPage: 1,
      coursewareForm: {
        id: "",
        name: "",
        grade_id: [],
        material: "",
        calligraphy: "",
        typeface: "",
        type: 3,
        create_type: 1,
        resource_url: "", // ppt
        file_id: "", // 视频
      },
      // 弹窗：
      showCoursewarePop: false,
      videoName: "",
    };
  },
  watch: {
    dateArr: function (newV, oldV) {
      console.log(newV);
      if (newV && newV.length !== 0) {
        console.log("saaa");
        this.formInline.time = newV[0] + " 00:00:00|" + newV[1] + " 23:59:59";
      } else {
        this.formInline.time = "";
      }
    },
  },
  methods: {
    // 展开/收起
    toOpenDown(){
      console.log('klklk')
      this.isPullDown = !this.isPullDown
    },
    getList(i) {
      i ? ((this.formInline.page = 1), (this.currentPage = 1)) : "";
      this.loading = true;
      coursewareList(this.formInline).then((res) => {
        console.log(res);
        this.loading = false;
        this.formData = res.data.infos;
        this.total = res.data.totalNum;
        this.grade = res.data.gradeSemester;
        this.materialData = res.data.materialData;
        this.types = [];
        for (let i in res.data.courseWareType) {
          let json = {};
          json.label = res.data.courseWareType[i];
          json.value = i;
          this.types.push(json);
        }
      });
    },
    onReset() {
      this.formInline = {
        page: 1,
        section_id: "",
        name: "",
        material: "",
        calligraphy: "",
        typeface: "",
        type: "",
        time: "",
      };
      this.currentPage = 1;
      this.dateArr = [];
      this.materials = [];
      this.getList(1);
    },
    handleChange(e) {
      if (e && e.length === 3) {
        this.formInline.material = e[0];
        this.formInline.calligraphy = e[1];
        this.formInline.typeface = e[2];
      }
    },
    handleChangeInner(e) {
      if (e && e.length === 3) {
        this.coursewareForm.material = e[0];
        this.coursewareForm.calligraphy = e[1];
        this.coursewareForm.typeface = e[2];
      }
    },
    // 删除
    deleteRow(i, info) {
      this.$confirm("此操作将永久删除该课件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          coursewareDelete(info.id).then((res) => {
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
    // 复制
    copyRow(info) {
      coursewareCopy({ id: info.id }).then((res) => {
        console.log(res, "res");
        this.$message.success("复制成功");
        this.getList();
      });
    },
    // 查看
    go(info) {
      if (info.ppt_jump_url) {
        window.open(info.ppt_jump_url);
      } else {
        this.$message.error("跳转链接不可用");
      }
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.currentPage = val;
      this.getList();
    },
    uploadCourseware(info) {
      this.showCoursewarePop = true;
      if (info.type_name == "自定义课件") {
        this.$router.push({
          path: "/rdouble6_course_base/double6/store/course-ware",
          query: {
            id: info.id,
          },
        });
      }
      this.coursewareForm = {
        id: "",
        name: "",
        grade_id: [],
        material: "",
        calligraphy: "",
        typeface: "",
        type: "3",
        create_type: 1,
        resource_url: "", // ppt
        file_id: "", // 视频
      };
      this.videoName = "";
      this.materials2 = [];
      if (info.id) {
        console.log(info, "courseware");
        coursewareDetail(info.id).then((res) => {
          console.log(res, "innn");
          this.coursewareForm = {
            id: info.id,
            name: res.data.name,
            grade_id: res.data.grade_id,
            material: res.data.material,
            calligraphy: res.data.calligraphy,
            typeface: res.data.typeface,
            type: res.data.type.toString(),
            create_type: 1,
            resource_url: res.data.resource_url,
            file_id: res.data.file_id,
          };
          this.videoName = res.data.videoData.name;
          this.materials2 = [
            res.data.material,
            res.data.calligraphy,
            res.data.typeface,
          ];
        });
      }
    },
    close() {
      this.showCoursewarePop = false;
    },
    getVideo(val) {
      console.log(JSON.parse(val), "video");
      this.coursewareForm.file_id = JSON.parse(val).id;
      this.videoName = JSON.parse(val).name;
    },
    finish() {
      if (this.coursewareForm.name == "") {
        this.$message.error("请填写课件名称");
        return;
      }

      if (this.coursewareForm.grade_id == "") {
        this.$message.error("请选择年级");
        return;
      }

      if (this.coursewareForm.material == "") {
        this.$message.error("请选择书写材料");
        return;
      }

      if (this.coursewareForm.file_id == "") {
        this.$message.error("请上传文件");
        return;
      }

      if (this.coursewareForm.id) {
        coursewareEdit(this.coursewareForm).then((res) => {
          console.log(res, "eeee");
          if (res.code == 200) {
            this.$message.success("编辑成功");
            this.showCoursewarePop = false;
            this.getList();
          }
        });
      } else {
        coursewareAdd(this.coursewareForm).then((res) => {
          console.log(res, "aaaa");
          if (res.code == 200) {
            this.$message.success("新增成功");
            this.showCoursewarePop = false;
            this.getList();
          }
        });
      }
    },
    newCourseware() {
      this.$router.push({
        path: "/rdouble6_course_base/double6/store/course-ware",
      });
    },
  },
  created() {
    let height = document.body.clientHeight;
    this.tableHeight = height - 360 + "px";
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="scss" scoped>
.coursewareList {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 30px 50px 30px;
}
.pag {
  // position: fixed;
  margin-top: 20px;
  right: 30px;
  bottom: 20px;
}
.courseware_operate {
  margin-bottom: 20px;
}
.addPop {
  padding-right: 80px;
}
.finishButton {
  position: relative;
  bottom: -20px;
  width: 120px;
  height: 45px;
}
</style>
