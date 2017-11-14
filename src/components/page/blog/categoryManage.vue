<template>
  <div>
    <el-dialog
      title="分类管理"
      width="100%"
      size="small"
      :visible.sync="dialogVisible"
      @close="close">
      <div style="margin-bottom: 10px;">
        <el-button type="primary" size="small">批量删除</el-button>
        <el-button type="primary" size="small" @click="addCategory">添加分类</el-button>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="分类名称" prop="value"></el-table-column>
        <el-table-column label="操作" fixed="right" width="80px">
          <template scope="scope">
            <el-button type="text" style="font-size: 12px;color: red;"><i class="el-icon-delete"></i> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="dialogVisible = false" type="primary" size="small">{{$t('button.close')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加分类 -->
    <add-category :display="showDialog" @close="closeEvent"></add-category>
  </div>
</template>

<script>
  import AddCategory from './addCategory.vue'
  export default {
    props: ['display'],
    data() {
      return {
        dialogVisible: false,
        showDialog: false,
        tableData: [
          {
            value: '日记'
          },
          {
            value: '心情'
          },
          {
            value: '游玩'
          }
        ]
      }
    },
    components: {
      AddCategory
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
      addCategory() { //添加分类
        this.showDialog = true
      },
      closeEvent() {
        this.showDialog = false
      }
    }
  }
</script>

<style lang="less">

</style>

