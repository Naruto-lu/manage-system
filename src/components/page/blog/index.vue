<template>
  <div class="blogmanage">
    <div class="blogmanage-crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-edit"></i> 博文管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="blogmanage-table">
      <el-form :inline="false" label-width="69px" :model="formInline">
        <el-row>
          <el-col :span="9">
            <el-form-item label="时间选择">
              <el-date-picker
                v-model="formInline.allTime"
                type="datetimerange"
                placeholder="请选择时间段"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="标题">
              <el-autocomplete
                class="inline-input"
                v-model="formInline.title"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="简介">
              <el-input v-model="formInline.description" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="分类">
              <el-select v-model="category" clearable placeholder="请选择">
                <el-option
                  v-for="item in categoryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="operation-btns">
        <el-button class="operation-btns_right" type="primary" @click="searchEvent">
          <i class="el-icon-search"></i>
        </el-button>
        <el-button type="primary" @click="delAll">批量删除</el-button>
        <el-button type="primary" @click="categoryDetail">分类管理</el-button>
        <el-button type="primary" @click="addBlog">新增博文</el-button>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column label="文章标题">
          <template scope="scope">
            <el-button type="text" @click="detailEvent(scope.row.id)">{{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="文章分类"></el-table-column>
        <el-table-column prop="description" label="文章简介" show-overflow-tooltip></el-table-column>
        <el-table-column label="日期" prop="date"></el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template scope="scope">
            <el-button type="text" size="small">
              <i class="el-icon-edit"></i> 编辑
            </el-button>
            <el-button type="text" size="small" @click="detailEvent(scope.row.id)">
              <i class="el-icon-view"></i> 详情
            </el-button>
            <el-button type="text" size="small" @click="delBlog(scope.row.id)">
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
        :page-size="pgsize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 添加博文 -->
    <add-blog :display="dialogVisible" @close="close"></add-blog>
    <!-- 博文详情 -->
    <detail-blog :display="showDetail" @close="closeEvent"></detail-blog>
    <!-- 分类管理 -->
    <category-manage :display="showCategory" @close="closeCategory"></category-manage>
  </div>
</template>

<script>
  import AddBlog from './addBlog.vue'
  import DetailBlog from './detailBlog.vue'
  import CategoryManage from './categoryManage.vue'
  import Moment from 'moment'
  export default {
    data() {
      return {
        tableData: [], // 列表数据
        formInline: {
          description: '',
          allTime: '',
          title: ''
        },
        categoryList: [{
          value: '选项1',
          label: '日记'
        }, {
          value: '选项2',
          label: '游玩'
        }, {
          value: '选项3',
          label: '心情'
        }],
        category: '',
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
        pgsize: 10, // 每页显示的条数
        total: 0, // 总条目数
        dialogVisible: false,
        showDetail: false,
        showCategory: false,
        ids: [], // 博文id
        TitleLists: [] // 标题下拉列表
      }
    },
    components: {
      AddBlog,
      DetailBlog,
      CategoryManage
    },
    methods: {
      handleSelectionChange(val) { // 获取选中的博文id
        let array = []
        val.map(item => {
          array.push(item.id)
        })
        this.ids = array
        console.log('ids', this.ids)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      searchEvent() { // 搜索
        const startTime = this.formInline.allTime[0] == null ? '' : Moment(this.formInline.allTime[0]).valueOf()
        const endTime = this.formInline.allTime[1] == null ? '' : Moment(this.formInline.allTime[1]).valueOf()
        const title = this.formInline.title ? this.formInline.title : ''
        const description = this.formInline.description ? this.formInline.descriptio : ''
        const category = this.category ? this.category : ''
        let SEARCHURL = '/blogoperation/getList?startTime=' + startTime
                        + '&endTime=' + endTime + '&title=' + title
                        + '&description=' + description + '&category=' + category
        this.$ajax.get(SEARCHURL).then(res => {
          console.log(res)
        })
      },
      close(r) {
        console.log(r)
        if (r) {
          this.getData()
        }
        this.dialogVisible = false // 重新置为false，否则不会再次弹出
        console.log('hhhh')
      },
      closeEvent() {
        this.showDetail = false
      },
      closeCategory() {
        this.showCategory = false
      },
      delAll() { // 批量删除
        if(this.ids.length === 0) {
          this.$message({
            message: '请选择要删除的博文！',
            type: 'warning'
          })
        } else {
          this.$message('请发送相应ajax请求！')
        }
      },
      delBlog(id) { // 删除
        console.log(id)
        this.delConfirm('确定删除博文？', id)
      },
      delConfirm(message, id) { // 删除确认
        this.$confirm(message)
        .then(() => {
          this.delEvent(id)
        })
      },
      delEvent(id) { // 删除事件
        if (id) {
          let DELURL = '/blogoperation/delBlog?id=' + id
          this.$ajax.get(DELURL).then(res => {
            if (res.status) {
              this.$message({message: '删除成功！', type: 'success'})
            } else {
              this.$message.error('删除失败！')
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      detailEvent(id) { // 详情
        console.log(id)
        this.showDetail = true
      },
      addBlog() {
        this.dialogVisible = true
      },
      categoryDetail() {
        this.showCategory = true
      },
      querySearch(queryString, cb) {
        var TitleLists = this.TitleLists
        var results = queryString ? TitleLists.filter(this.createFilter(queryString)) : TitleLists
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) != -1)
        }
      },
      getTitle() { // 获取标题下拉列表
        this.$ajax.get('/blogoperation/getList').then(res => {
          this.TitleLists = res.data.data.data.map(item => {
            return {value: item.name, label: item.id}
          })
        })
      },
      handleSelect(item) {
        console.log(item)
      },
      getData() {
        this.$ajax.get('/blogoperation/getList').then(res => {
          this.tableData = res.data.data.data
          this.total = res.data.data.total
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted() {
      this.getTitle()
      this.getData()
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
      margin-bottom:20px;
      .el-button+.el-button {
        margin-left: 0px;
      }
      .operation-btns_right{
        position: absolute;
        right: 0px;
      }
    }
    .el-autocomplete{
      width: 100%;
    }
    .el-date-editor--datetimerange.el-input {
      width: 100%;
    }
  }
</style>

