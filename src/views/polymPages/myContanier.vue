<template>
    <div class="con-box">
        <div class="pos-re">
            <el-button class="pos-a r-0" @click="turnBack()">返回</el-button>
        </div>
        <div class="mg-b-30">
            <el-button type="primary" @click="toAddCon()">添加内容</el-button>
        </div>
        <div class="mg-b-30">
            <el-table :data="tableData" style="width:100%" ref="myTable"> 
                <el-table-column prop="date" label="序号" width="200">
                    <template slot-scope="scope"> 
                        <span v-if="arrList">{{ scope.row.orderlist.value }}</span>
                        <el-input v-else v-model="scope.row.orderlist.value" @input="changeSort(scope.row.id.value, scope.row.orderlist.value)" style="width:140px"></el-input>
                    </template>
                </el-table-column> 
                <el-table-column prop="desc" label="内容" width="300"> 
                    <template slot-scope="scope">
                        {{ scope.row.category.value }}
                    </template>
                </el-table-column> 
                <el-table-column prop="name" label="描述" width="330">
                    <template slot-scope="scope">
                        <el-image 
                            style="width: 100px; height: 65px" 
                            v-if="scope.row.description.value"
                            :src="scope.row.description.value" 
                            :preview-src-list="[scope.row.description.value]">
                        </el-image>
                        <div v-else class="t-a-c no-img">
                            暂无图片
                        </div>
                    </template>
                </el-table-column> 
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button type="text" size="small" @click="delList(scope.row)">删除</el-button>
                    </template> 
                </el-table-column>
            </el-table>
        </div>
        <div>
            <el-button type="primary" @click="toArray()">{{ btnName }}</el-button>
        </div>
        <el-dialog
            title="选择内容"
            :visible.sync="dialogVisible"
            width="40%"
            :before-close="handleClose">
            <el-radio v-model="radio2" :label="it" v-for="it in typeList" :key="it" border size="medium">{{ it }}</el-radio>
            <!-- <el-radio v-model="radio2" label="2" border size="medium">活动</el-radio>
            <el-radio v-model="radio2" label="3" border size="medium">app功能</el-radio>
            <el-radio v-model="radio2" label="4" border size="medium">H5链接</el-radio>
            <el-radio v-model="radio2" label="5" border size="medium">小程序</el-radio> -->
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm(radio2)">下一步</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '@/utils/request'

export default {
    data(){
        return{
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                }, {
                date: '2016-05-04',
                name: '王小虎',
            }],
            arrList: true,
            radio2: "",
            dialogVisible: false,
            btnName: '排序',
            ids:'',
            typeList:[],
            active_type:{},
            cours_type:{},
            appOptions:[],
            sortObj:{},
            valueList:[],
            keysList:[],
            role:'',
        }
    },
    beforeMount(){
        console.log('toMyCon传递的参数', this.$route.query)
        if(this.$route.query.id){ // 新进的
            this.ids = this.$route.query.id.value
            if(this.ids){
                window.localStorage.setItem('NRid', this.ids)
            }
            this.getConDetail(1)
        } else { // 返回的
            this.getConDetail(1)
        }
    },
    methods:{
        handleClick(val){
            this.$router.push({
                path: '/rdouble6_operate_aggregate-page/double6/update/aggregate-detail',
                query:{
                    id: val.category.value,
                    data: val,
                    active_type: this.active_type,
                    cours_type:this.cours_type,
                    appOptions: this.appOptions,
                    role: this.role
                }
            })
        },
        delList(del){
            console.log('删除',del)
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                request({
                    url: `${process.env.VUE_APP_BASE_API}double6/aggregate-details/${del.id.value}`,
                    method: 'DELETE',
                }).then(res=>{
                    if(res.code == 200 || res.message == 'ok'){
                        this.getConDetail()
                        this.$message.success("已删除");
                    }
                }).catch(err=>{})
                })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 获取详情列表
        getConDetail(nowPage){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-details`,
                method: 'get',
                params: {
                    parent_id: this.ids ? this.ids : window.localStorage.getItem('NRid'),
                    page: nowPage,
                    per_page: 999,
                    sort_elem: JSON.stringify({"orderlist":"asc"}),
                },
            }).then(res=>{
                console.log('获取的列表数据', res)
                if(res.code == 200 || res.message == 'ok'){
                    this.tableData = res.data
                    this.$nextTick(()=>{
                        this.$refs.myTable.doLayout();
                    })
                    this.role = res.haveSelection.info.role
                    this.typeList = res.searchFields.category.infos
                    this.active_type = res.searchFields.activity_type.infos
                    this.cours_type = res.searchFields.course_type.infos
                    this.appOptions = res.searchFields.app_page.infos
                }
            }).catch(err=>{})
        },
        // 添加内容
        toAddCon(){
            this.dialogVisible = true
        },
        // 排序监听
        changeSort(keys, value){
            this.sortObj[keys] = value
        },
        // 关闭弹框
        handleClose(){
            this.dialogVisible = false
        },
        // 添加----下一步
        submitForm(val){
            console.log('谣传的参数',val)
            if(!val){
                this.$message.warning('请选择要添加的内容')
                return
            }
            let pas = ''
            for(let keys in this.typeList){
                if(this.typeList[keys] == val){
                    pas = keys
                }
            }
            this.dialogVisible = false
            this.$router.push({
                path: '/rdouble6_operate_aggregate-page/double6/add/aggregate-detail',
                query: {
                    id: val,
                    ids:pas,
                    active_type: this.active_type,
                    cours_type:this.cours_type,
                    appOptions: this.appOptions,
                    role: this.role
                }
            })
        },
        turnBack(){
            this.$router.push({
                path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-page'
            })
        },
        // 排序
        toArray(){
            if(this.arrList){ // 点击要排序
                this.arrList = false
                this.btnName = '确认排序'
            } else { // 点击确认
                this.arrList = true
                this.btnName = '排序'
                this.keysList = []
                this.valueList = []
                for(let key in this.sortObj){
                    this.keysList.push(key)
                    this.valueList.push(this.sortObj[key])
                }
                this.toSort()
                console.log('值', this.valueList)
                console.log('key', this.keysList)
            }
        },
        // 排序--api
        toSort(){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-details/${this.keysList[0]}?point_scene=updateSort`,
                method: 'put',
                data: {
                    ids: this.keysList,
                    orderlist: this.valueList
                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.getConDetail(1)
                }
            }).catch(err=>{})
        },
    }
}
</script>
<style scoped>
/deep/.el-radio__input{
    display: none;
}
/deep/.el-radio{
    width: 95px;
    text-align: center;
}
.con-box{
    margin: 30px 40px;
}
.no-img{
    width:100px;height:65px;line-height:65px;background: #ececec;color: #a7a7a7;
}
</style>