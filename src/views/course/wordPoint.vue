<template>
  <div class="wordPointPop">
    <x-pop title="书写要点" @closeTag="close" :width="'60%'">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="showRelation"
            >关联书写要点</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showAddPop">添加书写要点</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="tableData" border max-height="400px" v-loading="loading">
        <el-table-column
          align="center"
          label="名称"
          prop="word_name"
          width="80px"
          fixed="left"
        ></el-table-column>
        <el-table-column
          align="center"
          label="类型"
          width="80px"
          prop="word_type_name"
        ></el-table-column>
        <el-table-column align="center" label="书写要点1" width="200px">
          <template slot-scope="scope">
            {{ scope.row.point[0] ? scope.row.point[0].description : "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="书写要点2" width="200px">
          <template slot-scope="scope">
            {{ scope.row.point[1] ? scope.row.point[1].description : "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="书写要点3" width="200px">
          <template slot-scope="scope">
            {{ scope.row.point[2] ? scope.row.point[2].description : "" }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="书写要点4" width="200px">
          <template slot-scope="scope">
            {{ scope.row.point[3] ? scope.row.point[3].description : "" }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="120px"
          label="范字图"
          prop="word_name"
        >
          <template slot-scope="scope">
            <el-image
              style="width: 100%"
              :src="scope.row.image"
              :preview-src-list="[scope.row.image]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          width="120px"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
            >
              删除
            </el-button>

            <el-button
              @click.native.prevent="sort(scope.$index)"
              type="text"
              size="small"
              v-show="scope.$index !== 0"
            >
              置顶
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </x-pop>
    <!-- 要点添加 -->
    <x-pop title="要点添加" v-if="showAdd" @closeTag="showAdd = false">
      <el-form label-width="120px" class="addPop">
        <el-form-item label="资源名称">
          <el-input
            v-model="searchForm.name"
            placeholder="请输入资源名称"
            maxlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="searchForm.word_type">
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类别">
          <el-select v-model="searchForm.category">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" class="search_button" @click="search"
          >查询</el-button
        >
      </el-form>

      <el-form label-width="120px" class="addPop" v-show="canShowPoint">
        <el-form-item label="书写要点1">
          <el-input
            v-model="searchForm.point[0].description"
            maxlength="30"
          ></el-input>
        </el-form-item>
        <el-form-item label="书写要点2">
          <el-input
            v-model="searchForm.point[1].description"
            maxlength="30"
          ></el-input
        ></el-form-item>
        <el-form-item label="书写要点3">
          <el-input
            v-model="searchForm.point[2].description"
            maxlength="30"
          ></el-input
        ></el-form-item>
        <el-form-item label="书写要点4">
          <el-input
            v-model="searchForm.point[3].description"
            maxlength="30"
          ></el-input
        ></el-form-item>
        <el-form-item label="示范图">
          <upload-button
            @uploadFinish="Videochange"
            :uploadType="'image'"
          ></upload-button>
        </el-form-item>
        <el-form-item v-if="searchForm.image.original_url"
          ><img width="200px" :src="searchForm.image.original_url" alt=""
        /></el-form-item>
        <el-form-item>
          <el-button class="point_add" type="primary" @click="addWordPoint"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </x-pop>
    <!-- 要点关联 -->
    <x-pop
      title="关联要点"
      v-show="showRelationForm"
      @closeTag="showRelationForm = false"
    >
      <el-form label-width="120px" class="addPop">
        <el-form-item label="资源名称">
          <el-input
            v-model="relationForm.name"
            placeholder="请输入要查询的字/笔画/偏旁部首"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源类别">
          <el-select v-model="relationForm.category">
            <el-option
              v-for="item in classes"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源类型">
          <el-select v-model="relationForm.word_type">
            <el-option
              v-for="item in types"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary" @click="relative"> 关联 </el-button>
        </el-form-item>
      </el-form>
    </x-pop>
  </div>
</template>
<script>
import {
  getWordpoint,
  addPoint,
  deletePoint,
  getWordpointList,
  relationPoint,
  movePoint,
} from "@/api/course";
import { _debounce } from "@/utils/utils";
import xPop from "@/components/xPop";
import uploadButton from "@/components/uploadButton";
export default {
  components: { xPop, uploadButton },
  data() {
    return {
      tableData: [],
      showAdd: false,
      loading: false,
      types: [], // 类型
      classes: [], // 类别
      searchForm: {
        course_ware_id: "",
        section_id: "",
        name: "",
        word_type: "",
        category: "",
        point: [
          { description: "" },
          { description: "" },
          { description: "" },
          { description: "" },
        ],
        image: {
          id: "",
          original_url: "",
        },
      },
      relationForm: {
        name: "",
        course_ware_id: "",
        section_id: "",
        word_type: "",
        category: "",
      },
      showRelationForm: false,
      canShowPoint: false,
    };
  },
  props: {
    id: {
      type: Number,
      default: 0,
    },
    lessonId: {
      type: Number,
      default: null,
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    close() {
      this.$emit("closeWord");
    },
    showRelation() {
      this.showRelationForm = true;
    },
    showAddPop() {
      this.showAdd = true;
      this.canShowPoint = false;
      this.searchForm = {
        name: "",
        word_type: this.types[0].value,
        category: this.classes[0].value,
        point: [
          { description: "" },
          { description: "" },
          { description: "" },
          { description: "" },
        ],
        image: {
          id: "",
          original_url: "",
        },
      };
    },
    addWordPoint() {
      this.searchForm.course_ware_id = this.id;
      this.searchForm.section_id = this.lessonId;
      addPoint(this.searchForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("要点添加成功");
          this.searchForm = {
            name: "",
            word_type: this.types[0].value,
            category: this.classes[0].value,
            point: [
              { description: "" },
              { description: "" },
              { description: "" },
              { description: "" },
            ],
            image: {
              id: "",
              original_url: "",
            },
          };
          this.showAdd = false;
          this.getList();
        }
      });
    },
    getList() {
      this.types = [];
      this.classes = [];
      this.loading = true;
      getWordpointList({
        course_ware_id: this.id,
        section_id: this.lessonId,
      }).then((res) => {
        this.loading = false;
        console.log(res, "wordpoint");
        this.tableData = res.data.infos;
        for (let i in res.data.wordType) {
          let json = {
            label: res.data.wordType[i],
            value: i,
          };
          this.types.push(json);
        }
        this.searchForm.word_type = this.types[0].value;
        this.relationForm.word_type = this.types[0].value;
        for (let i in res.data.category) {
          let json = {
            label: res.data.category[i],
            value: i,
          };
          this.classes.push(json);
        }
        this.searchForm.category = this.classes[0].value;
        this.relationForm.category = this.classes[0].value;
      });
    },
    deleteRow(i, info) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletePoint(info.id).then((res) => {
            this.$message.success("已删除");
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    search() {
      if (this.searchForm.name == "") {
        this.canShowPoint = false;
        return;
      }
      getWordpoint(this.searchForm).then((res) => {
        console.log(res);
        this.canShowPoint = true;
        this.searchForm.word_id = res.data.word.id;
        this.searchForm.point.map((item, index) => {
          if (res.data.point[index]) {
            item = res.data.point[index];
          }
        });
      });
    },

    addPoint() {
      addPoint(this.searchForm).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("添加成功");
          this.showAdd = false;
        }
      });
    },

    //要点上传图片
    Videochange(val) {
      console.log(val, "upload");
      let info = JSON.parse(val);
      this.searchForm.image.original_url = info.original_url;
    },

    // 要点排序
    sort(i) {
      let array = JSON.parse(JSON.stringify(this.tableData));
      array.splice(i, 1);
      array.unshift(this.tableData[i]);
      movePoint({ pointData: array }).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.getList();
          this.$message.success("修改成功");
        }
      });
    },

    relative() {
      this.relationForm.course_ware_id = this.id;
      this.relationForm.section_id = this.lessonId;
      relationPoint(this.relationForm).then((res) => {
        if (res.code == 200) {
          this.$message.success("关联成功");

          this.relationForm = {
            name: "",
            word_type: this.types[0].value,
            category: this.classes[0].value,
          };
          this.getList();
          this.showRelationForm = false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wordPic {
  width: 60px;
  height: 60px;
}
.addPop {
  padding-right: 60px;
}
.search_button {
  position: absolute;
  top: 115px;
  right: 80px;
}
</style>
