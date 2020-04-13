<template>
  <div id="Dashboard">
    <div class="Dashboard-header">
      <div class="searchForm">
        <span style="margin-right:20px;">时间范围</span><!--
     --><el-date-picker
          v-model="date"
          type="daterange"
          value-format='timestamp'
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker><!--
     --><el-button type="primary" style="margin-left: 20px;margin-right: 2px;" @click.native="search">查询</el-button><!--
     --><el-button type="info" @click.native="reset">重置</el-button>
      </div>
    </div>
    <div class="Dashboard-content">
      <div class="statusData">
        <ve-bar :data="statusData" :title="statusTitle" :extend="statusExtend" :settings="statusSettings"></ve-bar>
      </div><!--
   --><div class="LabelData">
        <ve-bar :data="LabelData" :data-zoom="dataZoom"  :title="LabelTitle" :extend="LabelExtend" :settings="LabelSettings"></ve-bar>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name:"Dashboard",
  data:function(){
    let that = this
    return{
      date:'',//选择日期
      statusCounts:0,
      LabelStart: 0,
      LabelEnd: 0,
      statusExtend:{
        legend: {show: false},
        tooltip: {
          formatter: function(value){
            let html = "<div>"
              +"<span style='font-weight: bold;'>"+value[0].name+"</span>"+"<br>"
              + value[0].seriesName + ': ' + value[0].data+"<br>"
              + '百分比: ' + (that.statusCounts?(value[0].data*1.0/that.statusCounts*100).toFixed(2)+'%':'0%')
            +"</div>"
            return html
          }
        }
      },
      statusTitle: {
        top: 10,
        x:'center',
        text: '状态统计',
      },
      statusSettings: {
        metrics: ['统计量'],
        itemStyle: {
          normal:{
            color: new echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ]
            )
          },
          emphasis:{
            color: new echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.5, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                ]
            )
          }

        },
        label: {
      		show: true, //开启显示
      		position: 'insideLeft'
        }
      },
      statusData: {
        columns: ['name','统计量'],
        rows:[]
      },
      statusOptions:["待解决","解决中","已解决","待改进","改进中","已改进"],//状态选项

      LabelCounts:0,
      LabelExtend:{
        legend: {show: false},
        tooltip: {
          formatter: function(value){
            let html = "<div>"
              +"<span style='font-weight: bold;'>"+value[0].name+"</span>"+"<br>"
              + value[0].seriesName + ': ' + value[0].data+"<br>"
              + '百分比: ' + (that.LabelCounts?(value[0].data*1.0/that.LabelCounts*100).toFixed(2)+'%':'0%')
            +"</div>"
            return html
          }
        },
        grid: {
          right: 40
        }
      },
      LabelTitle: {
        top: 10,
        x:'center',
        text: '标签统计',
      },
      LabelSettings: {
        metrics: ['统计量'],
        itemStyle: {
          normal:{
            color: new echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                    {offset: 0, color: '#83bff6'},
                    {offset: 0.5, color: '#188df0'},
                    {offset: 1, color: '#188df0'}
                ]
            )
          },
          emphasis:{
            color: new echarts.graphic.LinearGradient(
                1, 0, 0, 0,
                [
                    {offset: 0, color: '#2378f7'},
                    {offset: 0.5, color: '#2378f7'},
                    {offset: 1, color: '#83bff6'}
                ]
            )
          }

        },
        label: {
      		show: true, //开启显示
      		position: 'insideLeft'
        }
      },
      LabelData: {
        columns: ['name','统计量'],
        rows:[]
      },
      dataZoom: [
        {
          type: 'inside',
          yAxisIndex: [0],
          startValue: 0,
          endValue: 5
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0]
        },
      ]

    }
  },
  created(){
    this.$store.dispatch('getStatus').then(res => {
      this.statusCounts = res.data.count||0
      this.statusOptions.forEach((item, i) => {
        this.statusData.rows.push({
          name: item,
          '统计量': res.data.data[item]?res.data.data[item]:0
        })
      });

    })
    this.$store.dispatch('getLabelCounts').then(res => {
      this.LabelCounts = res.data.count||0
      this.LabelsOptions.forEach((item, i) => {
        this.LabelData.rows.push({
          name: item,
          '统计量': res.data.data[item]?res.data.data[item]:0
        })
      });
      this.LabelData.rows.sort((item1,item2)=>{
        return item2['统计量'] - item1['统计量']
      })
    })
  },
  methods: {

    search(){
      if(this.date.length>0){
        this.statusData.rows = []
        this.$store.dispatch('getStatus',{startTime:this.date[0],endTime:this.date[1]}).then(res => {
          this.statusCounts = res.data.count||0
          this.statusOptions.forEach((item, i) => {
            this.statusData.rows.push({
              name: item,
              '统计量': res.data.data[item]?res.data.data[item]:0
            })
          });
        })
        this.LabelData.rows = []
        this.$store.dispatch('getLabelCounts',{startTime:this.date[0],endTime:this.date[1]}).then(res => {
          this.LabelCounts = res.data.count||0
          this.LabelsOptions.forEach((item, i) => {
            this.LabelData.rows.push({
              name: item,
              '统计量': res.data.data[item]?res.data.data[item]:0
            })
          });
          this.LabelData.rows.sort((item1,item2)=>{
            return item2['统计量'] - item1['统计量']
          })
        })
      }
    },
    reset(){
      this.date = []
      this.statusData.rows = []
      this.$store.dispatch('getStatus').then(res => {
        this.statusCounts = res.data.count||0
        this.statusOptions.forEach((item, i) => {
          this.statusData.rows.push({
            name: item,
            '统计量': res.data.data[item]?res.data.data[item]:0
          })
        });
      })
      this.LabelData.rows = []
      this.$store.dispatch('getLabelCounts').then(res => {
        this.LabelCounts = res.data.count||0
        this.LabelsOptions.forEach((item, i) => {
          this.LabelData.rows.push({
            name: item,
            '统计量': res.data.data[item]?res.data.data[item]:0
          })
        });
        this.LabelData.rows.sort((item1,item2)=>{
          return item2['统计量'] - item1['统计量']
        })
      })
    }
  },
  computed:{
    LabelsOptions(){return this.$store.getters.Labels}
  }
}
</script>

<style lang="scss">
#Dashboard{
  padding: 0 60px;
  min-width: 1200px;
  width: calc(100% - 120px);
  .Dashboard-header{

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
        .el-input__inner:focus{
          border: 1px solid #157ae1;
        }
      }
    }
  }
  .Dashboard-content{
    .statusData{
      vertical-align: top;
      display: inline-block;
      width: calc(50% - 15px);
    }
    .LabelData{
      margin-left: 30px;
      vertical-align: top;
      display: inline-block;
      width: calc(50% - 15px);
    }
  }
}
</style>
