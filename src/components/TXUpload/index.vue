<template>
  <div class="txUpload">
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
// 引入接口
import { TXgetSignature, TXaddUploadInfo } from "@/api/plan";
import TcVod from "vod-js-sdk-v6";

// function getSignature() {
//   return TXgetSignature().then((res) => {
//     return res.data;
//   });
// }

export default {
  name: "txUpload",
  data() {
    return {
      tcVod: null,
      hasUpload: false,
      uploadInfo: {
        flowIndex: 0,
        cycIndex: 0,
        planIndex: 0,
        type: "",
      },
      uploadFile: {},
    };
  },
  props: {
    uploadType: {
      type: String,
      default: "",
    },
  },
  methods: {
    getSignature() {
      TXgetSignature().then((res) => {
        return res.data;
      });
    },
    // 上传
    upload(e) {
      let file = e.target.files[0]; // 获取上传文件内容
      let name = file.name;
      if (name.indexOf(".jfif") > 0 || name.indexOf(".JFIF") > 0) {
        this.$message.warning("当前格式暂不支持，请更换其他格式图片");
        return;
      } else if (file.type.indexOf("image") < 0 && this.uploadType == "image") {
        this.$message.warning("请上传图片");
        return;
      } else if (file.type.indexOf("audio") < 0 && this.uploadType == "audio") {
        this.$message.warning("请上传音频文件");
        return;
      } else if (file.type.indexOf("video") < 0 && this.uploadType == "video") {
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
        console.log(doneResult);
        // this.uploadFile = doneResult.
        let d = {
          name: name,
          url: doneResult.video.url,
          fileId: doneResult.fileId,
          line_type: 4,
          file_type: this.uploadType,
        };

        TXaddUploadInfo(d).then((res) => {
          console.log(res, "rs");
          this.uploadFile = res.data;
          this.uploadFile.original_url = d.url;
          this.hasUpload = false;
          this.$message.success("上传成功");
          this.$emit("uploadFinish", JSON.stringify(this.uploadFile));
        });
      });
    },
  },
  created() {
    this.tcVod = new TcVod({
      getSignature: this.getSignature(),
    });
  },
};
</script>
