<template>
  <div>
    <el-dialog
      title="添加分类"
      size="small"
      :visible.sync="dialogVisible"
      @close="close">
      <el-form ref="ruleForm" :rules="rules" label-width="90px" :model="ruleForm">
        <el-row :gutter="10">
          <el-col :span="18">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item label="分类名称" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" @click="add">
              <i class="el-icon-plus"></i>
            </el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false" type="primary" size="small">{{$t('button.save')}}</el-button>
        <el-button @click="dialogVisible = false" type="plain" size="small">{{$t('button.close')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['display'],
    data() {
      return {
        dialogVisible: false,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.refreshDialog = false
    },
    watch: {
      display(v) {
        this.dialogVisible = v
      }
    },
    methods: {
      close() {
        this.$emit('close', this.refreshDialog)
      },
      add() {
        console.log('aa')
      }
    }
  }
</script>

<style lang="less">

</style>

