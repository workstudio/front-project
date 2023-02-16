<template>
    <el-card class="box-card">
        <div class="file-item-inner">
            <div class="title">
                <i class="el-icon-video-camera" />
                <span>{{ uploaderInfo.file.name }}</span>
            </div>
            <div class="options">
                <el-progress
                    style="flex: 1;"
                    :percentage="Math.floor(uploaderInfo.progress * 100)"
                ></el-progress>
                <span class="status">{{ uploaderInfo.status | statusText }}</span>
                <template v-if="uploaderInfo.type === 'video'">
                    <i
                        v-if="uploaderInfo.status === 'cancel'"
                        class="icon el-icon-video-play"
                        @click="continueItem"
                    />
                    <i
                        v-if="uploaderInfo.status === 'uploading'"
                        class="icon el-icon-video-pause"
                        @click="pauseItem"
                    />
                    <i class="icon el-icon-close" @click="deleteItem" />
                </template>
            </div>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'Item',
    filters: {
        statusText(val) {
            const data = {
                wait: '等待中',
                uploading: '上传中',
                cancel: '已暂停',
                success: '上传成功'
            };
            return data[val] || '';
        }
    },
    props: {
        uploaderInfo: {
            default: () => {
                return {};
            },
            type: Object
        },
        uploader: {
            default: () => {
                return {};
            },
            type: Object
        }
    },
    methods: {
        continueItem() {
            this.uploaderInfo.upload(this.uploaderInfo.file);
        },
        pauseItem() {
            this.uploaderInfo.cancel();
        },
        deleteItem() {
            this.$emit('handleDelete', this.uploaderInfo);
        }
    }
};
</script>

<style scoped lang="scss">
.box-card {
    margin-bottom: 15px;

    .file-item-inner {
        .options {
            display: flex;
            align-items: center;
            margin-top: 5px;

            .status {
                font-size: 14px;
                color: #666666;
            }

            .icon {
                margin-left: 10px;
                color: #666666;
            }
        }
    }
}
</style>
