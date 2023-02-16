<template>
  <div class="lesson">
    <div class="addCourse" @click="back">返回列表</div>
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="show()">添加课节</el-button>
      </el-form-item>
    </el-form>
    <div class="lesson-table">
      <el-table :data="lessonData" fit border :max-height="tableHeight">
        <el-table-column type="index" align="center"></el-table-column>
        <el-table-column
          align="center"
          label="课节ID"
          width="90px"
          prop="id"
        ></el-table-column>
        <el-table-column
          align="center"
          label="课节名称"
          min-width="300px"
          prop="name"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="上课时间"
          width="400px"
        >
          <template slot-scope="scope">
            {{ scope.row.start_time }} - {{ scope.row.end_time }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="发布状态"
          min-width="100px"
          prop="status_name"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="课节状态"
          width="100px"
          prop="broad_status_name"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="回放状态"
          width="100px"
          prop="back_status_name"
        ></el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          min-width="200px"
          prop="created_at"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="老师口令"
          width="100px"
          prop="teacher_code"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="学生口令"
          width="100px"
          prop="student_code"
        ></el-table-column>
        <el-table-column
          v-if="type == 'broadcast'"
          align="center"
          label="助教口令"
          width="100px"
          prop="assistant_code"
        ></el-table-column>
        <el-table-column align="center" label="操作" width="380px" fixed="right"
          ><template slot-scope="scope">
            <el-button
              @click.native.prevent="show(scope.row.id, scope.row)"
              type="text"
              size="small"
              v-show="scope.row.status == 0"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="getCoursewareList(scope.row.id)"
              type="text"
              size="small"
            >
              课件
            </el-button>

            <el-button
              v-show="type == 'broadcast'"
              @click.native.prevent="goClass(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              上课
            </el-button>

            <el-button
              v-show="type == 'broadcast'"
              @click.native.prevent="create(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              生成回放
            </el-button>

            <el-button
              v-show="type == 'broadcast'"
              @click.native.prevent="getvideoList(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              回放
            </el-button>

            <el-button
              @click.native.prevent="updateRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              {{ scope.row.status == 1 ? "取消发布" : "发布" }}
            </el-button>

            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
              v-show="scope.row.status == 0"
            >
              删除
            </el-button>

            <el-button
              v-show="scope.$index != 0"
              @click.native.prevent="sort(scope.$index)"
              type="text"
              size="small"
            >
              上移
            </el-button>
          </template></el-table-column
        >
      </el-table>
    </div>
    <!-- 新建  编辑弹窗 -->
    <x-pop title="课节操作" @closeTag="close" v-show="showPop">
      <el-form v-model="lessonForm" label-width="120px" class="addPop">
        <el-form-item label="名称：">
          <el-input
            placeholder="请输入课节名称"
            v-model="lessonForm.name"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item v-show="type == 'broadcast'" label="上课时间：">
          <el-date-picker
            v-model="lessonForm.lessonTime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="课程简介：">
          <el-input
            :rows="4"
            placeholder="请输入课程简介"
            type="textarea"
            v-model="lessonForm.description"
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item v-show="type == 'broadcast'" label="直播老师：">
          <el-select v-model="lessonForm.teacher_id">
            <el-option
              v-for="teacher in teachers"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-show="type == 'broadcast'">
          <span class="tips">老师将在首页直播卡片推广展示</span>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" class="add_button" @click="changeLesson()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </x-pop>
    <!-- 上课弹窗 -->
    <x-pop title="上课" @closeTag="close" v-show="showClassPop">
      <el-form label-width="120px" class="addPop" v-model="goClassForm">
        <el-form-item label="上课链接">
          <el-input v-model="goClassForm.url"></el-input>
        </el-form-item>
        <el-form-item label="老师口令">
          <el-input v-model="goClassForm.code" disabled></el-input>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="go(goClassForm.url)"
            >去上课</el-button
          >
        </el-form-item>
      </el-form>
    </x-pop>
    <!-- 课件弹窗 -->
    <x-pop title="关联课件" @closeTag="close" v-show="showcoursewarePop">
      <div class="courseware_buttons">
        <el-button type="primary" @click="showAlldata">关联已有课件</el-button>
        <el-button type="primary" @click="newCourseware">新建课件</el-button>
      </div>
      <el-table :data="coursewareData" border max-height="300px">
        <el-table-column
          prop="id"
          label="课件id"
          max-width="120px"
        ></el-table-column>
        <el-table-column prop="name" label="课件名称"></el-table-column>
        <el-table-column label="操作"
          ><template slot-scope="scope">
            <el-button
              @click.native.prevent="connect(scope.row.id, 'cancel')"
              type="text"
              size="small"
            >
              取消关联
            </el-button>
            <el-button
              @click.native.prevent="wordPoint(scope.row)"
              type="text"
              size="small"
            >
              书写要点
            </el-button>
          </template></el-table-column
        >
      </el-table>
      <el-form class="popButton">
        <el-form-item align="center">
          <el-button type="primary" @click="showcoursewarePop = false"
            >完成</el-button
          >
        </el-form-item>
      </el-form>
    </x-pop>
    <!-- 课件完整列表 -->
    <x-pop :width="'60%'" @closeTag="showAll = false" v-show="showAll">
      <el-form inline>
        <el-form-item label="课件名称">
          <el-input
            v-model="coursewareForm.name"
            placeholder="请输入课件名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="课件类型">
          <el-select v-model="coursewareForm.type" placeholder="请选择课件类型">
            <el-option label="自定义" value="1"></el-option>
            <el-option label="PPT" value="2"></el-option>
            <el-option label="视频" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="getcoursewareAll()">搜索</el-button>
        </el-form-item>
        <el-form-item align="right">
          <el-button type="primary" @click="onReset()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table
        class="allTable"
        :data="coursewareAllData"
        height="400px"
        border
      >
        <el-table-column
          prop="id"
          label="课件ID"
          align="center"
          width="80px"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="课件名称"
          align="center"
        ></el-table-column
        ><el-table-column
          prop="grade_name"
          label="适用年级"
          width="200px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="material"
          label="书写材料"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="calligraphy"
          label="书体"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="typeface"
          label="字体"
          width="100px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="type"
          label="课件类型"
          align="center"
          width="100px"
        >
          <template slot-scope="scope">
            {{
              scope.row.type == 1
                ? "自定义课件"
                : scope.row.type == 2
                ? "PPT"
                : "视频"
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="
                connect(scope.row.id, scope.row.connect ? 'cancel' : '')
              "
              type="text"
              size="small"
            >
              {{ scope.row.connect ? "取消关联" : "关联" }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pag_inner"
        background
        layout="total, prev, pager, next"
        :total="total_inner"
        :current-page="currentPage_inner"
        @current-change="handleCurrentChange"
        :page-size="20"
      >
      </el-pagination>
      <el-button
        class="finish_all_button"
        @click="showAll = false"
        type="primary"
        >完成</el-button
      >
    </x-pop>
    <x-pop title="回放列表" v-if="showBack" @closeTag="showBack = false">
      <el-table :data="backData" height="400px">
        <el-table-column prop="id" label="视频ID"></el-table-column>
        <el-table-column label="是否为主版本" prop="is_current">
          <template slot-scope="scope">
            {{ scope.row.is_current == 1 ? "是" : "否" }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="video_inner">
              <el-button
                class="inner-button"
                @click.native.prevent="go(scope.row.url)"
                type="text"
              >
                查看
              </el-button>
              <upload-button
                @uploadFinish="Videochange"
                :info="scope.row.id"
                :buttonType="'text'"
                :name="'替换'"
                :uploadType="'video'"
                class="uploadButton"
              ></upload-button>
              <el-button type="text" @click.native.prevent="main(scope.row)"
                >设为主版本</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </x-pop>
    <word-point
      :id="coursewareid"
      :lessonId="currentLesson"
      v-if="showWordPoint"
      @closeWord="showWordPoint = false"
    ></word-point>
  </div>
</template>
<script>
import {
  getLessons,
  updateLesson,
  deleteLesson,
  editLesson,
  addLesson,
  createVideo,
  videoList,
  lessonInnerList,
  sortLesson,
  coursewareList,
  videoRelation,
  exchange,
  studyVideo,
  videoCurrent,
} from "@/api/course";
import uploadButton from "@/components/uploadButton";
import xPop from "@/components/xPop";
import wordPoint from "./wordPoint.vue";
export default {
  name: "lesson",
  components: { xPop, wordPoint, uploadButton },
  data() {
    return {
      lessonData: [],
      teachers: [],
      backData: [],
      tableHeight: 0,
      showPop: false,
      showClassPop: false, // 上课弹窗
      lessonForm: {
        course_id: "",
        name: "",
        type: "",
        time: "",
        description: "",
        teacher_id: "",
        lessonTime: [],
      },
      goClassForm: {
        url: "",
        code: "",
      },
      coursewareData: [],
      coursewareAllData: [],
      showcoursewarePop: false, // 展示课件弹窗
      total_inner: 0,
      showAll: false, // 展示完整课件
      currentPage_inner: 1,
      coursewareForm: {
        // 课件
        name: "",
        type: "",
        page: 1,
      },
      currentLesson: "", // 选中的课节id
      coursewareid: "",
      showWordPoint: false,
      showBack: false,
      videoPushInfo: {},
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    type: {
      type: String,
      default: "ppt",
    },
  },
  created() {
    let height = document.body.clientHeight;
    this.tableHeight = height - 250 + "px";
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(this.id);
      getLessons(this.id).then((res) => {
        console.log(res, "lisr");
        this.lessonData = res.data.infos;
        this.teachers = res.data.teacherList;
        console.log(this.lessonData, "lesson");
      });
    },
    getCoursewareList(id) {
      id ? (this.currentLesson = id) : "";
      lessonInnerList(this.currentLesson).then((res) => {
        console.log(res, "res");
        this.coursewareData = res.data;

        this.showcoursewarePop = true;
      });
    },
    showAlldata() {
      this.coursewareForm = {
        name: "",
        type: "",
        page: 1,
      };
      this.showAll = true;
      this.getcoursewareAll();
    },
    // 获取课件整体列表
    getcoursewareAll() {
      // this.showAll = true;
      coursewareList(this.coursewareForm).then((res) => {
        console.log(res, "all");
        this.coursewareAllData = res.data.infos;
        this.total_inner = res.data.totalNum;
        this.coursewareAllData.map((item) => {
          this.coursewareData.map((inner) => {
            if (item.id == inner.id) {
              item.connect = true;
            }
          });
        });
        console.log(this.coursewareAllData);
      });
    },
    // 书写要点
    wordPoint(info) {
      console.log(info);
      this.coursewareid = info.id;
      this.showWordPoint = true;
      // getWordpointList(info.id).then((res) => {
      //   console.log(res, "aaaaaa");
      // });
    },
    handleCurrentChange(val) {
      this.currentPage_inner = val;
      this.coursewareForm.page = val;
      this.getcoursewareAll();
    },
    back() {
      this.$emit("back");
    },
    show(id, info) {
      console.log(info, "info");
      if (id) {
        this.lessonForm = {
          course_id: this.id,
          id: info.id,
          name: info.name,
          type: this.type == "broadcast" ? 2 : 1,
          description: info.description,
          time: info.start_time + " " + info.end_time,
          teacher_id: info.teacher_id,
          lessonTime: [info.start_time, info.end_time],
        };
      } else {
        this.lessonForm = {
          course_id: this.id,
          name: "",
          type: this.type == "broadcast" ? 2 : 1,
          time: "",
          description: "",
          teacher_id: "",
          lessonTime: [],
        };
      }
      this.showPop = true;
    },
    changeLesson() {
      if (this.lessonForm.name && this.lessonForm.description) {
        if (
          this.type == "broadcast" &&
          !this.lessonForm.teacher_id &&
          this.lessonForm.lessonTime.length == 0
        ) {
          this.$message.error("请填入完整信息");
          return;
        }
        this.type == "broadcast"
          ? (this.lessonForm.time = this.lessonForm.lessonTime.join("|"))
          : "";
        if (this.lessonForm.id) {
          editLesson(this.lessonForm).then((res) => {
            console.log(res, "edit");
            if (res.code == 200) {
              this.close();
              this.getList();
              this.$message.success("编辑成功");
            }
          });
        } else {
          addLesson(this.lessonForm).then((res) => {
            console.log(res, "mmm");
            if (res.code == 200) {
              this.close();
              this.getList();
              this.$message.success("课节新增成功");
            }
          });
        }
      } else {
        this.$message.error("请填入完整信息");
        return;
      }
    },
    // 关联
    connect(info, type) {
      console.log(info, "info");
      let data = {
        video_id: this.currentLesson,
        course_ware_id: info,
        type: type === "cancel" ? 2 : 1,
      };
      videoRelation(data).then((res) => {
        console.log(res, "connect");
        this.getcoursewareAll();
        this.getCoursewareList();
      });
    },
    close() {
      this.showPop = false;
      this.showClassPop = false;
      this.showcoursewarePop = false;
    },
    onReset() {
      this.coursewareForm = {
        name: "",
        type: "",
        page: 1,
      };
      this.getcoursewareAll();
    },
    // 上课
    goClass(i, info) {
      if (!info.study_url) {
        studyVideo(info.classroom_number)
          .then((res) => {
            console.log(res);
            this.lessonData[i].study_url = res.data.url;
            this.goClassForm = {
              url: res.data.url,
              code: res.data.code,
            };
            this.showClassPop = true;
          })
          .catch((err) => this.$message.error("未能获取到相关信息"));
      } else {
        this.goClassForm = {
          url: info.study_url,
          code: info.teacher_code,
        };
        this.showClassPop = true;
      }
    },
    // 发布
    updateRow(i, info) {
      this.$confirm(
        info.status == 1
          ? "确定要取消发布吗?课节取消发布后，该课节已关联的课时仍可使用，但不支持新的排课"
          : "是否确认发布",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          updateLesson({ id: info.id, status: info.status == 1 ? 0 : 1 }).then(
            (res) => {
              if (res.code == 200) {
                this.$message.success(
                  info.status == 1 ? "取消发布成功" : "发布成功"
                );
                this.getList();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布",
          });
        });
    },
    // 生成回放
    create(i, info) {
      createVideo(info.classroom_number).then((res) => {
        console.log(res, "create");
        if (res.code == 200) {
          this.$message.success("生成成功");
          this.getList();
        }
      });
    },
    // 回放列表
    getvideoList(i, info) {
      info ? (this.videoPushInfo = info) : "";
      videoList(
        info ? info.classroom_number : this.videoPushInfo.classroom_number
      ).then((res) => {
        console.log(res, "voideo");
        this.showBack = true;
        this.backData = res.data;
      });
    },

    newCourseware() {
      this.$router.push({
        path: "/rdouble6_course_base/double6/store/course-ware",
        query: {
          section_id: this.currentLesson,
        },
      });
    },
    // 删除
    deleteRow(i, info) {
      this.$confirm("此操作将永久删除该课件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteLesson(info.id).then((res) => {
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
    // 上移
    sort(i) {
      this.lessonData.splice(
        i - 1,
        2,
        this.lessonData[i],
        this.lessonData[i - 1]
      );
      sortLesson({ sectionData: this.lessonData }).then((res) => {
        console.log(res, "sort");
      });
    },
    go(url) {
      window.open(url);
    },
    Videochange(val) {
      console.log(val, "ss");
      let video = JSON.parse(val);
      let params = {
        id: video.info,
        url: video.original_url,
      };
      exchange(params).then((res) => {
        if (res.code == 200) {
          this.$message.success("替换成功");
          this.getvideoList();
        }
      });
    },
    // 设为主本本
    main(info) {
      videoCurrent(info.id).then((res) => {
        if (res.code == 200) {
          this.$message.success("设置成功");
          this.getvideoList();
        }
      });
    },
  },
};
</script>
<style lang="scss">
.lesson {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 120px 40px 30px;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 11;
  overflow-y: auto;
  overflow-x: hidden;
  .addPop {
    padding-right: 80px;
    .add_button {
      width: 120px;
      height: 50px;
      position: relative;
      margin-top: 40px;
    }
  }
  .courseware_buttons {
    margin-bottom: 20px;
  }
  .popButton {
    position: relative;
    margin-top: 30px;
    // top: 30px;
  }
  .pag_inner {
    position: absolute;
    left: 0px;
    bottom: 0px;
  }
  .video_inner {
    display: flex;
    align-items: center;
    .inner-button {
      margin-right: 10px;
      overflow: hidden;
      margin-right: 20px;
    }
    .uploadButton {
      width: 50px;
      overflow: hidden;
    }
  }
  .allTable {
    margin-bottom: 60px;
  }
  .finish_all_button {
    position: absolute;
    right: 0px;
    bottom: 0;
  }
  .tips {
    position: relative;
    top: -25px;
    color: red;
  }
}
</style>

