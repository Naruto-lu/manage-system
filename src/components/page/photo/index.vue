<template>
  <div class="photo">
    <div class="blogmanage-crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-edit"></i> 照片管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog v-model="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
    <el-row>
</el-row>  
  </div>
</template>

<script>
  export default{
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [
          {
            name: 'logo.png',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'logo.png',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ]
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList)
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      }
    }
  }
</script>

<style lang="less">
  .photo{
    .blogmanage-crumbs{
      padding: 5px;
      background-color: #ede7ed;
      margin-bottom: 5px;
    }
  }
</style>
