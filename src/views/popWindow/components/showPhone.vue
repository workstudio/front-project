<template>
    <div class="phone-con pos-re">
        <img src="@/assets/image/myphone0.jpg" class="w-100">
        <div v-if="types == 'pop'">
            <img src="@/assets/image/myphone.jpg" class="pos-a t-0 l-0 w-100 ss-s">
            <div class="ss-s shadow-s pos-a" v-if="showShadow">
            </div>
            <div :class="['pos-a p-center bkg-w o-f-h', fullWindow ? 'all-win' : 'pop-s']" v-if="showShadow">
                <img v-if="popPic" :src="popPic" class="pos-a w-100 h-100">
            </div>
            <img v-if="showShadow && !fullWindow" src="https://llai-1254153797.cos.ap-shanghai.myqcloud.com/clock_activity/close-gz.png" class="close-s pos-a x-center">
        </div>
        <div v-else class="w-100 h-100 pos-a t-0">
            <img src="@/assets/image/headers.jpg" class="pos-a t-0 l-0 w-100 ss-s">
            <div class="o-f-h fs pos-re">
                <img :src="h5Pic" class="pos-a h5-s w-100 l-0">
            </div>
            <div class="m-btn t-a-c color-w pos-a x-center hand-c">{{ btnText || '按钮名称' }}</div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        types: String,
        popPic: String,
        showShadow: Boolean,
        fullWindow: Boolean,
        h5Pic: String,
        btnText: String
    },
    data(){
        return{
            // popPic:'https://llai-1254153797.cos.ap-shanghai.myqcloud.com/clock_activity/hdbg1.jpg',
            // h5Pic:'http://llxz_recom.liupinshuyuan.com/image/invit1.png'
        }
    },
    created(){
        console.log('获取的类型是', this.types)
    }
}
</script>
<style scoped>
.fs{
    height: 687px;
    width: 312px;
    margin: 22px auto;
    border-radius: 32px;
}
.phone-con{
    width: 370px;
    top: -10px;
    height: 736px;
}
.ss-s{
    width: 84.5%;
    left: 29px;
    top: 32px;
    border-radius: 32px;
}
.shadow-s{
    height: 678px;
    background: #000;
    opacity: 0.6;
    /* background-color: rgba(255,0,0,alpha); */
}
.pop-s{
    width: 240px;
    height: 320px;
}
.close-s{
    width: 25px;
    height: 25px;
    bottom: 150px;
}
.m-btn{
    width: 210px;
    line-height: 50px;
    height: 50px;
    background: #1890ff;
    border-radius: 25px;
    bottom: 50px;
    font-size: 16px;
}
.h5-s{
    /* width: 84.5%;
    left: 29px; */
    top: 80px;
}
.all-win{
    width: 312px;
    height: 678px;
    border-radius: 32px;
}
</style>