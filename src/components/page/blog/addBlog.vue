<template>
  <el-dialog
    title="新增博文"
    :visible.sync="dialogVisible"
    width="100%"
    :before-close="handleClose"
    @close="closeDialog">
    <!-- form -->
    <el-form :model="form">
      <el-form-item label="文章名称" label-width="70px">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="文章简介" label-width="70px">
        <el-input type="textarea" placeholder="请输入内容" v-model="form.textarea"></el-input>
      </el-form-item>
      <el-form-item label="文章分类">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" label-width="70px">
        <el-input type="textarea" placeholder="请输入内容" v-model="form.textarea"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">{{$t('button.save')}}</el-button>
      <el-button @click="dialogVisible = false">{{$t('button.cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['display'],
    created() {
      this.refreshDialog = false
    },
    data() {
      return {
        dialogVisible: false,
        form: {
          name: '',
          textarea: '',
          value: ''
        },
        options: [
          {
            value: '选项1',
            label: '日记'
          }, 
          {
            value: '选项2',
            label: '游玩'
          },
          {
            value: '选项3',
            label: '心情'
          }
        ]
      }
    },
    watch: {
      display(v) {
        this.dialogVisible = v
      }
    },
    methods: {
      closeDialog() {
        this.$emit('close', this.refreshDialog)
      },
      handleClose() {
        console.log('ll')
        this.dialogVisible = false
      }
    }
  }
</script>

<style lang="less" scope>
  .el-dialog__header {
    padding: 10px;
    border-bottom: 1px solid #d5d5d5;
  }
</style>

