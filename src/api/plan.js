import request from '@/utils/request'

const BASE_URL = `${process.env.VUE_APP_USER_CENTER_API}`;
const COMMON_URL = `${process.env.VUE_APP_BASE_API}`;
const url = `${process.env.VUE_APP_VIDEO_API}`;

export function getLessons(data) {
    let params = {
        page: data.page,
        per_page: 9999,
        point_scene: 'pop',
        name: data.name,
        type: data.type
    };
    return request({
        url: `${COMMON_URL}/double6/courses`,
        method: 'get',
        params
    })
}

export function postPlan(data) {
    return request({
        url: `${COMMON_URL}/double6/study-plan-customizeds`,
        method: 'post',
        data
    })
}

export function getPlanList(data) {
    let params = {
        id: data.id,
        name: data.name,
        created_at: data.created_at,
        grade_id: data.grade,
        status: data.status
    }
    return request({
        url: `${COMMON_URL}/double6/study-plan-customizeds`,
        method: 'get',
        params
    })
}

// 计划-用户信息
export function getPlanUser(data, id) {
    let params = {
        id: data.id,
        plan_id: data.planId,
        name: data.name,
        created_at: data.created_at,
        grade_id: data.grade,
        page: data.page,
        per_page: 20
    }
    return request({
        url: `${COMMON_URL}double6/user-plans?`,
        method: 'get',
        params
    })
}

// 字列表
export function getwordInfo(data) {
    let params = {
        word_id: data.name,
        word_type: data.type,
        page: data.page,
        point_scene: 'pop',
        per_page: 10,
    }
    return request({
        url: `${COMMON_URL}/double6/word-calligraphies`,
        method: 'get',
        params
    })
}

export function emitPlan(data, scene) {
    let url = `${COMMON_URL}/double6/study-plan-customizeds/` + data.id;
    if (scene == 'status') {
        url += '?point_scene=updateStatus'
    }
    return request({
        url: url,
        method: 'put',
        data
    })
}


export function deletePlan(id) {
    return request({
        url: `${COMMON_URL}/double6/study-plan-customizeds/` + id,
        method: 'delete'
    })
}


// 上下线


// 提交计划详情
export function setDetails(data, id) {
    return request({
        url: `${COMMON_URL}/double6/plan-details/` + id,
        method: 'put',
        data
    })
}

// 删除计划详情
export function deleteDetails(id) {
    return request({
        url: `${COMMON_URL}/double6/plan-details/` + id,
        method: 'delete'
    })
}

// 提交计划详情
export function postDetails(data) {
    return request({
        url: `${COMMON_URL}/double6/plan-details`,
        method: 'post',
        data
    })
}


// 获取计划详情

export function getDetails(plan_id) {
    let params = {
        plan_id: plan_id,
        point_scene: 'process',
        simple_result: true,
        sort_elem: { "orderlist": 'asc' }
    }
    return request({
        url: `${COMMON_URL}/double6/plan-details`,
        method: 'get',
        params
    })
}

// 获取课节信息
export function getChildren(data) {
    let params = {
        page: data.page,
        per_page: 9999,
        sort_elem: '%7B%7D',
        point_scene: 'pop',
        course_id: data.course_id,
        sort_elem: { "orderlist": 'asc' }
    }
    return request({
        url: `${COMMON_URL}/double6/videos/list`,
        method: 'get',
        params
    })
}


// 腾讯云上传签名
export function TXgetSignature(data) {
    return request({
        url: `${COMMON_URL}/double6/tcvideos/other?point_scene=getSign`,
        method: 'post',
        data,
    });
}

// 腾讯云登记
export function TXaddUploadInfo(data) {
    return request({
        url: `${COMMON_URL}/double6/tcvideos`,
        method: 'post',
        data
    });
}
// 腾讯云上传临时密钥
export function getTcCOSSignature(data) {
    return request({
        url: url + `fileService/api/v1/file/sts`,
        method: 'post',
        data
    });
}
// 上传图片
export function uploadPic(data) {
    return request({
        url: 'https://api.liupinshuyuan.com/fileService/api/v1/file/sts',
        method: 'post',
        data
    })
}
