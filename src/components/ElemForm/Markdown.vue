<template>
  <el-form-item :label="elem.options.name" prop="field" width="1000px">
    <editor
      ref="toastuiEditor"
      :initialValue="input"
      :options="editorOptions"
      height="500px"
      initialEditType="markdown"
      @change="handleSelfChange"
      visible:true
      previewStyle="tab"
    />
  </el-form-item>
</template>
<script>
import {form} from '@/applications/mixins/form';
import {fetchData} from '@/applications/mixins/fetchData';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';

export default {
  components: {
    editor: Editor
  },
  mixins: [fetchData, form],
  data() {
    return {
      input: this.inputInfos[this.field],
      editorOptions: {
        hideModeSwitch: true
      }
    };
  },
  methods: {
    handleSelfChange(value) {
      //console.log(this.$refs.toastuiEditor.invoke('getHTML'));
      this.input = this.$refs.toastuiEditor.invoke('getMarkdown');
      this.handleFormChange();
    }
  }
};
</script>
