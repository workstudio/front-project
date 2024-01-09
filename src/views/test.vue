<template>
  <div class="login-container">
    <h1>test</h1>
    <h2>{{test}}</h2>
    <span v-for="(item, field) in rDatas" >
    <span v-for="(value, key) in item" >
    "{{key}}" => "{{value}}",
    </span>
    </span>
  <el-upload
    action=""
    :show-file-list="false"
    :http-request="resolveQR"
  >
    <el-button
      type="success"
    >上传</el-button>
  </el-upload>
  </div>
</template>

<script>
import {getQrUrl, imageToBase64, base64ToFile} from '../utils/qrcode'
import QrCode from '../../node_modules/qrcode-decoder/dist/index';
import {getTestDatas,getPushTestData} from "@/api/user";

export default {
  name: "Test",
  data() {
    return {
      rDatas: [],
      urls: [],
    };
  },
  mounted() {
    getTestDatas().then((response) => {
      this.urls = response['data'];
      console.log('rrrrrrrrrrrrrrrr', response);
    }).catch(error => {
      console.log(error);
    });
  },
  computed: {
    test() {
    console.log(this.urls);
      this.urls.forEach((url, i) => {

      //let url = "http://192.168.203.7:8186/qrcode/%E4%B8%89%E4%B8%8A/%E4%B8%80%EF%BC%88%E8%AF%BE2%EF%BC%89.png";
        this.handleImgToBase64(url, (res) => {
          this.resolveQR(res, url);
          // 接收回调结果
          //console.log('回调结果', res);
        });
      })
    }
  },

  methods: {
    resolveQR(fileObj, url) {
      const result = getQrUrl(fileObj)
      result.then(res => {
        if (res.data) {
          //console.log(url, res.data)
          let info = {};
          info[res.data] = url;
          getPushTestData(info).then((response) => {
            //console.log('rrrrrrrrrrrrrrrr', response);
          }).catch(error => {
            console.log(error);
          });
          //this.rDatas.push(info);
          //this.$message.success('识别二维码成功!')
        } else {
          this.$message.error('识别二维码失败, 请重新上传')
        }
      }).catch(err => {
        console.log('ffffffff');
        this.$message.error(JSON.stringify(err))
      })
    },
    handleLogin() {
    },
    handleImgToBase64(url, cb) {
        let that = this;
        var image = new Image();
        image.crossOrigin = '';
        image.src = url;
        image.onload = function () {
            let base64 = imageToBase64(image); //图片转base64

            let file = base64ToFile(base64, 'file'); //base64转File
            
            // 根据自身需求调整【因个人项目逻辑不一样，这里使用回调函数】
            cb && typeof cb == 'function' && cb(file);
            return file;
        }
    }
  }
};
</script>
<style>
.login_header a{
  color: #fff;
  margin: 50px;
}
.login_header{
    margin-bottom: 30px;
  text-align: center;
}
.login_header span{
    margin-right: 20px;
    cursor: pointer;
}
.Cbody_item{
    border: 0px solid #999;
    overflow: hidden;
}
.active{
    color:#fff;
    padding-bottom: 10px;
    border-bottom: 3px solid #fff;
}
</style>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 3px;
      font-size: 18px;
      right: 0px;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
