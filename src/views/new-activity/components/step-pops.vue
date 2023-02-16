<template>
  <div class="step-popsbox">
    <div class="step-pops">
      <el-form
        v-show="showLesson"
        :inline="true"
        :model="formSearch"
        class="steps-pops-top"
      >
        <el-form-item label="课程："
          ><el-input
            v-model="formSearch.lesson"
            placeholder="输入课程"
          ></el-input
        ></el-form-item>
        <el-form-item label="类型："
          ><el-select v-model="formSearch.type" placeholder="请选择类型">
            <el-option
              :label="opt.label"
              :value="opt.value"
              v-for="opt in options"
              :key="opt.value"
            ></el-option></el-select
        ></el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 已选择表格 -->
      <div class="table_show" v-show="showLesson">
        <div class="table_chosen">
          <div>已选择：</div>
          <el-table :data="chosen" height="400px" ref="table">
            <el-table-column prop="children_name" label="课节名" width="180">
            </el-table-column>
            <el-table-column prop="info_name" label="课程名"></el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
            <!-- <el-table-column
            :label="col.name"
            :prop="col.type"
            :width="col.width"
            :header-cell-stype="{ 'text-align': 'center' }"
            v-for="col in tableColumns"
            :key="col.name"
          >
          </el-table-column> -->
          </el-table>
        </div>
        <!-- 课程列表 -->
        <div>
          <div class="lesson_title">课程</div>
          <div class="lesson_list">
            <div
              class="lesson_list_block"
              v-for="item in lessons"
              :key="item.id"
              @click="getLessonInfo(item)"
            >
              <div class="lesson_list_block_name">{{ item.name }}</div>
              <div class="lesson_list_block_type">{{ item.type }}</div>
              <div class="lesson_list_block_icon">>></div>
            </div>
          </div>
        </div>
      </div>
      <!-- 课节表格 -->
      <div class="table_kj" v-show="!showLesson">
        <el-table
          :data="formData"
          @selection-change="handleSelectionChange"
          v-loading="loading"
          height="450px"
          ref="kjtable"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            :label="col.name"
            :prop="col.type"
            :width="col.width"
            :header-cell-stype="{ 'text-align': 'center' }"
            v-for="col in tableColumns"
            :key="col.name"
          >
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          class="pag"
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
          :page-size="20"
        >
        </el-pagination> -->
      </div>
      <el-button class="pop-cancel" type="info" @click="cancel">取消</el-button>
      <el-button class="pop-certern" type="primary" @click="certern"
        >确认</el-button
      >
    </div>
  </div>
</template>
<script>
import { getLessons, getChildren } from "@/api/plan";
export default {
  name: "pop",
  data() {
    return {
      formSearch: {
        lesson: "",
        type: "",
      },
      options: [],
      formData: [],
      page: 1,
      tableColumns: [],
      total: 0,
      loading: false,
      multipleSelection: [],
      chosen: [],
      lessons: [],
      showLesson: true,
      chosenInfo: {
        id: "",
        name: "",
        type: "",
      },
    };
  },
  props: {
    poptype: {
      type: Number,
      default: 1,
    },
    selection: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    // 先赋值
    this.selection.map((item) => {
      let json = {
        info_id: item.info_id,
        info_name: item.info_name,
        children_id: item.children_id,
        children_name: item.children_name,
        start_time: item.start_time,
        end_time: item.end_time,
        type_name: item.type_name,
      };
      this.chosen.push(json);
    });
    console.log(this.chosen, "chosen");
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let data = {
        name: this.formSearch.lesson,
        type: this.formSearch.type,
        page: this.page,
      };
      // 执行
      getLessons(data).then((res) => {
        let arr = res.data;
        this.lessons = [];
        arr.map((item) => {
          let json = {};
          json.name = item.name.value;
          json.type = item.type.value;
          json.id = item.id.value;
          this.lessons.push(json);
        });
        this.options = [];
        let opt = res.searchFields.type.infos;
        // 获取select数据
        for (let k in opt) {
          let j = {
            label: opt[k],
            value: k,
          };
          this.options.push(j);
        }
      });
    },
    getLessonInfo(item) {
      this.chosenInfo = item;
      let data = {
        page: this.page,
        course_id: item.id,
      };
      getChildren(data).then((res) => {
        console.log(res, "aaa");
        this.tableColumns = [];
        this.formData = [];
        // 获取表格表头数据
        let table = res.fieldNames;
        for (let j in table) {
          let json = {
            type: j,
            name: table[j].name,
            width: j == "name" ? 300 : j == "id" ? 100 : "",
          };
          this.tableColumns.push(json);
        }
        // 分頁信息
        this.total = res.meta.total;
        this.loading = false;
        // 获取表格内容数据
        let tableInfo = res.data;
        tableInfo.map((item) => {
          let form = {};
          for (let key in item) {
            form[key] = item[key].value;
          }
          this.formData.push(form);
        });
        this.showLesson = false;
        if (this.chosen.length > 0) {
          let tarr = [];
          this.formData.map((item, index) => {
            this.chosen.map((ch) => {
              if (ch.children_id == item.id) {
                tarr.push(this.formData[index]);
              }
            });
          });
          this.$nextTick(() => {
            this.toggleSelection(tarr);
          });
        }
      });
    },
    clear() {
      this.formSearch = {
        lesson: "",
        type: "",
      };
      this.getData();
    },
    toggleSelection(rows) {
      console.log(rows, "rp");
      if (rows) {
        rows.forEach((row) => {
          this.$refs.kjtable.toggleRowSelection(row);
        });
      } else {
        this.$refs.kjtable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val, "val");
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getLessonInfo(this.chosenId);
    },
    // 表格执行删除
    handleDelete(i, row) {
      this.chosen.splice(i, 1);
    },
    certern() {
      if (!this.showLesson) {
        this.showLesson = true;
        let arr = [];
        this.multipleSelection.map((item) => {
          let json = {
            info_id: this.chosenInfo.id,
            info_name: this.chosenInfo.name,
            children_id: item.id,
            children_name: item.name,
            start_time: item.start_time,
            end_time: item.end_time,
            type_name: this.chosenInfo.type,
          };
          let have = false;
          this.chosen.map((ch) => {
            if (ch.children_id == item.id) {
              have = true;
            }
          });
          have ? "" : this.chosen.push(json);
        });
        this.chosen = Array.from(new Set(this.chosen));
        console.log(this.chosen, "cho");
      } else {
        this.$emit("finish", this.chosen);
      }

      // 确认进行赋值
      // this.multipleSelection.map((item) => {
      //   let have = false;
      //   this.chosen.map((cho) => {
      //     if (cho.id === item.id) {
      //       have = true;
      //     }
      //   });
      //   if (!have) {
      //     this.chosen.push(item);
      //   }
      // });
      // // todo
      // let json = {};
      // let arr = [];
      // this.chosen.map((item) => {
      //   json.info_name = item.word_id;
      //   json.type_name = item.material;
      //   json.number = null;
      //   if (this.learn.includes("示例图")) {
      //     json.image_id = item.demo_picture.id;
      //   } else if (this.learn.includes("示例视频")) {
      //     json.demo_video_id = item.demo_video.id;
      //   } else if (this.learn.includes("讲解视频")) {
      //     json.explain_video_id = item.explain_video.id;
      //   } else if (this.learn.includes("音频")) {
      //     json.audio_id = item.common_audio.id;
      //   }
      //   arr.push(json);
      // });
      // this.$emit("finish", this.chosen);
    },
    cancel() {
      this.$emit("cancel", true);
    },
  },
};
</script>
<style lang="scss">
.step-popsbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1111;
}
.step-pops {
  width: 1100px;
  border-radius: 40px;
  padding: 40px;
  height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  .pag {
    position: absolute;
    left: 40px;
    bottom: 40px;
  }
  .pop-certern {
    position: absolute;
    right: 40px;
    bottom: 40px;
  }
  .pop-cancel {
    position: absolute;
    right: 120px;
    bottom: 40px;
  }
}
.table_show {
  display: flex;
  justify-content: space-between;
}
.table_chosen {
  width: 520px;
}
.lesson_title {
  font-size: 16px;
  height: 40px;
}
.lesson_list {
  width: 450px;
  max-height: 360px;
  overflow: auto;
  &_block {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    margin-block: 2px;
    cursor: pointer;
    &_name {
      width: 300px;
      font-weight: bold;
      font-size: 15px;
    }
    &_type {
      width: 100px;
    }
  }
}
</style>

