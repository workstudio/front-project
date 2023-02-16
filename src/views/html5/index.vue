<template>
    <div>
        <div class="con-box" v-if="isMessageList">
            <div class="u-flex mg-b-30">
                <div class="i-p-w u-flex mg-r-15">
                    <span class="i-span flex-sh-0 t-a-c">ID:</span>
                    <el-input v-model="userId" placeholder="请输入"></el-input>
                </div>
                <div class="i-p-w u-flex mg-r-15">
                    <span class="i-span flex-sh-0 t-a-c">名称:</span>
                    <el-input v-model="nickName" placeholder="请输入"></el-input>
                </div>
                <div class="i-p-w-t u-flex mg-r-30">
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
                <el-button type="primary" @click="toSearch()">查询</el-button>
                <el-button @click="clearAllinput">重置</el-button>
            </div>
            <div class="mg-b-30">
                <el-button type="primary" @click="handleClick">创建H5页面</el-button>
            </div>
            <div class="mg-b-30">
                <el-table :data="tableData" border style="width:91.2%">
                    <el-table-column prop="date" label="ID" width="170">
                        <template slot-scope="scope">
                            {{ scope.row.id.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="H5名称" width="220">
                        <template slot-scope="scope">
                            {{ scope.row.name.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="链接" width="400">
                        <template slot-scope="scope"> 
                            {{ scope.row.h5_url.value || '-' }}
                            <i class="el-icon-document-copy hand-c font-s-20 pos-re color-b-q" style="top:3px" @click="copyThisLink(scope.row.h5_url)"></i>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="创建者" width="160">
                        <template slot-scope="scope">
                            {{ scope.row.operator_name.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="创建时间" width="350">
                        <template slot-scope="scope">
                            {{ scope.row.created_at.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{ '编辑' }}</el-button>
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
        </div>
        <HtmlEidt v-else @backToList="backToList" :editData="editData"/>
    </div>
</template>
<script>
import HtmlEidt from './components/htmlEidt.vue';
import request from '@/utils/request'

export default {
    components:{
        HtmlEidt
    },
    data(){
        return{
            userId:'',
            MyTime:'',
            tableData: [{
                id:{value:''},
                name:{value: ''},
                time:{value: ''},
                operator_name:{value: ''},
                created_at:{value: ''},
                }],
            nickName:'',
            totalPageCount:1,
            currentPage:1,
            isMessageList: true,
            editData:{},
            appletList:[],
            appApply:'',
            jump_type_list:''
        }
    },
    created(){
        this.getMyData(1)
        this.getAppletList()
    },
    methods:{
        getMyData(nowPage){
            this.currentPage = nowPage
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/h5-manages`,
                method: 'get',
                params: {
                    id: this.userId,
                    name: this.nickName,
                    created_at: !this.MyTime ? '' : this.formatDate(this.MyTime[0]) + '|' + this.formatDate(this.MyTime[1]).replace('00:00:00', '23:59:59'),
                    page: nowPage,
                    per_page: 10,
                    sort_elem: JSON.stringify({"id":"desc"}),
                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.tableData = res.data
                    this.totalPageCount = res.meta.total
                    this.appApply = res.searchFields.app_page.infos
                    this.jump_type_list = res.searchFields.jump_type.infos
                }
            }).catch(err=>{})
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
        // 查询
        toSearch(){
            this.getMyData(1)
        },
        clearAllinput(){
            this.userId = ''
            this.nickName = ''
            this.MyTime = ''
            this.getMyData(1)
        },
        changeMyTime(){},
        // 删除
        toDelData(row){
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
            .then(() => {
                request({
                    url: `${process.env.VUE_APP_BASE_API}double6/h5-manages/${row.id.value}`,
                    method: 'DELETE',
                }).then(res=>{
                    if(res.code == 200 || res.message == 'ok'){
                        this.getMyData(1)
                        this.$message.success("已删除");
                    }
                }).catch(err=>{})
            })
            .catch((err) => {
                this.$message({
                    type: "info",
                    message: "已取消删除",
                });
            })
        },
        // 获取小程序下拉框数据
        getAppletList(){    
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/applets?point_scene=pops`,
                method: 'get',
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.appletList = res.data
                }
            }).catch(err=>{})
        },
        handleClick(item){
            if(item.id){
                console.log('这是编辑', item)
                this.editData = item
                this.editData['appletList'] = this.appletList
                this.editData['appApply'] = this.appApply
                this.editData['jump_type_list'] = this.jump_type_list
            } else { 
                console.log('这是新建', item)
                this.editData = {}
                this.editData['appletList'] = this.appletList
                this.editData['appApply'] = this.appApply
                this.editData['jump_type_list'] = this.jump_type_list

            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.5)'
            });
            setTimeout(() => {
                this.isMessageList = false
                loading.close();
            }, 300);
        },
        backToList(){
            // window.location.reload()
            this.getMyData(1)
            this.isMessageList = true
        },
        handleSizeChange(){},
        // 分页
        handleCurrentChange(val){
            this.getMyData(val)
        },
        // 复制链接
        copyThisLink(item){
            let url = item.value;//拿到想要复制的值
            let copyInput = document.createElement('input');//创建input元素
            document.body.appendChild(copyInput);//向页面底部追加输入框
            copyInput.setAttribute('value', url);//添加属性，将url赋值给input元素的value属性
            copyInput.select();//选择input元素
            document.execCommand("Copy");//执行复制命令
            this.$message.success("复制成功！");//弹出提示信息，不同组件可能存在写法不同
            //复制之后再删除元素，否则无法成功赋值
            copyInput.remove();//删除动态创建的节点
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