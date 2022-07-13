<template>
  <div>
  <span v-for="operation in operations">
  <el-button size="mini" @click="handleOperation(operation)">
    {{operation.name}}
  </el-button>
  </span>
  </div>
</template>

<script>
import {button} from '@/applications/mixins/button';
import {fetchData} from '@/applications/mixins/fetchData';
export default {
  mixins: [fetchData, button],
  data() {
    return {
      //actionType: 'popTable',
    }
  },
  computed: {
    operations() {
      return this.row[this.field].operations;
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
    },
  },
}
</script>
