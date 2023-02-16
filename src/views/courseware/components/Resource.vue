<template>
  <div>
    <el-dialog :visible.sync="resourceDialog" width="820px">
      <template v-slot:title>
        <span>
          <span>资源列表</span>
          <span style="font-size: 13px; color: #f56c6c">所有查询条件必填</span>
        </span>
      </template>
      <el-form :inline="true" class="form-inline" label-width="100px">
        <el-form-item label="资源名称：">
          <el-input v-model="params.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书写材料：" prop="material">
          <el-cascader
            v-model="materialStatusData"
            :props="propsOptions"
            :options="materialData"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="资源类型：" prop="wordType">
          <el-select v-model="params.wordType" placeholder="请选择">
            <el-option
              v-for="item in wordTypeLists"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-button-group style="float: right">
          <el-button type="primary" icon="el-icon-search" @click="onSubmit" />
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="reset" />
          </el-tooltip>
        </el-button-group>
      </el-form>
      <div v-if="dataInfo" style="padding: 20px; background: #f2f2f2">
        <el-form label-width="170px">
          <el-form-item label="资源名称：">
            <p style="margin: 0; font-weight: bold">{{ dataInfo.name }}</p>
          </el-form-item>
          <el-form-item label="音频：">
            <el-input
              v-model="dataInfo.commonAudio.url"
              style="width: 400px"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              :disabled="type !== 'audio'"
              @click="relevance(dataInfo.commonAudio)"
              >关联</el-button
            >
          </el-form-item>
          <el-form-item label="范字图：">
            <el-input
              v-model="dataInfo.demoPicture.url"
              style="width: 400px"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              :disabled="type !== 'img'"
              @click="relevance(dataInfo.demoPicture)"
              >关联</el-button
            >
          </el-form-item>
          <el-form-item label="示范视频：">
            <el-input
              v-model="dataInfo.demoVideo.url"
              style="width: 400px"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              :disabled="type !== 'video'"
              @click="relevance(dataInfo.demoVideo)"
              >关联</el-button
            >
          </el-form-item>
          <el-form-item label="讲解视频：">
            <el-input
              v-model="dataInfo.explainVideo.url"
              style="width: 400px"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              :disabled="type !== 'video'"
              @click="relevance(dataInfo.explainVideo)"
              >关联</el-button
            >
          </el-form-item>
          <el-form-item label="要点图：">
            <el-input
              v-model="dataInfo.pointPicture.url"
              style="width: 400px"
              autocomplete="off"
            ></el-input>
            <el-button
              type="primary"
              :disabled="type !== 'img'"
              @click="relevance(dataInfo.pointPicture)"
              >关联</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { resource } from "@/api/course";
export default {
  props: {
    materialData: {
      type: Array,
      value: [],
    },
    type: {
      type: String,
      value: "",
    },
  },
  data() {
    return {
      resourceDialog: false,
      params: {
        name: "",
        material: "",
        calligraphy: "",
        typeface: "",
        wordType: "",
      },
      materialStatusData: [],
      propsOptions: {
        label: "name",
        value: "id",
      },
      wordTypeLists: [
        { type: "word", name: "单字" },
        { type: "component", name: "部首" },
        { type: "part", name: "部件" },
        { type: "stroke", name: "笔画" },
      ],
      dataInfo: null,
      calligraphyId: "", // 资源书法细分id
    };
  },

  methods: {
    handleChange(e) {
      if (e && e.length === 3) {
        this.params.material = e[0];
        this.params.calligraphy = e[1];
        this.params.typeface = e[2];
      }
    },

    onSubmit() {
      if (this.params.name === "") {
        this.$message({
          type: "error",
          message: "请填写资源名称",
        });
        return false;
      }
      if (this.params.material === "") {
        this.$message({
          type: "error",
          message: "请选择书写材料",
        });
        return false;
      }
      if (this.params.wordType === "") {
        this.$message({
          type: "error",
          message: "请选择资源类型",
        });
        return false;
      }
      resource(this.params).then((value) => {
        console.log(11);
        if (value.code === 200) {
          console.log(22);
          console.log(value.data);
          if (value.data.calligraphyId) {
            this.dataInfo = value.data;
            this.dataInfo.name = this.params.name;
            this.calligraphyId = value.data.calligraphyId;
          } else {
            this.dataInfo = null;
            this.$message.error("资源不存在");
          }
        } else {
          this.dataInfo = null;
          this.$message({
            type: "error",
            message: value.msg,
          });
        }
      });
    },

    reset() {
      this.params = {
        name: "",
        material: "",
        calligraphy: "",
        typeface: "",
        wordType: "",
      };
      this.materialStatusData = [];
      this.dataInfo = null;
    },

    relevance(data) {
      // type为1 表示知识树
      Object.assign(data, { calligraphyId: this.calligraphyId, type: 1 });
      this.$emit("relevanceData", data);
      this.resourceDialog = false;
      this.reset();
    },
  },
};
</script>
