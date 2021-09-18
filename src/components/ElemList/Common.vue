<template>
  <span v-html="row[field].value"></span>
</template>

<script>
import {column} from '@/applications/mixins/column';
export default {
  mixins: [column],
  data() {
    return {}
  },
}
</script>
