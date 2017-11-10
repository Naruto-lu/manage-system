<template>
    <el-alert :title="aTitle" :type="aError" :description="aDescription" show-icon id="tip">
    </el-alert>
</template>
<script>
  export default {
    // 当创建页面(created执行)时，会先判断变量this.timeOut是否存在，如果存在，先clearTimeout掉
    created () {
    },
    data: function () {
      return {
        aTitle: '提示标题',
        aError: 'error', // 默认为error提示方式
        aDescription: '提示内容'
      }
    }
  }
</script>
<style scoped>
  #tip {
      width: 20%;
      margin: 0 auto;
  }
</style>