// 引入qrcode-decoder
// import QrCode from 'qrcode-decoder'
import QrCode from '../../node_modules/qrcode-decoder/dist/index';

// 传入file对象，返回promise
export function getQrUrl(file) {
    // 获取临时路径 chrome有效，其他浏览器的方法请自行查找
    const url = window.webkitURL.createObjectURL(file)
        // 初始化
    const qr = new QrCode()
        // 解析二维码，返回promise
    return qr.decodeFromImage(url)
}

export const imageToBase64 = (img) => {
    // Vue.prototype.$imageToBase64 = img => { //定义全局
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    var dataURL = canvas.toDataURL("image/jpeg" + ext);
    return dataURL;
};
export const base64ToFile = (urlData, fileName) => {
    let arr = urlData.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bytes = atob(arr[1]); // 解码base64
    let n = bytes.length
    let ia = new Uint8Array(n);
    while (n--) {
        ia[n] = bytes.charCodeAt(n);
    }
    return new File([ia], fileName, { type: mime });
}

export const selfReadFiles = () => {
    const path = require('path')
    const files = require.context('@/components/ElemButton/', false, /.vue$/);
    const modules = {}
    let content = '';
    console.log('ffffffffffff', files);
    files.keys().forEach(key => {
        //console.log('kkkkkkk', key);
        const name = path.basename(key, '.vue') //返回文件名 不含后缀名
        content = files(key).default || files(key)
            //console.log(content);
    })
}