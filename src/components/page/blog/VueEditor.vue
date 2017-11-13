<template>
  <el-dialog
    title="编辑博文内容"
    :visible.sync="showDialog"
    width="100%"
    size="small"
    @close="close">
    <quill-editor ref="myTextEditor" v-model="content" :config="editorOption"></quill-editor>
    <div slot="footer">
      <el-button type="primary" @click="save">{{$t('button.sure')}}</el-button>
      <el-button @click="showDialog = false">{{$t('button.cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import Quill from 'quill'
  import { ImageImport } from './modules/ImageImport.js'
  import { ImageResize } from './modules/ImageResize.js'
  Quill.register('modules/imageImport', ImageImport)
  Quill.register('modules/imageResize', ImageResize)

  export default {
    props: ['display'],
    data() {
      return {
        showDialog: false,
        content: '',
        editorOption: {
          // something config
          modules: {
            toolbar: [
              [{ 'size': ['small', false, 'large'] }],
              ['bold', 'italic'],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['link', 'image']
            ],
            history: {
              delay: 1000,
              maxStack: 50,
              userOnly: false
            },
            imageImport: true,
            imageResize: {
              displaySize: true
            }
          },
          debug: 'info',
          placeholder: 'Compose an epic...',
          readOnly: true,
          theme: 'snow'
        }
      }
    },
    watch: {
      display(v) {
        this.showDialog = v
      }
    },
    components: {
      quillEditor
    },
    created() {
      this.refreshList = false
    },
    methods: {
      close() {
        this.$emit('close', this.refreshList)
        this.refreshList = false
      },
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      save() {
        this.$emit('state', this.content)
        this.showDialog = false
      }
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    }
  }
</script>

<style lang="less">

</style>

