<template>
  <div class="flow">
    <div class="flow_cycle" v-for="(item, index) in flows" :key="index">
      <div class="flow_cycle_title">
        第{{ index + 1 }}周期：
        <input
          class="flow_cycle_title_input"
          type="text"
          v-model="item.name"
          placeholder="请输入周期名称"
          :disabled="read"
        />
        <img
          v-if="!read"
          class="flow_cycle_title_close"
          src="@/assets/image/close.png"
          @click="flowDelete(index)"
          alt=""
        />
      </div>
      <div class="flow_cycle_intro">
        <div class="flow_cycle_intro_label">本阶段学习内容介绍：</div>
        <div class="tinybox">
          <tinymce v-model="item.content" :height="300" />
          <div class="hideTiny" v-if="read"></div>
        </div>
      </div>
      <div class="flow_cycle_buttons">
        <div class="flow_cycle_buttons_name">流程：</div>
        <div
          class="flow_cycle_buttons_button"
          @click="addLesson(index, 'course')"
        >
          课程
        </div>
        <div
          class="flow_cycle_buttons_button"
          @click="addLesson(index, 'building')"
        >
          盖楼
        </div>
        <div
          class="flow_cycle_buttons_button"
          @click="addLesson(index, 'evaluation')"
        >
          拍照测评
        </div>
        <div class="flow_cycle_buttons_button" @click="addLast(index)">
          学习报告
        </div>
      </div>
      <div class="flow_cycle_cycles" v-for="(cyc, i) in item.process" :key="i">
        <div class="flow_cycle_cycles_title">
          流程{{ i + 1 }}：
          <input
            class="flow_cycle_cycles_title_input"
            type="text"
            v-model="cyc.name"
            :disabled="read"
          />
          <img
            class="flow_cycle_cycles_title_down"
            :class="cyc.show ? 'show' : 'hide'"
            src="@/assets/image/down.png"
            alt=""
            @click="showProcess(index, i)"
          />
          <img
            v-if="!read"
            class="flow_cycle_cycles_title_close"
            src="@/assets/image/close.png"
            @click="cycdelete(index, i, cyc.process_type)"
            alt=""
          />
        </div>
        <div v-if="cyc.show" class="flow_cycle_cycles_content">
          <div
            class="flow_cycle_cycles_content_top"
            v-if="cyc.process_type != 'report'"
          >
            {{
              cyc.process_type == "course"
                ? "学习内容"
                : cyc.process_type == "building"
                ? "测试内容"
                : cyc.process_type == "evaluation"
                ? "练习内容"
                : ""
            }}
            <button
              :disabled="read"
              class="flow_cycle_cycles_content_top_button"
              @click="showDialog(index, i, cyc.process_type)"
            >
              选择
            </button>
            <!-- 课程表格内容 -->
            <el-table
              v-if="cyc.process_type == 'course'"
              class="flow_cycle_cycles_content_top_table"
              :data="cyc.plan_resource"
              max-height="470"
              fixed
            >
              <el-table-column
                label="课节名称"
                prop="children_name"
                width="300"
              ></el-table-column>
              <el-table-column
                label="课程名称"
                prop="info_name"
              ></el-table-column>
              <el-table-column
                label="课程类型"
                prop="type_name"
                width="160"
              ></el-table-column>
              <el-table-column label="上课时间" width="420">
                <template slot-scope="scope">
                  <div v-show="scope.row.start_time">
                    {{ scope.row.start_time }} 至 {{ scope.row.end_time }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="read"
                    type="danger"
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row, index, i)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 盖楼/ 拍照表格内容 -->
            <el-table
              v-if="
                cyc.process_type == 'building' ||
                cyc.process_type == 'evaluation'
              "
              max-height="470"
              class="flow_cycle_cycles_content_top_table"
              :data="cyc.plan_resource"
            >
              <el-table-column label="名称" prop="info_name"></el-table-column>
              <el-table-column label="类型" prop="type_name"></el-table-column>
              <el-table-column label="范字图" width="160">
                <template slot-scope="scope">
                  <div
                    class="infoBOX"
                    v-show="!cyc.learn || cyc.learn.indexOf('image_id') > -1"
                  >
                    <img class="video-plan" :src="scope.row.image_url" alt="" />
                    <img
                      v-if="!read"
                      class="updateIcon"
                      src="@/assets/image/icon_update.png"
                      alt=""
                      @click="uploadPop(index, i, scope.$index, 'fz')"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="讲解视频" width="160">
                <template slot-scope="scope">
                  <div
                    class="infoBOX"
                    v-show="
                      !cyc.learn || cyc.learn.indexOf('explain_video_id') > -1
                    "
                  >
                    <video
                      class="video-plan"
                      v-if="scope.row.explain_video_id"
                      :src="scope.row.explain_video_url"
                      controls
                    ></video>
                    <img
                      v-if="!read"
                      class="updateIcon"
                      src="@/assets/image/icon_update.png"
                      alt=""
                      @click="uploadPop(index, i, scope.$index, 'jj')"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="示范视频" width="160">
                <template slot-scope="scope">
                  <div
                    class="infoBOX"
                    v-show="
                      !cyc.learn || cyc.learn.indexOf('demo_video_id') > -1
                    "
                  >
                    <video
                      v-if="scope.row.demo_video_id"
                      class="video-plan"
                      :src="scope.row.demo_video_url"
                      controls
                    ></video>
                    <img
                      v-if="!read"
                      class="updateIcon"
                      src="@/assets/image/icon_update.png"
                      alt=""
                      @click="uploadPop(index, i, scope.$index, 'sf')"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="音频" width="160">
                <template slot-scope="scope">
                  <div
                    class="infoBOX"
                    v-show="!cyc.learn || cyc.learn.indexOf('audio_id') > -1"
                  >
                    <audio
                      v-if="scope.row.audio_id"
                      :src="scope.row.audio_url"
                      controls
                    ></audio
                    ><img
                      v-if="!read"
                      class="updateIcon"
                      src="@/assets/image/icon_update.png"
                      alt=""
                      @click="uploadPop(index, i, scope.$index, 'yp')"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                v-if="cyc.process_type == 'building'"
                label="练习次数"
                :width="140"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      :disabled="read"
                      v-model="scope.row.number"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="书写要点一" width="140">
                <template slot-scope="scope">
                  <input
                    class="wordpoint"
                    :disabled="read"
                    v-model="scope.row.word_point[0]"
                    type="text"
                    placeholder="必填"
                    v-show="!cyc.learn || cyc.learn.indexOf('word_point') > -1"
                  />
                </template>
              </el-table-column>
              <el-table-column label="书写要点二" width="140">
                <template slot-scope="scope">
                  <input
                    class="wordpoint"
                    :disabled="read"
                    v-model="scope.row.word_point[1]"
                    type="text"
                    placeholder="选填"
                    v-show="!cyc.learn || cyc.learn.indexOf('word_point') > -1"
                  />
                </template>
              </el-table-column>
              <el-table-column label="书写要点三" width="140">
                <template slot-scope="scope">
                  <input
                    class="wordpoint"
                    :disabled="read"
                    v-model="scope.row.word_point[2]"
                    type="text"
                    placeholder="选填"
                    v-show="!cyc.learn || cyc.learn.indexOf('word_point') > -1"
                  />
                </template>
              </el-table-column>
              <el-table-column label="书写要点四" width="140">
                <template slot-scope="scope">
                  <input
                    class="wordpoint"
                    :disabled="read"
                    v-model="scope.row.word_point[3]"
                    type="text"
                    placeholder="选填"
                    v-show="!cyc.learn || cyc.learn.indexOf('word_point') > -1"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    :disabled="read"
                    type="danger"
                    size="mini"
                    @click="handleDelete(scope.$index, scope.row, index, i)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="flow_cycle_cycles_content_top" v-else>
            {{ reportText }}
          </div>
        </div>
      </div>
      <div class="flow_cycle_save" @click="saveFlow(index)">保存</div>
    </div>
    <div class="addFlow" @click="addFlow">添加周期</div>

    <div class="step-buttons">
      <el-button @click="preStep" class="pre-step" type="info" round
        >上一步</el-button
      >
      <el-button class="finish-step" type="success" round @click="postInfo"
        >完成</el-button
      >
    </div>
    <!-- 课程弹窗 -->
    <pops
      @cancel="hidePop"
      :selection="courseSelect"
      v-if="showPop"
      @finish="finish"
    ></pops>
    <word-pop
      @cancel="hidePop"
      :selection="courseSelect"
      v-if="showWordPop"
      :poptype="popType"
      @finish="finish"
      @learn="getLearn"
    ></word-pop>
    <el-dialog
      title="上传文件"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div class="uploadFile">
        <el-button type="primary">上传文件</el-button>
        <span v-show="hasUpload">正在上传中请稍后。。。</span>
        <input v-if="dialogVisible" type="file" @change="upload" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exchange()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pops from "./step-pops.vue";
import wordPop from "./step-pops-word.vue";
import {
  getDetails,
  setDetails,
  postDetails,
  deleteDetails,
  TXgetSignature,
  TXaddUploadInfo,
} from "@/api/plan";
import TcVod from "vod-js-sdk-v6";
import Tinymce from "@/components/Tinymce";

function getSignature() {
  return TXgetSignature().then((res) => {
    return res.data;
  });
}

export default {
  name: "flow",
  data() {
    return {
      flows: [
        {
          content: "",
          name: "",
          haveReport: false,
          process: [
            {
              name: "课程",
              plan_resource: [],
              show: true,
              process_type: "course", // type 区分不同的类型   course   building  evaluation report
            },
          ],
        },
      ],
      reportText:
        "选择学习报告流程，则表示在本周期最后一天晚8点，系统会给学生推送一份本阶段学习报告",
      showPop: false,
      showWordPop: false,
      cycIndex: 0, // 选择处理的流程
      flowIndex: 0, // 选择处理周期
      courseSelect: [], // 被选中的课程
      tcVod: null,
      lastOrderlist: 0, // 最后的orderlist  后台排序用
      dialogVisible: false,
      uploadInfo: {
        flowIndex: 0,
        cycIndex: 0,
        planIndex: 0,
        type: "",
      },
      uploadFile: {},
      hasUpload: false,
      finishAll: false,
      read: false,
      popType: [], // 传递的类型
    };
  },
  props: {
    planId: {
      type: Number,
      default: null,
    },
  },
  components: { pops, wordPop, Tinymce },
  created() {
    this.tcVod = new TcVod({
      getSignature: getSignature,
    });
  },

  mounted() {
    this.details();
    let read = window.localStorage.getItem("read");
    if (read == "yes") {
      this.read = true;
    } else {
      this.read = false;
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    addLesson(i, type) {
      if (this.read) return;
      let cycleJson = {
        name:
          type == "course" ? "课程" : type == "building" ? "盖楼" : "拍照测评",
        plan_resource: [],
        show: true,
        process_type: type, // type 区分不同的类型
      };
      this.flows[i].process.push(cycleJson);
    },
    // 增加学习报告  一个周期只有一次
    addLast(index) {
      if (this.read) return;
      if (this.flows[index].haveReport) {
        this.$message("该周期已添加学习报告");
        return;
      }
      this.flows[index].haveReport = true;
      this.flows[index].process.push({
        name: "学习报告",
        show: true,
        process_type: "report",
      });
    },
    addFlow() {
      if (this.read) return;
      this.lastOrderlist += 1;
      let json = {
        content: "",
        name: "",
        haveReport: false,
        process: [],
        plan_id: this.planId,
        orderlist: this.lastOrderlist,
      };
      this.flows.push(json);
    },
    // 展示弹窗
    showDialog(index, i, type) {
      this.flowIndex = index;
      this.cycIndex = i;
      this.courseSelect = this.flows[index].process[i].plan_resource;
      this.popType = this.flows[index].process[i].learn;
      console.log(this.flows[index].process[i], "xuxuxu");
      if (type == "course") {
        this.showPop = true;
      } else {
        this.showWordPop = true;
      }
    },
    // 流程删除
    cycdelete(index, i, type) {
      this.flows[index].process.splice(i, 1);
      if (type == "report") {
        this.flows[index].haveReport = false;
      }
    },
    // 周期删除
    flowDelete(index) {
      if (this.flows.length <= 1) {
        this.$message({
          message: "当前计划仅剩该周期，无法删除~",
          type: "error",
        });
        return;
      }
      this.$confirm("是否确认删除该周期？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          if (this.flows[index].id) {
            deleteDetails(this.flows[index].id).then((res) => {
              this.flows.splice(index, 1);
              this.$message({
                message: "删除成功~",
                type: "success",
              });
            });
          } else {
            this.flows.splice(index, 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    showProcess(index, i) {
      this.$nextTick(() => {
        this.flows[index].process[i].show = !this.flows[index].process[i].show;
      });
    },
    finish(data) {
      this.showPop = false;
      this.showWordPop = false;
      this.flows[this.flowIndex].process[this.cycIndex].plan_resource = data;
    },
    // 获取流程详情
    details() {
      getDetails(this.planId).then((res) => {
        let defaultFlow = [
          {
            content: "",
            name: "",
            haveReport: false,
            plan_id: this.planId,
            orderlist: 1,
            process: [
              {
                name: "课程",
                plan_resource: [],
                show: true,
                process_type: "course", // type 区分不同的类型   course   building  evaluation report
              },
            ],
          },
        ];
        this.flows = res.data;
        if (this.flows.length > 0) {
          this.flows.map((item) => {
            let have = false; // 是否有报告
            item.process.map((pro) => {
              pro.show = true;
              if (pro.process_type == "report") {
                have = true;
              }
              if (
                pro.process_type == "building" ||
                pro.process_type == "evaluation"
              ) {
                let plan = pro.plan_resource;
                let lesson = [];
                if (plan) {
                  plan[0].image_id != 0 ? lesson.push("image_id") : "";
                  plan[0].explain_video_id != 0
                    ? lesson.push("explain_video_id")
                    : "";
                  plan[0].demo_video_id != 0
                    ? lesson.push("demo_video_id")
                    : "";
                  plan[0].audio_id != 0 ? lesson.push("audio_id") : "";
                  plan[0].word_point[0] ? lesson.push("word_point") : "";
                }
                pro.learn = lesson;
              }
            });
            item.haveReport = have;
          });
          this.lastOrderlist = this.flows[this.flows.length - 1].orderlist;
        } else {
          this.lastOrderlist += 1;
          this.flows = defaultFlow;
        }
        console.log(this.flows, "flows");
      });
    },
    // 提交流程信息
    postInfo() {
      if (this.read) return;
      this.finishAll = true;
      this.flows.map((item, i) => {
        setTimeout(() => {
          this.saveFlow(i, "back");
        }, 100 * i);
      });
    },
    saveFlow(i, t) {
      if (this.read) return;
      if (this.flows[i].id) {
        setDetails(this.flows[i], this.flows[i].id)
          .then((res) => {
            if (res.code !== 200) {
              this.finishAll = false;
            }
            if (i == this.flows.length - 1 && t && this.finishAll) {
              this.$emit("finish", true);
            } else if (!t) {
              this.$message({
                message: "保存成功~",
                type: "success",
              });
            }
          })
          .catch(() => {
            this.finishAll = false;
          });
      } else {
        postDetails(this.flows[i])
          .then((res) => {
            if (res.code !== 200) {
              this.finishAll = false;
            }
            if (res.code == 200) {
              this.flows[i].id = res.data.id;
              if (i == this.flows.length - 1 && t && this.finishAll) {
                this.$emit("finish", true);
              } else if (!t) {
                this.$message({
                  message: "保存成功~",
                  type: "success",
                });
              }
            }
          })
          .catch(() => {
            this.finishAll = false;
          });
      }
    },
    handleDelete(i, row, flowIndex, cycIndex) {
      this.flows[flowIndex].process[cycIndex].plan_resource.splice(i, 1);
    },
    preStep() {
      this.$emit("pre", true);
    },
    hidePop() {
      this.showPop = false;
      this.showWordPop = false;
    },
    // 上传
    uploadPop(flowIndex, cycIndex, planIndex, type) {
      this.hasUpload = false;
      // if (type == "fz") {
      // }
      this.uploadInfo = {
        flowIndex,
        cycIndex,
        planIndex,
        type,
      };
      this.dialogVisible = true;
    },
    upload(e) {
      let file = e.target.files[0];
      let name = file.name;
      if (name.indexOf(".jfif") > 0 || name.indexOf(".JFIF") > 0) {
        this.$message.warning("当前格式暂不支持，请更换其他格式图片");
        return;
      } else if (
        file.type.indexOf("image") < 0 &&
        this.uploadInfo.type == "fz"
      ) {
        this.$message.warning("请上传图片");
        return;
      } else if (
        file.type.indexOf("audio") < 0 &&
        this.uploadInfo.type == "yp"
      ) {
        this.$message.warning("请上传音频文件");
        return;
      } else if (
        file.type.indexOf("video") < 0 &&
        (this.uploadInfo.type == "jj" || this.uploadInfo.type == "sf")
      ) {
        this.$message.warning("请上传视频文件");
        return;
      }
      this.hasUpload = true;
      const uploader = this.tcVod.upload({
        mediaFile: file,
      });
      const uploaderInfo = {
        videoInfo: uploader.videoInfo,
        isVideoUploadSuccess: false,
        isVideoUploadCancel: false,
        progress: 0,
        fileId: "",
        videoUrl: "",
        cancel: () => {
          uploaderInfo.isVideoUploadCancel = true;
          uploader.cancel();
        },
      };

      uploader.done().then((doneResult) => {
        let d = {
          name: name,
          original_url: doneResult.video.url,
          fileId: doneResult.fileId,
          line_type: 4,
          file_type:
            this.uploadInfo.type == "fz"
              ? "image"
              : this.uploadInfo.type == "yp"
              ? "audio"
              : "video",
        };

        TXaddUploadInfo(d).then((res) => {
          this.uploadFile = res.data;
          this.uploadFile.original_url = d.original_url;
          this.hasUpload = false;
          this.$message.success("上传成功");
        });
      });
    },
    exchange() {
      this.hasUpload = false;
      this.dialogVisible = false;
      let plan =
        this.flows[this.uploadInfo.flowIndex].process[this.uploadInfo.cycIndex]
          .plan_resource[this.uploadInfo.planIndex];
      if (this.uploadInfo.type == "fz") {
        plan.image_id = this.uploadFile.id;
        plan.image_url = this.uploadFile.original_url;
      } else if (this.uploadInfo.type == "jj") {
        plan.explain_video_id = this.uploadFile.id;
        plan.explain_video_url = this.uploadFile.original_url;
      } else if (this.uploadInfo.type == "yp") {
        plan.audio_id = this.uploadFile.id;
        plan.audio_url = this.uploadFile.original_url;
      } else if (this.uploadInfo.type == "sf") {
        plan.demo_video_id = this.uploadFile.id;
        plan.demo_video_url = this.uploadFile.original_url;
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 获取选中的
    getLearn(val) {
      console.log(val, "learn");
      this.flows[this.flowIndex].process[this.cycIndex].learn = val;
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style lang="scss">
// @import "wangeditor/editor/dist/css/style.css";
.flow {
  height: calc(100% - 100px);
  overflow: auto;
  &_cycle {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px dashed #ccc;
    &_title {
      width: 100%;
      background-color: rgba(25, 143, 253, 0.15);
      box-sizing: border-box;
      padding-left: 40px;
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 20px;
      position: relative;
      &_input {
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: none;
        border-radius: 10px;
        margin-left: 20px;
        width: 400px;
      }
      &_close {
        position: absolute;
        right: 20px;
        cursor: pointer;
      }
    }
    &_intro {
      padding-left: 20px;
      padding-right: 20px;
      font-size: 18px;
      margin-top: 20px;
      &_text {
        resize: none;
        width: 100%;
        height: 300px;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 20px;
        font-size: 16px;
        outline: none;
        border: 1px solid #ccc;
        border-radius: 10px;
        color: #333;
      }
    }
    &_buttons {
      display: flex;
      font-size: 18px;
      align-items: center;
      padding-left: 20px;
      margin-top: 20px;
      &_button {
        padding: 6px 20px;
        min-width: 100px;
        text-align: center;
        border: 1px solid #aaa;
        margin-left: 20px;
        border-radius: 30px;
        cursor: pointer;
      }
    }
    &_cycles {
      border: 1px solid #aaa;
      border-radius: 10px;
      margin-top: 20px;
      overflow: hidden;
      &_title {
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        padding-left: 20px;
        display: flex;
        align-items: center;
        background: #eee;
        font-size: 16px;
        position: relative;
        &_input {
          width: 300px;
          height: 40px;
          border: none;
          border-radius: 10px;
          margin-left: 20px;
          padding-left: 20px;
        }
        &_close {
          width: 34px;
          height: 34px;
          position: absolute;
          right: 20px;
          top: 13px;
          cursor: pointer;
        }
        &_down {
          width: 40px;
          height: 40px;
          position: absolute;
          cursor: pointer;
          top: 10px;
          right: 70px;
          &.hide {
            transform: rotate(180deg);
          }
        }
      }
      .updateIcon {
        width: 16px;
        height: 16px;
        margin-left: 5px;
        position: relative;
        top: 2px;
        cursor: pointer;
      }
      &_content {
        padding: 20px;
        &_top {
          font-size: 16px;
          width: 100%;
          font-weight: bold;
          &_button {
            width: 100px;
            height: 40px;
            font-size: 16px;
            background: #409eff;
            border: none;
            color: #fff;
            border-radius: 20px;
            margin-left: 20px;
            cursor: pointer;
          }
          &_table {
            margin-top: 20px;
            background: #e1ffff;
          }
        }
      }
    }
    &_save {
      width: 200px;
      color: #fff;
      height: 40px;
      border-radius: 20px;
      text-align: center;
      line-height: 40px;
      background: #409eff;
      margin: 0 auto;
      margin-top: 20px;
      cursor: pointer;
    }
  }
  .addFlow {
    width: 400px;
    height: 60px;
    border-radius: 30px;
    background: skyblue;
    color: #fff;
    font-size: 18px;
    line-height: 60px;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
  }
  .step-buttons {
    display: flex;
    height: 80px;
    align-items: center;
    margin-top: 40px;
    justify-content: center;
    .pre-step {
      width: 200px;
      height: 60px;
      margin-right: 40px;
      border-radius: 30px;
      font-size: 18px;
    }
    .finish-step {
      width: 200px;
      height: 60px;
      border-radius: 30px;
      font-size: 18px;
    }
  }
  .textarea-border {
    border: 1px solid #ccc;
  }
  .video-plan {
    width: 120px !important;
  }
  .infoBOX {
    display: flex;
    align-items: center;
    input {
      position: absolute;
      opacity: 0;
      width: 240px;
      height: 20px;
      right: 0;
    }
    video,
    audio {
      position: relative;
      z-index: 111;
      width: 200px;
    }
  }
  .uploadFile {
    position: relative;
    input {
      opacity: 0;
      position: absolute;
      height: 100%;
      width: 100px;
      z-index: 11;
      left: 0;
    }
  }
  .tinybox {
    position: relative;
    .hideTiny {
      position: absolute;
      z-index: 11;
      background-color: rgba(255, 255, 255, 0.6);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: not-allowed;
    }
  }
  .wordpoint {
    width: 120px;
    font-size: 12px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 30px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
}
</style>
