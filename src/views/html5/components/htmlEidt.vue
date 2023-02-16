<template>
    <div>
        <div class="addCourse" @click="backToList">返回列表</div>
        <div class="mg-t-40 u-flex u-flex-s-b pd-r-300">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="名称:" prop="name" class="mg-b-30">
                        <el-input v-model="ruleForm.name" style="width:350px" maxlength="20" show-word-limit class="mg-r-15"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片:" prop="pic" class="mg-b-30">
                            <el-upload
                                class="avatar-uploader pos-re"
                                action="#"
                                :show-file-list="false"
                                :file-list="fileList"
                                :limit='2'
                                :on-exceed="isMorePic"
                                :on-success="handleAvatarSuccess"
                                :http-request="uploadRequest"
                                :before-upload="beforeAvatarUpload">
                                <img v-show="ruleForm.pic" :src="ruleForm.pic" class="avatar">
                                <div class="w-100 h-100 pos-a t-0 l-0 d-pic" v-if="isEidtDeatil"  @click.stop="handleRemove">
                                    <i v-show="myicon" class="el-icon-delete pos-a p-center" style="font-size:32px"></i>
                                </div>
                                <i v-show="!ruleForm.pic" class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        <span>1125*2436   2M以内的jpg、png 图片1张</span>
                    </el-form-item>
                    <el-form-item label="按钮上的文字:" prop="text" class="mg-b-30">
                        <el-input v-model="ruleForm.text" @input="changeText" style="width:350px" maxlength="5" show-word-limit class="mg-r-15"></el-input>
                    </el-form-item>
                    <el-form-item label="跳转至:" prop="jumpWhere"  class="mg-b-30">
                        <el-select v-model="ruleForm.jumpWhere" @change="selectJump(ruleForm.jumpWhere)" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in jump_type_lists" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 小程序 -->
                    <el-form-item label="小程序:" prop="name"  class="mg-b-30" v-if="jumpTypeDom == 'applet'">
                        <el-select v-model="ruleForm.applet" @change="selectApplet" placeholder="请选择" style="width:230px">
                            <el-option :label="it.name" :value="it.id" v-for="(it, i) in appletList" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="跳转链接:" prop="name"  class="mg-b-30" v-if="jumpTypeDom == 'applet'">
                        <el-input v-model="ruleForm.appletName" placeholder="输入小程序跳转链接" style="width:350px" class="mg-r-15"></el-input>
                    </el-form-item>
                    <!-- h5链接 -->
                    <el-form-item label="跳转链接:" prop="name"  class="mg-b-30" v-if="jumpTypeDom == 'h5'">
                        <el-input v-model="ruleForm.h5Jump" placeholder="输入h5跳转链接" style="width:350px" class="mg-r-15"></el-input>
                    </el-form-item>
                    <!-- app功能 -->
                    <el-form-item label="app功能:" prop="name"  class="mg-b-30" v-if="jumpTypeDom == 'app'">
                        <el-select v-model="ruleForm.appGN" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in appApply" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 课程 -->
                    <el-form-item label="课程:" prop="name"  class="mg-b-30" v-if="jumpTypeDom == 'course'">
                        <el-button type="primary" class="mg-b-15" @click="openDaiog">关联</el-button>&nbsp;单选
                        <el-input v-model="courseName" placeholder="自动填充课程名称，不可修改" disabled></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 预览 -->
            <div>
                <ShowPhone :types="'h5'" :h5Pic="h5Pic" :btnText="btnText"/>
            </div>
        </div>
        <PopupForm :openPopup="openPopup" @closeDialog="closeDialog" @selectedObj="selectedObj"/>
    </div>
</template>
<script>
import ShowPhone from '../../popWindow/components/showPhone.vue'
import PopupForm from '../../popWindow/components/popupForm.vue'
import { mapState } from "vuex";
import { toUploadpic } from "../../../utils/cosUpLoad.js";
import request from '@/utils/request'

export default {
    components:{
        ShowPhone,
        PopupForm
    },
    computed: {
        ...mapState({
            myPicUrl: (s) => s.myPicUrl,
        }),
    },
    props:{
        editData: Object
    },
    watch:{
        myPicUrl(n){
            this.fileList = []
            this.ruleForm.pic = n.url
            this.h5Pic = n.url
        }
    },
    data(){
        return{
            ruleForm: {
                name: '',
                pic:'',
                jumpWhere: '',
                text:'',
                applet:'',
                appletName:'',
                h5Jump:'',
                appGN:'',
            },
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                pic:[
                    { required: true, message: '上传图片', trigger: 'change' }
                ],
                text: [
                    { required: true, message: '请输入按钮文字', trigger: 'change' }
                ],
                jumpWhere: [
                    { required: true, message: '请选择跳转的地方', trigger: 'blur' },
                ],
            },
            hasEd:false,
            openPopup: false,
            isPermanentTime: 0,  // 是否是无期限 0 没选 1 选了
            comParams:{},
            myicon:false,
            h5Pic:'',
            typeApi:'TJ', // 添加/编辑模式  TJ  BJ
            fileList:[],
            isEidtDeatil: false, // 判断是否是详情进入
            appletList:'',
            jump_type_lists:'',
            appApply:'',
            courseName:'',
            courseType:'',
            relation_id:'',
            jumpTypeDom:'',
            imageUrl:'',
            ids:'',
            btnText:''
        }
    },
    created(){
        console.log('接收到的参数', this.editData)
        try {
            this.appletList = this.editData.appletList
            this.appApply = this.editData.appApply
            this.jump_type_lists = this.editData.jump_type_list
        } catch (error) {} 
        if(this.editData.id){ // 编辑
            this.typeApi = 'BJ'
            this.ids = this.editData.id.value
            this.ruleForm.name = this.editData.name.value
            this.ruleForm.pic = this.editData.image.value
            this.h5Pic = this.editData.image.value
            this.ruleForm.text = this.editData.button_title.value
            this.btnText = this.editData.button_title.value
            this.ruleForm.jumpWhere = this.jump_type_lists[this.editData.jump_type.value]
            this.courseName = this.editData.course_info.value.name
            this.jumpTypeDom = this.editData.jump_type.value
            if(this.jumpTypeDom == 'applet'){
                let appletName = ''
                this.appletList.forEach((it, i, arr)=>{
                    if(arr[i].id == this.editData.relation_id.value){
                        appletName = arr[i].name
                    }
                })
                this.ruleForm.applet = appletName
                this.ruleForm.appletName = this.editData.jump_url.value
            } else if(this.jumpTypeDom == 'app'){
                this.ruleForm.appGN = this.appApply[this.editData.app_page.value]
            } else if (this.jumpTypeDom == 'h5'){
                this.ruleForm.h5Jump = this.editData.jump_url.value
            } else {
                this.relation_id = this.editData.relation_id.value
                this.courseType = this.editData.course_type.value
                this.courseName = this.editData.course_name.value
            }
        } else { // 新增
            this.typeApi = 'TJ'
        }
    },
    methods:{
        backToList(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            setTimeout(() => {
                this.$emit('backToList', true)
                loading.close();
            }, 500);
        },
        changeText(val){
            this.btnText = val
        },
        selectJump(val){
            this.ruleForm.applet = ''
            this.ruleForm.appletName = ''
            this.ruleForm.h5Jump = ''
            this.ruleForm.appGN = ''
            // 课程
            this.courseName = ''
            this.courseType = ''
            this.relation_id = ''
            let key = this.getValKey(this.jump_type_lists, val)
            this.jumpTypeDom = key    // app: app功能, applet：小程序，course: 课程，h5
        },
        getValKey(obj, val){
            for(let keys in obj){
                if(obj[keys] == val){
                    return keys
                }
            }
        },
        openDaiog(){
            this.openPopup = true
        },
        closeDialog(val){
            this.openPopup = val
        },
        selectedObj(val){
            this.courseName = val.name.value
            this.courseType = val.course_type
            this.relation_id = val.id.value
            this.openPopup = false
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.editActive(this.typeApi)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        editActive(item){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            let myApplet = 1;
            if(!this.hasEd){
                for(let i = 0; i < this.appletList.length; i++){
                    if(this.appletList[i].name == this.ruleForm.applet){
                        myApplet = this.appletList[i].id
                    }
                }
            }
            let jumpWay = ''
            for(let keys in this.jump_type_lists){
                if(this.jump_type_lists[keys] == this.ruleForm.jumpWhere){
                    jumpWay = keys
                }
            }
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/h5-manages/${item == "TJ" ? '' : this.ids}`,
                method: item == 'TJ' ? 'POST' : 'PUT',
                data:{
                    name: this.ruleForm.name,
                    image: this.ruleForm.pic,
                    button_title: this.ruleForm.text,
                    jump_type: jumpWay,
                    relation_id: jumpWay == 'course' ? this.relation_id : jumpWay == 'applet' ? this.hasEd ? this.ruleForm.applet : myApplet : '',
                    jump_url: this.jumpTypeDom == 'applet' ? this.ruleForm.appletName : this.ruleForm.h5Jump, // ?
                    course_type: this.courseType, // 课程来源
                    app_page: jumpWay == 'app' ? this.translateValue(this.appApply, this.ruleForm.appGN) : '',
                }
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.$emit('backToList', true)
                    loading.close();
                } else {
                    loading.close();
                }
            }).catch(err=>{
                loading.close();
            }) 
        },
        // 兑换值
        translateValue(obj, k){
            let myKey = ''
            for(let keys in obj){
                if(obj[keys] == k){
                    myKey = keys
                }
            }
            return myKey
        },
        selectApplet(){
            this.hasEd = true
        },
        isMorePic(){},
        handleAvatarSuccess(res, file){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        uploadRequest(params){
            toUploadpic(params)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG && !isPNG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!');
                return isJPG && isPNG;
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
                return isLt2M;
            }
        },
    }
}
</script>
<style scoped>
.addCourse {
    position: absolute;
    right: -70px;
    top: -70px;
    background: #1890ff;
    color: #fff;
    width: 160px;
    height: 160px;
    border-radius: 80px;
    padding-right: 70px;
    padding-top: 80px;
    padding-left: 42px;
    font-size: 18px;
    line-height: 20px;
    padding-bottom: 20px;
    font-weight: bold;
    cursor: pointer;
}
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  /deep/.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px; 
    line-height: 178px;
    text-align: center;
  }
  /deep/.avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /deep/.el-select .el-input{
    width: 230px;
  }
  .d-pic:hover{
   background:#000;
   opacity: 0.3;
  }
</style>