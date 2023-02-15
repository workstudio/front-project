import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        console.log(config, 'aaaaaaaa')
        config.headers.Accept = 'application/json';
        if (localStorage.getItem('token_local_key')) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            if (config.url.indexOf('course/tcvideo/sign') > 0 || config.url.indexOf('course/tcvideo/doneUpload') > 0 || config.url.indexOf('index.php?app=widget&mod=Upload') > 0) {
                config.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOTE0MjUwIiwiaWF0IjoxNjY0MzUzNzA0LCJleHAiOjE2NjU2NDk3MDQsInBheWxvYWQiOiJ7XCJpZFwiOjUyLFwicGxhdElkc1wiOlwiWzRdXCIsXCJzZXhcIjoyLFwidWlkXCI6MTkxNDI1MCxcInVzZXJJZFwiOjE5MTQyNTAsXCJ1c2VyTmFtZVwiOlwiMTM4MTE5NzQxMDZcIn0ifQ.vFMtyTkN9fri4P2VsSNOFdlYD01DFhm-WAYAYyb_h_w'
            } else {
                config.headers['authorization'] = 'Bearer ' + localStorage.getItem('token_local_key').replaceAll('"', '')
            }

            config.headers['system'] = 'aiSource'
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000 && res.status != '0' && res.code != '200') {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
                    confirmButtonText: 'Re-Login',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('user/resetToken').then(() => {
                        location.reload()
                    })
                })
            }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
