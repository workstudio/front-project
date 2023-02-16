<template>
    <div class="con-box">  
        <div class="u-flex mg-b-30">
            <div class="i-p-w u-flex mg-r-15">
                <span class="i-span flex-sh-0 t-a-c">用户ID/用户:</span>
                <el-input v-model="userInput" placeholder="请输入"></el-input>
            </div>
            <div class="i-p-w-t u-flex mg-r-30">
                <span class="i-span-t flex-sh-0 t-a-c">参加时间:</span>
                <el-date-picker
                    v-model="MyTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-button type="primary">查询</el-button>
            <el-button @click="dataReset()">重置</el-button>
        </div>
        <div class="pos-re mg-b-30" style="height:36px">
            <el-button class="pos-a r-0" @click="turnBack">返回</el-button>
        </div>
        <div class="mg-b-30">
            <el-table :data="tableData" border style="width:72%">
                <el-table-column fixed prop="date" label="用户ID" width="200">
                </el-table-column>
                <el-table-column prop="name" label="用户" width="250">
                </el-table-column>
                <el-table-column prop="name" label="学校" width="300">
                </el-table-column>
                <el-table-column prop="name" label="年级" width="180">
                </el-table-column>
                <el-table-column prop="name" label="参加时间" width="243">
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="100">
            </el-pagination>
        </div>
    </div>
</template>
<script>
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
            currentPage:1,
            MyTime:'',
            userInput:''
        }
    },
    methods:{
        handleSizeChange(){

        },
        handleCurrentChange(){

        },
        turnBack(){
            this.$router.push({
                path: '/polymPages'
            })
        },
        // 重置
        dataReset(){
            this.userInput = ''
            this.MyTime = ''
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
    width: 100px;
}
.i-span-t{
    width: 90px;
}
</style>