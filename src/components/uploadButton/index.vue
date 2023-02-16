<template>
  <div class="txUpload">
    <el-button :type="buttonType">{{ name }}</el-button>
    <input type="file" @change="upload" />
  </div>
</template>
<script>
// 引入接口
import { TXgetSignature, TXaddUploadInfo } from "@/api/plan";
import TcVod from "vod-js-sdk-v6";

function getSignature() {
  return TXgetSignature().then((res) => {
    return res.data;
  });
}

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
      message: null,
      uploadFile: {},
    };
  },
  props: {
    uploadType: {
      type: String,
      default: "",
    },
    buttonType: {
      type: String,
      default: "primary",
    },
    info: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "上传文件",
    },
  },
  methods: {
    // getSignature() {
    //   TXgetSignature().then((res) => {
    //     return res.data;
    //   });
    // },
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
      this.message = this.$message({
        message: "正在上传中",
        type: "info",
        duration: 0,
      });
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

      uploader
        .done()
        .then((doneResult) => {
          console.log(doneResult);
          // this.uploadFile = doneResult.
          let d = {
            name: name,
            original_url: doneResult.video.url,
            fileId: doneResult.fileId,
            line_type: 4,
            file_type: this.uploadType,
          };

          TXaddUploadInfo(d)
            .then((res) => {
              this.message.close();
              console.log(res, "rs");
              this.uploadFile = res.data;
              this.uploadFile.original_url = d.original_url;
              this.hasUpload = false;
              this.$message.success("上传成功");
              this.uploadFile.info = this.info;
              this.$emit("uploadFinish", JSON.stringify(this.uploadFile));
            })
            .catch((err) => {
              this.message.close();
              this.$message.error("上传失败，请关闭弹窗后重新上传");
            });
        })
        .catch((err) => {
          this.message.close();
          this.$message.error("上传失败，请关闭弹窗后重新上传");
        });
    },
  },
  created() {
    this.tcVod = new TcVod({
      getSignature: getSignature,
    });
  },
};
</script>
<style lang="scss" scoped>
.txUpload {
  position: relative;
  input {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
