<template>
  <div class="app-container newcourseware">
    <el-tabs v-model="activeName" @tab-click="handleClickCourse">
      <el-tab-pane label="课件信息（1）" name="1"></el-tab-pane>
      <el-tab-pane label="流程设置（2）" name="2" :disabled="!id"></el-tab-pane>
    </el-tabs>
    <div v-show="activeName === '1'" style="margin-top: 20px">
      <el-form
        ref="courseInfoSetting"
        label-width="120px"
        :model="params"
        :rules="rules"
      >
        <el-form-item label="课件名称：" prop="name">
          <el-input
            v-model="params.name"
            placeholder="请填写课程名称"
            maxlength="14"
            style="width: 400px"
          />
        </el-form-item>
        <el-form-item label="适用年级：" prop="grade_id">
          <el-select v-model="params.grade_id" placeholder="请选择" multiple>
            <el-option
              v-for="(item, i) in gradeData"
              :key="i"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="选择学期：" prop="semester">
                  <el-select v-model="params.semester" placeholder="请选择">
                      <el-option
                          v-for="(val, key, i) in semester"
                          :key="i"
                          :label="val"
                          :value="key"
                      />
                  </el-select>
              </el-form-item> -->
        <el-form-item label="书写材料：" prop="material">
          <el-cascader
            v-model="materialStatusData"
            :props="propsOptions"
            :options="materialData"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveCourse('courseInfoSetting')"
            >下一步</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeName === '2'" style="margin-top: 20px">
      <template v-if="templateList.length > 0">
        <el-tabs
          v-model="activeIndex"
          tab-position="left"
          style="height: calc(100vh - 264px)"
          @tab-click="handleClickProcss"
        >
          <el-tab-pane
            v-for="(item, index) in templateList"
            :key="item.template_id"
            :name="index + ''"
            :label="'流程' + (index + 1)"
          >
            <div class="edit_ppt_template">
              <div v-if="item.detail.length > 0" class="tab_left">
                <p class="title">{{ item.type_name }}</p>
                <div class="left_box">
                  <!-- <div
                                      v-if="item.word_id > 0 && item.word_name !== ''"
                                      style="text-align: left;padding:0 10px;"
                                  >
                                      <el-form :inline="true">
                                          <el-form-item style="margin-bottom: 0">
                                              <el-input
                                                  v-model="item.word_name"
                                                  style="width: 100px"
                                                  placeholder="请输入内容"
                                              ></el-input>
                                          </el-form-item>
                                          <el-form-item style="margin-right: 0; margin-bottom: 0">
                                              <el-button type="primary">搜索</el-button>
                                          </el-form-item>
                                      </el-form>
                                  </div> -->
                  <div
                    v-for="(cTem, cdx) in item.detail"
                    :key="cTem.id"
                    :class="[
                      'left_item_box',
                      cTem.id === activeId ? 'active' : '',
                    ]"
                    @click="changeEditTemplate(cTem)"
                  >
                    <div
                      v-for="hTem in cTem.content"
                      :key="hTem.itemId"
                      class="t_item_content"
                    >
                      <img
                        v-if="hTem.type === 'img'"
                        :src="hTem.url"
                        :style="setStyleImg(hTem)"
                        alt=""
                      />
                      <p
                        v-if="hTem.type === 'text'"
                        class="p_text"
                        :style="setStyleText(hTem)"
                      >
                        {{ hTem.text }}
                      </p>
                      <video
                        v-if="hTem.type === 'video'"
                        :src="hTem.url"
                        :style="setStyleImg(hTem)"
                      ></video>
                    </div>
                    <span class="del_btn" @click.stop="deletePPT(index, cdx)"
                      >删除</span
                    >
                    <span
                      v-if="item.detail.length > 1"
                      class="top_btn"
                      @click.stop="upPPT(index, cdx)"
                      >上移</span
                    >
                    <span
                      v-if="item.detail.length > 1"
                      class="btm_btn"
                      @click.stop="downPPT(index, cdx)"
                      >下移</span
                    >
                  </div>
                </div>
                <div class="bottom_btns">
                  <el-button
                    type="primary"
                    size="small"
                    round
                    @click="addCourseware"
                    >添加流程</el-button
                  >
                  <el-button
                    type="primary"
                    size="small"
                    round
                    @click="saveToTemplate"
                    >存至模版</el-button
                  >
                </div>
              </div>
              <div class="tab_right">
                <div
                  v-if="editTemplateData.length > 0"
                  ref="edit_ppt"
                  class="edit_ppt_box"
                >
                  <div
                    v-for="hTem in editTemplateData"
                    :key="hTem.itemId"
                    :style="
                      hTem.type === 'img' ||
                      hTem.type === 'video' ||
                      hTem.type === 'audio'
                        ? setEditStyleImg(hTem)
                        : hTem.type === 'text'
                        ? setEditStyleText(hTem)
                        : ''
                    "
                    :class="
                      hTem.type === 'img' ||
                      hTem.type === 'video' ||
                      hTem.type === 'audio'
                        ? 't_item_edit'
                        : hTem.type === 'text'
                        ? 't_item_edit_text'
                        : ''
                    "
                    @click="editTemplate(hTem)"
                  >
                    <img v-if="hTem.type === 'img'" :src="hTem.url" alt="" />
                    <span v-if="hTem.type === 'text'" class="p_text">
                      {{ hTem.text }}
                    </span>
                    <video
                      v-if="hTem.type === 'video'"
                      controls
                      :src="hTem.url"
                    ></video>
                    <div v-if="hTem.type === 'audio'">
                      <audio :src="hTem.url" style="display: none"></audio>
                      <el-button
                        type="primary"
                        size="small"
                        round
                        style="position: absolute; right: 20px; top: 20px"
                        >替换音频</el-button
                      >
                    </div>
                  </div>
                </div>
                <div class="save_ppt_btns">
                  <el-button
                    type="primary"
                    size="small"
                    round
                    @click="saveCourseware"
                    >保存</el-button
                  >
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
      <div v-else>
        <el-button type="primary" @click="addCourseware">添加流程</el-button>
      </div>
    </div>

    <!-- 选择模版组件 -->
    <Courseware
      ref="courseware"
      :data="CoursewareData"
      @changeTemplate="changeTemplate"
      @hideDialog="hideDialog"
      @selectTemplate="selectTemplate"
    ></Courseware>

    <!-- 修改文字组件 -->
    <el-dialog
      title="编辑文字"
      :visible.sync="editTextDialogFormVisible"
      :show-close="false"
      width="500px"
    >
      <el-form>
        <el-form-item>
          <el-input v-model="textData" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="concelEditText">取 消</el-button>
          <el-button type="primary" @click="confirmEditText">确 定</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 修改视频或者图片资源组件弹窗 （第一步） -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="editUrlDialogFormVisible"
      width="400px"
    >
      <el-button type="primary" @click="resourceClick"
        >资源库（知识树）</el-button
      >
      <el-button type="primary" style="margin-left: 50px" @click="templateClick"
        >组件库</el-button
      >
    </el-dialog>

    <!-- 修改视频/图片/音频 资源列表组件 -->
    <Resource
      ref="resource"
      :materialData="materialData"
      :type="itemType"
      @relevanceData="relevanceData"
    ></Resource>

    <!-- 修改视频/图片/音频 组件列表弹窗 -->
    <TemplateLists
      ref="templateLists"
      :type="itemType"
      :title="templateDataTitle"
      @relatedSource="relatedSource"
    ></TemplateLists>

    <!-- 保存模版弹窗（设置模版标题和类型弹窗） -->
    <el-dialog
      :visible.sync="DialogFormVisible"
      :show-close="false"
      :before-close="closeDialogFormVisible"
      title="保存模版"
      width="500px"
    >
      <el-form
        ref="saveTemplate"
        label-width="100px"
        :model="saveTemplateParams"
        :rules="templateParamsRules"
      >
        <el-form-item label="模版名称" prop="name">
          <el-input
            v-model="saveTemplateParams.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="流程类型" prop="type">
          <el-select v-model="saveTemplateParams.type" placeholder="请选择">
            <el-option
              v-for="(value, key, index) in processLists"
              :key="index"
              :label="value"
              :value="key"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <div class="dialog-footer">
          <el-button @click="cancelSaveTemplate('saveTemplate')"
            >取 消</el-button
          >
          <el-button type="primary" @click="confirmSaveTemplate('saveTemplate')"
            >确 定</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Courseware from "@/components/modulesComponent/Courseware";
import {
  coursewareList,
  coursewareAdd,
  newTemplate,
  processAdd,
  processEdit,
  addTemplate,
  coursewareDetail,
  coursewareEdit,
} from "@/api/course";
import Resource from "./components/Resource";
import TemplateLists from "./components/TemplateLists";
export default {
  components: {
    Courseware,
    Resource,
    TemplateLists,
  },
  data() {
    return {
      section_id: "", // 课节id
      textData: "",
      itemId: "",
      itemType: "",
      activeName: "1",
      activeIndex: "0",
      params: {
        name: "",
        grade_id: [],
        semester: "",
        material: "",
        calligraphy: "",
        typeface: "",
        content: "",
        type: 1,
        create_type: 1,
        section_id: "",
      },
      materialData: [],
      materialStatusData: [],
      gradeData: [],
      semester: {},
      propsOptions: {
        label: "name",
        value: "id",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请填写课程名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 14,
            message: "长度限制14个字符",
            trigger: "blur",
          },
        ],
        grade_id: [
          { required: true, message: "请选择适用年级", trigger: "change" },
        ],
        semester: [
          { required: true, message: "请选择学期", trigger: "change" },
        ],
        material: [
          { required: true, message: "请选择书写材料", trigger: "change" },
        ],
      },
      templateParamsRules: {
        name: [
          {
            required: true,
            message: "请填写模版名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 14,
            message: "长度限制14个字符",
            trigger: "blur",
          },
        ],
        type: [
          { required: true, message: "请选择流程类型", trigger: "change" },
        ],
      },
      id: "", // 课件id,新建进来为空 ， 编辑不为空
      CoursewareData: null,
      templateList: [], // 流程列表
      editTemplateData: [], // 右侧编辑区域内容，默认显示数组第一条数据
      activeId: 0, // 左侧选中的id
      editTextDialogFormVisible: false, // 选中文字弹窗
      editUrlDialogFormVisible: false, // 选中图片或者视频资源弹窗
      dialogTitle: "",
      DialogFormVisible: false, // 保存模版弹窗
      isEditTemplate: false, // 是否是编辑模版   true编辑 / false新增
      processLists: null,
      saveTemplateParams: {
        // 保存模版数据
        name: "",
        type: "",
        word_id: 0,
        content: "",
      },
      templateData: [], // 六六资源库数据
      templateDataTitle: "",
    };
  },

  activated() {
    let id = this.$route.query.id;
    console.log(id, "id");
    this.section_id = this.$route.query.section_id;
    this.activeName = "1";
    this.activeId = 0;
    this.activeIndex = "0";
    if (id) {
      this.id = id;
      this.getCoursewareDetail(id);
    } else {
      this.initMaterialData();
      this.resetParams();
      this.isEditTemplate = false;
      this.id = "";
    }
    if (this.section_id) {
      this.params.section_id = this.section_id;
      this.params.create_type = 2;
    } else {
      this.params.section_id = "";
      this.params.create_type = 1;
    }
  },

  mounted() {
    // this.getProcessLists();
    this.initMaterialData();
    this.getTemplateList("", true);
    this.active();
  },

  methods: {
    // 获取流程列表
    // getProcessLists() {
    //   Api.processLists().then((value) => {
    //     if (value.status === 0) {
    //       this.processLists = value.data.process;
    //     } else {
    //       this.$message({
    //         type: "error",
    //         message: value.msg,
    //       });
    //     }
    //   });
    // },
    active() {
      let id = this.$route.query.id;
      this.section_id = this.$route.query.section_id;
      console.log(this.section_id, "ixxxd");
      this.activeName = "1";
      this.activeId = 0;
      this.activeIndex = "0";
      if (id) {
        this.id = id;
        this.getCoursewareDetail(id);
      } else {
        this.initMaterialData();
        this.resetParams();
        this.isEditTemplate = false;
        this.id = "";
      }
      if (this.section_id) {
        this.params.section_id = this.section_id;
        this.params.create_type = 2;
      } else {
        this.params.section_id = "";
        this.params.create_type = 1;
      }
    },
    getCoursewareDetail(id) {
      this.initMaterialData();
      coursewareDetail(id).then((value) => {
        if (value.code === 200) {
          this.params.name = value.data.name;
          this.params.grade_id = value.data.grade_id;
          this.params.semester = String(value.data.semester);
          this.params.material = value.data.material;
          this.params.calligraphy = value.data.calligraphy;
          this.params.typeface = value.data.typeface;
          this.params.content = value.data.processData;
          this.materialStatusData[0] = value.data.material;
          this.materialStatusData[1] = value.data.calligraphy;
          this.materialStatusData[2] = value.data.typeface;
          if (value.data.processData.length > 0) {
            this.isEditTemplate = true;
            this.templateList = value.data.processData;
            this.editTemplateData = value.data.processData[0].detail[0].content;
          } else {
            this.isEditTemplate = false;
            this.templateList = [];
            this.editTemplateData = [];
          }
        }
        this.initMaterialData();
      });
    },
    resetParams() {
      this.params = {
        name: "",
        grade_id: [],
        material: "",
        calligraphy: "",
        typeface: "",
        content: "",
        type: 1,
        create_type: 1,
      };
      this.materialStatusData = [];
      this.editTemplateData = [];
      this.templateList = [];
      this.CoursewareData = null;
      this.$refs.courseInfoSetting.resetFields();
    },
    initMaterialData() {
      coursewareList().then((response) => {
        console.log(response, "res");
        // this.params.material = value.data.material;
        this.materialData = response.data.materialData;
        this.gradeData = response.data.gradeSemester;
      });
    },

    handleClickCourse() {
      if (this.activeName === "2") {
        if (this.templateList.length > 0) {
          this.activeId = this.templateList[0].detail[0].id;
        }
      }
    },

    handleChange(e) {
      if (e && e.length === 3) {
        this.params.material = e[0];
        this.params.calligraphy = e[1];
        this.params.typeface = e[2];
      }
    },
    saveCourse(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.id) {
            let params = Object.assign(this.params, { id: this.id });
            coursewareEdit(params).then((value) => {
              if (value.code === 200) {
                this.$message({
                  type: "success",
                  message: "更新成功!",
                });
                setTimeout(() => {
                  this.activeName = "2";
                }, 1000);
              } else {
                this.$message({
                  type: "error",
                  message: value.msg,
                });
              }
            });
          } else {
            console.log(this.params, "params");
            coursewareAdd(this.params).then((value) => {
              if (value.code === 200) {
                this.$message({
                  type: "success",
                  message: "保存成功!",
                });
                this.id = value.data.id;
                setTimeout(() => {
                  this.activeName = "2";
                }, 1000);
              } else {
                this.$message({
                  type: "error",
                  message: value.msg,
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },

    // 获取模版库列表，activeName为模版库分类
    getTemplateList(activeName, show) {
      console.log(activeName, "act");
      newTemplate(activeName ? activeName : 1).then((value) => {
        if (value.code === 200) {
          this.processLists = value.data.processList;
          this.CoursewareData = value.data;
          show ? "" : (this.$refs.courseware.showDialog = true);
        }
      });
    },
    addCourseware() {
      this.getTemplateList();
    },

    changeTemplate(activeName) {
      this.getTemplateList(activeName);
    },

    hideDialog() {
      this.$refs.courseware.showDialog = false;
    },

    selectTemplate(data) {
      this.$refs.courseware.showDialog = false;
      this.templateList.push(data);
      this.activeIndex = String(this.templateList.length - 1);
      this.editTemplateData = data.detail[0].content;
      // this.editTemplateData = this.contents;
      this.activeId = data.detail[0].id;
    },
    setStyleImg(item) {
      return `width: calc((200/1920) * ${item.width});
        height: calc((200/1920) * ${item.height});
        top: calc((200/1920) * ${item.y});
        left: calc((200/1920) * ${item.x});
                  z-index:calc(${item.zIndex});
                  border-radius:${item.borderRadius}
        `;
    },
    setStyleText(item) {
      return `width: ${item.width};
        height: ${item.height};
        top: calc((200/1920) * ${item.y});
        left: calc((200/1920) * ${item.x});
        line-height:${item.lineHeight};
        font-size:${item.fontSize};
        font-weight:${item.fontWeight};
        background:${item.background};
        color:${item.color};
        text-align:${item.textAlign};
        text-indent:${item.textIndent};
                  z-index:calc(${item.zIndex});
                  border-radius:${item.borderRadius}
        `;
    },
    setEditStyleImg(item) {
      return `width: calc((900/1920) * ${item.width});
        height: calc((900/1920) * ${item.height});
        top: calc((900/1920) * ${item.y});
        left: calc((900/1920) * ${item.x});
                  z-index:calc(${item.zIndex});
                  border-radius:${item.borderRadius}
        `;
    },
    setEditStyleText(item) {
      return `width: ${item.width};
        height: ${item.height};
        top: calc((900/1920) * ${item.y});
        left: calc((900/1920) * ${item.x});
        line-height:${item.lineHeight};
        font-size:${item.fontSize};
        font-weight:${item.fontWeight};
        background:${item.background};
        color:${item.color};
        text-align:${item.textAlign};
        text-indent:${item.textIndent};
                  z-index:calc(${item.zIndex});
                  border-radius:${item.borderRadius}
        `;
    },

    editTemplate(item) {
      this.itemId = item.itemId;
      this.itemType = item.type;
      if (item.type === "text") {
        this.editTextDialogFormVisible = true;
      } else {
        this.editUrlDialogFormVisible = true;
        this.dialogTitle =
          item.type === "img"
            ? "编辑图片"
            : item.type === "video"
            ? "编辑视频"
            : "编辑音频";
        this.templateDataTitle =
          item.type === "img"
            ? "图片列表"
            : item.type === "video"
            ? "视频列表"
            : "音频列表";
      }
    },

    confirmEditText() {
      if (this.textData) {
        let activeIndex = Number(this.activeIndex);
        let activeId = this.activeId;
        let templateList = this.templateList;
        templateList[activeIndex].detail.forEach((item) => {
          if (item.id === activeId) {
            item.content.forEach((jTem) => {
              if (jTem.itemId === this.itemId) {
                jTem.text = this.textData;
              }
            });
            this.editTemplateData = item.content;
          }
        });
        this.templateList = templateList;
        this.textData = "";
        this.editTextDialogFormVisible = false;
      } else {
        this.$message({
          type: "error",
          message: "请填写内容",
        });
      }
    },

    concelEditText() {
      this.editTextDialogFormVisible = false;
      this.textData = "";
    },

    saveCourseware() {
      let data = {
        course_ware_id: this.id,
      };
      let params = { ...data, content: this.templateList };
      if (this.isEditTemplate) {
        // 更新模版
        processEdit(params).then((value) => {
          if (value.code === 200) {
            this.$message({
              type: "success",
              message: "更新成功!",
            });
            setTimeout(() => {
              this.$router.push({
                path: "/rdouble6_course_base/double6/store/course-ware",
                query: {
                  t: Date.now(),
                },
              });
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: value.msg,
            });
          }
        });
      } else {
        // 新增模版
        processAdd(params).then((value) => {
          if (value.code === 200) {
            this.$message({
              type: "success",
              message: "保存成功!",
            });

            setTimeout(() => {
              this.$router.push({
                path: "/rdouble6_course_base/double6/store/course-ware",
                query: {
                  t: Date.now(),
                },
              });
            }, 1000);
          } else {
            this.$message({
              type: "error",
              message: value.msg,
            });
          }
        });
      }
    },

    saveToTemplate() {
      let index = Number(this.activeIndex);
      let templateData = this.templateList[index];
      this.saveTemplateParams.content = templateData;
      if (templateData.word_id > 0 && templateData.word_name !== "") {
        this.saveTemplateParams.word_id = templateData.word_id;
      }
      this.DialogFormVisible = true;
    },

    confirmSaveTemplate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addTemplate(this.saveTemplateParams).then((value) => {
            if (value.code === 200) {
              this.closeDialogFormVisible();
              this.$message({
                type: "success",
                message: "保存成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: value.msg,
              });
            }
          });
        }
      });
    },

    cancelSaveTemplate() {
      this.closeDialogFormVisible();
    },

    closeDialogFormVisible() {
      this.DialogFormVisible = false;
      this.$refs.saveTemplate.resetFields();
      this.saveTemplateParams = {
        name: "",
        type: "",
        word_id: 0,
        content: "",
      };
    },

    changeEditTemplate(data) {
      this.editTemplateData = data.content;
      this.activeId = data.id;
    },

    handleClickProcss() {
      let index = Number(this.activeIndex);
      let templateData = this.templateList[index];
      if (
        templateData.detail.length > 0 &&
        templateData.detail[0].content.length > 0
      ) {
        this.editTemplateData = templateData.detail[0].content;
        this.activeId = templateData.detail[0].id;
      }
    },

    // 删除单张ppt
    deletePPT(index, cdx) {
      let templateList = JSON.parse(JSON.stringify(this.templateList));
      if (templateList[index].detail.length > 1) {
        templateList[index].detail.splice(cdx, 1);
        this.activeIndex = String(index);
      } else {
        templateList.splice(index, 1);
        this.activeIndex = String(index - 1);
      }
      let activeIndex = Number(this.activeIndex);
      this.templateList = templateList;
      if (templateList.length > 0) {
        this.activeId = templateList[activeIndex].detail[0].id;
        this.editTemplateData = templateList[activeIndex].detail[0].content;
      }
    },

    // 交换数组位置函数
    swapArray(arr, index, cdxArr) {
      let cdx = cdxArr[0];
      let cdx1 = cdxArr[1];
      arr[index].detail[cdx] = arr[index].detail.splice(
        cdx1,
        1,
        arr[index].detail[cdx]
      )[0];
      this.templateList = arr;
    },

    // 上移PPT
    upPPT(index, cdx) {
      let templateList = JSON.parse(JSON.stringify(this.templateList));
      let cdxArr = [];
      if (cdx !== 0) {
        cdxArr = [cdx, cdx - 1];
        this.swapArray(templateList, index, cdxArr);
      } else {
        this.$message({
          type: "error",
          message: "已经到顶，无法上移",
        });
      }
    },

    // 下移PPT
    downPPT(index, cdx) {
      let templateList = JSON.parse(JSON.stringify(this.templateList));
      let cdxArr = [];
      if (cdx + 1 !== templateList[index].detail.length) {
        cdxArr = [cdx, cdx + 1];
        this.swapArray(templateList, index, cdxArr);
      } else {
        this.$message({
          type: "error",
          message: "已经到底，无法下移",
        });
      }
    },

    // 点击资源树按钮
    resourceClick() {
      this.$refs.resource.resourceDialog = true;
    },

    relevanceData(resourceData) {
      this.editUrlDialogFormVisible = false;
      if (resourceData) {
        this.$message({
          type: "success",
          message: "关联成功",
        });
        let activeIndex = Number(this.activeIndex);
        let activeId = this.activeId;
        let templateList = this.templateList;
        templateList[activeIndex].detail.forEach((item) => {
          if (item.id === activeId) {
            item.content.forEach((jTem) => {
              if (jTem.itemId === this.itemId) {
                jTem.url = resourceData.url;
                jTem.resourceData = resourceData;
              }
            });
            this.editTemplateData = item.content;
          }
        });
        this.templateList = templateList;
      }
    },

    // 点击组件库按钮
    templateClick() {
      this.$refs.templateLists.showDialog();
    },

    // 关联组件资源
    relatedSource(value) {
      if (value) {
        this.$message({
          type: "success",
          message: "关联成功",
        });
        let activeIndex = Number(this.activeIndex);
        let activeId = this.activeId;
        let templateList = this.templateList;
        this.editUrlDialogFormVisible = false;
        templateList[activeIndex].detail.forEach((item) => {
          if (item.id === activeId) {
            item.content.forEach((jTem) => {
              if (jTem.itemId === this.itemId) {
                jTem.url = value.resourceUrl;
                jTem.resourceId = value.id;
                jTem.resourceData = value;
              }
            });
            this.editTemplateData = item.content;
          }
        });
        this.templateList = templateList;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.edit_ppt_template {
  display: flex;
  height: 100%;
  .tab_left {
    width: 220px;
    height: calc(100vh - 264px);
    padding-bottom: 50px;
    box-sizing: border-box;
    overflow: auto;
    .title {
      width: 220px;
      text-align: center;
      line-height: 40px;
      background: #f6f6f6;
      border-radius: 20px;
      color: #040a28;
      font-size: 16px;
      padding: 0 10px;
    }
    .left_box {
      .left_item_box {
        width: 200px;
        height: 112px;
        position: relative;
        background: #d8d8d8;
        border-radius: 4px;
        overflow: hidden;
        margin: 10px auto;
        border: 2px solid #e4e7ed;
        span {
          display: block;
          width: 34px;
          height: 34px;
          border-radius: 22px;
          text-align: center;
          line-height: 34px;
          border: 2px solid #6d96ff;
          font-size: 12px;
          position: absolute;
          z-index: 100;
          bottom: 10px;
          background: #ffffff;
          cursor: pointer;
          opacity: 0;
          transition: all linear 0.3s;
        }
        .del_btn {
          left: 10px;
        }
        .top_btn {
          right: 60px;
        }
        .btm_btn {
          right: 10px;
        }
        .t_item_content {
          img {
            position: absolute;
          }
          video {
            position: absolute;
          }
          p {
            transform: scale(0.1042);
            transform-origin: 0 0;
            margin: 0;
            position: absolute;
          }
        }
      }
      .left_item_box:hover span {
        opacity: 1;
      }
      .left_item_box.active {
        border-color: #409eff;
      }
    }
    .bottom_btns {
      position: absolute;
      bottom: 0;
      width: 220px;
      height: 50px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #ffffff;
      z-index: 100;
    }
  }
  .tab_right {
    margin-left: 30px;
    padding-bottom: 70px;
    overflow: auto;
    height: calc(100vh - 264px);
    box-sizing: border-box;
    .edit_ppt_box {
      width: calc(100vw - 600px);
      // background: #000;
      position: relative;
      .t_item_edit {
        position: absolute;
        border: 1px dashed #409eff;

        img {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        video {
          position: absolute;
          width: 100%;
          height: 100%;
        }
      }
      .t_item_edit_text {
        position: absolute;
        border: 1px dashed #409eff;
        transform: scale(0.46);
        transform-origin: 0 0;
        span {
          margin: 0;
        }
      }
    }

    .save_ppt_btns {
      position: absolute;
      bottom: 0;
      width: calc(100vw - 600px);
      height: 50px;
      border: 1px dashed #e4e7ed;
      // border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      .el-button {
        width: 150px;
      }
    }
  }
}
</style>







<!-- <template>
  <div class="newCourseWare">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item> </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getClassify } from "@/api/course";
export default {
  name: "courseClassify",
  components: {},
  data() {
    return {
      form: {
        name: "", // 标题
        vice_name: "", // 副标题
        grade_id: [], // 年级
        material: "", // 材料
        calligraphy: "", // 书体
        typeface: "", // 字体
        type: "", // 类型
        price: "", // 原价
        present_price: "", // 现价
        student_count: "", // 学生数
        student_course: [], // 适用对象
        cover_pic: "", // 圖片
        content: "", // 内容
        relation_course: [], // 關聯課程
        relation_channel: [], // 關聯渠道
        relation_school: [], // 關聯學校
        is_all_school: false, // 學校全選
        is_login_free: false, // 免費登錄
        is_join_study: false, // 是否入班可學
        teacher_category_id: null, // 老師端分類id
        student_category_id: null, // 學生端分類id
      },
    };
  },
  created() {},
  mounted() {},
  methods: {},
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
  }
}
</style>
 -->
