<template>
  <div style="padding: 20px;">
    <file-loader
      accept=".jpg,.jpeg,.png"
      multiple
      @file="onFiles"
    />
    <div>
      <div
        v-for="(item, index) in result"
        :key="index"
        class="file-res"
      >
        {{ item }}
      </div>
    </div>
  </div>
  <!--
    如果要指定文件类型，使用 accept 属性：
    <file-loader accept=".xls" />
    <file-loader accept=".xls,.docx" />

  -->
</template>

<script>
/**
 * 对本地图片文件生成MD5
 * 1. 支持图片拖拽，支持文件框选择图片
 * 2. 可指定图片后缀
 * 3. 可配置多选/单选
 */

import md5 from 'md5'
import FileLoader from '@/components/FileLoader'

export default {
  components: {
    FileLoader
  },

  data() {
    return {
      result: []
    }
  },

  methods: {
    onFiles(files) {
      this.result = []
      files.forEach(file => {
        var reader = new FileReader()
        reader.onload = (e) => {
          const base64Str = e.target.result
          const md5Str = md5(base64Str)
          this.result.push(`File: ${file.name}, MD5: ${md5Str}`)
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>

<style lang="scss">
.file-res {
  margin-top: 20px;
}
</style>
