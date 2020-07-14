<template>
  <div
    class="file-loader"
    tabindex="0"
    @click="onClick"
    @keydown="onKeydown"
  >
    <div
      class="file-dragger"
      :class="{
        'is-dragover': dragover
      }"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragover"
      @dragleave.prevent="dragover = false"
    >
      <i class="el-icon-upload" />
      <div class="file-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
    </div>
    <input
      ref="input"
      class="file-loader__input"
      type="file"
      :name="name"
      :multiple="multiple"
      :accept="accept"
      @change="onInputFile"
    >
  </div>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
    multiple: Boolean,
    // 指定文件类型，如 ".jpg,.png"
    accept: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'file'
    }
  },
  data() {
    return {
      dragover: false
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    onKeydown(e) {
      if (e.target !== e.currentTarget) return
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.onClick()
      }
    },
    onDragover() {
      if (!this.disabled) {
        this.dragover = true
      }
    },
    onDrop(e) {
      if (this.disabled) {
        return
      }
      this.dragover = false
      if (!this.accept) {
        this.doFiles(e.dataTransfer.files)
        return
      }

      const files = [].slice.call(e.dataTransfer.files).filter(file => {
        const { type, name } = file
        const extension = name.indexOf('.') > -1
          ? `.${name.split('.').pop()}`
          : ''
        const baseType = type.replace(/\/.*$/, '')
        return this.accept.split(',')
          .map(type => type.trim())
          .filter(type => type)
          .some(acceptedType => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType
            }
            return false
          })
      })
      this.doFiles(files)
    },
    onInputFile(e) {
      const files = e.target.files

      if (!files) return
      this.doFiles(files)
    },
    doFiles(files) {
      if (!this.multiple) {
        files = [].slice.call(files, 0, 1)
      }
      if (!files.length) {
        return
      }
      this.$emit('file', files)
    }
  }
}
</script>

<style lang="scss">
.file-dragger {
  position: relative;
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: #409eff;
  }
  &.is-dragover {
    background-color: rgba(32,159,255,.06);
    border: 2px dashed #409eff;
  }

  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }

  .file-dragger__text {
    color: #606266;
    font-size: 14px;
    text-align: center;

    em {
      color: #409eff;
      font-style: normal;
    }
  }
}
.file-loader__input {
  display: none;
}
</style>
