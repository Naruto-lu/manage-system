<template>
  <div class="addCategory">
    <!-- <el-dialog
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
            <el-form-item 
              v-for="(item, index) in ruleForm.Items"
              :label="'分类名称' + index">
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
      <slot v-if="hstyle"></slot>
      <div slot="footer">
        <el-button @click="dialogVisible = false" type="primary" size="small">{{$t('button.save')}}</el-button>
        <el-button @click="dialogVisible = false" type="plain" size="small">{{$t('button.close')}}</el-button>
      </div>
    </el-dialog> -->
    <dialog-component 
      title="添加分类"
      size="small"
      :show="dialogVisible"
      hiddenStyle="vif"
      @close="close">
      <el-form ref="ruleForm" :inline="true" :rules="rules" label-width="90px" :model="ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
          <div style="float: right;">
            <el-button type="primary" size="mini" @click="add">
              <i class="el-icon-plus"></i>
            </el-button>
          </div>
        </el-form-item>
        <el-form-item 
          v-for="(item, index) in ruleForm.Items"
          :label="'分类名称' + index"
          prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
          <div style="float: right;">
            <el-button type="primary" size="mini" @click="remove(item)">
              <i class="el-icon-minus"></i>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false" type="primary" size="small">{{$t('button.save')}}</el-button>
        <el-button @click="dialogVisible = false" type="plain" size="small">{{$t('button.close')}}</el-button>
      </div>
    </dialog-component>
  </div>
</template>

<script>
  import DialogComponent from '../../common/dialog.vue'
  export default {
    props: ['display'],
    data() {
      return {
        state: 1,
        dialogVisible: false,
        ruleForm: {
          name: '',
          Items: []
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
    components: {
      DialogComponent
    },
    watch: {
      display(v) {
        this.dialogVisible = v
      }
    },
    computed: {
      hstyle() {
        return false
      }
    },
    methods: {
      close() {
        this.$emit('close', this.refreshDialog)
      },
      add() {
        this.ruleForm.Items.push({
          value: '',
          key: Date.now()
        })
        this.state = 0
      },
      remove(item) {
        let index = this.ruleForm.Items.indexOf(item)
        if (index !== '-1') {
          this.ruleForm.Items.splice(index, 1)
        }
      }
    }
  }
</script>

<style lang="less">
  .addCategory() {
  }
</style>

