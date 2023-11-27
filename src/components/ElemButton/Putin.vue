<template>
  <span>
    <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handlePutin">
      {{elem.name}}
    </el-button>
    <el-dialog
      :title="'其他入库 - 一个料箱可以放置 ' + materialCount + ' 种物料'"
      :visible.sync="dialogVisible"
      width="90%"
    >
      <el-form 
        ref="form" 
        :model="form" 
        label-width="80px" 
        class="putinForm"
        label-position="left"
      >
        <el-form-item label="料箱代码" style="margin-bottom: 6px;" >
          <!--<el-select
            v-model="form.locker_code"
            filterable
            remote
            reserve-keyword
            placeholder="料箱代码"
            clearable 
            :remote-method="remoteMethod"
            @change="handleChange"
            :loading="loading">
            <el-option
              v-for="(item, key) in options"
              :key="item[keyField]"
              :label="item[nameField]"
              :value="item[keyField]">
            </el-option>
          </el-select>-->
          <el-input ref="lockerCodeRef" v-model="form.locker_code" @change="handleChange"></el-input>
        </el-form-item>
        <el-form-item label="工作站" style="margin-bottom: 6px;" >
          <el-select
            v-model="form.workstation_code"
            filterable
            remote
            reserve-keyword
            placeholder="工作站代码"
            clearable 
            :remote-method="remoteMethod"
            >
            <el-option
              v-for="(item, key) in workstationDatas"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库类型">
          <el-select ref="receiptTypeRef" v-model="form.receipt_type" placeholder="请选择入库类型">
            <el-option label="容器入库" value="enter"></el-option>
            <el-option label="料箱返库" value="return"></el-option>
          </el-select>
        </el-form-item>

        <span v-for="(item,index) in materialDatas" >
        <hr />
        <el-form-item :label="index + 1 + ' - 物料代码'"  label-width="100px">
          <el-input @input="changeMaterial(index, materialDatas[index].disable_value)" v-model="materialDatas[index].material_code" :disabled="materialDatas[index].disable_value"></el-input>
        </el-form-item>
        <el-form-item label="物料数量">
          <el-input v-model="materialDatas[index].material_number" style="width: 70px;"></el-input>
        </el-form-item>
        <el-form-item label="本料箱库存">
          <el-input v-model="materialDatas[index].material_number_old" style="width: 70px;" :disabled="defaultDisabled"></el-input>
        </el-form-item>
        <el-form-item label="物料名称">
          <el-input v-model="materialDatas[index].material_name" :disabled="defaultDisabled"></el-input>
        </el-form-item>
        <el-form-item label="物料条码">
          <el-input v-model="materialDatas[index].material_bracode" :disabled="defaultDisabled"></el-input>
        </el-form-item>
        </span>
        <hr />
        <el-form-item>
          <el-button type="primary" :disabled="buttonDisabled" @click="onSubmit">确认提交</el-button>
          <el-button @click="cancelForm">取消</el-button>
        </el-form-item>
      </el-form>

    </el-dialog>
  </span>
</template>

<script>
import {button} from '@/applications/mixins/button';
import {fetchData} from '@/applications/mixins/fetchData'

export default {
  mixins: [button, fetchData],
  data() {
    return {
      materialCount: 0,
      loading: false,
      buttonDisabled: false,
      defaultDisabled: true,
      options: this.elem.infos,
      workstationDatas: [],
      keyField: 'code',
      nameField: 'name',
      dialogVisible: false,
      actionType: 'putin',
      materialDatas: [],
      form: {
        locker_code: '',
        receipt_type: '',
      }
    }
  },
  mounted() {
    this.getSettingInfo();
    this.getWorkstations();
  },
  methods: {
    onSubmit() {
      if (!this.form.locker_code) {
        this.$refs.lockerCodeRef.focus();
        this.$notify({title: '料箱代码不能为空', message: '料箱代码不能为空', type: 'error', duration: 1000});
        return ;
      }
      if (!this.form.receipt_type) {
        this.$refs.receiptTypeRef.focus();
        this.$notify({title: '入库类型不能为空', message: '入库类型不能为空', type: 'error', duration: 1000});
        return ;
      }
      if (!this.form.workstation_code) {
        this.$refs.workstationCode.focus();
        this.$notify({title: '工作站不能为空', message: '工作站不能为空', type: 'error', duration: 1000});
        return ;
      }
      if (!this.materialDatas.length) {
        this.$notify({title: '请填写入库物料', message: '请填写入库物料', type: 'error', duration: 1000});
        return ;
      }

      let materialDatas = [];
      let sum = 0;
      this.materialDatas.forEach((sItem, sIndex) => {
        if (sItem.material_number) {
          materialDatas.push({material_code: sItem.material_code, material_number: sItem.material_number});
          sum += sItem.material_number;
        }
      });
      if (!sum) {
        this.$notify({title: '请填写物料入库数量', message: '请填写物料入库数量', type: 'error', duration: 1000});
        return ;
      }

      this.buttonDisabled = true;
      let formData = {locker_code: this.form.locker_code, workstation_code: this.form.workstation_code, receipt_type: this.form.receipt_type, inventory_data: materialDatas};
      let model = this.getModel('wmsystem', 'lockerMaterial');
      let params = {action: 'putin'};
      model.$create({params: params, data: formData}).then(response => {
        if (response === false) {
          this.buttonDisabled = false;
          return ;
        }
        this.$notify({
          title: '入库成功',
          message: '入库成功',
          type: 'success',
          duration: 2000
        });
        this.dialogVisible = false;
      })
    },
    cancelForm() {
      this.form.locker_code = '';
      this.form.receipt_type = '';
      this.materialDatas = [];
    },
    handlePutin() {
      this.dialogVisible = true;
      this.buttonDisabled = false;
      //this.dealTopAction({});
    },
    getWorkstations() {
      let model = this.getModel('wmsystem', 'workstation');
      model.$fetch({query: {action: 'list', 'point_scene': 'keyvalueName'}}).then(response => {
        this.workstationDatas = response.data;
      })
    },
    getSettingInfo() {
      let model = this.getModel('wmsystem', 'materialInventory');
      model.$fetch({params: {action: 'setting-info'}}).then(response => {
        if (response === false) {
          return ;
        }
        this.materialCount = response.data.materialNumber;
      })
    },
    changeMaterial(index, disableValue) {
      if (disableValue) {
        return ;
      }
      let model = this.getModel('wmsystem', 'material');
      let materialCode = this.materialDatas[index].material_code;
      model.$fetch({query: {code: materialCode, action: 'list'}}).then(response => {
          let rDatas = response.data;
          if (rDatas.length == 1) {
            this.materialDatas[index].material_name = rDatas[0].name.value;
            this.materialDatas[index].material_barcode = rDatas[0].barcode.value;
          }
      })
    },
    handleChange() {
      this.materialDatas = [];
      let lockerCode = this.form.locker_code;
      if (!lockerCode) {
        return ;
      }
      let model = this.getModel('wmsystem', 'lockerMaterial');
      model.$fetch({query: {locker_code: lockerCode}, action: 'list'}).then(response => {
        let rDatas = response.data;
        rDatas.forEach((sItem, sIndex) => {
          let materialData = {
            material_code: sItem.material_code.value,
            material_name: sItem.material_name.value,
            material_number_old: sItem.material_number.value,
            material_barcode: sItem.material_barcode.value,
            //material_picture: sItem.material_name.value,
            disable_value: true,
          };
          //this.materialDatas[sIndex] = materialData;
          this.materialDatas.push(materialData);
        });

        if (rDatas.length >= this.materialCount) {
          return;
        }

        for (let i = 1; i <= this.materialCount - rDatas.length; i++) {
          let materialData = {
            material_code: '',
            material_name: '',
            material_number_old: '',
            material_barcode: '',
            material_picture: '',
            disable_value: false,
          };
          this.materialDatas.push(materialData);
        }
      })
    },
    remoteMethod(query) {
      let model = this.getModel('wmsystem', 'locker');
      model.$fetch({query: {code: query, action: 'list', 'point_scene': 'keyvalueName'}}).then(response => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = response.data;
          this.keyField = response.key;
          this.nameField = response.name;

        }, 200);
      })
    }
  },
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item__content {
  margin-left: 0 !important;
}
</style>
