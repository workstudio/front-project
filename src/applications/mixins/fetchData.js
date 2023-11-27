import {mapState} from 'vuex';
import localCache from '@/applications/common/LocalCache'
import axios from 'axios';

export const fetchData = {
  name: "fetchData",
  data() {
    return {
      //appCode: this.$route.meta.app,
      //modelCode: this.$route.meta.resource,
      uploadHeaders: {
        Authorization: "Bearer " + localCache.getToken(),
        'Content-Type': 'multipart/form-data'
      },
    }
  },
  computed: {
    ...mapState({
      models: state => state.baseData.cDatabases,
    }),
    cModel() {
      return this.getModel(this.appCode, this.modelCode);
	},
	currentResource() {
	  //console.log(this.appCode, this.modelCode, this.ignoreOperations, 'oooooooo', typeof(this.ignoreOperations));
      let currentAction = this.$route.meta.action;
	  let currentPermissions = localCache.getCache('currentPermissions');
	  if (!currentPermissions[this.appCode]) {
	      return {};
      }
	  if (!currentPermissions[this.appCode][this.modelCode]) {
	      return {};
      }
      let currentResources = currentPermissions[this.appCode][this.modelCode];
      let formatedResources = {};
      
      for (let pKey in currentResources) {
        let subResources = currentResources[pKey];
        let subFormatedResources = {}
        for (let mKey in subResources) {
          let dResource = subResources[mKey];
          let isIgnore = false;
          for (let iKey in this.ignoreOperations) {
            let iElem = this.ignoreOperations[iKey];
            if (iElem == mKey) {
              isIgnore = true;
            }
          }
          if (!isIgnore) {
          //if (!dResource.point_action || dResource.point_action == currentAction) {
            subFormatedResources[mKey] = dResource;
          }
        }
        formatedResources[pKey] = subFormatedResources;
      }
      return formatedResources;
      //return currentResources;
    }
  },
  methods: {
  	getModel(appCode, mCode) {
  	  if (!appCode || !mCode) {
  	    return false;
      }
  	  mCode = this.camelCode(mCode);
      return this.models[appCode][mCode];
	},
  	createRequest(cModel, params) {
	  return this._sendRequest('create', cModel, params);
	},
	fetchRequest(cModel, params) {
	  return this._sendRequest('fetch', cModel, params);
    },
	getRequest(cModel, params) {
	  return this._sendRequest('get', cModel, params);
    },
  	_sendRequest(type, cModel, params) {
  	  //let envType = params.env_type ? params.env_type : '';
  	  //let query = params.query ? params.query : {};
  	  //let tokenKey = envType == 'merchant' ? 'tokenMerchant' : (envType == 'backend' ? 'tokenBackend' : 'token');
  	  //query['access-token'] = localCache.getCache(tokenKey, '');
  	  //params.query = query;
  	  switch (type) {
        case 'fetch':
          return cModel.$fetch(params);
          break;
        case 'create':
          return cModel.$create(params);
        case 'get':
          return cModel.$get(params);
          break;
        }
	},
	resultFormat(action, rDatas) {
	  return rDatas;
	},
	fetchResult(action, val, oldVal, defaultVal = {}, cModel = false) {
	  if (val === false || !val.code) {
	  	return defaultVal;
	  }
	  cModel = !cModel ? this.cModel : cModel;
      let rDatas = this.watchCommon(val, cModel, action);
	  if (action == 'list' || action == 'mylist') {
        rDatas = this.baseMethod.objectToArray(rDatas);
	  }
      return this.resultFormat(action, rDatas);
	},
	camelCode(str) {
      let result = '';
      let arr = str.split('-');
      //result += arr[0].toString();
      for(let i = 0; i < arr.length; i++) {
          let str1 = arr[i].toString();
          let str2 = str1.charAt(0).toUpperCase();
          let str3 = str2 + str1.slice(1);
          result += str3;
      }
      return result;
	},
    checkDataFinish(pages) {
      this.currentPage = pages.page;
      if (this.currentPage < Math.ceil(pages.totalCount / pages.pageSize)) {
        return false;
      }
      return true;
    },
    updateAttachmentInfo(infoId, elems, formElems) {
      let model = this.getModel('passport', 'attachmentInfo');
      let data = [];
      for (let field in elems) {
        let fElem = formElems[field];
        data = {
          app: fElem.app,
          info_table: fElem.resource,
          info_field: field,
          info_id: infoId,
          attachment_id: elems[field],
        }
        model.$create({params: {}, data: data}).then(response => {
          if (response === false) {
            return ;
          }
          //this.list.unshift(this.inputInfos)
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '附加更新成功',
            type: 'success',
            duration: 2000
          });
        })
      }
    },
    beforeUpload(file) {
      this.uploadFileData = file;
    },
    importFormSubmit(parentObj, pointUrl, params, data) {
      this.$refs["upload-import_file"][0].toUpload(params);
      let formData = new FormData();
      for (let pKey in data) {
        formData.append(pKey, data[pKey]);
      }
      let fileType = this.uploadFileData.type;
      let extension = this.baseMethod.getExtName(this.uploadFileData.name);
      formData.append('import_file', this.uploadFileData);
      axios.post(pointUrl, formData, {headers: this.uploadHeaders}).then(function (res) {
        if (res.data.code == 200) {
          parentObj.$notify({
            title: '操作成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          });
          parentObj.popFormVisible = false;
          return parentObj.$emit('handleFilter');
          return parentObj.handleFilter();
        } else {
          parentObj.$notify({title: '失败', message: res.data.message, type: 'error', duration: 2000});
        }
      })
      .catch(function (err) {
        console.error(err);
      });
    },

    /*remoteDatas(model, dataKey = 'listinfo', subKey = '') {
      let datas = model.getters('datas');
      //datas = JSON.parse(JSON.stringify(datas));
      let pDatas = datas[dataKey] ? datas[dataKey] : {};

      if (!subKey) { // infos info formFields relateAttributes baseFields listSearchAttributes pages
        return pDatas;
      }
      return pDatas[subKey] ? pDatas[subKey] : {};
    },*/

    /*remoteRequest(model, dataKey = 'listinfo') {
      let datas = model.getters('errors');
      return datas[dataKey] ? datas[dataKey] : false;
    },*/

    /*watchCommon(val, model, action) {
      //if (!val.code) {
        //return false;
      //}
      if (val.code != 200) {
        this.message(val.message);
      }
      this.loading = false;
      let rDatas = this.remoteDatas(model, action);
      if (this.baseMethod.emptyObject(rDatas)) {
        return {};
      }
      return rDatas;
    },*/
  },
};
