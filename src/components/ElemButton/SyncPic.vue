<template>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-share" @click="handleSyncPic">
    {{elem.name}} 
  </el-button>
</template>

<script>
import {button} from '@/applications/mixins/button';
export default {
  mixins: [button],
  data() {
    return {
      actionType: 'syncPic',
    }
  },
  methods: {
    handleSyncPic() {
      this.model.$fetch({params: {action: 'syncPic'}}).then(response => {
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
      })
    },
  },
}
</script>
