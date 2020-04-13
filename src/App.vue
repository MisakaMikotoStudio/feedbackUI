<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <el-aside width="200px">
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b">
          <el-menu-item index="/Dashboard" >
            <i class="el-icon-s-home"></i>
            <span slot="title">大盘统计</span>
          </el-menu-item>
          <el-menu-item index="/GroupFeedback" >
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">群反馈</span>
          </el-menu-item>
          <el-menu-item index="/ReportFeedback">
            <i class="el-icon-chat-line-round"></i>
            <span slot="title">报表反馈</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
export default {
  name: 'app',
  data:function(){
    return {

    }
  },
  created(){
    this.$store.dispatch('getAllLabels')
  }
}
</script>

<style lang="scss">
html,body,ul,i,li,a,p,nav,header,h1,h2,div,figure{padding:0px; margin:0px;}
ul,li{list-style:none;}
body{width: 100%;font-family:"微软雅黑","Microsoft YaHei","PingFang SC";}
a{ text-decoration: none; }
a:hover{text-decoration: underline;}
a:any-link{ color: #6c6cff; }
a:-webkit-any-link{ color: #6c6cff; }
button:focus{ outline: none; }
#app{
  .el-menu{
    height: 100%;
  }
  .el-table th.gutter{
    display: table-cell!important;
  }
}
</style>
