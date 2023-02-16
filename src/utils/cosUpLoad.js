import COS from 'cos-js-sdk-v5';
import {
    uploadPic
} from "@/api/plan";
import 'element-ui'
// import store from "@/store/index"
import store from '../store/index';

const cosOptions = {
    product: 'edu',
    features: 'asset',
    terminal: 'pc',
    bucketName: 'xsjy-1254153797'
}
export function toUploadpic(params) {
    let file = params.file;
    uploadPic(cosOptions).then((res) => {
        let credentials = res.data;
        let cos = new COS({
            getAuthorization: (options, callback) => {
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    XCosSecurityToken: credentials.token,
                    StartTime: credentials.startTime,
                    ExpiredTime: credentials.expiredTime,
                    ScopeLimit: true
                });
            }
        });
        // 上传多张图片后，会调用多次
        cos.putObject({
                Bucket: cosOptions.bucketName,
                Region: 'ap-shanghai',
                Key: `${credentials.pathKey}/${file.name}`,
                StorageClass: 'STANDARD',
                Body: file
            },
            (err, data) => {
                if (data.statusCode !== 200) {
                    store.commit('upLoadFail', false)
                    return;
                }
                // store.commit('upLoadFail', true)
                store.commit('uploadmyPicUrl', {
                    name: file.name,
                    url: `https://${data.Location}`
                })
                console.log('store', store)
                console.log('上传图片后的链接', data.Location)
                window.localStorage.setItem('myPicUrl', `https://${data.Location}`)
            }
        );
    })
}