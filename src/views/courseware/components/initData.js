const initData = {
    courseList: {
        columns: [
            {
                label: '课件id',
                prop: 'id',
                width: '50'
            },
            {
                label: '课件名称',
                prop: 'name',
                width: '200'
            },
            {
                label: '适用年级',
                width: '50',
                prop: 'grade_name'
            },
            {
                label: '书写材料',
                width: '50',
                prop: 'material'
            },

            {
                label: '书体',
                width: '50',
                prop: 'calligraphy'
            },
            {
                label: '字体',
                width: '50',
                prop: 'typeface'
            },

            {
                label: '课件类型',
                width: '50',
                prop: 'type'
            },

            {
                label: '创建者',
                width: '50',
                prop: 'operator_name'
            },
            {
                label: '创建时间',
                width: '120',
                prop: 'created_at'
            },
            {
                label: '操作',
                width: '150',
                fix: 'right'
            }
        ]
    },
    templateLists: {
        columns: [
            {
                label: 'id',
                prop: 'id',
                width: '50'
            },
            {
                label: '模版名称',
                prop: 'name',
                width: '200'
            },
            {
                label: '流程',
                prop: 'type_name',
                width: '200'
            },
            {
                label: '操作',
                fix: 'right',
                width: '200'
            }
        ]
    },
    templateDataLists: {
        columns: [
            {
                label: 'id',
                prop: 'id',
                width: '50'
            },
            {
                label: '资源名称',
                prop: 'name',
                width: '200'
            },
            {
                label: '资源地址',
                prop: 'original_url',
                width: '200'
            },
            {
                label: '操作',
                fix: 'right',
                width: '100'
            }
        ]
    }
};

export { initData };
