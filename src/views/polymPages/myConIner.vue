<template>
    <div class="mg-t-40" style="min-width:1420px">
        <div class="title-s">{{ ActiveName }}</div>
        <div class="u-flex mg-l-110">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm flex-sh-0">
                <el-form-item label="描述:" prop="name" class="mg-b-15">
                    <el-radio v-model="radio" label="1">图片</el-radio>
                    <div class="u-flex">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :file-list="fileList"
                            :http-request="uploadRequest_f"
                            :on-success="handleAvatarSuccess_f"
                            :before-upload="beforeAvatarUpload_f">
                            <img v-show="ruleForm.f_pic" :src="ruleForm.f_pic" class="avatar">
                            <i v-show="!ruleForm.f_pic" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <div class="pos-re" style="width:285px"><span class="pos-a b-0">750X88   2M以内的jpg、png 图片1张</span></div>
                    </div>
                    <i class="el-icon-delete pos-a t-0" style="left: 340px;top:30px;font-size:30px;cursor: pointer;" @click="toDeleteMs()"></i>
                </el-form-item>
                <!-- 添加的内容 -->
                <template v-if="refreshData">
                <el-form-item :label="`${ids}${i+1}:`" label-width="90px" prop="name" class="mg-b-30 b-con" v-for="(it, i) in addNumbers" :key="i">
                    <div class="pos-re">
                        <div class="u-flex mg-b-15" @click="clickNumber(i)">
                            <span><span style="color:red">* </span>上传图片：</span>
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :file-list="fileListMore[i]"
                                :http-request="uploadRequest_s"
                                :on-success="handleAvatarSuccess_s"
                                :before-upload="beforeAvatarUpload_s">
                                <img v-show="ruleForm['s_pic'+i] || it.pic" :src="ruleForm['s_pic'+i] || it.pic" class="avatar">
                                <i v-show="!it.pic" class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload> 
                            <div class="pos-re" style="width:285px"><span class="pos-a b-0">678X230   2M以内的jpg、png 图片1张</span></div>
                        </div>
                        <!-- app功能 -->
                        <div v-if="ids == 'app功能'"> 
                            <span><span style="color:red">* </span>app功能：</span>
                            <el-select v-model="valueAPP[i]"  @change="changeAPPTypes($event, i)" placeholder="请选择">
                                <el-option v-for="(item, index) in appOptions" :key="index" :label="item" :value="index">
                                </el-option>
                            </el-select> 
                        </div>
                        <!-- 跳转链接 -->
                        <div v-if="ids == 'H5链接'" class="u-flex">
                            <span style="width:110px"><span style="color:red">* </span>跳转链接：</span>
                            <el-input v-model="jumpLink[i]" @input="changejumpLink($event, i)" placeholder="请输入链接"></el-input>
                        </div>
                        <!-- 小程序 -->
                        <div v-if="ids == '小程序'">
                            <div class="mg-b-15">
                                <span><span style="color:red">* </span>小程序：</span>
                                <el-select v-model="valueMin[i]" @change="changeMiniTypes($event, i)" placeholder="请选择">
                                    <el-option v-for="item in optionsMini" :key="item.id" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="u-flex">
                                <span style="width:110px"><span style="color:red">* </span>跳转链接：</span>
                                <el-input v-model="jumpLink2[i]"  @input="changejumpLink($event, i)" placeholder="请输入小程序链接"></el-input>
                            </div>
                        </div>
                        <!-- 活动/课程 -->
                        <div v-if="ids == '活动' || ids == '课程'">
                            <div class="mg-b-15">
                                <span><span style="color:red">* </span>{{ ids }}: </span>
                                <el-button type="primary" class="mg-b-15" @click="selectTables(1, i+1)">选择</el-button>
                                <!-- <span style="margin-left:30px;font-size:13px;color: #698ae7;">{{it[typeName] ? it[typeName][i] ? it[typeName][i].name : '' : ''}}</span> -->
                                <span style="margin-left:30px;font-size:13px;color: #698ae7;" v-if="it[typeName]">{{it[typeName][0].name}}</span>
                                <!-- <el-table :data="it[typeName]" style="width:100%" class="mg-b-15">
                                    <el-table-column prop="date" :label="ids == '课程' ? '课程名称' : '活动名称'" width="220" align="center">
                                        <template slot-scope="scope">
                                            {{ scope.row.name }}
                                        </template> 
                                    </el-table-column> 
                                    <el-table-column prop="name" :label="ids == '课程' ? '课程类型' : '活动类型'" width="250" align="center">
                                        <template slot-scope="scope">
                                            {{ typeName == 'activity' ? active_type[scope.row.stype] : isEnglishWords(scope.row.type) ? scope.row.type ? (cours_type[scope.row.type] ||  scope.row.type) : scope.row.stype : scope.row.type ? scope.row.type : scope.row.stype }}
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="230" align="center">
                                        <template slot-scope="scope">
                                            <el-button type="text" size="small" @click="handleClick(scope.row, i)">删除</el-button>
                                        </template>
                                    </el-table-column> 
                                </el-table> -->
                            </div>
                        </div>
                    </div>
                    <i class="el-icon-delete pos-a t-0" style="left: 800px;font-size:30px;cursor: pointer;" @click="roDelItem(i)"></i>
                </el-form-item>
                </template>
            </el-form>
        </div>
        <div class="add-n-c t-a-c" v-if="ids != 1 && ids != 2" @click="addContent"> + 添加内容 </div>
        <div class="b-btn pos-re" style="margin-bottom: 70px;">
            <el-button type="primary" class="pos-a p-center" style="width:120px;left: 650px;" @click="submitForm('ruleForm')">完成</el-button>
        </div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose">
            <div class="u-flex mg-b-15">
                <div class="u-flex mg-r-15">
                    <span class="dia-t">{{typeName == 'activity' ? '活动名称' : '课程'}}:</span>
                    <el-input v-model="className" placeholder="请输入"></el-input>
                </div>
                <div class="u-flex mg-r-15">
                    <span class="dia-t">类型:</span>
                    <el-select v-model="selectLX" placeholder="请选择">
                        <el-option 
                        v-for="(item, i) in options"
                        :key="item"
                        :label="item"
                        :value="i">
                        </el-option>
                    </el-select>
                </div>
                <div class="u-flex mg-r-15" v-if="typeName != 'activity'">
                    <span class="dia-t">课程来源:</span>
                    <el-select v-model="myCoursValue"  @change="changeTypes" placeholder="请选择">
                        <el-option
                            v-for="item in coursComing"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <el-button type="primary" @click="innerSearch()">搜索</el-button>
                <el-button @click="resetData">重置</el-button>
            </div> 
            <div class="l-lists mg-b-15">
                <el-table :data="tableDataInner" @row-click="singleElection" ref="myTable">
                    <el-table-column width="65" label="选择">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="templateSelection" :label="scope.row.id.value"
                                >&nbsp;</el-radio
                            >
                        </template>
                    </el-table-column>
                    <el-table-column label="ID" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.id.value || '-'}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" :label="typeName == 'activity' ? '活动名称' : '课程'" width="320">
                        <template slot-scope="scope">
                            {{ scope.row.name.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="类型" width="300" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ typeName == 'activity' ? active_type[scope.row.stype.value] : scope.row.type.value}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
                <el-pagination
                    layout="total, prev, pager, next, jumper"
                    @current-change="handleCurrentSecond"
                    @size-change="handleSizeChange"
                    :page-size="4"
                    :current-page.sync="currentPageInner"
                    :total="innerTotal"
                    ref="elPage"
                    >
                </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSelected()">保存</el-button>
                <el-button @click="cancelData">取消</el-button>
            </span>
        </el-dialog>
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
                f_pic: '',
                s_pic: [],
                date1: '',
                apps:''
            },
            valueAPP:[],
            innerTotal:1,
            valueMin:[],
            jumpLink2:[],
            optionsMini:[],
            checked: false,
            selectLX:'',
            value1:'',
            jumpLink:[],
            options: [{value: '选项1',label: '黄金糕'}],
            radio:'1',
            addNumbers:[],
            fileList:[],
            fileListMore:[],
            className:"",
            currentPageInner:1,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                }],
            tableDataInner:[
                {date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'}
            ],
            rules: {
            },
            coursComing:[
                {label: '六六写字', value: 'liuliu'},
                {label: '在线课程', value: 'children'},
            ],
            appOptions:[],
            myCoursValue:'liuliu',
            dialogVisible: false,
            ids:1,
            ActiveName:'课程',
            isUploadFirst: true, // 判断上传的是第几个图片  true 第一个  false 第二个
            myicon1: false,
            myicon2: false,
            // 当前选择的行的id
            templateSelection: "",
            selectTabel:'', // 当前选择的表格
            selectedNumber: 1, //点击当前第几个选择
            typeName: '',  // 获取当前类型名称
            activeTypes:[],
            active_type:{},
            cours_type:{},
            refreshData: true,
            comingTypeBJ: true,
            role:'student',
            modules:{"relation_id": '', "type":"", "pic":"", "app_page":"", "jump_url":""}
        }
    },
    created(){
        console.log('接收的参数', this.$route.query)
        if(this.$route.query.data){  // 编辑
            if(!this.$route.query.data.description){
                this.$router.push({
                    path:'/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-detail'
                })
                return
            }
            this.comingTypeBJ = true
            this.ruleForm.f_pic = this.$route.query.data.description.value
            this.addNumbers = this.$route.query.data.content.value
            if(this.addNumbers.length > 0){
                this.addNumbers.forEach((it, i, arr)=>{
                    this.ruleForm.s_pic[i] = it.pic
                })
            } else {
                this.addNumbers = []
                this.addNumbers.push(this.modules)
            }
            this.typeName = this.$route.query.data.category.valueSource
            if(this.typeName == 'activity'){
                this.selectLX = '2'
            }
            console.log('lllllxxx', this.addNumbers)
            this.active_type = this.$route.query.active_type
            this.cours_type = this.$route.query.cours_type
            this.appOptions = this.$route.query.appOptions
        } else { // 新增
            this.typeName = this.$route.query.ids
            this.comingTypeBJ = false
            if(this.$route.query.appOptions.coinShop){
                this.active_type = this.$route.query.active_type
                window.localStorage.setItem('activeType', JSON.stringify(this.active_type))
            } else {
                this.active_type = JSON.parse(window.localStorage.getItem('activeType'))
            }
            this.cours_type = this.$route.query.cours_type
            console.log('kehcne.....',this.cours_type)
            this.appOptions = this.$route.query.appOptions
            if(this.typeName == 'activity'){
                this.selectLX = '2'
            }
            this.addNumbers = [{"relation_id": '', "type":"", "pic":"", "app_page":"", "jump_url":""}]
        }
        this.ids = this.$route.query.id
        this.role = this.$route.query.role
        // 1-课程 2-活动 3-APP功能 4-H5链接 5-小程序
        if(this.ids == '课程'){
            this.ActiveName = '课程'
        } else if (this.ids == '活动'){
            this.ActiveName = '活动'
        } else if (this.ids == 'app功能'){
            this.ActiveName = 'app功能'
            let n = this.$route.query.data.content.value.length
            for(let i = 0; i < n; i++){
                this.valueAPP[i] = this.$route.query.data.content.value[i].app_page
            }
            console.log('app', this.valueAPP)
        } else if (this.ids == 'H5链接'){
            this.ActiveName = 'H5链接'
            let n = this.$route.query.data.content.value.length
            for(let i = 0; i < n; i++){
                this.jumpLink[i] = this.$route.query.data.content.value[i].jump_url
            }
        } else {
            this.ActiveName = '小程序'
            this.getMiniApp()
            let n = this.$route.query.data.content.value.length
            for(let i = 0; i < n; i++){
                this.jumpLink2[i] = this.$route.query.data.content.value[i].jump_url
                this.valueMin[i] = this.$route.query.data.content.value[i].relation_id
            }
        }
    }, 
    mounted(){
        if(this.$route.query.data){
            this.picHover('.f-pic')
            for(let i = 0; i < this.addNumbers.length; i++){
                this.picHover(`.s-pic${i}`)
            }
        }
    },
    watch:{
        myPicUrl(n){
            console.log('图片改变了', n)
            if(this.isUploadFirst){ // 填充第一个
                this.fileList = []
                this.ruleForm.f_pic = n.url
                this.picHover('.f-pic')
            } else { // 第二个
                this.refreshData = false
                this.fileListMore[this.selectTabel] = []
                this.ruleForm[`s_pic${this.selectTabel}`] = n.url
                this.addNumbers[this.selectTabel].pic = n.url
                console.log('this', this.ruleForm)
                for(let i = 0; i < this.addNumbers.length; i++){
                    this.picHover(`.s-pic${i}`)
                }
                this.refreshData = true
            }
        },
        addNumbers(n){
            this.refreshData = false
            if (true) {
                this.$nextTick(()=>{ // $nextTick 是在 DOM 更新循环结束之后执行延迟回调
                    this.refreshData = true
                })
            }
        }
    },
    methods:{
        // 删除-描述-图
        toDeleteMs(){
            if(this.ruleForm.f_pic == '' || this.fileList == []){
                this.$message({
                    type: "warning",
                    message: "当前暂无要删除的内容",
                });
                return
            }
            this.$confirm("此操作将删除内容, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                this.ruleForm.f_pic = ''
                this.fileList = []
            }).catch((err) => {
                this.$message({
                    type: "info",
                    message: "已取消删除" + err,
                });
            });
        },
        // 获取小程序列表
        getMiniApp(){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/applets?point_scene=pops`,
                method: 'get',
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok')[
                    // this.$router.push({
                    //     path: '/myContanier'
                    // })
                    this.optionsMini = res.data
                ]
            }).catch(err=>{})
        },
        // 判断中英文
        isEnglishWords(str){
            var pattern = new RegExp("[A-Za-z]+");
            return pattern.test(str)
        },
        changeMiniTypes(env, i){
            console.log('选择的', env)
            console.log('索引', i)
            this.addNumbers[i].relation_id = env
            console.log('add', this.addNumbers)
        },
        changeTypes(val){
            console.log('val', val)
            this.myCoursValue = val
            this.innerSearch()
        },
        clickNumber(val){
            this.selectTabel = val
        },
        submitForm(formName) {
            if(this.comingTypeBJ){
                this.apiEdit()
            } else {
                this.apiAdd()
            }
        },
        // 编辑
        apiEdit(){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-details/${this.$route.query.data.id.value}`,
                method: 'put',
                data: { 
                    parent_id: window.localStorage.getItem('NRid'),
                    category:  this.typeName,
                    description: this.ruleForm.f_pic,
                    content: this.addNumbers,
                    type: this.typeName == 'activity' ? "" : this.myCoursValue  
                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok')[
                    this.$router.push({
                        path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-detail'
                    })
                ]
            }).catch(err=>{})
        },
        handleSizeChange(){},
        // 添加
        apiAdd(){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-details`,
                method: 'post',
                data: { 
                    parent_id: window.localStorage.getItem('NRid'),
                    category:  this.typeName,
                    description: this.ruleForm.f_pic,
                    content: this.addNumbers,
                    type: this.typeName == 'activity' ? "" : this.myCoursValue  

                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok')[
                    this.$router.push({
                        path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-detail'
                    })
                ]
            }).catch(err=>{})
        },
        // hover样式
        picHover(doms){
            // console.log('所有的dom', doms)
            // let dom = document.querySelector(doms)
            // console.log('hover1', dom)
            // dom.onmouseenter = ()=>{
            //     console.log('hover', doms)
            //     doms == '.f-pic' ? this.myicon1 = true : this.myicon2 = true
            //     if(doms.indexOf('.s-pic') != -1){
            //         dom.style.background = '#000'
            //         dom.style.opacity = '0.3'
            //     }
            // }
            // dom.onmouseleave = ()=>{
            //     doms == '.f-pic' ? this.myicon1 = false : this.myicon2 = false
            //     if(doms.indexOf('.s-pic') != -1){
            //         dom.style.background = 'none'
            //         dom.style.opacity = '1'
            //     }
            // }
        },
        handleAvatarSuccess_f(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleAvatarSuccess_s(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        uploadRequest_f(params){
            console.log('上传', params)
            this.isUploadFirst = true
            toUploadpic(params)
        },
        uploadRequest_s(params){
            console.log('上传', params)
            this.isUploadFirst = false
            toUploadpic(params)
        },
        // 分页
        handleCurrentChange(val){
            console.log('当前页', val)
        },
        // 弹框中的分页
        handleCurrentSecond(val){
            console.log('当前页', val)
            this.selectTables(val, this.selectedNumber)
        },
        // 弹框中的搜索
        innerSearch(){
            this.$nextTick(()=>{
                this.currentPageInner = 1
                // this.$refs.elPage.doLayout()
            })
            this.selectTables(1, this.selectedNumber)
        },
        // 打开弹框
        selectTables(nowPage, num){
            this.selectedNumber = num
            this.dialogVisible = true
            this.currentPageInner = nowPage
            console.log('此时的接口', this.myCoursValue)
            request({
                url: `${process.env.VUE_APP_BASE_API}${this.typeName == 'activity' ? 'double6/activities?point_scene=pop' : this.myCoursValue == 'children' ? 'double6/children-courses?point_scene=pop' : 'double6/courses?point_scene=pop'}`,
                method: 'get',
                params: { 
                    name: this.className,
                    type: this.selectLX,
                    page: nowPage,
                    per_page: 4,
                    student_course: this.typeName == 'activity' ? '' : this.role == 'student' ? '1' : '0'
                },
            }).then(res=>{
                console.log('获取弹框数据', res)
                if(res.code == 200 || res.message == 'ok'){
                    this.tableDataInner = res.data
                    this.$nextTick(()=>{
                        this.$refs.myTable.doLayout();
                    })
                    this.innerTotal = res.meta.total
                    if(res.searchFields.type){
                        this.options = res.searchFields.type.infos
                    }
                    if(this.typeName == 'activity'){
                        this.options = this.active_type
                    }
                }
            }).catch(err=>{})
        },
        // 手动关闭
        handleClose(){
            this.dialogVisible = false
            this.myCoursValue = 'liuliu'
            this.templateSelection = ''
            // this.resetData()
        },
        // app下拉选择
        changeAPPTypes(env, i){
            console.log('选择的', env)
            console.log('索引', i)
            this.addNumbers[i].app_page = env
            console.log('add', this.addNumbers)
        },
        // 保存
        saveSelected(){
            console.log('当前tabel', this.selectTabel)
            console.log('当前选择第几个选择', this.selectedNumber)
            // this.addNumbers
            console.log('当前数据', this.addNumbers)
            // setTimeout(()=>{
                // this.$nextTick(()=>{
                    // this.refreshData = false
                    try {
                    console.log('typeName', this.typeName)
                    console.log('myCoursValue', this.myCoursValue)
                    if(this.addNumbers[this.selectedNumber - 1][this.typeName]){
                        console.log('11111',this.addNumbers[this.selectedNumber - 1][this.typeName])
                        if(this.addNumbers[this.selectedNumber - 1][this.typeName].length < 1){
                            this.addNumbers[this.selectedNumber - 1][this.typeName] = [{id: this.selectTabel.id.value, name: this.selectTabel.name.value, stype: this.typeName == 'activity' ? this.selectTabel.stype.value : this.selectTabel.type.value}]
                            // this.addNumbers[this.selectedNumber - 1][this.typeName].push(obj)
                            this.addNumbers[this.selectedNumber - 1].relation_id = this.addNumbers[this.selectedNumber - 1][this.typeName][0].id
                            this.addNumbers[this.selectedNumber - 1].type = this.myCoursValue
                        } else {
                            this.addNumbers[this.selectedNumber - 1][this.typeName][0]['id']= this.selectTabel.id.value
                            this.addNumbers[this.selectedNumber - 1][this.typeName][0]['name'] = this.selectTabel.name.value
                            this.addNumbers[this.selectedNumber - 1][this.typeName][0][this.typeName == 'activity' ?'stype' : 'type'] = this.typeName == 'activity' ? this.selectTabel.stype.value : this.selectTabel.type.value
                            this.addNumbers[this.selectedNumber - 1].relation_id = this.addNumbers[this.selectedNumber - 1][this.typeName][0].id
                            this.addNumbers[this.selectedNumber - 1].type = this.myCoursValue
                        }
                    } else {
                        this.addNumbers[this.selectedNumber - 1][this.typeName] = [{id: this.selectTabel.id.value, name: this.selectTabel.name.value, stype: this.typeName == 'activity' ? this.selectTabel.stype.value : this.selectTabel.type.value}]
                        console.log('2222',this.addNumbers)
                        this.addNumbers[this.selectedNumber - 1].relation_id = this.addNumbers[this.selectedNumber - 1][this.typeName][0].id
                        this.addNumbers[this.selectedNumber - 1].type = this.myCoursValue
                        console.log('3333', this.addNumbers)
                    }
                    console.log('现在的数据', this.addNumbers)
                    } catch (error) {
                        this.dialogVisible = false
                        this.templateSelection = ''
                        this.myCoursValue = 'liuliu'
                        console.log('error', error)
                    }
                    // this.refreshData = true
                // })
            // }, 300)
            this.dialogVisible = false
            this.templateSelection = ''
            this.myCoursValue = 'liuliu'
        },
        // 取消
        cancelData(){
            this.resetData()
            this.dialogVisible = false
            this.templateSelection = ''
            this.myCoursValue = 'liuliu'
        },
        beforeAvatarUpload_f(file) {
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
        beforeAvatarUpload_s(file){
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
        deepCopy(obj){
            var copyObj={ };
            for(var key in obj){
                if(obj.hasOwnProperty(key) == true){
                    if(obj[key] instanceof Object){
                        copyObj[key] = this.deepCopy(obj[key])
                    }else{
                        copyObj[key] = obj[key]
                    }
                }
            }
            return copyObj;
        },
        deepClone( originObj, map = new WeakMap() ) {
            if(!originObj || typeof originObj !== 'object') return originObj;  //空或者非对象则返回本身
            if( map.get(originObj) ) {
                return  map.get(originObj);
            }
            let result = Array.isArray(originObj) ? [] : {};  //拷贝结果
            map.set(originObj, result); //记录引用关系
            let keys = Object.keys(originObj); //originObj的全部key集合
            for(let i =0,len=keys.length; i<len; i++) {
                let key = keys[i];
                let temp = originObj[key];
                result[key] = this.deepClone(temp, map);
            }
            return result;
        },
        // 删除图片
        handleRemove(type, number){
            console.log('删除type', type)
            console.log('删除number', number)
            if(type == 'ss'){
                console.log('addNumbers.pic', this.addNumbers)
                // if(number == 0){
                    this.ruleForm[`s_pic${number}`] = this.ruleForm[`s_pic${number+1}`]
                    delete this.ruleForm[`s_pic${number+1}`]
                // }
                console.log('ruleForm.pic', this.ruleForm)
                return
            }
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                if(type == 's'){
                    this.addNumbers[number].pic = ''
                    this.ruleForm[`s_pic${number}`] = ''
                } else {
                    this.ruleForm.f_pic = ''
                }
                this.$message.success("已删除");
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 选择的表格
        singleElection(val){
            console.log('当前选择的表格',val)
            this.selectTabel = val
        },
        // 删除活动/课程
        handleClick(fff, i){
            console.log('klkl',fff)
            console.log('nnn',i)
            console.log('mmmm',this.addNumbers)
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                // if(type == 's'){
                //     this.addNumbers[number].pic = ''
                //     this.ruleForm[`s_pic${number}`] = ''
                // } else {
                //     this.ruleForm.f_pic = ''
                // }
                this.$nextTick(()=>{
                    this.ids = ''
                    this.addNumbers[i][this.typeName] = []
                    this.addNumbers[i].relation_id = ''
                    this.ids = '活动'
                })
                console.log('adddddd', this.addNumbers)
                this.$message.success("已删除");
            }).catch((err) => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 添加内容
        addContent(){
            // this.modules.pic = ''
            console.log('添加的模块', this.modules)
            console.log('添加前', this.addNumbers)
            let n = this.addNumbers.length
            let i = 0
            let data = {}
            for (let key in this.modules) {
                // if(i > 0) break
                data[key] = '';
                try {
                    this.addNumbers.push(data)
                } catch (error) {
                    // var arr = []
                    // for (let i in this.addNumbers) {
                    //     let o = {};
                    //     o[i] = this.addNumbers[i];
                    //     arr.push(o)
                    // }
                    // this.addNumbers = arr
                    // console.log('addNumbers', this.addNumbers)
                }
            }
            this.addNumbers = this.addNumbers.splice(0, n+1)
            console.log('添加后', this.addNumbers)
        },
        // 删除内容
        roDelItem(item){
            this.$confirm("此操作将删除内容, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                console.log('删除的是第几个', item)
                console.log('ddasd', this.addNumbers)
                // console
                this.handleRemove('ss', item)
                if(item + 1 < this.addNumbers.length){
                    console.log('为0的时候')
                    this.refreshData = false
                        if(item == 0){
                            this.addNumbers = this.addNumbers.slice(1, this.addNumbers.length)
                        } else {
                            let news1 = this.addNumbers.slice(0,item)
                            let news2 = this.addNumbers.slice(item + 1, this.addNumbers.length)
                            this.addNumbers = news1.concat(news2)
                        }
                        console.log('现在的addNumbers', this.addNumbers)
                        console.log('vvvv', this.jumpLink)
                        // 删除链接
                        this.delH5Jump(item)
                        // 删除app
                        this.delAPP(item)
                        // 删除小程序
                        this.delMini(item)
                } else { // 删除最后一个
                    Array.prototype.remove = function(from, to) {
                        var rest = this.slice((to || from) + 1 || this.length);
                        this.length = from < 0 ? this.length + from : from;
                        return this.push.apply(this, rest);
                    }; 
                        // 删除链接
                        this.delH5Jump(item)
                        // 删除app
                        this.delAPP(item)
                        // 删除小程序
                        this.delMini(item)
                    setTimeout(()=>{
                        this.addNumbers.remove(item)
                    },300)
                    this.$message.success("已删除");
                }
            }).catch((err) => {
                this.$message({
                    type: "info",
                    message: "已取消删除" + err,
                });
            });
        },
        delH5Jump(item){
            let jumpLinkList = []
            for(let i = 0; i < this.jumpLink.length; i++){
                if(i != item){
                    jumpLinkList.push(this.jumpLink[i])
                }
            }
            this.jumpLink = jumpLinkList
        },
        delAPP(item){
            let jumpLinkList = []
            for(let i = 0; i < this.valueAPP.length; i++){
                if(i != item){
                    jumpLinkList.push(this.valueAPP[i])
                }
            }
            this.valueAPP = jumpLinkList
        },
        delMini(item){
            // this.jumpLink2  this.valueMin
            let jumpLinkList = [], jumpLinkList2 = [];
            for(let i = 0; i < this.jumpLink2.length; i++){
                if(i != item){
                    jumpLinkList.push(this.jumpLink2[i])
                }
            }
            this.jumpLink2 = jumpLinkList
            for(let i = 0; i < this.valueMin.length; i++){
                if(i != item){
                    jumpLinkList2.push(this.valueMin[i])
                }
            }
            this.valueMin = jumpLinkList2
            console.log('kkkkk', this.valueMin)
        },
        // 重置
        resetData(){
            if(this.typeName == 'activity'){
                this.selectLX = '2'
            } else {
                this.selectLX = ''
            }
            this.className = ''
            this.myCoursValue = 'liuliu'
            this.innerSearch()
        },
        changejumpLink(env, i){
            console.log('选择的', env)
            console.log('索引', i)
            this.addNumbers[i].jump_url = env
            console.log('add', this.addNumbers)        
        }
    }
}
</script>
<style scoped>
    /* /deep/.el-table__row > td:nth-child(1)>.cell{
        display: inline-block;
        width: 60px;
    }
    /deep/.el-table__row > td:nth-child(1){
        display: inline-block;
        width: 60px;
    } */
    /* /deep/.el-table__body{
        width: 700px!important;
    } */
    .b-con{
        border: 1px solid rgb(227, 227, 227);
        padding: 20px 380px 20px 0px;
        margin-left: 50px;
        border-radius: 15px;
        box-shadow: 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 10%), 0 3px 5px -1px rgb(0 0 0 / 0%)
    }
    .add-n-c{
        height: 30px;
        line-height: 30px;
        /* margin: 30px 260px; */
        margin: 30px 561px 30px 159px;
        box-sizing: content-box;
        padding: 10px;
        border-radius: 10px;
        color: #b9b9b9;
        font-size: 18px;
        border: 1px dashed #cbcbcb;
        cursor: pointer;
    }
    .title-s{
        margin: 10px 55px;
        font-size: 20px;
        font-weight: 600;
        padding: 10px 0;
        border-bottom: 1px solid #efefef;
    }
    .b-btn{
        height: 50px;
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
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  /deep/.avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
  .dia-t{
    width: 80px;
    line-height: 36px;
    text-align: center;
  }
  .l-lists{
    max-height: 270px;
    overflow-y: auto;
  }
  .a-lines{
    border-bottom: 1px solid #efefef;
  }
  .f-pic:hover{
    background:#000;
    opacity: 0.3;
  }
</style>