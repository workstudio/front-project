<template>
  <div class="templateList">
    <el-form>
      <el-form-item label="模板状态">
        <el-select v-model="status" clearable>
          <el-option label="禁用" value="0"> </el-option>
          <el-option label="开启" value="1"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      fit
      :max-height="tableHeight"
      border
    >
      <el-table-column
        align="center"
        prop="id"
        label="ID"
        width="120"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="模板名称"
      ></el-table-column>

      <el-table-column
        prop="type_name"
        align="center"
        label="流程"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="id"
        label="操作"
        width="250"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="detail(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            查看
          </el-button>

          <el-button
            @click.native.prevent="stop(scope.$index, scope.row)"
            type="text"
            size="small"
          >
            {{ scope.row.status == 1 ? "禁用" : "启用" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pag"
      background
      layout="total, prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      :page-size="25"
    >
    </el-pagination>
    <x-pop
      title="模板详情"
      :width="t_width"
      v-if="showDetail"
      @closeTag="close"
    >
      <div v-if="templateData !== null" class="t_box">
        <div>
          <div
            v-if="
              templateData.template_details.length > 1 ||
              (templateData.template_details.length > 0 &&
                templateData.word_id > 0 &&
                templateData.word_name !== '')
            "
            class="word_template"
          >
            <div class="word_box">
              <div v-if="templateData.template_details.length > 0">
                <div class="right_item_box">
                  <el-input
                    v-if="
                      templateData.word_id > 0 && templateData.word_name !== ''
                    "
                    v-model="templateData.word_name"
                    style="width: 100px"
                  ></el-input>
                  <div class="t_item_box">
                    <div
                      v-for="cTem in templateData.template_details"
                      :key="cTem.id"
                      class="t_item"
                    >
                      <div
                        v-for="(hTem, index) in cTem.content"
                        :key="index"
                        class="t_item_content"
                      >
                        <img
                          v-if="hTem.type === 'img'"
                          :src="hTem.url"
                          :style="setStyle(hTem)"
                          alt=""
                        />
                        <p
                          v-if="hTem.type === 'text'"
                          class="p_text"
                          :style="setStyleText(hTem)"
                        >
                          {{ hTem.text }}
                        </p>
                        <video
                          v-if="hTem.type === 'video'"
                          :src="hTem.url"
                          :style="setStyle(hTem)"
                        ></video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-else>
            <div class="template_lists">
              <div class="t_item_box">
                <template v-if="templateData.template_details.length > 0">
                  <div
                    v-for="cTem in templateData.template_details"
                    :key="cTem.id"
                    class="t_item"
                  >
                    <div
                      v-for="(hTem, index) in cTem.content"
                      :key="index"
                      class="t_item_content"
                    >
                      <img
                        v-if="hTem.type === 'img'"
                        :src="hTem.url"
                        :style="setStyle(hTem)"
                        alt=""
                      />
                      <p
                        v-if="hTem.type === 'text'"
                        class="p_text"
                        :style="setStyleText(hTem)"
                      >
                        {{ hTem.text }}
                      </p>
                      <video
                        v-if="hTem.type === 'video'"
                        :src="hTem.url"
                        :style="setStyle(hTem)"
                      ></video>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </x-pop>
  </div>
</template>
<script>
import { templateList, updateTemplate, template } from "@/api/course";
import xPop from "@/components/xPop";
export default {
  components: { xPop },
  data() {
    return {
      tableData: [],
      status: "",
      tableHeight: 0,
      loading: false,
      total: 0,
      currentPage: 0,
      showDetail: false,
      templateData: {},
      t_width: "400px",
    };
  },
  watch: {
    status: function (newv, oldv) {
      this.currentPage = 1;
      this.getList();
    },
  },
  created() {
    let height = document.body.clientHeight;
    this.tableHeight = height - 300 + "px";
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      let params = {
        status: this.status,
        page: this.currentPage,
      };
      templateList(params).then((res) => {
        this.loading = false;
        console.log(res, "temp");
        this.tableData = res.data.infos;
        this.total = res.data.totalNum;
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    close() {
      this.showDetail = false;
    },
    detail(i, info) {
      template(info.id).then((res) => {
        console.log(res, "tes");
        if (res.data.template_details.length > 1) {
          this.t_width = "900px";
        } else {
          this.t_width = "400px";
        }
        this.templateData = res.data;
        this.showDetail = true;
      });
    },
    // 禁用
    stop(i, info) {
      updateTemplate({ id: info.id, status: info.status == 1 ? 0 : 1 }).then(
        (res) => {
          this.getList();
        }
      );
    },

    setStyle(item) {
      return `width: calc((200/1920) * ${item.width});
  height: calc((200/1920) * ${item.height});
  top: calc((200/1920) * ${item.y});
  left: calc((200/1920) * ${item.x});
  background:${item.background};
  color:${item.color};
  `;
    },
    setStyleText(item) {
      return `width: ${item.width};
  height: ${item.height};
  top: calc((200/1920) * ${item.y});
  left: calc((200/1920) * ${item.y});
  lineHeight:${item.lineHeight};
  font-size:${item.fontSize};
  fontWeight:${item.fontWeight};
  background:${item.background};
  color:${item.color};
  textAlign:${item.textAlign};
  textIndent:${item.textIndent};
  `;
    },
  },
};
</script>
<style lang="scss" scoped>
.templateList {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 30px;

  .pag {
    position: fixed;
    right: 20px;
    bottom: 30px;
  }
}
.t_box {
  display: flex;
  flex-wrap: wrap;
  .template_lists {
    margin: 0 30px 20px 0;
    width: 200px;
    .t_item_box {
      .t_title {
        text-align: center;
        font-size: 14px;
        margin: 10px auto;
      }
      .t_item {
        height: 112px;
        border-radius: 4px;
        position: relative;
        border: 1px solid #dcdfe6;
        cursor: pointer;
        overflow: hidden;
        .t_item_content {
          img {
            position: absolute;
          }
          video {
            position: absolute;
          }
          p {
            transform: scale(0.1042);
            transform-origin: 0 0;
            margin: 0;
            position: absolute;
          }
        }
      }
    }
  }
}
.word_template {
  margin-bottom: 20px;
  .word_box {
    display: flex;
    align-items: center;
    .left_item {
      width: 120px;
      text-align: center;
    }
    .right_item_box {
      width: 750px;
      border: 1px solid #dcdfe6;
      padding: 20px;
      .t_item_box {
        display: flex;
        flex-wrap: wrap;
        .t_item {
          width: 200px;
          margin-top: 20px;
          height: 112px;
          border-radius: 4px;
          margin-right: 30px;
          position: relative;
          cursor: pointer;
          overflow: hiden;
          .t_item_content {
            // positiodn: absolute;
            img {
              position: absolute;
            }
            video {
              position: absolute;
            }
            p {
              position: absolute;
              transform: scale(0.1042);
              margin: 0;
              transform-origin: 0 0;
            }
          }
        }
      }
    }
  }
}
</style>




<!-- <template>
  <div class="app-container">
    <el-form
      ref="pageForm"
      :inline="true"
      class="form-inline"
      label-width="100px"
    >
      <el-form-item label="模版状态：">
        <el-select v-model="searchParam.status" placeholder="请选择">
          <el-option
            v-for="item in templateLists"
            :key="item.status"
            :label="item.name"
            :value="item.status"
          />
        </el-select>
      </el-form-item>
      <el-button-group style="float: right">
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
      :page-size="searchParam.page_size"
      :data-list="tableData"
      :columns="initData.templateLists.columns"
      :total="total"
      @pageNoChange="pageNoChange"
    >
      <template v-slot:cell="props">
        <div v-if="props.column.label === '操作'">
          <el-button
            v-if="hasPerm('CoursewareTemplate:check')"
            v-track:click
            track-params="课件管理-课件模版-查看"
            size="small"
            type="text"
            @click="showTemplate(props.row)"
            >查看</el-button
          >
          <el-button
            v-if="
              props.row.status === 0 && hasPerm('CoursewareTemplate:activate')
            "
            v-track:click
            track-params="课件管理-课件模版-启用"
            size="small"
            type="text"
            @click="changeTemplateStatus(props.row)"
            >启用</el-button
          >
          <el-button
            v-else-if="
              props.row.status === 1 && hasPerm('CoursewareTemplate:forbid')
            "
            v-track:click
            track-params="课件管理-课件模版-禁用"
            size="small"
            type="text"
            @click="changeTemplateStatus(props.row)"
            >禁用</el-button
          >
        </div>
        <p v-else-if="props.column.label === '状态'">
          <b v-if="props.row.status === 1" class="courseStatus"></b>
          <b v-else class="courseStatusDefault"></b>
          {{ props.row.status === 0 ? "未发布" : "已发布" }}
        </p>
        <span v-else>{{ props.row[props.column.property] }}</span>
      </template>
    </page-table>
    <el-dialog
      :visible.sync="DialogFormVisible"
      :width="t_width"
      title="模板详情"
    >
      <div v-if="templateData !== null" class="t_box">
        <div>
          <div
            v-if="
              templateData.template_details.length > 1 ||
              (templateData.template_details.length > 0 &&
                templateData.word_id > 0 &&
                templateData.word_name !== '')
            "
            class="word_template"
          >
            <div class="word_box">
              <div v-if="templateData.template_details.length > 0">
                <div class="right_item_box">
                  <el-input
                    v-if="
                      templateData.word_id > 0 && templateData.word_name !== ''
                    "
                    v-model="templateData.word_name"
                    style="width: 100px"
                  ></el-input>
                  <div class="t_item_box">
                    <div
                      v-for="cTem in templateData.template_details"
                      :key="cTem.id"
                      class="t_item"
                    >
                      <div
                        v-for="(hTem, index) in cTem.content"
                        :key="index"
                        class="t_item_content"
                      >
                        <img
                          v-if="hTem.type === 'img'"
                          :src="hTem.url"
                          :style="setStyle(hTem)"
                          alt=""
                        />
                        <p
                          v-if="hTem.type === 'text'"
                          class="p_text"
                          :style="setStyleText(hTem)"
                        >
                          {{ hTem.text }}
                        </p>
                        <video
                          v-if="hTem.type === 'video'"
                          :src="hTem.url"
                          :style="setStyle(hTem)"
                        ></video>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <template v-else>
            <div class="template_lists">
              <div class="t_item_box">
                <template v-if="templateData.template_details.length > 0">
                  <div
                    v-for="cTem in templateData.template_details"
                    :key="cTem.id"
                    class="t_item"
                  >
                    <div
                      v-for="(hTem, index) in cTem.content"
                      :key="index"
                      class="t_item_content"
                    >
                      <img
                        v-if="hTem.type === 'img'"
                        :src="hTem.url"
                        :style="setStyle(hTem)"
                        alt=""
                      />
                      <p
                        v-if="hTem.type === 'text'"
                        class="p_text"
                        :style="setStyleText(hTem)"
                      >
                        {{ hTem.text }}
                      </p>
                      <video
                        v-if="hTem.type === 'video'"
                        :src="hTem.url"
                        :style="setStyle(hTem)"
                      ></video>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Api from "@/api";
import PageTable from "@/components/PageTable";
import { initData } from "./initData";
export default {
  components: {
    PageTable,
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      initData: initData,
      total: 0,
      searchParam: {
        status: "",
        page: 1,
        page_size: 10,
      },
      templateLists: [
        { name: "禁用", status: 0 },
        { name: "开启", status: 1 },
      ],
      DialogFormVisible: false,
      t_width: "400px",
      templateData: null,
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.listLoading = true;
      Api.templatePersonalList(this.searchParam).then((value) => {
        this.tableData = value.data.infos;
        this.total = value.data.totalNum;
        this.listLoading = false;
      });
    },
    onSubmit() {
      this.searchParam.page = 1;
      this.init();
    },
    reset() {
      this.searchParam = {
        page: 1,
        page_size: 10,
        status: "",
      };
      this.init();
    },
    pageNoChange(val) {
      this.searchParam.page = val;
      this.init();
    },
    changeTemplateStatus(item) {
      let status = item.status === 1 ? 0 : 1;
      if (item.status === 0) {
        // 当前禁用状态
        this.updateStatus({ id: item.id, status });
      } else {
        // 当前是启用状态
        this.$confirm(
          "确定禁用吗？ 模板禁用后，新建的课件将不可选择该模板",
          "提示",
          {
            confirmButtonText: "确定禁用",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.updateStatus({ id: item.id, status });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      }
    },
    updateStatus(params) {
      Api.templatePersonalStatusUpdate(params).then((value) => {
        if (value.status === 0) {
          this.$message({
            type: "success",
            message: params.status === 1 ? "启用成功!" : "禁用成功!",
          });
          this.init();
        } else {
          this.$message({
            type: "error",
            message: value.msg,
          });
        }
      });
    },

    showTemplate(item) {
      if (item.id) {
        Api.templatePersonalShow({ id: item.id }).then((value) => {
          if (value.status === 0) {
            if (value.data.template_details.length > 1) {
              this.t_width = "900px";
            } else {
              this.t_width = "400px";
            }
            this.DialogFormVisible = true;
            this.templateData = value.data;
          } else {
            this.$message({
              type: "error",
              message: value.msg,
            });
          }
        });
      }
    },

    setStyle(item) {
      return `width: calc((200/1920) * ${item.width});
        height: calc((200/1920) * ${item.height});
        top: calc((200/1920) * ${item.y});
        left: calc((200/1920) * ${item.x});
        background:${item.background};
        color:${item.color};
        `;
    },
    setStyleText(item) {
      return `width: ${item.width};
        height: ${item.height};
        top: calc((200/1920) * ${item.y});
        left: calc((200/1920) * ${item.y});
        lineHeight:${item.lineHeight};
        font-size:${item.fontSize};
        fontWeight:${item.fontWeight};
        background:${item.background};
        color:${item.color};
        textAlign:${item.textAlign};
        textIndent:${item.textIndent};
        `;
    },
  },
};
</script>
<style lang="scss" scoped>

</style> -->
