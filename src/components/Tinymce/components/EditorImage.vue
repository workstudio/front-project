<template>
  <div class="upload-container">
    <el-button
      :style="{ background: color, borderColor: color }"
      icon="el-icon-upload"
      size="mini"
      type="primary"
      @click="dialogVisible = true"
    >
      上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" :modal-append-to-body="false">
      <UploadCos
        lineType="edu"
        :file-list="fileList"
        :limit="3"
        @handleResult="(val) => uploadResult(val)"
        class="msl"
      ></UploadCos>

      <el-button @click="cancel"> 取消 </el-button>
      <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
    </el-dialog>
  </div>
</template>

<script>
import UploadCos from "@/components/UploadCos/index.vue";

export default {
  name: "EditorSlideUpload",
  components: {
    UploadCos,
  },
  props: {
    color: {
      type: String,
      default: "#1890ff",
    },
  },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
    };
  },
  methods: {
    cancel() {
      this.dialogVisible = false;
      this.fileList = [];
    },
    uploadResult(data) {
      console.log(data);
      this.fileList = data;
    },
    handleSubmit() {
      this.$emit("successCBK", this.fileList);
      this.fileList = [];
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.msl {
  margin-bottom: 20px;
}
</style>
