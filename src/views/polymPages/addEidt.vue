<template>
    <div class="mg-t-40">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-form-item label="活动:" prop="name" class="mg-b-30">
                <el-input v-model="ruleForm.name" :disabled="isEidtDeatil" style="width:350px" maxlength="20" show-word-limit class="mg-r-15"></el-input>
                <span class="color-d">用于后台展示记录，前端不展示</span>
            </el-form-item>
            <el-form-item label="封面图:" prop="pic" class="mg-b-30">
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
                <span>654X366   2M以内的jpg、png 图片1张</span>
            </el-form-item>
            <el-form-item label="适用角色:" prop="region"  class="mg-b-30">
                <el-select v-model="ruleForm.region" :disabled="isEidtDeatil || typeApi == 'BJ'" placeholder="请选择">
                    <el-option :label="it" :value="it" v-for="(it) in options" :key="it"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="颜色选择:" class="mg-b-30">
                <el-input v-model="ruleForm.color" :disabled="isEidtDeatil" style="width:350px" class="mg-r-15"></el-input>
                <el-color-picker v-model="ruleForm.color" :disabled="isEidtDeatil" style="position:absolute"></el-color-picker>
            </el-form-item>
            <el-form-item label="活动时间:" required  class="mg-b-30">
                <el-form-item prop="date1">
                    <el-date-picker
                        class="mg-r-15"
                        :disabled="checked || isEidtDeatil"
                        v-model="ruleForm.date1"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-checkbox v-model="checked" :disabled="isEidtDeatil" @change="toWXQ">无期限</el-checkbox>
                </el-form-item>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">完成</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { toUploadpic } from "../../utils/cosUpLoad.js";
import { mapState } from "vuex";
import request from '@/utils/request'

export default {
    computed: {
        ...mapState({
            myPicUrl: (s) => s.myPicUrl,
        }),
    },
    data(){
        return{
            ruleForm: {
                name: '',
                pic:'',
                region: '',
                date1: [],
                color:''
            },
            checked: false,
            rules: {
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 0, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                pic:[
                    { required: true, message: '上传图片', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
            },
            isPermanentTime: 0,  // 是否是无期限 0 没选 1 选了
            comParams:{},
            options:[],
            myicon:false,
            typeApi:'TJ', // 添加/编辑模式  TJ  BJ
            fileList:[],
            isEidtDeatil: false, // 判断是否是详情进入
        }
    },
    created(){
        console.log('接收的参数', this.$route.query)
        if(this.$route.query.name){ // 判断是 编辑/详情   还是  新建
            if(!this.$route.query.name.value){ // 重新刷了页面
                this.$router.push({
                    path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
                })
                return
            }
            this.typeApi = 'BJ'
            this.ruleForm.name = this.$route.query.name.value
            this.isPermanentTime = this.$route.query.is_permanent_time.value
            this.ruleForm.pic = this.$route.query.cover_pic.value
            this.options = this.$route.query.myRole // 角色列表
            this.ruleForm.region = this.options[this.$route.query.role.value]
            this.ruleForm.color = this.$route.query.background_color.value
            if(!this.isPermanentTime){ // 有时间
                this.ruleForm.date1[0] = this.$route.query.start_time.value
                this.ruleForm.date1[1] = this.$route.query.end_time.value
            } else{ // 无期限
                this.checked = true
                this.ruleForm.date1 = ['','']
            }
            if (this.$route.query.status.value == '未上线' || this.$route.query.status.valueSource == 0){
                this.isEidtDeatil = false
            } else {
                this.isEidtDeatil = true
            }
        } else {      // 新建
            this.typeApi = 'TJ'
            if(this.$route.query.myRole.teacher){
                console.log('能接收到',this.$route.query.myRole)
                this.options = this.$route.query.myRole // 角色列表
                window.localStorage.setItem('myRole', JSON.stringify(this.options))
            } else {
                console.log('无法接收到')
                this.options = JSON.parse(window.localStorage.getItem('myRole'))
            }
        }
    },
    mounted(){
        if(this.ruleForm.name){
            this.picHover()
        }
        let _this = this
        // window.addEventListener("beforeunload", function (e) {
        //     console.log('刷新', _this.$route)
        //     if(_this.$route.path == '/rdouble6_operate_aggregate-page/double6/add/aggregate-page'){
        //         console.log('ffff')
        //         _this.$router.push({
        //             path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
        //         })
        //         console.log('lklklkl')
        //     }
        //     // var confirmationMessage = "请您先保存编辑的信息，否则刷新后会丢失";
        //     // e.returnValue = confirmationMessage;
        //     // return "请您先保存编辑的信息，否则刷新后会丢失";
        // });
    },
    watch:{
        myPicUrl(n){
            console.log('图片改变了', n)
            this.fileList = []
            this.ruleForm.pic = n.url
            this.picHover()
        }
    },
    methods:{
        // 无期限
        toWXQ(val){
            if(val){
                this.ruleForm.date1 = ''
                this.isPermanentTime = 1
            } else {
                this.isPermanentTime = 0
            }
        },
        picHover(){
            // let dom = document.querySelector('.d-pic')
            // console.log('hover1', dom)
            // dom.onmouseenter = ()=>{
            //     console.log('hover')
            //     this.myicon = true
            // }
            // dom.onmouseleave = ()=>{
            //     this.myicon =false
            // }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.typeApi == 'TJ'){
                        this.addActive()
                    } else {
                        if(this.isEidtDeatil){
                            this.$router.push({
                                path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
                            })
                        } else {
                            this.editActive()
                        }
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 添加
        addActive(){
            console.log('times', this.isPermanentTime)
            console.log('rules', this.ruleForm)
            if(!this.ruleForm.date1 && !this.checked){
                this.$message.error('请选择日期')
                return
            }
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-pages`,
                method: 'post',
                data:{
                    name: this.ruleForm.name,
                    cover_pic: this.ruleForm.pic,
                    role: this.ruleForm.region == '老师' ? 'teacher' : 'student',
                    start_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[0]) : '',
                    end_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[1]) : '',
                    is_permanent_time: this.isPermanentTime,
                    background_color: this.ruleForm.color || '#FFFFFF'
                }
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.$router.push({
                        path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
                    })
                }
            }).catch(err=>{
            })
        },
        // 编辑
        editActive(){
            console.log('是否勾选了无期限', this.checked)
            if(!this.ruleForm.date1 && !this.checked){
                this.$message.error('请选择日期')
                return
            }
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-pages/${this.$route.query.id.value}`,
                method: 'put',
                data:{
                    name: this.ruleForm.name,
                    cover_pic: this.ruleForm.pic,
                    role: this.ruleForm.region == '老师' ? 'teacher' : 'student',
                    start_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[0]) : '',
                    end_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[1]) : '',
                    is_permanent_time: this.isPermanentTime,
                    status: this.$route.query.status.valueSource,
                    background_color: this.ruleForm.color || '#FFFFFF'
                }
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.$router.push({
                        path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
                    })
                }
            }).catch(err=>{
            })
        },
        handleAvatarSuccess(res, file) {
            console.log('上传成功......')
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        isMorePic(val){
            this.$message({
                type: "error",
                message: "只能上传一张图片" + JSON.stringify(val),
            });
        },
        handleRemove(){
            if(this.isEidtDeatil){
                return
            }
            // this.$confirm("确认要删除这张照片吗?", "提示", {
            //     confirmButtonText: "确定",
            //     cancelButtonText: "取消",
            //     type: "warning",
            // })
            // .then(() => {
            //     this.ruleForm.pic = ''
            //     this.fileList = []
            //     this.$message.success("已删除");
            // })
            // .catch(() => {
            //     this.$message({
            //         type: "info",
            //         message: "已取消删除",
            //     });
            // });
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
        uploadRequest(params){
            console.log('上传', params)
            toUploadpic(params)
        },
        // 时间格式化
        formatDate (d) {
            var date = new Date(d);
            var YY = date.getFullYear() + '-';
            var MM =
                (date.getMonth() + 1 < 10
                ? '0' + (date.getMonth() + 1)
                : date.getMonth() + 1) + '-';
            var DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var hh =
                (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var mm =
                (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
                ':';
            var ss =
                date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return YY + MM + DD + ' ' + hh + mm + ss;
        },
    }
}
</script>
<style scoped>
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
  .d-pic:hover{
   background:#000;
   opacity: 0.3;
  }
</style>