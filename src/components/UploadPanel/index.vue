<template>
  <div class="upload-panel">
    <right-panel
      v-show="show"
      ref="rightPanel"
      title="上传列表"
      @handleClose="handleClose"
    >
      <div class="panel-content">
        <div class="file-list-wrap">
          <item
            v-for="(item, index) in uploaderList"
            :key="index"
            :uploader="item.uploader"
            :uploaderInfo="item.uploaderInfo"
            @handleDelete="handleDelete"
          ></item>
        </div>
      </div>
    </right-panel>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import Item from "./Item";
import TcVod from "vod-js-sdk-v6";
import TcCOS from "cos-js-sdk-v5";
import { getTcCOSSignature, TXgetSignature } from "@/api/plan";
import {
  FILE_TYPE_ENUM,
  BUCKET_NAME_ENUM,
  PRODUCT_ENUM,
  FEATURES_ENUM,
} from "./type";

function getSignature() {
  return TXgetSignature().then((res) => {
    return res.data;
  });
}

export default {
  name: "Index",
  components: {
    RightPanel,
    Item,
  },
  data() {
    return {
      uploaderList: [],
      tcVod: null,
      show: false,
      formData: {},
      cosOptions: {
        product: "",
        features: FEATURES_ENUM.COURSEWARE,
        terminal: "pc",
        bucketName: "",
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        switch (route.name) {
          case "CoursewareList":
            this.cosOptions.features = FEATURES_ENUM.COURSEWARE;
            this.cosOptions.product = PRODUCT_ENUM.EDU;
            this.cosOptions.bucketName = BUCKET_NAME_ENUM.EDU;
            break;
          case "Resource":
            this.cosOptions.features = FEATURES_ENUM.COURSEWARE;
            this.cosOptions.product = PRODUCT_ENUM.TABLET;
            this.cosOptions.bucketName = BUCKET_NAME_ENUM.TABLET;
            break;
          case "AssetsList":
            this.cosOptions.features = FEATURES_ENUM.COURSEWARE;
            this.cosOptions.product = PRODUCT_ENUM.SMART_PEN;
            this.cosOptions.bucketName = BUCKET_NAME_ENUM.EDU;
            break;
          case "LlaiWareList":
            this.cosOptions.features = FEATURES_ENUM.COURSEWARE;
            this.cosOptions.product = PRODUCT_ENUM.SMART_PEN;
            this.cosOptions.bucketName = BUCKET_NAME_ENUM.EDU;
            break;
          case "MessagePushApp":
            this.cosOptions.features = FEATURES_ENUM.UMENG;
            this.cosOptions.product = PRODUCT_ENUM.SMART_PEN;
            this.cosOptions.bucketName = BUCKET_NAME_ENUM.EDU;
            break;
        }
      },
      immediate: true,
    },
  },
  created() {
    this.tcVod = new TcVod({
      getSignature: getSignature,
    });
  },
  methods: {
    reset() {
      this.uploaderList = [];
    },
    init(files) {
      this.show = true;
      this.$refs.rightPanel.show = true;
      for (let i = 0, length = files.length; i < length; i++) {
        this._beforeUpload(files[i]);
      }
    },
    _beforeUpload(file) {
      let suffix = file.name.substr(
        file.name.lastIndexOf(".") + 1,
        file.name.length
      );
      let fileType = FILE_TYPE_ENUM.APK;
      if (suffix !== FILE_TYPE_ENUM.APK) {
        fileType = file.type ? file.type.split("/")[0] : suffix;
      }
      if (fileType === FILE_TYPE_ENUM.VIDEO) {
        this._uploadVideo(file, fileType);
      } else {
        this._uploadOtherToCos(file, fileType);
      }
    },
    _uploadOtherToCos(file, type) {
      const uploaderInfo = {
        type: FILE_TYPE_ENUM[type.toLocaleUpperCase()],
        name: file.name,
        file: file,
        status: "wait",
        fileUrl: "",
        progress: 0,
      };
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
            onProgress: (progressData) => {
              uploaderInfo.progress = progressData.percent;
              uploaderInfo.status = "uploading";
            },
          },
          (err, data) => {
            if (data.statusCode !== 200) {
              this.$message.error(err.message || "上传失败，请稍后重试");
              return;
            }
            uploaderInfo.fileUrl = data.Location;
            uploaderInfo.status = "success";
            this.$emit("handleResult", uploaderInfo);
          }
        );

        const filterData = this.uploaderList.length
          ? this.uploaderList.filter((item) => {
              return item.name === file.name;
            })
          : [];
        if (!filterData.length) {
          this.uploaderList.push({ uploaderInfo });
        } else {
          this.uploaderList.map((item) => {
            if (item.name === file.name) {
              item.uploaderInfo = uploaderInfo;
            }
            return item;
          });
        }
      });
    },
    _uploadVideo(file, type) {
      const uploader = this.tcVod.upload({
        mediaFile: file,
      });
      const uploaderInfo = {
        type: type,
        name: uploader.videoInfo.name,
        videoInfo: uploader.videoInfo,
        uploader: uploader,
        file: file,
        status: "wait",
        progress: 0,
        fileId: "",
        fileUrl: "",
        cancel: () => {
          uploaderInfo.status = "cancel";
          uploader.cancel();
        },
        upload: (val) => {
          this._uploadVideo(val);
        },
      };

      const filterData = this.uploaderList.length
        ? this.uploaderList.filter((item) => {
            return item.uploader.sessionName === uploader.sessionName;
          })
        : [];
      if (!filterData.length) {
        this.uploaderList.push({ uploader, uploaderInfo });
      } else {
        this.uploaderList.map((item) => {
          if (item.uploader.sessionName === uploader.sessionName) {
            item.uploader = uploader;
            item.uploaderInfo = uploaderInfo;
          }
          return item;
        });
      }
      uploader.on("media_progress", (info) => {
        uploaderInfo.progress = info.percent;
        uploaderInfo.status = "uploading";
      });
      uploader.on("media_upload", (info) => {
        uploaderInfo.status = "success";
      });
      uploader.done().then((doneResult) => {
        uploaderInfo.status = "success";
        uploaderInfo.fileId = doneResult.fileId;
        uploaderInfo.fileUrl = doneResult.video.url;
        this.formData.fileId = doneResult.fileId;
        this.formData.name = doneResult.fileId;
        this.$emit("handleResult", uploaderInfo);
      });
    },
    handleDelete(val) {
      this.$confirm("确定要删除吗?", {
        type: "warning",
      }).then(() => {
        this.uploaderList.forEach((item, index) => {
          if (item.uploader.sessionName === val.uploader.sessionName) {
            this.uploaderList.splice(index, 1);
            item.uploader.cancel();
          }
        });
      });
    },
    handleClose() {
      const { uploaderList } = this;
      const filterData = uploaderList.length
        ? uploaderList.filter((item) => {
            return item.uploaderInfo.status !== "success";
          })
        : [];
      if (filterData.length) {
        this.$confirm("列表中有未上传完成的文件，确定要放弃上传吗?", {
          type: "warning",
        }).then(() => {
          this.uploaderList = [];
          this.show = false;
          this.$refs.rightPanel.show = false;
          this.$emit("handleReset");
        });
      } else {
        this.uploaderList = [];
        this.show = false;
        this.$refs.rightPanel.show = false;
        this.$emit("handleReset");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.file-list-wrap {
  padding: 10px 20px;
}
</style>
