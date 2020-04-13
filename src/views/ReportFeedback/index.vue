<template>
  <div id="ReportFeedback">
    <div class="ReportFeedback-header">
      <div class="searchForm">
        <span style="margin-right:10px;">反馈人</span><!--
     --><el-input v-model="searchForm.commiter"></el-input><!--
     --><span style="margin:0 10px;">处理人</span><!--
     --><el-input v-model="searchForm.handlers"></el-input><!--
     --><span style="margin:0 10px;display:inline-block;width: 56px;">描述</span><!--
     --><el-input v-model="searchForm.desc"></el-input><!--
     --><span style="margin:0 10px;">解决方案</span><!--
     --><el-input v-model="searchForm.solution"></el-input><!--
     --><span style="margin:0 10px;display:inline-block;width: 42px;">状态</span><!--
     --><el-select v-model="searchForm.status" placeholder="">
          <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="searchForm">
        <span style="margin-right: 10px;display:inline-block;width: 42px;">标签</span><!--
     --><el-select class="tags" v-model="searchForm.labels" multiple filterable placeholder="请选择">
          <el-option
            v-for="item in LabelsOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select><!--
     --><span style="margin:0 10px;display:inline-block;width: 56px;">反馈时间</span><!--
     --><el-date-picker
          v-model="searchForm.feedBackTime"
          type="daterange"
          value-format='timestamp'
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker><!--
     --><el-button type="primary" style="margin-left: 24px;margin-right: 6px;" @click.native="search">查询</el-button><!--
     --><el-button type="info" style="margin-right: 6px;" @click.native="reset">重置</el-button><!--
     --><el-button type="success" @click.native="showAddDialog">新增</el-button>
      </div>
    </div>
    <div class="tableData">
      <el-table ref="ContentTable" row-key="id" :data="tableData" class="ContentTable" border default-expand-all @row-click="rowClick" @sort-change="sortChange">
        <el-table-column
          prop="id"
          label="ID"
          width="64">
        </el-table-column>
        <el-table-column
          label="反馈人"
          sortable
          ref="commiter"
          width="100">
          <template slot-scope="scope">
            <div v-html="scope.row.commiter"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="处理人"
          sortable
          ref="handler"
          width="100">
          <template slot-scope="scope">
            <template v-for="(item,index) in scope.row.handlers"><span :key="index">{{index==0?item:'、'+item}}</span></template>
          </template>
        </el-table-column>
        <el-table-column
          label="标签"
          min-width="120">
          <template slot-scope="scope">
            <template v-for="(item,index) in scope.row.labels"><span :key="index">{{index==0?item:'、'+item}}</span></template>
          </template>
        </el-table-column>
        <el-table-column
          label="描述"
          min-width="200">
          <template slot-scope="scope">
            <div v-html="scope.row.desc"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="解决方案"
          min-width="200">
          <template slot-scope="scope">
            <div v-html="scope.row.solution"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="100">
          <template slot-scope="scope">
            <div v-html="scope.row.status"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="反馈时间"
          sortable
          ref="feedBackTime"
          width="110">
          <template slot-scope="scope">
            {{$formatTime(scope.row.feedBackTime,'yyyy-MM-dd')}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20, 25]"
        :page-size="pageSize"
        background
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      center
      :visible.sync="addDialogStatus"
      title="新增一条数据"
      class="dialog">

      <p class="dialog-title">反馈人</p>
      <el-input placeholder="" class="input-focus" v-model="addForm.commiter"></el-input>

      <p class="dialog-title margin">跟进处理人</p>
      <el-input placeholder="多个处理人中间用英文分号连接" class="input-focus" v-model="addForm.handlers"></el-input>

      <p class="dialog-title margin">标签</p>
      <el-select v-model="addForm.labels" multiple filterable class="input-focus" placeholder="请选择">
        <li @click="addTags('addForm')" class="el-select-dropdown__item" style="text-align: center;border-bottom: 1px solid #f0f0f0;padding-bottom: 40px;"><span>添加标签</span></li>
        <el-option
          v-for="item in LabelsOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <p class="dialog-title margin">反馈时间</p>
      <el-date-picker value-format='timestamp' class="input-focus" v-model="addForm.feedBackTime" type="date" placeholder="请选择"></el-date-picker>

      <p class="dialog-title margin">状态</p>
      <el-select v-model="addForm.status" placeholder="请选择" class="dialog-select">
        <el-option
          v-for="item in statusOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <p class="dialog-title margin">描述</p>
      <el-input placeholder="" :autosize="{ minRows: 2}" type="textarea" class="input-focus" v-model="addForm.desc"></el-input>

      <p class="dialog-title margin">解决方案</p>
      <el-input placeholder="" :autosize="{ minRows: 2}" type="textarea" class="input-focus" v-model="addForm.solution"></el-input>

      <div class="dialog-btn">
        <p class="cancel" @click="addDialogStatus = false">取消</p>
        <P class="confirm" @click="addCommit">添加</P>
      </div>
    </el-dialog>
    <el-dialog
      center
      :visible.sync="editDialogStatus"
      title="编辑数据"
      class="dialog">

      <p class="dialog-title">反馈人</p>
      <el-input placeholder="" class="input-focus" v-model="editForm.commiter"></el-input>

      <p class="dialog-title margin">跟进处理人</p>
      <el-input placeholder="多个处理人中间用英文分号连接" class="input-focus" v-model="editForm.handlers"></el-input>

      <p class="dialog-title margin">标签</p>
      <el-select v-model="editForm.labels" multiple filterable class="input-focus" placeholder="请选择">
        <li @click="addTags('editForm')" class="el-select-dropdown__item" style="text-align: center;border-bottom: 1px solid #f0f0f0;padding-bottom: 40px;"><span>添加标签</span></li>
        <el-option
          v-for="item in LabelsOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <p class="dialog-title margin">反馈时间</p>
      <el-date-picker value-format='timestamp' class="input-focus" v-model="editForm.feedBackTime" type="date" placeholder="请选择"></el-date-picker>

      <p class="dialog-title margin">状态</p>
      <el-select v-model="editForm.status" placeholder="请选择" class="dialog-select">
        <el-option
          v-for="item in statusOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>

      <p class="dialog-title margin">描述</p>
      <el-input placeholder="" :autosize="{ minRows: 2}" type="textarea" class="input-focus" v-model="editForm.desc"></el-input>

      <p class="dialog-title margin">解决方案</p>
      <el-input placeholder="" :autosize="{ minRows: 2}" type="textarea" class="input-focus" v-model="editForm.solution"></el-input>

      <div class="dialog-btn">
        <p class="cancel" @click="editDialogStatus = false">取消</p>
        <P class="confirm2" @click="commit">保存</P>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ReportFeedback',
  data:function(){
    return{
      tableData:[],
      statusOptions:["待解决","解决中","已解决","待改进","改进中","已改进"],//状态选项
      searchForm: {
        commiter:'',
        handlers:'',
        desc:'',
        solution:'',
        status: '',
        labels:[],
        feedBackTime: []
      },
      currentPage:1,//当前页
      pageSize: 10,//每页数量
      total: 0,//总条数
      filterData:[],
      allData: [],//接口获取的全部数据
      sortFunction: '',
      addDialogStatus:false,//新增弹窗
      editDialogStatus: false,//编辑弹窗
      addForm: {
        commiter:'',
        handlers:'',
        status: '',
        desc: '',
        solution: '',
        labels: [],
        feedBackTime:'',
        source: 'report_feedback'
      },
      editForm: {
        commiter:'',
        handlers:'',
        status: '',
        desc: '',
        solution: '',
        labels: [],
        feedBackTime:'',
        source: 'report_feedback'
      }
    }
  },
  mounted(){
    this.$store.dispatch('getTableData',{source:'report_feedback'}).then(res => {
      this.allData = res.data
      this.filterData = JSON.parse(JSON.stringify(res.data))
      this.total = this.allData.length
      if(this.total>=this.pageSize) this.setTableData(this.allData.slice(0,this.pageSize))
      else this.setTableData(this.allData)
    })
  },
  methods: {
    addTags(str){
      let that = this
      this.$prompt('', '添加标签', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: that.inputValidator
      }).then(({ value }) => {
        this.$store.dispatch('addLabel',{label:value}).then(res => {
          if(res.code==0){
            this.$store.dispatch('getAllLabels').then(()=>{
              this[str].labels.push(value)
            })
          } else {
            this.$message.error('添加失败');
          }
        }).catch(err => {
          this.$message.error('添加失败');
        })
      }).catch(()=>{

      })
    },
    inputValidator(str){
      if(!str&&str!==0) return '不能为空'
      for(let i=0;i<this.LabelsOptions.length;i++){
        if(str==this.LabelsOptions[i]) return '标签已存在'
      }
      return true
    },
    addCommit(){
      if(this.addForm.commiter===''){
        this.$message.error('反馈人不能为空')
        return;
      } else if(this.addForm.handlers===''){
        this.$message.error('跟进处理人不能为空')
        return;
      } else if(this.addForm.labels.length==0){
        this.$message.error('标签至少选择一个')
        return;
      } else if(this.addForm.feedBackTime===''){
        this.$message.error('请选择反馈时间')
        return;
      }  else if(this.addForm.status===''){
        this.$message.error('请选择状态')
        return;
      }else if(this.addForm.desc===''){
        this.$message.error('描述不能为空')
        return;
      } else if(this.addForm.solution===''){
        this.$message.error('解决方案不能为空')
        return;
      }
      let that = this
      let tempForm = JSON.parse(JSON.stringify(this.addForm))
      tempForm.handlers = tempForm.handlers.split(';')
      let loading = this.$message({message:'正在提交',iconClass:'el-icon-loading',duration:0});
      this.$store.dispatch('addTableData',tempForm).then(res => {
        if(res.code == 0){
          setTimeout(function(){
            loading.close()
            that.$message.success('添加成功')
            that.addDialogStatus = false
          },250)

          // 新增成功后重置
          this.$store.dispatch('getTableData',{source:'report_feedback'}).then(res => {
            this.allData = res.data
            this.reset()
          })
        } else {
          loading.close()
          that.$message.error('添加失败')
        }
      }).catch(err=> {
        loading.close()
        that.$message.error('添加失败')
      })
    },
    rowClick(row){
      let temp = JSON.parse(JSON.stringify(row))
      temp.handlers = temp.handlers.join(';')
      this.editForm = temp
      this.$nextTick(()=>{this.editDialogStatus = true})
    },
    showAddDialog(){//打开添加窗口
      this.addForm = {
        commiter:'',
        handlers:'',
        status: '',
        desc: '',
        solution: '',
        labels: [],
        feedBackTime:'',
        source: 'report_feedback'
      }
      this.addDialogStatus = true
    },
    setTableData(arr){
      let tempArr = arr
      // arr.forEach((item, i) => {
      //   this.$set(item,'commiterEdit',false)
      //   this.$set(item,'handlerEdit',false)
      //   this.$set(item,'statusEdit',false)
      //   this.$set(item,'descEdit',false)
      //   this.$set(item,'solutionEdit',false)
      // });
      this.$set(this,'tableData',tempArr)
    },
    commit(row,str){//更新数据
      let that = this
      if(this.editForm.commiter===''){
        this.$message.error('反馈人不能为空')
        return;
      } else if(this.editForm.handlers===''){
        this.$message.error('跟进处理人不能为空')
        return;
      } else if(this.editForm.labels.length==0){
        this.$message.error('标签至少选择一个')
        return;
      } else if(this.editForm.feedBackTime===''){
        this.$message.error('请选择反馈时间')
        return;
      }  else if(this.editForm.status===''){
        this.$message.error('请选择状态')
        return;
      }else if(this.editForm.desc===''){
        this.$message.error('描述不能为空')
        return;
      } else if(this.editForm.solution===''){
        this.$message.error('解决方案不能为空')
        return;
      }
      let tempForm = JSON.parse(JSON.stringify(this.editForm))
      tempForm.handlers = tempForm.handlers.split(';')
      let loading = this.$message({message:'请稍等',iconClass:'el-icon-loading',duration:0});
      this.$store.dispatch('updateTableData',tempForm).then(res => {
        if(res.code==0){
          //更新成功后更新全部数据
          this.$store.dispatch('getTableData',{source:'report_feedback'}).then(res => {
            this.allData = res.data
            setTimeout(function(){
              loading.close()
              that.$message.success('修改成功')
              that.filterData=JSON.parse(JSON.stringify(that.filter(that.allData)))
              let e = that.currentPage
              if(that.total>=e*that.pageSize) that.setTableData(that.filterData.slice((e-1)*that.pageSize,e*that.pageSize))
              else that.setTableData(that.filterData.slice((e-1)*that.pageSize,that.total))
              that.editDialogStatus = false
            },250)
          })
        } else {
          loading.close()
          this.$message.error('修改失败')
          //修改失败重置本页数据
          let e = this.currentPage
          if(this.total>=e*this.pageSize) this.setTableData(this.filterData.slice((e-1)*this.pageSize,e*this.pageSize))
          else this.setTableData(this.filterData.slice((e-1)*this.pageSize,this.total))
        }
      }).catch(err => {
        loading.close()
        this.$message.error('修改失败')
        //修改失败重置本页数据
        let e = this.currentPage
        if(this.total>=e*this.pageSize) this.setTableData(this.filterData.slice((e-1)*this.pageSize,e*this.pageSize))
        else this.setTableData(this.filterData.slice((e-1)*this.pageSize,this.total))
      })
    },
    search(){//筛选及搜索

      // 重置排序状态
      this.$refs.commiter.columnConfig.order = ''
      this.$refs.handler.columnConfig.order = ''
      this.$refs.feedBackTime.columnConfig.order = ''
      this.sortFunction = ''
      //筛选
      this.filterData=JSON.parse(JSON.stringify(this.filter(this.allData)))
      this.total = this.filterData.length

      if(this.total>=this.pageSize) this.setTableData(this.filterData.slice(0,this.pageSize))
      else this.setTableData(this.filterData)
      this.currentPage = 1

    },
    handleSizeChange(e){//每页条数修改
      this.pageSize = e
      this.total = this.filterData.length

      if(this.total>=this.pageSize) this.setTableData(this.filterData.slice(0,this.pageSize))
      else this.setTableData(this.filterData)
      this.currentPage = 1
      this.$message.info('当前每页'+this.pageSize+'条数据')
    },
    handleCurrentChange(e){//页码发生改变
      this.currentPage = e
      if(this.total>=e*this.pageSize) this.setTableData(this.filterData.slice((e-1)*this.pageSize,e*this.pageSize))
      else this.setTableData(this.filterData.slice((e-1)*this.pageSize,this.total))
    },
    filter(arr){//过滤器
      let tempArr = arr
      if(this.searchForm.commiter) {//对反馈人字段模糊搜索
        let reg = new RegExp(this.searchForm.commiter)
        tempArr = tempArr.filter(item => { return item.commiter.match(reg) })
      }
      if(this.searchForm.handlers) {//对跟进处理人字段模糊搜索
        let reg = new RegExp(this.searchForm.handlers)
        tempArr = tempArr.filter(item => { return item.handlers.join(';').match(reg) })
      }
      if(this.searchForm.status) {//对状态字段精确搜索
        tempArr = tempArr.filter(item => { return item.status == this.searchForm.status })
      }
      if(this.searchForm.desc) {//对描述字段模糊搜索
        let reg = new RegExp(this.searchForm.desc)
        tempArr = tempArr.filter(item => { return item.desc.match(reg) })
      }
      if(this.searchForm.solution) {//对解决方案字段模糊搜索
        let reg = new RegExp(this.searchForm.solution)
        tempArr = tempArr.filter(item => { return item.solution.match(reg) })
      }
      if(this.searchForm.feedBackTime.length>0){//筛选反馈时间
        tempArr = tempArr.filter(item => {
           return item.feedBackTime>=this.searchForm.feedBackTime[0]&&item.feedBackTime<(this.searchForm.feedBackTime[1]+86400000)
        })
      }
      if(this.searchForm.labels.length>0){//筛选标签
        tempArr = tempArr.filter(item => {
          for(let i=0;i<this.searchForm.labels.length;i++){
            for(let j=0;j<item.labels.length;j++){
              if(this.searchForm.labels[i]==item.labels[j]) return true;
            }
          }
           return false
        })
      }
      return tempArr
    },
    sort(arr){//排序
      if(!this.sortFunction||!this.sortFunction.order){//默认排序
        this.filterData = JSON.parse(JSON.stringify(this.filter(this.allData)))
        return this.filterData;
      } else {
        switch (this.sortFunction.column.label) {
          case '反馈人':
            if(this.sortFunction.order == 'ascending'){//升序
              return arr.sort((item1,item2) => {
                return item1.commiter.localeCompare(item2.commiter, 'zh-CN');
              })
            } else {//降序
              return arr.sort((item1,item2) => {
                return item2.commiter.localeCompare(item1.commiter, 'zh-CN');
              })
            }
            break;
          case '跟进反馈人':
            if(this.sortFunction.order == 'ascending'){//升序
              return arr.sort((item1,item2) => {
                return item1.handlers.join('、').localeCompare(item2.handlers.join('、'), 'zh-CN');
              })
            } else {//降序
              return arr.sort((item1,item2) => {
                return item2.handlers.join('、').localeCompare(item1.handlers.join('、'), 'zh-CN');
              })
            }
            break;
          case '反馈时间':
            if(this.sortFunction.order == 'ascending'){//升序
              return arr.sort((item1,item2) => {
                return item1.feedBackTime - item2.feedBackTime;
              })
            } else {//降序
              return arr.sort((item1,item2) => {
                return item2.feedBackTime - item1.feedBackTime;
              })
            }
            break;

        }
      }
    },
    reset(){//重置
      // 重置排序状态
      this.$refs.commiter.columnConfig.order = ''
      this.$refs.handler.columnConfig.order = ''
      this.$refs.feedBackTime.columnConfig.order = ''
      this.sortFunction = ''
      //重置过滤器
      this.searchForm = {
        commiter:'',
        handlers:'',
        desc:'',
        solution:'',
        status: '',
        labels:[],
        feedBackTime: []
      }
      this.filterData=JSON.parse(JSON.stringify(this.filter(this.allData)))
      this.total = this.filterData.length

      if(this.total>=this.pageSize) this.setTableData(this.filterData.slice(0,this.pageSize))
      else this.setTableData(this.filterData)
      this.currentPage = 1
    },
    sortChange(row){//排序条件发生改变
      this.sortFunction = row
      this.filterData = this.sort(this.filterData)
      this.total = this.filterData.length

      if(this.total>=this.pageSize) this.setTableData(this.filterData.slice(0,this.pageSize))
      else this.setTableData(this.filterData)
      this.currentPage = 1
    },
    // dblhandleCurrentChange(row, column, cell, event){//双击打开编辑
    //   switch (column.label) {
    //     case '反馈人':
    //       row.commiterEdit = true;
    //       break;
    //     case '跟进反馈人':
    //       row.handlerEdit = true;
    //       break;
    //     case '状态':
    //       row.statusEdit = true;
    //       break;
    //     case '描述':
    //       row.descEdit = true;
    //       break;
    //     case '解决方案':
    //       row.solutionEdit = true;
    //       break;
    //   }
    // }
  },
  computed:{
    LabelsOptions(){return this.$store.getters.Labels}
  }
}
</script>

<style lang="scss">
#ReportFeedback {
  padding: 0 60px;
  min-width: 1200px;
  width: calc(100% - 120px);
  .ReportFeedback-header{

    .searchForm{
      margin-top: 20px;
      span{font-size: 14px;}
      .el-input{
        width: 160px;
        .el-input__inner{
          border: 1px solid #e0e0e0;
          padding-left: 20px !important;
        }
        .el-input__inner:focus{
          border: 1px solid #157ae1;
        }
      }
      .el-select{
        width: 160px;
        .el-input__inner{
          border: 1px solid #e0e0e0;
          padding-left: 20px !important;
        }
        .el-input.is-focus{.el-input__inner{border: 1px solid #157ae1;}}
        .el-input__inner:focus{
          border: 1px solid #157ae1;
        }
      }
      .tags{
        width: 410px;
        .el-input{
          width: 410px;
        }
      }
    }
  }
  .tableData{
    width: 100%;
    .ContentTable{
      width: 100%;
      margin-top: 20px;
      td,th.is-leaf,.el-table--border, .el-table--group{
        border-color: #c0c0c0;
      }

      // height: calc(100% - 52px);
      border-top: 1px solid #c0c0c0;
      border-left: 1px solid #c0c0c0;
      border-bottom: 1px solid #c0c0c0;
      .el-table__header{
        th,tr{background-color: #eeeeee !important;}
        th{
          padding: 10px 0 !important;
        }
        .cell{
          color: #282828 !important;
          font-size: 14px !important;
          line-height: 20px !important;
        }
      }
      .el-table__body-wrapper{
        // .el-table__row:hover{
        //   td{background-color: #fff !important;}
        // }
        .el-table__row{
          cursor: pointer;
          td{
            padding: 10px 0 !important;
            min-height: 40px;
            .cell{
              color: #282828 !important;
              font-size: 14px !important;
              // line-height: 20px !important;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;

            }
          }
          // td:hover{
          //   background-color: #f5f7fa !important;
          // }
        }

      }
      .el-table__expanded-cell{
        color:#282828;
        line-height: 24px;
        padding: 20px 30px;
      }
    }
    .ContentTable:before {//去掉最下面的那一条线
      height: 0px;
    }
    .el-table--border::after, .el-table--group::after,{
      background-color: #c0c0c0;
    }
    .el-pagination{
      padding: 10px 0;
      text-align: right;
      .btn-next{margin-right: 0 !important}
    }
  }
  .dialog {
    .el-dialog{
      border-radius: 6px;
      width: 400px !important;
      -webkit-border-radius: 6px;
      .el-dialog__header{
        padding-top: 38px !important;
      }
      .el-dialog__body{
        padding: 25px 60px 30px 60px;
      }
    }
    .input-focus {
      width: 100%;
      margin-top: 10px;
      input:focus {
        border-color: #157ae1;
      }

    }
    .dialog-btn {
      display: flex;
      padding: 0 20px;
      margin-top: 40px;
      justify-content: space-between;
      .cancel {
        height: 40px;
        width: 100px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        display: inline-block;
        background-color: #909090;
      }
      .cancel:hover {
        background-color: #b4b3b3;
      }

      .confirm {
        height: 40px;
        width: 100px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        display: inline-block;
        background-color: #4dce6e;
      }
      .confirm2 {
        height: 40px;
        width: 100px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        text-align: center;
        line-height: 40px;
        border-radius: 40px;
        display: inline-block;
        background-color: #5399e1;
      }
      .confirm:hover {
        background-color: #81d597;
      }
    }
    .dialog-title {
      font-size: 14px;
    }
    .margin {
      margin-top: 20px;
    }
    .dialog-select {
      margin-top: 10px;
      width: 100%;
    }
    .el-dialog__title {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
