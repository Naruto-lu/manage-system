<template>
  <el-dialog
    title="博文详情"
    width="100%"
    size="small"
    :visible.sync="dialogVisible"
    @close="close">
    <div class="blog-detail">
      <p class="title">文章标题</p>
      <div class="desc">
        <div style="float: left;">分类：日记</div>
        <div style="float: right;">时间：2017-11-14</div>
        <div style="clear: both;"></div>
      </div>
      <div class="detail">
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
        从前有座山，山里有座庙，庙里有个老和尚和小和尚，老和尚在对小和尚讲故事，讲什么呢？
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    props: ['display'],
    data() {
      return {
        dialogVisible: false
      }
    },
    created() {
      this.refreshList = false
    },
    watch: {
      display(v) {
        this.dialogVisible = v
      }
    },
    methods: {
      close() {
        this.$emit('close', this.refreshList)
      }
    }
  }
</script>

<style lang="less">
  .blog-detail{
    border: 1px solid #c5c5c5;
    .title{
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .desc{
      border-bottom: 1px solid #e9e9e9;
      margin-bottom: 10px;
    }
    .detail{
      border: 1px solid green;
    }
  }
</style>

