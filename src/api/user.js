import request from '@/utils/request'

const BASE_URL = `${process.env.VUE_APP_USER_CENTER_API}`;
const COMMON_URL = `${process.env.VUE_APP_BASE_API}`;

export function sendSms(sendData) {
  let data = {
    'phone': sendData.mobile,
    'smsType': 1,
    'platId': 5,
  };
  return request({
    url: `${BASE_URL}/sms/send`,
    method: 'post',
    data
  })
}

export function loginCenter(sendData) {
  let data = {
    'phone': sendData.mobile,
    'smsType': 1,
    'verifyCode': sendData.code,
    'platId': 5,
  };
  return request({
    url: `${BASE_URL}/login/smsLogin`,
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function getTestDatas() {
  return request({
    url: `http://192.168.203.7:8286/api/double6/test?method=qrcode`,
    method: 'get'
  })
}

export function getPushTestData(data) {
  return request({
    url: `http://192.168.203.7:8286/api/double6/test?method=qrcodeUpdate`,
    method: 'get',
    params: {params: data}
  })
}
