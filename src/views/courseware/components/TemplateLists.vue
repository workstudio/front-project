<template>
  <div>
    <el-dialog
      :visible.sync="templateListsDialog"
      width="1000px"
      :title="title"
      :before-close="closeDialog"
    >
      <el-form :inline="true" class="form-inline" label-width="100px">
        <el-form-item label="资源名称：">
          <el-input v-model="searchParam.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-button-group>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit" />
          <el-tooltip content="重置查询条件" placement="top">
            <el-button icon="el-icon-refresh" @click="reset" />
          </el-tooltip>
        </el-button-group>
      </el-form>
      <page-table
        ref="pageTable"
        :loading="listLoading"
        :show-index="false"
        :page-no="searchParam.page"
        :page-size="searchParam.per_page"
        :data-list="templateData.data"
        :columns="initData.templateDataLists.columns"
        :total="templateData.total"
        @pageNoChange="pageNoChange"
      >
        <template v-slot:cell="props">
          <div v-if="props.column.label === '操作'">
            <el-button size="small" type="text" @click="relevance(props.row)"
              >关联</el-button
            >
          </div>
          <span v-else>{{ props.row[props.column.property] }}</span>
        </template>
      </page-table>
    </el-dialog>
  </div>
</template>

<script>
import { tcvideos } from "@/api/course";
import PageTable from "@/components/PageTable";
import { initData } from "./initData";
export default {
  components: {
    PageTable,
  },
  props: {
    title: {
      type: String,
      value: "",
    },
    type: {
      type: String,
      value: "",
    },
  },
  data() {
    return {
      templateListsDialog: false,
      listLoading: false,
      searchParam: {
        name: "",
        page: 1,
        per_page: 20,
        is_release: "",
        is_transcoding: "",
        status: "",
        uname: "",
        start_time: "",
        end_time: "",
        line_type: 4,
      },
      initData: initData,
      templateData: {
        data: null,
        total: 0,
      },
    };
  },

  methods: {
    showDialog() {
      if (this.type === "img") {
        this.searchParam.file_type = "image";
      } else {
        this.searchParam.file_type = this.type;
      }
      this.fetchData();
    },
    fetchData() {
      tcvideos(this.searchParam)
        .then((response) => {
          console.log(response.code, "aaa");
          if (response.code == 200) {
            console.log(response, "aaa");
            this.templateData.data = response.data.infos;
            this.templateData.currentPage = response.data.currentPage;
            this.templateData.total = response.data.totalNum;
            this.templateListsDialog = true;
          } else {
            this.$message({
              type: "error",
              message: response.msg,
            });
          }
        })
        .catch((error) => {
          this.$message({
            type: "error",
            message: error.msg,
          });
        });
    },
    onSubmit() {
      this.searchParam.page = 1;
      this.fetchData();
    },
    reset() {
      this.searchParam.name = "";
      this.searchParam.page = 1;
      this.searchParam.per_page = 10;
      this.fetchData();
    },
    pageNoChange(val) {
      this.searchParam.page = val;
      this.fetchData();
    },
    relevance(item) {
      this.templateListsDialog = false;
      this.$emit("relatedSource", {
        id: item.id,
        resourceUrl: item.original_url,
        type: 2,
      });
    },
    closeDialog() {
      this.templateListsDialog = false;
      this.templateData.data = null;
    },
  },
};
</script>
