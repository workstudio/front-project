<template>
  <div class="plan-step-form">
    <div class="plan-block"></div>
    <el-form label-position="left" label-width="80px" :model="formData">
      <el-form-item label="名称">
        <el-input v-model="formData.name" :disabled="read"></el-input>
      </el-form-item>
      <el-form-item label="学习天数">
        <el-input
          v-model="formData.days"
          style="width: 400px"
          :disabled="read"
          placeholder="请输入大于0的正整数"
        ></el-input>
        &nbsp;天
      </el-form-item>
      <el-form-item label="适用年级">
        <!-- <el-input v-model="formData.grades" multiple></el-input> -->
        <el-select
          v-model="formData.grades"
          multiple
          :disabled="read"
          placeholder="可多选"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in gradeList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划方式">
        <!-- <el-input v-model="formData.grades" multiple></el-input> -->
        <el-select v-model="formData.planBy" :disabled="read">
          <el-option label="按天计划" :value="1"></el-option>
          <el-option label="按周计划" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select
          v-model="formData.tags"
          multiple
          placeholder="可多选"
          :disabled="read"
        >
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item, index) in tagList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="计划介绍">
        <!-- <el-input
          type="textarea"
          class="planTextarea"
          v-model="formData.plan"
        ></el-input> -->
        <div class="tinybox">
          <tinymce v-model="formData.plan" :height="300" />
          <div v-if="read" class="hideTiny"></div>
        </div>
      </el-form-item>
    </el-form>
    <el-button @click="nextStep" class="nextStep" type="primary" round
      >下一步</el-button
    >
  </div>
</template>
<script>
import { postPlan, emitPlan } from "@/api/plan";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import Tinymce from "@/components/Tinymce";
export default {
  name: "plan",
  components: { Editor, Toolbar, Tinymce },
  props: {
    plan: {
      type: Object,
      default: function () {
        return {};
      },
    },
    planId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        tags: "",
        grades: "",
        days: "",
        planBy: "",
        plan: "",
      },
      gradeList: [],
      tagList: [],
      next: false,
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            // server:
          },
        },
      },
      mode: "default", // or 'simple'
      read: false,
    };
  },
  watch: {
    plan: function (nV, oV) {
      this.setPlan(nV);
    },
  },
  created() {},
  mounted() {
    let read = window.localStorage.getItem("read");
    if (read == "yes") {
      this.read = true;
    } else {
      this.read = false;
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    nextStep() {
      if (this.next) return;
      this.next = true;
      console.log(this.formData, "form");
      console.log(this.gradeList, this.tagList, "ssss");
      let data = {
        name: this.formData.name,
        day_number: this.formData.days,
        grade: this.formData.grades,
        plan_type: this.formData.planBy,
        label: this.formData.tags,
        content: this.formData.plan,
      };
      if (this.planId) {
        data.id = this.planId;
        emitPlan(data)
          .then((res) => {
            console.log(res, "resSttt");
            this.next = false;
            if (res.code == 200) {
              this.$emit("next", true);
            }
          })
          .catch((e) => {
            this.next = false;
          });
      } else {
        postPlan(data)
          .then((res) => {
            console.log(res, "sddddddd");
            this.next = false;
            if (res.code == 200) {
              this.$emit("planId", res.data.id);
            } else {
              this.next = false;
            }
          })
          .catch((e) => {
            this.next = false;
          });
      }
    },
    setPlan(plan) {
      console.log(plan);
      let gradeOpt = plan.updateFormFields.grade.infos;
      // 获取年级数据
      for (let k in gradeOpt) {
        let j = {
          label: gradeOpt[k],
          value: k,
        };
        this.gradeList.push(j);
      }
      let tagOpt = plan.updateFormFields.label.infos;
      // 获取标签数据
      for (let k in tagOpt) {
        let j = {
          label: tagOpt[k],
          value: k,
        };
        this.tagList.push(j);
      }
      // 获取plan信息
      if (this.planId) {
        let info = plan.data[0];
        this.formData.name = info["name"].value;
        this.formData.days = info["day_number"].value;
        this.formData.planBy = info["plan_type"].value;
        this.formData.plan = info["content"].value;
        this.formData.grades = this.turnToString(info["grade"].valueSource);
        this.formData.tags = this.turnToString(info["label"].valueSource);
      }
    },
    turnToString(arr) {
      let returnArr = [];
      arr.map((item) => {
        returnArr.push(item.toFixed());
      });
      return returnArr;
    },
  },
};
</script>
<style lang="scss">
.plan-step-form {
  width: 100%;
  height: calc(100% - 150px);
  overflow: auto;
  display: flex;
  // justify-content: center;
  flex-direction: column;
  align-items: center;
  &-block {
    padding: 0 60px;
    &-steps {
    }
  }
  .nextStep {
    width: 200px;
  }
  .textarea-border {
    border: 1px solid #ccc;
  }
  .tinybox {
    position: relative;
    .hideTiny {
      position: absolute;
      z-index: 11;
      background-color: rgba(255, 255, 255, 0.6);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      cursor: not-allowed;
    }
  }
}
</style>

