import TemplateDetail from '@/applications/double6/TemplateDetail';
import request from '@/utils/request'
const BASE_URL = `${process.env.VUE_APP_USER_CENTER_API}`;
const COMMON_URL = `${process.env.VUE_APP_BASE_API}`;
const url = `${process.env.VUE_APP_VIDEO_API}`;

// 课程分类添加
export function addClassify(i) {
    let data = {
        name: i.name,
        pid: i.id || 0,
        role_id: i.role_id
    };
    return request({
        url: `${COMMON_URL}/double6/course-categories/store`,
        method: 'post',
        data
    })
}

export function deleteClassify(id) {
    return request({
        url: `${COMMON_URL}/double6/course-categories/del?id=${id}`,
        method: 'delete'
    })
}

// 编辑
export function editClassify(i) {
    let data = {
        name: i.name,
        id: i.id || 0,
        role_id: i.role_id
    };
    return request({
        url: `${COMMON_URL}/double6/course-categories/edit`,
        method: 'post',
        data
    })
}

export function getClassify(page) {
    return request({
        url: `${COMMON_URL}/double6/course-categories/list?page=${page}`,
        method: 'get',
    })
}


// 渠道列表
export function getChannels() {
    return request({
        url: `${COMMON_URL}/double6/channels?point_scene=pop`,
        method: 'get'
    })
}

// 课程相关
// 参数
// name	required	string 标题
// vice_name	optional	optional string 副标题
// grade_id	required	array 年级 [3-2,2-1]
// material	required	string 书写材料
// calligraphy	required	string 书体
// typeface	required	string 字体
// type	required	string 类型
// price	optional	optional float 原价
// present_price	optional	optional float 现价
// student_count	optional	optional string 学生数
// student_course	required	array 适用对象 [0,1]
// course_label	required	array 标签 ['student'=>[1,2],'teacher':[22,3]]
// cover_pic	required	string 图片
// content	required	string 内容
// relation_course	optional	optional array 关联课程 [1231,456]
// relation_channel	required	array 关联渠道 [456,456]
// relation_school	optional	optional array 关联学校 [123,123]
// is_all_school	required	int 全选
// is_login_free	optional	optional int 是否登录免费
// is_join_study	optional	optional int 是否入班可学
// teacher_category_id	optional	optional int 老师端分类id
// student_category_id	optional	optional int 学生端分类id
export function addCourse(data) {
    return request({
        url: `${COMMON_URL}/double6/courses`,
        method: 'post',
        data
    })
}


export function editCourse(data) {
    return request({
        url: `${COMMON_URL}/double6/courses/${data.id}`,
        method: 'put',
        data
    })
}

export function updateCourse(data) {
    return request({
        url: `${COMMON_URL}/double6/courses/${data.id}?point_scene=updateStatus`,
        method: 'put',
        data
    })
}

export function deleteourse(id) {
    return request({
        url: `${COMMON_URL}/double6/courses/${id}`,
        method: 'delete'
    })
}


export function getCourseList(params) {
    return request({
        url: `${COMMON_URL}/double6/courses`,
        method: 'get',
        params
    })
}
export function innerCourseList(params) {
    return request({
        url: `${COMMON_URL}/double6/courses?point_scene=pop`,
        method: 'get',
        params
    })
}

// 学校列表
export function getSchools() {
    return request({
        url: `${COMMON_URL}/double6/schools?point_scene=pop`,
        method: 'get'
    })
}

// 课节相关
// 课节列表
export function getLessons(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/list?course_id=${id}`,
        method: 'get'
    })
}
export function deleteLesson(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/del?id=${id}`,
        method: 'delete'
    })
}
export function addLesson(data) {
    return request({
        url: `${COMMON_URL}/double6/videos/store`,
        method: 'post',
        data
    })
}
export function editLesson(data) {
    return request({
        url: `${COMMON_URL}/double6/videos/edit`,
        method: 'post',
        data
    })
}
export function sortLesson(data) {
    return request({
        url: `${COMMON_URL}/double6/videos/update-sort`,
        method: 'post',
        data
    })
}
export function updateLesson(data) {
    return request({
        url: `${COMMON_URL}/double6/videos/update-status`,
        method: 'post',
        data
    })
}
export function lessonInnerList(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/course-ware?id=${id}`,
        method: 'get'
    })
}

export function exchange(params) {
    return request({
        url: `${COMMON_URL}/double6/videos/replace/back-url`,
        method: 'post',
        params
    })
}

export function createVideo(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/back-url?classroom_number=${id}`,
        method: 'get'
    })

}

export function studyVideo(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/study-url?classroom_number=${id}`,
        method: 'get'
    })
}

export function videoList(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/back-url/list?classroom_number=${id}`,
        method: 'get'
    })

}

export function videoCurrent(id) {
    return request({
        url: `${COMMON_URL}/double6/videos/update-current?id=${id}`,
        method: 'get'
    })
}

export function videoRelation(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/relation`,
        method: 'post',
        data
    })
}



// 模板 /double6/templates/personal/list
export function templateList(params) {
    return request({
        url: `${COMMON_URL}/double6/templates/personal/list`,
        method: 'get',
        params
    })
}

export function newTemplate(type) {
    return request({
        url: `${COMMON_URL}/double6/templates/list?type=${type}`,
        method: 'get'
    })
}

export function addTemplate(data) {
    return request({
        url: `${COMMON_URL}/double6/templates/store`,
        method: 'post',
        data
    })
}

export function updateTemplate(data) {
    return request({
        url: `${COMMON_URL}/double6/templates/status/update`,
        method: 'post',
        data
    })
}

export function template(id) {
    return request({
        url: `${COMMON_URL}/double6/templates/show?id=${id}`,
        method: 'get'
    })
}


// 流程
export function processEdit(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/process-update`,
        method: 'post',
        data
    })
}
export function processAdd(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/add-process`,
        method: 'post',
        data
    })
}

// 资源
export function resource(params) {
    return request({
        url: `${COMMON_URL}/double6/word-systems/detail`,
        method: 'get',
        params
    })
}

export function tcvideos(params) {
    return request({
        url: `${COMMON_URL}/double6/tcvideos/list`,
        method: 'get',
        params
    })
}




// 课件接口
export function coursewareList(params) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/list`,
        method: 'get',
        params
    })
}


export function coursewareAdd(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/store`,
        method: 'post',
        data
    })
}
export function coursewareEdit(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/edit`,
        method: 'post',
        data
    })
}
export function coursewareCopy(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/copy`,
        method: 'post',
        data
    })
}
export function coursewareDelete(id) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/del?id=${id}`,
        method: 'delete'
    })
}
export function coursewareDetail(id) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/detail?id=${id}`,
        method: 'get'
    })
}

// 书写要点

export function getWordpointList(params) {

    return request({
        url: `${COMMON_URL}/double6/course-wares/point-list`,
        method: 'get',
        params
    })
}

export function getWordpoint(params) {
    return request({
        url: `${COMMON_URL}/double6/word-points/list`,
        method: 'get',
        params
    })
}
export function addPoint(data) {
    return request({
        url: `${COMMON_URL}/double6/word-points/store`,
        method: 'post',
        data
    })
}
export function movePoint(data) {
    return request({
        url: `${COMMON_URL}/double6/word-points/move`,
        method: 'post',
        data
    })
}



export function deletePoint(id) {
    return request({
        url: `${COMMON_URL}/double6/course-ware-points/del?id=${id}`,
        method: 'delete'
    })
}
export function relationPoint(data) {
    return request({
        url: `${COMMON_URL}/double6/course-wares/relation-point`,
        method: 'post',
        data
    })
}