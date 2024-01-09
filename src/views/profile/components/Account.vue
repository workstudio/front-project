<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:300px">
    <el-form-item label="原密码" prop="password_old">
      <el-input show-password v-model="ruleForm.password_old" width="30px" size="medium"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="password">
      <el-input show-password v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item label="新密码确认" prop="password_confirmation">
      <el-input show-password v-model="ruleForm.password_confirmation" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import elemLists from '@/components/ElemList'
import elemButtons from '@/components/ElemButton'
import {view} from '@/applications/mixins/view';
import {fetchData} from '@/applications/mixins/fetchData'
import localCache from '@/applications/common/LocalCache'
import {resetRouter} from '@/router'

export default {
  mixins: [fetchData],
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.ruleForm.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password_old: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        password_old: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password_confirmation: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { required: true, validator: equalToPassword, trigger: 'blur' },
        ],
      }
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: ''
        }
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let model = this.getModel('passport', 'entrance');
          model.$create({params: {action: 'change-password'}, data: this.ruleForm}).then(response => {
            if (response === false) {
              return ;
            }
            //const index = this.list.findIndex(v => v.id === this.inputInfos.id)
            //this.list.splice(index, 1, this.inputInfos)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            console.log('ssss', 'llll');
      localCache.removeUser();
      if (this.envType == 'backend' || this.envType == 'merchant') {
        localCache.removePermission();
        resetRouter();
	  }
            window.location.href = '/login';
            return false;
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
