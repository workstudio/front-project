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
                <div class="i-p-w u-flex mg-r-30" style="width:200px">
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
                <el-button type="primary" @click="handleClick">创建弹框</el-button>
            </div>
            <div class="mg-b-30">
                <el-table ref="myTable" :data="tableData" border style="width:88.2%">
                    <el-table-column prop="date" label="序号" width="200">
                        <template slot-scope="scope"> 
                            <span v-if="arrList">{{ scope.row.orderlist.value }}</span>
                            <el-input v-else v-model="scope.row.orderlist.value" @input="changeSort(scope.row.id.value, scope.row.orderlist.value)" style="width:140px"></el-input>
                        </template>
                    </el-table-column> 
                    <el-table-column prop="date" label="ID" width="170">
                        <template slot-scope="scope">
                            {{ scope.row.id.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="弹窗名称" width="180">
                        <template slot-scope="scope">
                            {{ scope.row.name.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="弹窗有效期" width="370">
                        <template slot-scope="scope">
                            {{ scope.row.time.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="创建者" width="150">
                        <template slot-scope="scope">
                            {{ scope.row.operator_name.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="创建时间" width="250">
                        <template slot-scope="scope"> 
                            {{ scope.row.created_at.value || '-' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="状态" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.status.value || '-' }}
                        </template> 
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="180" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.status.value == '未上线' ? '编辑' :'详情'}}</el-button>
                            <el-button type="text" size="small" @click="toUpLoad(scope.row)">{{ scope.row.status.value == '未上线' ? '上线' : '下线'  }}</el-button>
                            <el-button type="text" size="small" @click="toDelData(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div>
                <el-button type="primary" @click="toArray()">{{ btnName }}</el-button>
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
        <PopEidt v-else @backToList="backToList" :editData="editData"/>
    </div>
</template>
<script>
import request from '@/utils/request'
import PopEidt from './components/popEidt.vue';
export default {
    components:{
        PopEidt
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
                status:{value:''}
                }],
            nickName:'',
            btnName: '排序',
            totalPageCount:1,
            currentPage:1,
            arrList: true,
            isMessageList: true,
            seletedVal:'',
            options:[],
            editData:{},
            jump_type:{},
            postion:{},
            roleList:{},
            popSize:[],
            appletList:[],
            popTimesDay:[],
            sortObj:{},
            valueList:[],
            keysList:[],
        }
    },
    created(){
        this.getDataList(1)
        this.getAppletList()
    },
    methods:{
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
        // 排序监听
        changeSort(keys, value){
            this.sortObj[keys] = value
        },
        // 排序--api
        toSort(){
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/pop-windows/${this.keysList[0]}?point_scene=updateSort`,
                method: 'put',
                data: {
                    ids: this.keysList,
                    orderlist: this.valueList
                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.getDataList(1)
                }
            }).catch(err=>{})
        },
        getDataList(nowPage){
            this.currentPage = nowPage
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/pop-windows`,
                method: 'get',
                params: {
                    id: this.userId,
                    name: this.nickName,
                    created_at: !this.MyTime ? '' : this.formatDate(this.MyTime[0]) + '|' + this.formatDate(this.MyTime[1]).replace('00:00:00', '23:59:59'),
                    status: this.seletedVal,
                    page: nowPage,
                    per_page: 10,
                    sort_elem: JSON.stringify({"orderlist":"asc"}),
                },
            }).then(res=>{
                if(res.code == 200 || res.message == 'ok'){
                    this.tableData = res.data
                    this.$nextTick(()=>{
                        this.$refs.myTable.doLayout();
                    })
                    this.options = res.searchFields.status.infos
                    this.totalPageCount = res.meta.total
                    this.jump_type = res.searchFields.jump_type.infos
                    this.postion = res.searchFields.position.infos
                    this.roleList = res.searchFields.role.infos
                    this.popSize = res.searchFields.type.infos
                    this.appApply = res.searchFields.app_page.infos
                    this.popTimesDay = res.searchFields.display_number.infos
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
        // 上线/下线
        toUpLoad(row){
            console.log('row', row)
            request({
                url: `${process.env.VUE_APP_BASE_API}double6/pop-windows/${row.id.value}?point_scene=updateStatus`,
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
        toSearch(){
            this.getDataList(1)
        },
        clearAllinput(){
            this.userId = ''
            this.nickName = ''
            this.MyTime = ''
            this.seletedVal = ''
            this.getDataList(1)
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
                    url: `${process.env.VUE_APP_BASE_API}double6/pop-windows/${row.id.value}`,
                    method: 'DELETE',
                }).then(res=>{
                    if(res.code == 200 || res.message == 'ok'){
                        this.getDataList(1)
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
                this.editData['jump_type_lists'] = this.jump_type
                this.editData['postion'] = this.postion
                this.editData['roleList'] = this.roleList 
                this.editData['popSize'] = this.popSize 
                this.editData['appApply'] = this.appApply
                this.editData['appletList'] = this.appletList
                this.editData['popTimesDay'] = this.popTimesDay
            } else {
                console.log('这是新建', item)
                this.editData = {}
                this.editData['jump_type_lists'] = this.jump_type
                this.editData['postion'] = this.postion
                this.editData['roleList'] = this.roleList
                this.editData['popSize'] = this.popSize
                this.editData['appApply'] = this.appApply
                this.editData['appletList'] = this.appletList
                this.editData['popTimesDay'] = this.popTimesDay
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
            this.getDataList(1)
            this.isMessageList = true
s        },
        handleSizeChange(){},
        handleCurrentChange(val){
            this.getDataList(val)
        },
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