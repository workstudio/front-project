import storage from 'good-storage'

const _localKey = function(keyword) {
  return keyword + '_local_key'
} 

const bookReader = {
  getBook(code) { let datas = storage.get(_localKey('bookReader'), {}); if (datas.code) { return datas.code; } else { return {}; } },
  setBook(data, code) { let datas = storage.get(_localKey('bookReader'), {}); datas.code = data; return storage.set(_localKey('bookReader'), datas) },
}

export default {bookReader}
