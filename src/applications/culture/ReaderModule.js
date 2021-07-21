//import localCache from "@/fetch/LocalCache"

// App通用配置
const rModule = {
  namespaced: true,
  state: {
    bar: false,
    font_panel: false,
    font_icon: false,
    bg_color: 1,
    bg_night: false,
    fz_size: 18,
    curChapter: 1,
    windowHeight: '',
    list_panel: false,
    curBookDetailId: 1,
    curBookContentId: 1,
  },
  
  actions: {
    toggleBar({commit}) { commit('toggleBar') }, //切换上下面板显示隐藏
    showListPanel({commit}) { commit('showListPanel') }, //显示目录面板
    showFontPanel({commit}) { commit('showFontPanel') }, //显示字体面板
    fzSizeAdd({commit}) { commit('fzSizeAdd') }, //增加一号字体
    fzSizeSub({commit}) { commit('fzSizeSub') }, //减小一号字体
    fzSize({commit}, num) { commit('fzSizeSub', num) }, //设置字体
    fzSize({commit}, num) { commit('fzSize', num) }, //设置字体
    bgColor({commit}, serial) { commit('bgColor', serial) }, //设置字体
    switchNight({commit}) { commit('switchNight') }, //切换夜间模式
    prevChapter({commit}) { commit('prevChapter') }, //上一章
    nextChapter({commit, maxChapter}) { commit('nextChapter', maxChapter) }, //下一章
    chooseBook({commit}, id) { commit('chooseBook', id) }, //触发书籍详情
    showBookDetail({commit}, obj) { commit('showBookDetail', obj) }, //跳转书籍详情
    curChapter({commit}, num) { commit('curChapter', num) } // 当前章节
  },
  
  mutations: {
    toggleBar(state) { state.bar = !state.bar },
    showListPanel(state) { state.list_panel = !state.list_panel },
    showFontPanel(state) { state.font_panel = !state.font_panel },
    fzSizeAdd(state) { state.fz_size++; if (state.fz_size >= 24) { state.fz_size = 24 } },
    fzSizeSub(state) { state.fz_size--; if (state.fz_size <= 14) { state.fz_size = 14 } },
    fzSize(state, num) { state.fz_size = num; },
    bgColor(state, serial) { state.bg_color = serial; },
    switchNight(state) { state.bg_night = !state.bg_night },
    prevChapter(state) { if (state.curChapter <= 1) { return false } state.curChapter-- },
    nextChapter(state, maxChapter) { if (state.curChapter >= maxChapter) { return false } state.curChapter++ },
    chooseBook(state, id) { state.curBookDetailId = id },
    showBookDetail(state, obj) { state.bookDetail = obj },
    curChapter(state, num) { state.curChapter = num }
  },
}

export default rModule
