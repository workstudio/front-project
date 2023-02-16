<template>
  <div class="step-popsbox">
    <div class="step-pops">
      <el-form :inline="true" :model="formSearch" class="steps-pops-top">
        <el-form-item label="单字："
          ><el-input
            v-model="formSearch.word"
            placeholder="请输入需要查询的单字"
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
        <el-form-item label="学习内容："
          ><el-select
            v-model="learn"
            placeholder="请选择需要学习的内容"
            multiple
          >
            <el-option label="示例图" value="image_id"></el-option>
            <el-option label="音频" value="audio_id"></el-option>
            <el-option label="示例视频" value="demo_video_id"></el-option>
            <el-option label="讲解视频" value="explain_video_id"></el-option>
            <el-option label="书写要点" value="word_point"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-table
        :data="formData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        height="300px"
        ref="table"
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
      <el-pagination
        class="pag"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :page-size="10"
      >
      </el-pagination>
      <el-button class="pop-cancel" type="info" @click="cancel">取消</el-button>
      <el-button class="pop-certern" type="primary" @click="certern"
        >确认</el-button
      >
    </div>
  </div>
</template>
<script>
import { getwordInfo } from "@/api/plan";
export default {
  name: "pop",
  data() {
    return {
      formSearch: {
        word: "",
        type: "",
      },
      learn: [], // 需要的内容
      options: [],
      formData: [],
      page: 1,
      tableColumns: [],
      total: 0,
      loading: false,
      multipleSelection: [],
      chosen: [],
    };
  },
  props: {
    poptype: {
      type: Array,
      default: () => {
        return [];
      },
    },
    selection: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    console.log(this.poptype, "pop");
    this.learn = this.poptype; // 复制
    this.chosen = JSON.parse(JSON.stringify(this.selection)); // 先赋值
    console.log(this.selection, this.chosen);
    // if (this.chosen.length > 0) {
    //   this.chosen[0].audio_id != 0 ? this.learn.push("音频") : "";
    //   this.chosen[0].demo_video_id != 0 ? this.learn.push("示例视频") : "";
    //   this.chosen[0].explain_video_id != 0 ? this.learn.push("讲解视频") : "";
    //   this.chosen[0].image_id != 0 ? this.learn.push("示例图") : "";
    // }
    this.getData();
  },
  methods: {
    inChosen(item) {
      this.chosen.map((i) => {
        console.log(i, item, "inchsoen");
        console.log(i.info_id === item.info_id);
        if (i.info_id === item.info_id) {
          return true;
        } else {
          return false;
        }
      });
    },
    getData() {
      this.loading = true;
      let data = {
        name: this.formSearch.word,
        type: this.formSearch.type,
        page: this.page,
      };
      // 切换页面时 进行赋值
      // this.chosen = this.chosen.concat(this.multipleSelection);
      this.multipleSelection.map((item) => {
        if (!this.inChosen(item)) {
          this.chosen.push(item);
        }
      });
      console.log(this.chosen, "chosen");
      // return;
      // 执行
      getwordInfo(data).then((res) => {
        this.options = [];
        this.tableColumns = [];
        this.formData = [];
        let opt = res.searchFields.word_type.infos;
        // 获取select数据
        for (let k in opt) {
          let j = {
            label: opt[k],
            value: k,
          };
          this.options.push(j);
        }
        let table = res.fieldNames;
        // 获取表格表头数据
        for (let j in table) {
          let json = {
            type: j,
            name: table[j].name,
            width: j == "name" ? 500 : "",
          };
          let arr = [
            "书法老师",
            "课程名称",
            "章节名称",
            "状态",
            "创建时间",
            "要点图",
            "示例图",
            "示例视频",
            "讲解视频",
            "音频",
            "版本",
            "word_point",
          ];
          if (!arr.includes(json.name)) {
            this.tableColumns.push(json);
          }
        }
        // 获取表格内容数据
        let tableInfo = res.data;
        tableInfo.map((item) => {
          let form = {};
          for (let key in item) {
            form[key] = item[key].value;
          }
          form.info_id = item["id"].valueSource;
          this.formData.push(form);
        });
        // 分頁信息
        this.total = res.meta.total;
        this.loading = false;
        // 判断是否已勾选
        let arr = [];
        this.formData.map((item, index) => {
          this.chosen.map((i, index2) => {
            if (i.info_id === item.info_id) {
              arr.push(this.formData[index]);
              this.chosen.splice(index2, 1);
            }
          });
        });
        // 切换页面时 储存已选中的
        console.log(arr, "aaa");
        console.log(this.chosen, "bbb");
        this.$nextTick(() => {
          this.toggleSelection(arr);
        });
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
      if (rows) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    certern() {
      if (this.learn.length == 0) {
        this.$message({
          type: "error",
          message: "请选择需要学习的内容",
        });
        return;
      }

      this.chosen = this.chosen.concat(this.multipleSelection);
      console.log(this.multipleSelection, "aaaa");
      console.log(this.chosen, "chosen");
      let arr = [];
      this.chosen.map((item) => {
        let json = {};
        json.info_name = item.word_id || item.info_name;
        json.info_id = item.info_id;
        // 重置书写要点数组
        let point = ["", "", "", ""];
        // json.word_point = item.word_point;
        if (this.learn.includes("word_point")) {
          item.word_point.map((item, index) => {
            point[index] = item ? item.description : "";
          });
        }
        json.word_point = point;
        json.type_name = item.material || item.type_name;
        json.number = null;
        if (this.learn.includes("image_id")) {
          json.image_id = item.demo_picture ? item.demo_picture.id : 0;
          json.image_url = item.demo_picture
            ? item.demo_picture.original_url
            : "";
        } else {
          json.image_id = 0;
          json.image_url = "";
        }

        if (this.learn.includes("demo_video_id")) {
          json.demo_video_id = item.demo_video ? item.demo_video.id : 0;

          json.demo_video_url = item.demo_video
            ? item.demo_video.original_url
            : "";
        } else {
          json.demo_video_id = 0;
        }
        if (this.learn.includes("explain_video_id")) {
          json.explain_video_id = item.explain_video
            ? item.explain_video.id
            : 0;
          json.explain_video_url = item.explain_video
            ? item.explain_video.original_url
            : "";
        } else {
          json.explain_video_id = 0;
          json.explain_video_url = "";
        }

        if (this.learn.includes("audio_id")) {
          json.audio_id = item.common_audio ? item.common_audio.id : 0;
          json.audio_url = item.common_audio
            ? item.common_audio.original_url
            : "";
        } else {
          json.audio_id = 0;
          json.audio_url = "";
        }
        arr.push(json);
      });
      this.selection.map((item) => {
        arr.map((a, index) => {
          if (item.info_id === a.info_id) {
            // item.audio_id === 0 ? "" : (a.audio_id = item.audio_id),
            //   (a.audio_url = item.audio_url);
            // item.demo_video_id === 0
            //   ? ""
            //   : (a.demo_video_id = item.demo_video_id),
            //   (a.demo_video_url = item.demo_video_url);
            // item.explain_video_id === 0
            //   ? ""
            //   : (a.explain_video_id = item.explain_video_id),
            //   (a.explain_video_url = item.explain_video_url);
            // item.image_id === 0 ? "" : (a.image_id = item.image_id),
            //   (a.image_url = item.image_url);
            a.number = item.number;
            if (this.learn.includes("image_id")) {
              a.image_id = item.image_id;
              a.image_url = item.image_url;
            }
            if (this.learn.includes("demo_video_id")) {
              a.demo_video_id = item.demo_video_id;
              a.demo_video_url = item.demo_video_url;
            }
            if (this.learn.includes("explain_video_id")) {
              a.explain_video_id = item.explain_video_id;
              a.explain_video_url = item.explain_video_url;
            }
            if (this.learn.includes("audio_id")) {
              a.audio_id = item.audio_id;
              a.audio_url = item.audio_url;
            }
            this.learn.includes("word_point")
              ? (a.word_point = item.word_point)
              : "";
          }
        });
      });
      console.log(arr, "arr");
      this.$emit("learn", this.learn);
      this.$emit("finish", arr);
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
</style>

