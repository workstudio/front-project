<template>
  <div>
    <el-dialog
      :visible.sync="showDialog"
      :before-close="handleClose"
      width="1000px"
    >
      <template v-slot:title>
        <span>
          <span>模版库</span>
        </span>
      </template>
      <div v-if="data">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(val, key) in data.processList"
            :key="key"
            :label="val"
            :name="key"
          ></el-tab-pane>
        </el-tabs>
        <div class="t_box">
          <div v-for="item in data.templateList" :key="item.id">
            <div
              v-if="
                item.detail.length > 1 ||
                (item.detail.length > 0 &&
                  item.word_id > 0 &&
                  item.word_name !== '')
              "
              class="word_template"
            >
              <div class="word_box">
                <div class="left_item">
                  <p>{{ item.name }}</p>
                  <el-button type="primary" @click="handleSelect(item)"
                    >使用</el-button
                  >
                </div>
                <div>
                  <div class="right_item_box">
                    <el-input
                      v-if="item.word_id > 0 && item.word_name !== ''"
                      v-model="item.word_name"
                      style="width: 100px"
                    ></el-input>
                    <div class="t_item_box">
                      <div
                        v-for="cTem in item.detail"
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
              <div class="template_lists" @click="handleSelect(item)">
                <div class="t_item_box">
                  <p class="t_title">{{ item.name }}</p>
                  <template v-if="item.detail.length > 0">
                    <div
                      v-for="cTem in item.detail"
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
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      showDialog: false,
      activeName: "1",
      input: "aaa",
    };
  },

  created() {},

  methods: {
    handleClose() {
      this.$emit("hideDialog");
      this.activeName = "1";
    },
    handleClick() {
      this.$emit("changeTemplate", this.activeName);
    },

    setStyle(item) {
      return `width: calc((200/1920) * ${item.width});
					height: calc((200/1920) * ${item.height});
					top: calc((200/1920) * ${item.y});
					left: calc((200/1920) * ${item.x});
					background:${item.background};
					color:${item.color};
                    z-index:${item.zIndex};
                    border-radius:${item.borderRadius}
					`;
    },
    setStyleText(item) {
      return `width: ${item.width};
					height: ${item.height};
					top: calc((200/1920) * ${item.y});
					left: calc((200/1920) * ${item.x});
					line-height:${item.lineHeight};
					font-size:${item.fontSize};
					font-weight:${item.fontWeight};
					background:${item.background};
					color:${item.color};
					text-align:${item.textAlign};
					text-indent:${item.textIndent};
                    z-index:${item.zIndex};
                    border-radius:${item.borderRadius}
					`;
    },

    handleSelect(item) {
      this.$emit("selectTemplate", item);
      this.activeName = "1";
    },
  },
};
</script>
<style lang="scss" scoped>
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
          overflow: hidden;
          .t_item_content {
            // position: absolute;
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
