<template>
  <span>
  <template v-if="splitInfos">
  <el-button v-for="(item, index) in splitInfos" :key="index" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-s-operation" @click="handleOperation(splitInfos[index])">
    {{item.name}}
  </el-button>
  </template>
  <template v-else>
  <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-s-operation" @click="handleOperation(elem)">
    {{elem.name}}
  </el-button>
  </template>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
import {fetchData} from '@/applications/mixins/fetchData';
export default {
  mixins: [fetchData, button],
  data() {
    return {
      actionType: 'operation',
    }
  },
  computed:{
    extparam() {
      return !this.elem.extparam ? {} : JSON.parse(this.elem.extparam);
    },
    splitInfos() {
      return this.extparam['split'] ? this.extparam['split'] : {};
      let infos = this.elem.extparam ? JSON.parse(this.elem.extparam) : false;
      return infos ? infos['split'] : {};
    }
  },
  methods: {
    handleOperation(operation) {
      let oType = operation.type ? operation.type : false;
      if (!oType) {
        return ;
      }
      if (oType == 'newRoute') {
        this.$store.dispatch('permission/checkJumpPath', operation).then((response) => {
          let jumpPath = response.jumpPath;
          if (!jumpPath) {
             this.$message.error("无法操作");
          } else {
            this.$router.push({path: jumpPath, query: operation.params});
          }
        });
        return ;
      } else if (oType == 'api') {
        let model = this.getModel(operation.app, operation.resource);
        this.fetchRequest(model, {query: operation.params, params: {action: operation['action']}}).then(response => {
          
          let responseType = response.data.type;
          switch (responseType) {
            case 'newPage':
              window.open(response.data.url, '_blank');
            break;
            default:
              let message = response.data.message ? response.data.message : '操作成功';
              this.$message({message: message, type: 'success'})
          }
        })

      } else {
        this.actionType = oType;
        this.dealAction({row:this.row, operation: operation});
      }

      this.dealAction({});
      //this.$refs.listForm.handleCreate();
    },
  },
}
</script>
