<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      action=""
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :headers="{ 'content-type': 'multipart/form-data' }"
      multiple
      :disabled="disabled"
      accept="image/png, image/jpeg"
      :limit="limit"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :http-request="uploadRequest"
      :file-list="fileList"
      :list-type="listType"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { PRODUCT_ENUM, BUCKET_NAME_ENUM } from "../UploadPanel/type";
import { getTcCOSSignature } from "@/api/plan";
import TcCOS from "cos-js-sdk-v5";

export default {
  name: "Index",
  props: {
    limit: {
      type: Number,
      default: 1,
    },
    listType: {
      type: String,
      default: "picture-card",
    },
    fileList: {
      type: Array,
      default() {
        return [];
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    lineType: {
      type: String,
      default: "",
      validator: (value) => {
        return [
          PRODUCT_ENUM.TRAINING,
          PRODUCT_ENUM.SMART_PEN,
          PRODUCT_ENUM.TABLET,
          PRODUCT_ENUM.EDU,
        ].includes(value);
      },
    },
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      cosOptions: {
        product: "",
        features: "asset",
        terminal: "pc",
        bucketName: "",
      },
    };
  },
  methods: {
    handleChange() {
      this.$refs.upload.clearFiles();
    },
    uploadRequest(params) {
      let file = params.file;
      this.cosOptions.product = this.lineType;
      this.cosOptions.bucketName =
        this.lineType === PRODUCT_ENUM.TABLET
          ? BUCKET_NAME_ENUM.TABLET
          : BUCKET_NAME_ENUM.EDU;

      const { cosOptions } = this;
      getTcCOSSignature(cosOptions).then((res) => {
        let credentials = res.data;
        let cos = new TcCOS({
          getAuthorization: (options, callback) => {
            callback({
              TmpSecretId: credentials.tmpSecretId,
              TmpSecretKey: credentials.tmpSecretKey,
              XCosSecurityToken: credentials.token,
              StartTime: credentials.startTime,
              ExpiredTime: credentials.expiredTime,
              ScopeLimit: true, // 细粒度控制权限需要设为 true，会限制密钥只在相同请求时重复使用
            });
          },
        });
        cos.putObject(
          {
            Bucket: cosOptions.bucketName,
            Region: "ap-shanghai",
            Key: `${credentials.pathKey}/${file.name}`,
            StorageClass: "STANDARD",
            Body: file, // 上传文件对象
          },
          (err, data) => {
            if (data.statusCode !== 200) {
              this.$message.error(err.message || "上传失败，请稍后重试");
              return;
            }
            this.fileList.push({
              name: file.name,
              url: `https://${data.Location}`,
            });
            this.$emit("handleResult", this.fileList);
          }
        );
      });
    },
    _deleteFile(file) {
      const idx = this.fileList.findIndex((item) => item.name === file.name);
      if (idx >= 0) {
        this.fileList.splice(idx, 1);
      }
    },
    handleRemove(file) {
      this._deleteFile(file);
      this.$emit("handleResult", this.fileList);
    },
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
  },
};
</script>
