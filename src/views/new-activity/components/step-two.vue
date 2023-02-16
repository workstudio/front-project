<template>
  <div class="questions">
    <div class="questions_inner">
      <div class="questions_inner_title">题目配置</div>
      <div class="questions_inner_addQ">
        <span>题型：</span>
        <div @click="addQuestion(1)" class="questions_inner_addQ_tag">
          单选题
        </div>
        <div @click="addQuestion(2)" class="questions_inner_addQ_tag">
          单行文本
        </div>
        <div @click="addQuestion(3)" class="questions_inner_addQ_tag">
          图片单选
        </div>
      </div>
      <div class="questions_inner_questions">
        <div
          v-for="(question, index) in questions"
          :key="index"
          class="questions_inner_questions_ques"
        >
          <!-- 第一种类型 -->
          <div v-show="question.type == 1" class="que_type1">
            <div class="que_title">
              {{ index + 1 }}：
              <input
                v-model="question.title"
                class="que_title_input"
                placeholder="请输入题干"
                type="text"
              />
            </div>
            <div class="que_options">
              <div
                class="que_options_option"
                v-for="(option, index2) in question.options"
                :key="index2"
              >
                <input
                  class="que_options_option_input"
                  v-model="questions[index].options[index2]"
                  type="text"
                />
                <i
                  class="el-icon-delete option_delete"
                  @click="deleteOption"
                ></i>
              </div>
            </div>
          </div>
          <!-- 第二种类型 -->
          <div v-show="question.type == 2" class="que_type2">
            <div class="que_title">
              {{ index + 1 }}：
              <input
                class="que_title_input"
                placeholder="请输入题干"
                type="text"
              />
            </div>
          </div>
          <!-- 第三种类型 -->
          <div v-show="question.type == 3" class="que_type3">
            <div class="que_title">
              {{ index + 1 }}：
              <input
                class="que_title_input"
                placeholder="请输入题干"
                type="text"
              />
            </div>
            <div class="que_options_3">
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :limit="1"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button @click="nextStep" class="nextStep" type="primary" round
      >下一步</el-button
    >
  </div>
</template>
<script>
export default {
  name: "plan",
  components: {},
  data() {
    return {
      questions: [],
      question_one: {
        title: "",
        type: 1,
        options: ["选项1", "选项2", "选项3"],
      },
      question_two: {
        title: "",
        type: 2,
      },
      question_three: {
        title: "",
        type: 3,
        urls: ["", "", ""],
      },
    };
  },
  created() {},
  methods: {
    nextStep() {
      this.$emit("next", true);
    },
    addQuestion(type) {
      if (type == 1) {
        this.questions.push(JSON.parse(JSON.stringify(this.question_one)));
      } else if (type == 2) {
        this.questions.push(JSON.parse(JSON.stringify(this.question_two)));
      } else if (type == 3) {
        this.questions.push(JSON.parse(JSON.stringify(this.question_three)));
      }
    },
    deleteOption(i) {},
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style lang="scss">
.questions {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &_inner {
    width: 100%;
    border: 1px solid gray;
    margin-bottom: 30px;
    &_title {
      font-size: 32px;
      padding: 20px;
      border-bottom: 1px solid gray;
    }
    &_addQ {
      font-size: 16px;
      align-items: center;
      display: flex;
      padding: 20px;
      border-bottom: 1px solid gray;
      span {
        font-size: 16px;
      }
      &_tag {
        width: 120px;
        height: 40px;
        border: 1px solid #198ffd;
        color: #1890ff;
        margin-left: 20px;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
      }
    }
    .questions_inner_questions {
      padding: 20px;
      &_ques {
        background: rgba(25, 143, 253, 0.15);
        padding: 20px;
        margin-bottom: 20px;
        .que_title {
          line-height: 40px;
          &_input {
            width: 500px;
            height: 40px;
            padding-left: 20px;
            box-sizing: border-box;
            border: none;
          }
        }
        .que_options {
          &_option {
            margin-top: 10px;
            &_input {
              border: none;
              height: 30px;
              padding-left: 10px;
              width: 300px;
            }
          }
          .option_delete {
            cursor: pointer;
          }
        }
        .que_options_3 {
          display: flex;
        }
      }
    }
  }
  .nextStep {
    width: 200px;
  }
}
</style>

