<template>
    <div class="con-box">
        <div class="u-flex mg-b-30">
            <div class="i-p-w u-flex mg-r-15">
                <span class="i-span flex-sh-0 t-a-c">ID:</span>
                <el-input v-model="userId" placeholder="请输入"></el-input>
            </div>
            <div class="i-p-w u-flex mg-r-15">
                <span class="i-span flex-sh-0 t-a-c">名称:</span>
                <el-input v-model="nickName" placeholder="请输入"></el-input>
            </div>
            <div class="i-p-w-t u-flex mg-r-15">
                <span class="i-span-t flex-sh-0 t-a-c">创建时间:</span>
                <el-date-picker
                    v-model="MyTime"
                    type="daterange"
                    range-separator="至"
                    @change="changeMyTime"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <div class="i-p-w u-flex mg-r-15" style="width:200px">
                <span class="i-span flex-sh-0 t-a-c">状态:</span>
                <el-select v-model="seletedVal" clearable placeholder="请选择">
                <el-option
                    v-for="(it, i) in options"
                    :key="i"
                    :label="it"
                    :value="i">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" @click="toSearch()">查询</el-button>
            <el-button @click="clearAllinput">重置</el-button>
        </div>
        <div class="mg-b-30">
            <el-button type="primary" @click="handleClick">聚合页配置</el-button>
        </div>
        <div class="mg-b-30">
            <el-table :data="tableData" border style="width:91.2%">
                <el-table-column fixed prop="date" label="ID" width="170">
                    <template slot-scope="scope">
                        {{ scope.row.id.value || '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="聚合页名称" width="200">
                    <template slot-scope="scope">
                        {{ scope.row.name.value || '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="活动时间" width="350">
                    <template slot-scope="scope">
                        {{ scope.row.time.value || '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="创建者" width="150">
                    <template slot-scope="scope">
                        {{ scope.row.operator_name.value || '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="创建时间" width="180">
                    <template slot-scope="scope">
                        {{ scope.row.created_at.value || '-' }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="状态" width="120">
                    <template slot-scope="scope">
                        {{ scope.row.status.value || '-' }}
                    </template> 
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.status.value == '未上线' ? '编辑' : '详情' }}</el-button>
                        <el-button type="text" size="small" @click="toMyCon(scope.row)">内容</el-button>
                        <el-button type="text" size="small" @click="toUpLoad(scope.row)">{{ scope.row.status.value == '未上线' ? '上线' : '下线' }}</el-button>
                        <!-- <el-button type="text" size="small" @click="toMyData()">数据</el-button> -->
                        <el-button type="text" size="small" @click="toDelData(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
       <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, prev, pager, next, jumper"
                :total="totalPageCount">
            </el-pagination>
        </div>
        <el-dialog
            title="选择样式"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="聚合页样式" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                    <el-radio label="样式1: XXX"></el-radio>
                    <el-radio label="样式2: XXX"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '@/utils/request'

export default {
    data(){
        return{
            input: '',
            MyTime:'',
            userId:'',
            nickName:'',
            options: [],
            ruleForm: {
                resource: '',
            },
            rules: {
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
            },
            seletedVal: '',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                }, {
                date: '2016-05-04',
                name: '王小虎',
            }],
            currentPage:1,
            dialogVisible: false,
            totalPageCount:10,
            role:{}
        }
    },
    created(){
        // 获取列表数据
        this.getDataList(1)
    }, 
    mounted(){
        let _this = this
        window.addEventListener("visibilitychange", _this.showPages);
    },
    methods:{
        showPages(e){
            if (e.target.visibilityState == "visible") {
                console.log('显示')
            } else {
                console.log('隐藏')
            }
        },
        // 编辑/ 聚合页配置
        handleClick(val){
            console.log('编辑', val)
            val['myRole'] = this.role
            this.$router.push({
                path: '/rdouble6_operate_aggregate-page/double6/add/aggregate-page',
                query: val
            })
        },
        // 内容
        toMyCon(val){
            this.$router.push({
                path: '/rdouble6_operate_aggregate-page/double6/listinfo/aggregate-detail',
                query: val
            })
        },
        // 获取列表数据
        getDataList(nowPage){
            this.currentPage = nowPage
            console.log('我的时间', this.MyTime)
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-pages`,
                method: 'get',
                params:{
                    id: this.userId,
                    name: this.nickName,
                    created_at: !this.MyTime ? '' : this.formatDate(this.MyTime[0]) + '|' + this.formatDate(this.MyTime[1]).replace('00:00:00', '23:59:59'),
                    status:this.seletedVal,
                    page: nowPage,
                    per_page: 10,
                    sort_elem: JSON.stringify({'id':'desc'})
                }
            }).then(res=>{
                console.log('获取的参数', res)
                if(res.code == 200 || res.message == 'ok'){
                    this.$nextTick(()=>{
                        this.tableData = res.data
                        this.options = res.searchFields.status.infos
                        this.totalPageCount = res.meta.total
                        this.role = res.searchFields.role.infos
                    })
                }
            }).catch(err=>{

            })
        },
        toSearch(){
            this.getDataList(1)
        },
        // 上线/ 下线
        toUpLoad(row){
            console.log('row', row)
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/aggregate-pages/${row.id.value}?point_scene=updateStatus`,
                method: 'put',
                data:{
                    status: row.status.valueSource ? 0 : 1
                }
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.$message({
                        showClose: true,
                        message:row.status.valueSource == 0 ? '上线成功' : '下线成功',
                        type: 'success'
                    });
                    this.getDataList(1)
                }
            }).catch(err=>{
            })
        },
        changeMyTime(val){
            // console.log('选的时间', this.formatDate(val[0]))
        },
        // 数据
        toMyData(){
            this.$router.push({
                path: '/dataLists'
            })
        },
        // 删除数据
        toDelData(row){
            console.log('删除',row)
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                request({
                    url: `${process.env.VUE_APP_BASE_API}double6/aggregate-pages/${row.id.value}`,
                    method: 'DELETE',
                    data:''
                }).then(res=>{
                    if(res.code == 200 || res.message == 'ok'){
                        this.$message.success("已删除");
                        this.getDataList(1)
                    }
                }).catch(err=>{
                })
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            });
        },
        // 关闭内容为空时的弹框
        handleClose(){
            this.dialogVisible = false
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
        // 提交样式选择
        submitForm(formName) {
            this.dialogVisible = false
            // this.$router.push({
            //     path: '/myContanier'
            // })
            return
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        handleSizeChange(){},
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.getDataList(val)
        },
        // 重置----情况当前所有选项
        clearAllinput(){
            this.seletedVal = ''
            this.MyTime = ''
            this.userId = ''
            this.nickName = ''
            this.getDataList(1)
        }
    }
}
</script>
<style scoped>
.con-box{
    margin: 30px 40px;
}
.i-p-w{
    width: 260px;
    line-height: 36px;
}
.i-p-w-t{
    line-height: 36px;
    width: 400px;
}
.i-span{
    width: 60px;
}
.i-span-t{
    width: 90px;
}
</style>