<template>
<div style="padding: 20px;">
  <el-upload
    class="upload-demo"
    drag
    @file="onFile"
    accept=".xml"
    multiple
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div slot="tip" class="el-upload__tip">只能上传xml文件，且不超过500kb</div>
  </el-upload>
</div>
</template>

<script>
/**
 * 请求后台接口，上传文件到服务器端处理
 */
import { xmltoExcel } from '@/api/tool'
export default {
  data() {
    return {
      result: File
    }
  },

  methods: {
    onFile(file) {
        xmltoExcel(this.file).then(resp => {
          this.data.file = resp.data.data
        })
    }
  }
}
</script>
