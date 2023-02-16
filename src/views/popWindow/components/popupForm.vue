<template>
    <div>
        <el-dialog
            :visible.sync="dialogVisible"
            width="65%"
            :before-close="handleClose">
            <div class="u-flex mg-b-15 flex-w">
                <div :class="['u-flex mg-r-15',myCoursValue == 'liuliu' ? 'mg-b-15' :'']">
                    <span class="dia-t">课程名称:</span>
                    <el-input v-model="className" placeholder="请输入"></el-input>
                </div>
                <div class="u-flex mg-r-15 mg-b-15" v-if="myCoursValue == 'liuliu'">
                    <span class="dia-t">适用年级:</span>
                    <el-select v-model="grade" placeholder="请选择">
                        <el-option 
                            v-for="(item, i) in grade_semester"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div :class="['u-flex mg-r-15',myCoursValue == 'liuliu' ? 'mg-b-15' :'']">
                    <span class="dia-t">课程类型:</span>
                    <el-select v-model="classType" placeholder="请选择">
                        <el-option 
                        v-for="(item, i) in classTypeList"
                        :key="item"
                        :label="item"
                        :value="i">
                        </el-option>
                    </el-select>
                </div>
                <div class="u-flex mg-r-15" v-if="myCoursValue == 'liuliu'">
                    <span class="dia-t">适用对象:</span>
                    <el-select v-model="role" placeholder="请选择">
                        <el-option 
                        v-for="(item, i) in roleList"
                        :key="item"
                        :label="item"
                        :value="i">
                        </el-option>
                    </el-select> 
                </div>
                <div class="u-flex mg-r-15" v-if="myCoursValue == 'liuliu'">
                    <span class="dia-t">是否入班可学:</span>
                    <el-select v-model="selectLX" placeholder="请选择">
                        <el-option 
                        v-for="(item, i) in options"
                        :key="item"
                        :label="item"
                        :value="i">
                        </el-option>
                    </el-select>
                </div>
                <div class="u-flex mg-r-15">
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
                <el-table :data="tableDataInner" @row-click="singleElection" ref="myTable" v-if="myCoursValue=='liuliu'">
                    <el-table-column width="65" label="选择">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="templateSelection" :label="scope.row.id.value"
                                >&nbsp;</el-radio
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="课程名称" width="240">
                        <template slot-scope="scope">
                            {{ scope.row.name.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="适用年级" width="340">
                        <template slot-scope="scope">
                            {{ scope.row.grade_name.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="适用对象" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.student_course.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="书写材料" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.material.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="书体" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.calligraphy.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="字体" width="100">
                        <template slot-scope="scope">
                            {{ scope.row.typeface.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="课程类型" width="100" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.type.value || '-'}}
                        </template>
                    </el-table-column>
                </el-table>
                 <el-table :data="tableDataInner2" @row-click="singleElection" ref="myTable" v-else>
                    <el-table-column width="65" label="选择">
                        <template slot-scope="scope">
                            <el-radio class="radio" v-model="templateSelection" :label="scope.row.id.value"
                                >&nbsp;</el-radio
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="ID" width="310">
                        <template slot-scope="scope">
                            {{ scope.row.id.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="课程名称" width="400">
                        <template slot-scope="scope">
                            {{ scope.row.name.value || '-'}} 
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="类型" width="400">
                        <template slot-scope="scope">
                            {{ scope.row.type.value || '-'}}  
                        </template>
                    </el-table-column>
                </el-table>
            </div>
                <el-pagination
                    layout="total, prev, pager, next"
                    @current-change="handleCurrentSecond"
                    @size-change="handleSizeChange"
                    :page-size="5"
                    :current-page.sync="currentPageInner"
                    :total="innerTotal"
                    ref="elPage"
                    >
                </el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveSelected()">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import request from '@/utils/request'

export default {
    props:{
        openPopup: Object
    },
    watch:{
        openPopup(n){
            console.log('打开了', n)
            if(n){
                this.dialogVisible = true
                this.getPopupClass(1)
            } else {
                this.dialogVisible = false
            }
        }
    },
    data(){
        return{
            className:'',
            dialogVisible: false,
            currentPageInner:1,
            innerTotal:1,
            templateSelection:'',
            tableDataInner:[],
            tableDataInner2:[],
            options:['否', '是'],
            typeName:'',
            grade:'',
            classType:'',
            classTypeList:[],
            roleList:[],
            role:'',
            coursComing:[
                {label: '六六写字', value: 'liuliu'},
                {label: '在线课程', value: 'children'},
            ],
            myCoursValue:'liuliu',
            selectLX:'',
            grade_semester:[]
        }
    },
    created(){
        this.getPopupClass()
    },
    methods:{
        // 保存
        saveSelected(){
            console.log('数据',  this.templateSelection)
            let selectedObj = ''
            if(this.myCoursValue == 'children'){
                this.tableDataInner2.forEach((it, i, arr)=>{
                    if(it.id.value == this.templateSelection){
                        selectedObj = it
                    }
                })
            } else {
                this.tableDataInner.forEach((it, i, arr)=>{
                    if(it.id.value == this.templateSelection){
                        selectedObj = it
                    }
                })
            }
            if(selectedObj.id.value){
                this.isEmpty()
                selectedObj['course_type'] = this.myCoursValue
                this.$emit('selectedObj', selectedObj)
            }
        },
        handleCurrentSecond(val){
            this.getPopupClass(val)
        },
        handleSizeChange(){},
        innerSearch(){
            this.getPopupClass(1)
        },
        resetData(){
            this.isEmpty()
            this.getPopupClass(1)
        },
        isEmpty(){
            this.className = ''
            this.grade = ''
            this.classType = ''
            this.role = ''
            this.selectLX = ''
            this.templateSelection = ''
        },
        singleElection(){},
        handleClose(){
            console.log('手动关闭')
            this.isEmpty()
            this.$emit('closeDialog', false)
        },
        changeTypes(){
            this.isEmpty()
            this.getPopupClass(1)
        },
        getPopupClass(nowPage){
            this.currentPageInner = nowPage
            request({
                url: `${process.env.VUE_APP_BASE_API}${this.myCoursValue == 'children' ? 'double6/children-courses?point_scene=pop' : 'double6/courses?point_scene=pop'}`,
                method: 'get',
                params:{
                    name: this.className,
                    grade_id: this.grade,
                    type:this.classType,
                    student_course: this.role,
                    is_join_study: this.selectLX,
                    page: nowPage,
                    per_page: 5,
                }
            }).then(res=>{
                console.log('课程数据列表', res)
                if(res.code == 200 || res.message == 'ok'){
                    this.myCoursValue == 'children' ? this.tableDataInner2 = res.data : this.tableDataInner = res.data
                    try {
                        this.grade_semester = res.searchFields.grade_semester.infos
                        this.classTypeList = res.searchFields.type.infos
                        this.roleList = res.searchFields.student_course.infos
                        this.innerTotal = res.meta.total
                    } catch (error) {
                        this.innerTotal = res.meta.total
                        console.log('错误', error)
                    }
                }
            }).catch(err=>{})
        }
    }
}
</script>
<style scoped>
/deep/.el-input--medium{
    width: 230px;
}
  .dia-t{
    width: 100px;
    line-height: 36px;
    text-align: center;
  }
</style>