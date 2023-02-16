<template>
  <div class="plan">
    <div class="plan-block">
      <el-steps
        :active="active"
        finish-status="success"
        simple
        class="plan-block-steps"
      >
        <el-step title="创建计划"></el-step>
        <!-- <el-step title="题目配置"></el-step> -->
        <el-step title="流程配置"></el-step>
      </el-steps>
      <el-button class="plan-back" type="primary" @click="backList"
        >返回列表</el-button
      >
    </div>
    <step-one
      @next="active += 1"
      @planId="getId"
      :plan="planInfo"
      :planId="planId"
      v-show="active == 0"
    ></step-one>
    <!-- <step-two @next="active += 1" v-show="active == 1"></step-two> -->
    <step-three
      @pre="backform"
      @finish="backList"
      :planId="planId"
      v-if="active == 1"
    ></step-three>
  </div>
</template>
<script>
import stepOne from "./components/step-one.vue";
import stepTwo from "./components/step-two.vue";
import stepThree from "./components/step-three.vue";
import { getPlanList } from "@/api/plan";
export default {
  name: "plan",
  components: { stepOne, stepTwo, stepThree },
  props: {
    planId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      active: 0,
      planInfo: {},
    };
  },
  created() {},
  mounted() {
    this.getPlanInfo();
  },
  methods: {
    getPlanInfo() {
      console.log(this.planId, "id");
      getPlanList({ id: this.planId || "" }).then((res) => {
        console.log(res, "sss");
        this.planInfo = res;
      });
    },
    backList() {
      this.$emit("back", true);
    },
    getId(val) {
      this.planId = val;
      this.active += 1;
    },
    backform() {
      this.active = 0;
    },
  },
};
</script>
<style lang="scss">
.plan {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  &-block {
    margin-bottom: 60px;
    padding: 0 400px 0 0px;

    &-steps {
    }
  }
  &-back {
    position: absolute;
    right: 40px;
    top: 30px;
    width: 160px;
    height: 46px;
    letter-spacing: 1.5px;
    border-radius: 23px;
  }
}
</style>

