import { mapGetters,mapActions } from 'vuex'
import { getShelfApi,updataShelfApi } from "../api/shelf"
import { saveBookShelf, getUserInfo } from '../utils/localStorage'
export default {
    computed: {
        ...mapGetters([
            'isEditMode',
            'shelfList',
            'shelfSelected',
            'shelfTitleVisible',
            'offsetY',
            'shelfCategory',
            'currentType',
            'historyList'
        ]),
    },
    methods: {
        ...mapActions([
            'setIsEditMode',
            'setShelfList',
            'setShelfSelected',
            'addShelfSelected',
            'setShelfTitleVisible',
            'setOffsetY',
            'setShelfCategory',
            'setCurrentType',
            'setHistoryList',
            'setAddToShelf',
            'setRemoveFromShelf',
            'setSelectedRemoveFromShelf',
            'setSelectRemoveFromGroup',
            'setDeleteGroup',
            'setSelectedMoveToGroup',
            'setSelectedMoveToNewGroup',
            'setChangeGroupName'
        ]),
        // getShelfIdList,updataShelf,getShelfList,getCategoryList
        //只保留 shelfList 部分属性，用于上传服务器
        getShelfIdList(arr) {
            let updataArr = [];
            arr.forEach((item, index) => {
                if (item.type == 1) {
                    updataArr.push({
                        id: item.id,
                        shelf_id: item.shelf_id,
                        private: item.private,
                        haveRead: item.haveRead,
                        type: item.type
                    });
                } else if (item.type == 2) {
                    updataArr.push({
                        shelf_id: item.shelf_id,
                        type: item.type,
                        title: item.title
                    });
                    updataArr[index].itemList = [];
                    item.itemList.forEach(itemc => {
                        updataArr[index].itemList.push({
                            id: itemc.id,
                            shelf_id: itemc.shelf_id,
                            private: itemc.private,
                            haveRead: itemc.haveRead,
                            type: itemc.type
                        });
                    });
                } else {
                    return;
                }
            });
            return updataArr;
        },

        //更新数据库书架信息
        updataShelf() {
            const user = getUserInfo();
            if (user && user !== {}) {
                const params = {
                    userId: user.id,
                    shelfList: JSON.stringify(this.getShelfIdList(this.shelfList))
                }
                updataShelfApi(params)
                saveBookShelf(this.shelfList)
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        //获取书架列表
        getShelfList(cb) {
            const user = getUserInfo();
            if (user && user !== {}) {
                getShelfApi({
                    userId: user.id
                }).then(res => {
                    if (res.status === 200 && res.data && res.data.shelfList) {
                        console.log("shelfList", res.data.shelfList);
                        saveBookShelf(res.data.shelfList)
                        this.setShelfList(res.data.shelfList)
                        if (cb) {
                            cb()
                        }
                        return res.data.shelfList
                    }
                })
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        //获取当前分组里的内容
        getCategoryList(title) {
            this.getShelfList(() => {
                const categoryList = this.shelfList.find(book => book.type === 2 && book.title === title)
                this.setShelfCategory(categoryList)
                return categoryList
            })
        }
    }
}