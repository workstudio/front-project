<template>
    <div>
        <el-table
            ref="multipleTable"
            v-loading="loading"
            border
            :data="dataList"
            highlight-current-row
            :row-class-name="handleRowClass"
            @selection-change="handleSelectionChange"
            @current-change="handleCurrentChange"
            @sort-change="handleSortChange"
        >
            <el-table-column v-if="selection" type="selection" width="55" />
            <el-table-column v-if="showIndex" width="55" label="序号" type="index" align="center"/>
            <template v-for="item in columns">
                <el-table-column
                    v-if="!item.hide"
                    :key="item.id"
                    :label="item.label"
                    :prop="item.prop"
                    :align="align"
                    :class-name="item.className"
                    :label-class-name="item.labelClassName"
                    :min-width="item.width"
                    :fixed="item.fix || null"
                    :sortable="item.sortable"
                >
                    <template v-slot="scope">
                        <slot
                            name="cell"
                            :row="scope.row"
                            :column="scope.column"
                            :index="scope.$index"
                        />
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <el-pagination
            v-if="needPagination"
            :current-page="pageNo"
            :page-size="pageSize"
            :layout="layout"
            :total="total"
            style="margin-top: 15px"
            @size-change="handleSizeChange"
            @current-change="handlePageNoChange"
        />
    </div>
</template>

<script>
export default {
    name: 'PageTable',
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        dataList: {
            type: Array,
            default() {
                return [];
            }
        },
        needPagination: {
            type: Boolean,
            default: true
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array,
            required: true
        },
        pageNo: {
            type: Number,
            default: 1
        },
        pageSize: {
            type: Number,
            default: 20
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50];
            }
        },
        total: {
            type: Number,
            required: true
        },
        selection: {
            type: Boolean,
            required: false
        },
        layout: {
            type: String,
            default: 'total, prev, pager, next, jumper'
        },
        align: {
            type: String,
            default() {
                return 'center';
            }
        }
    },
    data() {
        return {
            name: 'pageTable'
        };
    },
    methods: {
        handleRowClass(val) {
            const pathClass = ['/sales/salesBenefit/client', '/sales/salesManager/allclient'];
            const hasPathRoute = pathClass.includes(this.$route.path);
            // 暂时去掉
            // if (this.$route.path === '/sales/salesManager/boardOcean' && !val.row.num) {
            //     return 'success-blue'; // 公海内跟进次数为0标为蓝色
            // }
            if (!hasPathRoute) {
                return;
            }
            if (val.row.is_first === 1) {
                return 'success-row'; // 标为绿色
            } else {
                return '';
            }
        },
        handleSizeChange(val) {
            this.$emit('pageSizeChange', val);
        },
        handlePageNoChange(val) {
            this.$emit('pageNoChange', val);
        },
        handleSelectionChange(val) {
            this.$emit('selectionChange', val);
        },
        handleCurrentChange(val) {
            this.$emit('currentChange', val);
        },
        handleSortChange(val) {
            this.$emit('sortChange', val);
        },
        toggleSelection() {
            // 清空所有选项，默尔设置ref 为 multipleTable
            this.$refs.multipleTable.clearSelection();
        }
    }
};
</script>
<style lang="css">
.success-row {
    background: #f0f9eb !important;
}

.success-blue {
    background: #eaf8ff !important;
}
</style>
