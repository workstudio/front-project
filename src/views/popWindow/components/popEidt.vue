<template>
    <div>
        <div class="addCourse" @click="backToList">返回列表</div>
        <div class="mg-t-40 u-flex u-flex-s-b pd-r-300 mg-b-70">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
                    <el-form-item label="名称:" prop="name" class="mg-b-30">
                        <el-input v-model="ruleForm.name" style="width:350px" :disabled="isEidtDeatil" maxlength="20" show-word-limit class="mg-r-15"></el-input>
                    </el-form-item>
                    <el-form-item label="弹窗适用角色:" prop="role"  class="mg-b-30">
                        <el-select v-model="ruleForm.role" @change="hasRole" :disabled="isEidtDeatil" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in optionsRole" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="弹窗显示位置:" prop="region"  class="mg-b-30" v-if="ruleForm.role">
                        <el-select v-model="ruleForm.region" @change="showYL" :disabled="isEidtDeatil" placeholder="请选择">
                            <el-option :label="it" :value="i" v-for="(it, i) in optionsPosition" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="弹窗类型:" prop="type"  class="mg-b-30">
                        <el-select v-model="ruleForm.type" :disabled="isEidtDeatil" @change="popSizeChange(ruleForm.type)" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in optionsType" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上传:" prop="pic" class="mg-b-30">
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
                        <span>{{ ruleForm.type == '满屏尺寸' ? '满屏尺寸：1125*2436' +  '2M以内的jpg、png 图片1张': '常规尺寸：895*1050 &nbsp;' +  '2M以内的jpg、png 图片1张' }}</span>
                    </el-form-item>
                    <el-form-item label="跳转至:" prop="jump" class="mg-b-30">
                        <el-select v-model="ruleForm.jump" :disabled="isEidtDeatil" @change="selectJump(ruleForm.jump)" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in jumpList" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 小程序 -->
                    <el-form-item label="小程序:" prop="region"  class="mg-b-30" v-if="jumpTypeDom == 'applet'">
                        <el-select v-model="ruleForm.applet" @change="selectApplet" :disabled="isEidtDeatil" placeholder="请选择" style="width:230px">
                            <el-option :label="it.name" :value="it.id" v-for="(it, i) in appletList" :key="i"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="跳转链接:" prop="region"  class="mg-b-30" v-if="jumpTypeDom == 'applet'">
                        <el-input v-model="ruleForm.appletName" :disabled="isEidtDeatil" placeholder="输入小程序跳转链接" style="width:350px" class="mg-r-15"></el-input>
                    </el-form-item>
                    <!-- h5链接 -->
                    <el-form-item label="跳转链接:" prop="region"  class="mg-b-30" v-if="jumpTypeDom == 'h5'">
                        <el-input v-model="ruleForm.h5Jump" :disabled="isEidtDeatil" placeholder="输入h5跳转链接" style="width:350px" class="mg-r-15"></el-input>
                    </el-form-item>
                    <!-- app功能 -->
                    <el-form-item label="app功能:" prop="region"  class="mg-b-30" v-if="jumpTypeDom == 'app'">
                        <el-select v-model="ruleForm.appGN" :disabled="isEidtDeatil" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in appApply" :key="it"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 课程 -->
                    <el-form-item label="课程:" prop="region"  class="mg-b-30" v-if="jumpTypeDom == 'course'">
                        <el-button type="primary" class="mg-b-15" :disabled="isEidtDeatil" @click="openDaiog">关联</el-button>&nbsp;单选
                        <el-input v-model="courseName" placeholder="自动填充课程名称，不可修改" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="弹窗次数:" prop="popTimes"  class="mg-b-30">
                        <el-select v-model="ruleForm.popTimes" :disabled="isEidtDeatil" placeholder="请选择">
                            <el-option :label="it" :value="it" v-for="(it) in popTimesDay" :key="it"></el-option>
                        </el-select>
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
            <!-- 预览 -->
            <div>
                <ShowPhone :types="'pop'" :popPic="popPic" :showShadow="showShadow" :fullWindow="fullWindow"/>
            </div>
        </div>
        <PopupForm :openPopup="openPopup" @closeDialog="closeDialog" @selectedObj="selectedObj"/>
    </div>
</template>
<script>
import ShowPhone from './showPhone.vue'
import PopupForm from './popupForm.vue'
import { toUploadpic } from "../../../utils/cosUpLoad.js";
import { mapState } from "vuex";
import request from '@/utils/request'

export default {
    computed: {
        ...mapState({
            myPicUrl: (s) => s.myPicUrl,
        }),
    },
    components:{
        ShowPhone,
        PopupForm
    },
    props:{
        editData: Object
    },
    data(){
        return{
            ruleForm: {
                name: '',
                pic:'',
                region: '',
                date1: [],
                role:'',
                type:'',
                jump:'',
                applet:'',
                appletName:'',
                h5Jump:'',
                appGN:'',
                popTimes:'',
            },
            ids:'',
            hasEd:false,
            popPic:'',
            courseName:'',
            checked: false,
            appletList:[],
            showShadow: false,
            appApply:[],
            rules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                pic:[
                    { required: true, message: '请上传图片', trigger: 'change' }
                ],
                role: [
                    { required: true, message: '请选择角色', trigger: 'change' }
                ],
                region: [
                    { required: true, message: '请选择位置', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                jump: [
                    { required: true, message: '请选择跳转', trigger: 'change' }
                ],
                popTimes: [
                    { required: true, message: '请选择弹窗次数', trigger: 'change' }
                ],
            },
            isPermanentTime: 0,  // 是否是无期限 0 没选 1 选了
            comParams:{},
            options:[],
            optionsRole:[],
            optionsType:[],
            myicon:false,
            typeApi:'TJ', // 添加/编辑模式  TJ  BJ
            fileList:[],
            isEidtDeatil: false, // 判断是否是详情进入
            jumpTypeDom:'',
            openPopup: false,
            courseType:'',
            relation_id:'',
            fullWindow: false,
            popTimesDay:[],
        }
    },
    watch:{
        myPicUrl(n){
            this.fileList = []
            this.ruleForm.pic = n.url
            this.popPic = n.url
        }
    },
    created(){
        console.log('获取的数据', this.editData)
        if(this.editData.id){ // 编辑
            this.typeApi = 'BJ'
            this.ids = this.editData.id.value
            this.ruleForm.name = this.editData.name.value
            this.optionsRole = this.editData.roleList
            this.ruleForm.role = this.optionsRole[this.editData.role.value]
            this.optionsPosition = this.editData.postion[this.editData.role.value]
            this.ruleForm.region = this.optionsPosition[this.editData.position.value]
            this.showShadow = true
            this.optionsType = this.editData.popSize
            this.jumpList = this.editData.jump_type_lists
            this.ruleForm.type = this.optionsType[this.editData.type.value]
            this.popTimesDay = this.editData.popTimesDay
            this.ruleForm.popTimes = this.popTimesDay[this.editData.display_number.value]
            if(this.ruleForm.type == '满屏尺寸'){
                this.fullWindow = true
            } else {
                this.fullWindow = false
            }
            if(this.editData.status.value == '未上线' || this.editData.status.valueSource == 0){
                this.isEidtDeatil = false
            } else {
                this.isEidtDeatil = true
            }
            this.ruleForm.jump =  this.jumpList[this.editData.app_page.value]
            this.isPermanentTime = this.editData.is_permanent_time.value
            this.appApply = this.editData.appApply
            this.appletList = this.editData.appletList
            this.ruleForm.pic = this.editData.image.value
            this.popPic = this.ruleForm.pic
            if(!this.isPermanentTime){ // 有时间
                this.ruleForm.date1[0] = this.editData.start_time.value
                this.ruleForm.date1[1] = this.editData.end_time.value
            } else { // 无期限
                this.checked = true
                this.ruleForm.date1 = ['','']
            }
            // 判断jump_type 的类型
            this.ruleForm.jump = this.jumpList[this.editData.jump_type.value]
            this.jumpTypeDom = this.editData.jump_type.value
            if(this.editData.jump_type.value == 'applet'){
                let appletName = ''
                this.appletList.forEach((it, i, arr)=>{
                    if(arr[i].id == this.editData.relation_id.value){
                        appletName = arr[i].name
                    }
                })
                this.ruleForm.applet = appletName
                this.ruleForm.appletName = this.editData.jump_url.value
            } else if(this.editData.jump_type.value == 'app'){
                this.ruleForm.appGN = this.appApply[this.editData.app_page.value]
            } else if (this.editData.jump_type.value == 'h5'){
                this.ruleForm.h5Jump = this.editData.jump_url.value
            } else {
                this.relation_id = this.editData.relation_id.value
                this.courseType = this.editData.course_type.value
                this.courseName = this.editData.course_name.value
            }
        } else { // 新增
            this.typeApi = 'TJ'
            this.optionsRole = this.editData.roleList
            this.optionsType = this.editData.popSize
            this.jumpList = this.editData.jump_type_lists
            this.appApply = this.editData.appApply
            this.appletList = this.editData.appletList
            this.popTimesDay = this.editData.popTimesDay
        }
    },
    methods:{
        hasRole(){
            console.log('选择了')
            let roles = this.ruleForm.role == '学生' ? 'student' : 'teacher'
            this.optionsPosition = this.editData.postion[roles]
            this.ruleForm.region = ''
            console.log('选择了222', this.optionsPosition)
        },
        showYL(val){
            console.log('切换位置后', val)
            console.log('klklk', this.optionsPosition)
            this.ruleForm.region = val
            if(this.ruleForm.region){
                this.showShadow = true
            }
        },
        openDaiog(){
            console.log('打开')
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
        backToList(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            setTimeout(()=>{
                loading.close();
                this.$emit('backToList', true)
            }, 300)
        },
        // 完成
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
        // 编辑
        editActive(item){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            if(this.isEidtDeatil){
                loading.close();
                this.$emit('backToList', true)
                return
            }
            let positionWay = ''
            if(item == 'TJ'){
                for(let keys in this.optionsPosition){
                    if(keys == this.ruleForm.region){
                        positionWay = keys
                    }
                }
            } else {
                for(let keys in this.optionsPosition){
                    if(this.optionsPosition[keys] == this.ruleForm.region){
                        positionWay = keys
                    }
                }
            }
            let sizeWay = ''
            for(let i = 0; i < this.optionsType.length; i++){
                if(this.optionsType[i] == this.ruleForm.type){
                    sizeWay = i
                }
            }
            console.log('跳转类型', this.jumpList)
            let jumpWay = ''
            for(let keys in this.jumpList){
                if(this.jumpList[keys] == this.ruleForm.jump){
                    jumpWay = keys
                }
            }
            let myApplet = 1;
            if(!this.hasEd){
                for(let i = 0; i < this.appletList.length; i++){
                    if(this.appletList[i].name == this.ruleForm.applet){
                        myApplet = this.appletList[i].id
                    }
                }
            }
            let popTimesVal = ''
            for(let i = 0; i < this.popTimesDay.length; i++){
                if(this.popTimesDay[i] == this.ruleForm.popTimes){
                    popTimesVal = i
                }
            }
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/pop-windows/${item == "TJ" ? '' : this.ids}`,
                method: item == 'TJ' ? 'POST' : 'PUT',
                data:{
                    name: this.ruleForm.name,
                    role: this.ruleForm.role == '老师' ? 'teacher' : 'student',
                    position: positionWay ? positionWay : this.ruleForm.region,
                    type: sizeWay,
                    image: this.ruleForm.pic,
                    jump_type: jumpWay,
                    relation_id: jumpWay == 'course' ? this.relation_id : jumpWay == 'applet' ? this.hasEd ? this.ruleForm.applet : myApplet : '',
                    jump_url: this.jumpTypeDom == 'applet' ? this.ruleForm.appletName : this.ruleForm.h5Jump, // ?
                    course_type: this.courseType, // 课程来源
                    app_page: jumpWay == 'app' ? this.translateValue(this.appApply, this.ruleForm.appGN) : '',
                    start_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[0]) : '',
                    end_time: this.isPermanentTime ? '' : this.ruleForm.date1 ? this.formatDate(this.ruleForm.date1[1]) : '',
                    is_permanent_time: this.isPermanentTime,
                    display_number: popTimesVal
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
        // 弹框类型
        popSizeChange(val){
            console.log('现在的类型', val)
            if(val == '满屏尺寸'){
                this.fullWindow = true
            } else {
                this.fullWindow = false
            }
        },
        isMorePic(){},
        handleAvatarSuccess(res, file){
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleRemove(){
            if(this.isEidtDeatil){
                return
            }
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
        uploadRequest(params){
            toUploadpic(params)
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
            let key = this.getValKey(this.jumpList, val)
            this.jumpTypeDom = key    // app: app功能, applet：小程序，course: 课程，h5
        },
        selectApplet(){
            this.hasEd = true
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
        toWXQ(val){
            if(val){
                this.ruleForm.date1 = ''
                this.isPermanentTime = 1
            } else {
                this.isPermanentTime = 0
            }
        },
        getValKey(obj, val){
            for(let keys in obj){
                if(obj[keys] == val){
                    return keys
                }
            }
        }
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
/deep/.el-date-editor--datetimerange.el-input__inner {
    width: 440px;
}
/deep/.el-select .el-input{
    width: 230px;
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
  .d-pic:hover{
   background:#000;
   opacity: 0.3;
  }
</style>