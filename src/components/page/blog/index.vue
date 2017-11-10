<template>
  <div class="blogmanage">
    <div class="blogmanage-crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-edit"></i> 博文管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="blogmanage-table">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="时间选择">
          <el-date-picker
            v-model="formInline.date"
            type="datetimerange"
            placeholder="请选择时间段"
            :picker-options="pickerOptions2"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题">
          <el-autocomplete
            class="inline-input"
            v-model="formInline.state1"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="formInline.user" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div class="operation-btns">
        <el-button class="operation-btns_right" type="primary" @click="onSubmit">
          <i class="el-icon-search"></i>
        </el-button>
        <el-button type="primary" @click="onSubmit">批量删除</el-button>
        <el-button type="primary" @click="addBlog">新增博文</el-button>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <template scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="文章标题" width="120"></el-table-column>
        <el-table-column prop="address" label="文章简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template scope="scope">
            <el-button type="text" size="small">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="text" size="small">
              <i class="el-icon-view"></i> 详情
            </el-button>
            <el-button type="text" size="small">
              <font color="red"><i class="el-icon-delete"></i> 删除</font>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="blogmanage-block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="35">
      </el-pagination>
    </div>
    <!-- 添加博文 -->
    <add-blog :display="dialogVisible" @close="dialogVisible = false"></add-blog>
  </div>
</template>

<script>
  import AddBlog from './addBlog.vue'
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '随记1',
          address: '某年某月某日'
        }, {
          date: '2016-05-02',
          name: '随记2',
          address: '从前有座山，山里有座庙'
        }, {
          date: '2016-05-04',
          name: '随记3',
          address: '像我这种庸俗的人，从不喜欢装深沉'
        }],
        formInline: {
          user: '',
          region: '',
          date: '',
          state1: ''
        },
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dialogVisible: false
      }
    },
    components: {
      AddBlog
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      onSubmit() {
        console.log('submit!')
      },
      addBlog() {
        this.dialogVisible = true
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) != -1)
        }
      },
      loadAll() {
        return [
          {
            value: '随记1'
          },
          {
            value: '随记2'
          },
          {
            value: '随记3'
          }
        ]
      },
      handleSelect(item) {
        console.log(item)
      }
    },
    mounted() {
      this.restaurants = this.loadAll()
    }
  }
</script>

<style lang='less'>
  .blogmanage{
    .blogmanage-crumbs{
      padding: 5px;
      background-color: #ede7ed;
    }
    .blogmanage-table{
      margin-top: 10px;
    }
    .blogmanage-block{
      margin-top: 5px;
      text-align: right;
    }
    .operation-btns{
      position: relative;
      margin-bottom:10px;
      .el-button+.el-button {
        margin-left: 0px;
      }
      .operation-btns_right{
        position: absolute;
        right: 0px;
      }
    }
  }
</style>

