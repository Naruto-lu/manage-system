<template>
  <el-dialog
    title="新增博文"
    :visible.sync="dialogVisible"
    width="100%"
    size="small"
    @close="closeDialog">
    <!-- form -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
      <el-form-item label="文章名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="文章简介">
        <el-input type="textarea" :rows="rows" placeholder="请输入内容" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="category">
        <el-select v-model="ruleForm.category" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-button type="primary" size="small">编辑文章内容</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="saveBlog">{{$t('button.save')}}</el-button>
      <el-button @click="dialogVisible = false">{{$t('button.cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['display'],
    data() {
      return {
        rows: 5,
        dialogVisible: false,
        ruleForm: {
          name: '',
          description: '',
          category: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入博文名称', trigger: 'blur'}
          ],
          category: [
            {required: true, message: '请选择分类', trigger: 'change'}
          ]
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
    created() {
      this.refreshDialog = false
    },
    methods: {
      closeDialog() {
        this.$emit('close', this.refreshDialog)
        this.refreshDialog = false
      },
      saveBlog() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$ajax.post('/blogoperation/saveBlog').then(res => {
              if (res.data.status === 1) {
                this.refreshDialog = true // 在dialog关闭之前，将refreshDialog状态值传递过去
                this.dialogVisible = false
                this.$message({
                  message: '新增博文成功！',
                  type: 'success'
                })
              } else {
                this.$message.error('新增博文失败！')
              }
            })
          } else {
            this.$message.error('请把必填项补充完整！')
          }
        })
        
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

