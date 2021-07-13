import { mapGetters,mapActions } from 'vuex'

export const StoreHomeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'homeOffsetY',
      'hotSearchOffsetY',
      'flapCardVisible',
      'searchHistoryList'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHomeOffsetY',
      'setHotSearchOffsetY',
      'setFlapCardVisible',
      'setSearchHistoryList'
    ]),

    showBookDetail(book) {
      this.$router.push({
        name: "detail",
        query: {
          //code: book.code,
          fileName: book.code,
          //fileName: book.fileName,
          category: book.categoryText
        }
      });
    },
  }
}
