webpackJsonp([5],{0:function(t,e,a){a("j1ja"),t.exports=a("NHnr")},"0jtv":function(t,e){},GBNf:function(t,e){},JXTs:function(t,e,a){"use strict";var n=a("mvHQ"),r=a.n(n),i={name:"index",data:function(){return{tableData:[],statusOptions:["杨友良","周峰"],searchForm:{commiter:"",handler:"",desc:"",solution:"",status:"",createTime:[]},currentPage:1,pageSize:10,total:0,filterData:[],allData:[],sortFunction:"",addDialogStatus:!1,addForm:{commiter:"",handler:"",status:"",desc:"",solution:""}}},mounted:function(){var t=this;this.$store.dispatch("getTableData").then(function(e){t.allData=e.data,t.filterData=JSON.parse(r()(e.data)),t.total=t.allData.length,t.total>=t.pageSize?t.setTableData(t.allData.slice(0,t.pageSize)):t.setTableData(t.allData)})},methods:{addCommit:function(){var t=this;if(""!==this.addForm.commiter)if(""!==this.addForm.handler)if(""!==this.addForm.status)if(""!==this.addForm.desc)if(""!==this.addForm.solution){var e=this,a=this.$message({message:"正在提交",iconClass:"el-icon-loading",duration:0});this.$store.dispatch("addTableData",this.addForm).then(function(n){setTimeout(function(){a.close(),e.$message.success("添加成功"),e.addDialogStatus=!1},250),t.$store.dispatch("getTableData").then(function(e){t.allData=e.data,t.reset()})}).catch(function(t){a.close(),e.$message.error("添加失败")})}else this.$message.error("解决方案不能为空");else this.$message.error("描述不能为空");else this.$message.error("请选择状态");else this.$message.error("跟进处理人不能为空");else this.$message.error("反馈人不能为空")},showAddDialog:function(){this.addForm={commiter:"",handler:"",status:"",desc:"",solution:""},this.addDialogStatus=!0},setTableData:function(t){var e=this,a=t;t.forEach(function(t,a){e.$set(t,"commiterEdit",!1),e.$set(t,"handlerEdit",!1),e.$set(t,"statusEdit",!1),e.$set(t,"descEdit",!1),e.$set(t,"solutionEdit",!1)}),this.$set(this,"tableData",a)},commit:function(t,e){var a=this,n=this,r=this.$message({message:"请稍等",iconClass:"el-icon-loading",duration:0});this.$store.dispatch("updateTableData",{id:t.id,commiter:t.commiter,handler:t.handler,status:t.status,desc:t.desc,solution:t.solution}).then(function(i){t.updateTime=(new Date).getTime(),t[e+"Edit"]=!1,setTimeout(function(){r.close(),n.$message.success("修改成功")},250),a.$store.dispatch("getTableData").then(function(t){a.allData=t.data})}).catch(function(t){r.close(),a.$message.error("修改失败");var e=a.currentPage;a.total>=e*a.pageSize?a.setTableData(a.filterData.slice((e-1)*a.pageSize,e*a.pageSize)):a.setTableData(a.filterData.slice((e-1)*a.pageSize,a.total))})},search:function(){this.$refs.commiter.columnConfig.order="",this.$refs.handler.columnConfig.order="",this.$refs.createTime.columnConfig.order="",this.$refs.updateTime.columnConfig.order="",this.sortFunction="",this.filterData=JSON.parse(r()(this.filter(this.allData))),this.total=this.filterData.length,this.total>=this.pageSize?this.setTableData(this.filterData.slice(0,this.pageSize)):this.setTableData(this.filterData),this.currentPage=1},handleSizeChange:function(t){this.pageSize=t,this.total=this.filterData.length,this.total>=this.pageSize?this.setTableData(this.filterData.slice(0,this.pageSize)):this.setTableData(this.filterData),this.currentPage=1,this.$message.info("当前每页"+this.pageSize+"条数据")},handleCurrentChange:function(t){this.currentPage=t,this.total>=t*this.pageSize?this.setTableData(this.filterData.slice((t-1)*this.pageSize,t*this.pageSize)):this.setTableData(this.filterData.slice((t-1)*this.pageSize,this.total))},filter:function(t){var e=this,a=t;if(""!==this.searchForm.commiter){var n=new RegExp(this.searchForm.commiter);a=a.filter(function(t){return t.commiter.match(n)})}if(""!==this.searchForm.handler){var r=new RegExp(this.searchForm.handler);a=a.filter(function(t){return t.handler.match(r)})}if(""!==this.searchForm.status&&(a=a.filter(function(t){return t.status==e.searchForm.status})),""!==this.searchForm.desc){var i=new RegExp(this.searchForm.desc);a=a.filter(function(t){return t.desc.match(i)})}if(""!==this.searchForm.solution){var s=new RegExp(this.searchForm.solution);a=a.filter(function(t){return t.solution.match(s)})}return this.searchForm.createTime.length>0&&(a=a.filter(function(t){return t.createTime>=e.searchForm.createTime[0].getTime()&&t.createTime<=e.searchForm.createTime[1].getTime()+864e5})),a},sort:function(t){if(!this.sortFunction||!this.sortFunction.order)return t;switch(this.sortFunction.column.label){case"反馈人":return"ascending"==this.sortFunction.order?t.sort(function(t,e){return t.commiter.localeCompare(e.commiter,"zh-CN")}):t.sort(function(t,e){return e.commiter.localeCompare(t.commiter,"zh-CN")});case"跟进反馈人":return"ascending"==this.sortFunction.order?t.sort(function(t,e){return t.handler.localeCompare(e.handler,"zh-CN")}):t.sort(function(t,e){return e.handler.localeCompare(t.handler,"zh-CN")});case"创建时间":return"ascending"==this.sortFunction.order?t.sort(function(t,e){return t.createTime-e.createTime}):t.sort(function(t,e){return e.createTime-t.createTime});case"更新时间":return"ascending"==this.sortFunction.order?t.sort(function(t,e){return t.updateTime-e.updateTime}):t.sort(function(t,e){return e.updateTime-t.updateTime})}},reset:function(){this.$refs.commiter.columnConfig.order="",this.$refs.handler.columnConfig.order="",this.$refs.createTime.columnConfig.order="",this.$refs.updateTime.columnConfig.order="",this.sortFunction="",this.searchForm={commiter:"",handler:"",desc:"",solution:"",status:"",createTime:[]},this.filterData=JSON.parse(r()(this.filter(this.allData))),this.total=this.filterData.length,this.total>=this.pageSize?this.setTableData(this.filterData.slice(0,this.pageSize)):this.setTableData(this.filterData),this.currentPage=1},sortChange:function(t){this.sortFunction=t,this.filterData=this.sort(this.filterData),this.total=this.filterData.length,this.total>=this.pageSize?this.setTableData(this.filterData.slice(0,this.pageSize)):this.setTableData(this.filterData),this.currentPage=1},dblhandleCurrentChange:function(t,e,a,n){switch(e.label){case"反馈人":t.commiterEdit=!0;break;case"跟进反馈人":t.handlerEdit=!0;break;case"状态":t.statusEdit=!0;break;case"描述":t.descEdit=!0;break;case"解决方案":t.solutionEdit=!0}}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"index"}},[a("div",{staticClass:"index-header"},[a("div",{staticClass:"searchForm"},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("反馈人")]),a("el-input",{model:{value:t.searchForm.commiter,callback:function(e){t.$set(t.searchForm,"commiter",e)},expression:"searchForm.commiter"}}),a("span",{staticStyle:{margin:"0 10px"}},[t._v("跟进处理人")]),a("el-input",{model:{value:t.searchForm.handler,callback:function(e){t.$set(t.searchForm,"handler",e)},expression:"searchForm.handler"}}),a("span",{staticStyle:{margin:"0 10px"}},[t._v("描述")]),a("el-input",{model:{value:t.searchForm.desc,callback:function(e){t.$set(t.searchForm,"desc",e)},expression:"searchForm.desc"}}),a("span",{staticStyle:{margin:"0 10px"}},[t._v("解决方案")]),a("el-input",{model:{value:t.searchForm.solution,callback:function(e){t.$set(t.searchForm,"solution",e)},expression:"searchForm.solution"}})],1),t._v(" "),a("div",{staticClass:"searchForm"},[a("span",{staticStyle:{"margin-right":"10px",display:"inline-block",width:"42px"}},[t._v("状态")]),a("el-select",{attrs:{placeholder:""},model:{value:t.searchForm.status,callback:function(e){t.$set(t.searchForm,"status",e)},expression:"searchForm.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}),1),a("span",{staticStyle:{margin:"0 10px",display:"inline-block",width:"70px"}},[t._v("创建时间")]),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始月份","end-placeholder":"结束月份"},model:{value:t.searchForm.createTime,callback:function(e){t.$set(t.searchForm,"createTime",e)},expression:"searchForm.createTime"}}),a("el-button",{staticStyle:{"margin-left":"20px","margin-right":"2px"},attrs:{type:"primary"},nativeOn:{click:function(e){return t.search(e)}}},[t._v("查询")]),a("el-button",{staticStyle:{"margin-right":"2px"},attrs:{type:"info"},nativeOn:{click:function(e){return t.reset(e)}}},[t._v("重置")]),a("el-button",{attrs:{type:"success"},nativeOn:{click:function(e){return t.showAddDialog(e)}}},[t._v("新增")])],1)]),t._v(" "),a("div",{staticClass:"tableData"},[a("el-table",{ref:"ContentTable",staticClass:"ContentTable",attrs:{"row-key":"id",data:t.tableData,border:"","default-expand-all":"",height:"704"},on:{"cell-dblclick":t.dblhandleCurrentChange,"sort-change":t.sortChange}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"64"}}),t._v(" "),a("el-table-column",{ref:"commiter",attrs:{label:"反馈人",sortable:"","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.commiterEdit?[a("el-input",{nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.commit(e.row,"commiter")}},model:{value:e.row.commiter,callback:function(a){t.$set(e.row,"commiter",a)},expression:"scope.row.commiter"}})]:[a("div",{domProps:{innerHTML:t._s(e.row.commiter)}})]]}}])}),t._v(" "),a("el-table-column",{ref:"handler",attrs:{label:"跟进反馈人",sortable:"","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.handlerEdit?[a("el-input",{nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.commit(e.row,"handler")}},model:{value:e.row.handler,callback:function(a){t.$set(e.row,"handler",a)},expression:"scope.row.handler"}})]:[a("div",{domProps:{innerHTML:t._s(e.row.handler)}})]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.statusEdit?[a("el-select",{attrs:{placeholder:""},nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.commit(e.row,"status")}},model:{value:e.row.status,callback:function(a){t.$set(e.row,"status",a)},expression:"scope.row.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}),1)]:[a("div",{domProps:{innerHTML:t._s(e.row.status)}})]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"描述","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.descEdit?[a("el-input",{nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.commit(e.row,"desc")}},model:{value:e.row.desc,callback:function(a){t.$set(e.row,"desc",a)},expression:"scope.row.desc"}})]:[a("div",{domProps:{innerHTML:t._s(e.row.desc)}})]]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"解决方案","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.solutionEdit?[a("el-input",{nativeOn:{keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.commit(e.row,"solution")}},model:{value:e.row.solution,callback:function(a){t.$set(e.row,"solution",a)},expression:"scope.row.solution"}})]:[a("div",{domProps:{innerHTML:t._s(e.row.solution)}})]]}}])}),t._v(" "),a("el-table-column",{ref:"createTime",attrs:{label:"创建时间",sortable:"",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.$formatTime(e.row.createTime,"yyyy-MM-dd"))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{ref:"updateTime",attrs:{label:"更新时间",sortable:"",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.$formatTime(e.row.updateTime,"yyyy-MM-dd"))+"\n        ")]}}])})],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,15,20,25],"page-size":t.pageSize,background:"",layout:"total, sizes, prev, pager, next",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{staticClass:"dialog",attrs:{center:"",visible:t.addDialogStatus,title:"新增一条数据"},on:{"update:visible":function(e){t.addDialogStatus=e}}},[a("p",{staticClass:"dialog-title"},[t._v("反馈人")]),t._v(" "),a("el-input",{staticClass:"input-focus",attrs:{placeholder:""},model:{value:t.addForm.commiter,callback:function(e){t.$set(t.addForm,"commiter",e)},expression:"addForm.commiter"}}),t._v(" "),a("p",{staticClass:"dialog-title margin"},[t._v("跟进处理人")]),t._v(" "),a("el-input",{staticClass:"input-focus",attrs:{placeholder:""},model:{value:t.addForm.handler,callback:function(e){t.$set(t.addForm,"handler",e)},expression:"addForm.handler"}}),t._v(" "),a("p",{staticClass:"dialog-title margin"},[t._v("状态")]),t._v(" "),a("el-select",{staticClass:"dialog-select",attrs:{placeholder:"请选择"},model:{value:t.addForm.status,callback:function(e){t.$set(t.addForm,"status",e)},expression:"addForm.status"}},t._l(t.statusOptions,function(t){return a("el-option",{key:t,attrs:{label:t,value:t}})}),1),t._v(" "),a("p",{staticClass:"dialog-title margin"},[t._v("描述")]),t._v(" "),a("el-input",{staticClass:"input-focus",attrs:{placeholder:"",autosize:{minRows:2},type:"textarea"},model:{value:t.addForm.desc,callback:function(e){t.$set(t.addForm,"desc",e)},expression:"addForm.desc"}}),t._v(" "),a("p",{staticClass:"dialog-title margin"},[t._v("解决方案")]),t._v(" "),a("el-input",{staticClass:"input-focus",attrs:{placeholder:"",autosize:{minRows:2},type:"textarea"},model:{value:t.addForm.solution,callback:function(e){t.$set(t.addForm,"solution",e)},expression:"addForm.solution"}}),t._v(" "),a("div",{staticClass:"dialog-btn"},[a("p",{staticClass:"cancel",on:{click:function(e){t.addDialogStatus=!1}}},[t._v("取消")]),t._v(" "),a("P",{staticClass:"confirm",on:{click:t.addCommit}},[t._v("添加")])],1)],1)],1)},staticRenderFns:[]};a("VU/8")(i,s,!1,function(t){a("0jtv")},null,null).exports},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),r=(a("7t+N"),{render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"app"}},[a("el-container",{staticStyle:{height:"100vh"}},[a("el-aside",{attrs:{width:"200px"}},[a("el-menu",{attrs:{"default-active":t.$route.path,"background-color":"#545c64","text-color":"#fff",router:!0,"active-text-color":"#ffd04b"}},[a("el-menu-item",{attrs:{index:"/Dashboard"}},[a("i",{staticClass:"el-icon-s-home"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("大盘统计")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/GroupFeedback"}},[a("i",{staticClass:"el-icon-chat-dot-round"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("群反馈")])]),t._v(" "),a("el-menu-item",{attrs:{index:"/ReportFeedback"}},[a("i",{staticClass:"el-icon-chat-line-round"}),t._v(" "),a("span",{attrs:{slot:"title"},slot:"title"},[t._v("报表反馈")])])],1)],1),t._v(" "),a("el-container",[a("el-main",[a("router-view")],1)],1)],1)],1)},staticRenderFns:[]});var i=a("VU/8")({name:"app",data:function(){return{}},created:function(){this.$store.dispatch("getAllLabels")}},r,!1,function(t){a("GBNf")},null,null).exports,s=a("YaEn"),o=a("NYxO"),l={Labels:function(t){return t.app.Labels}},c=a("//Fk"),u=a.n(c),d=a("mtWM"),m=a.n(d),h=m.a.create({baseURL:"http://127.0.0.1:8001/",timeout:1e4}),f=[],p=m.a.CancelToken;h.interceptors.request.use(function(t){return t.cancelToken=new p(function(e){f.push({u:t.url+"&"+t.method,f:e})}),t},function(t){console.log(t),u.a.reject(t)}),h.interceptors.response.use(function(t){return function(t){for(var e in f)f[e].u===t.url+"&"+t.method&&(f[e].f(),f.splice(e,1))}(t.config),t},function(t){return u.a.reject(t)});var g=h;var v={state:{Labels:[]},mutations:{SET_LABELS:function(t,e){t.Labels=e}},actions:{addLabel:function(t,e){var a=t.commit;return new u.a(function(t,n){(function(t){return g({url:"/label/add",method:"post",params:t})})(e).then(function(e){var n=e.data;a("SET_LABELS",n.data),t(n)}).catch(function(t){n(t)})})},getAllLabels:function(t,e){var a=t.commit;return new u.a(function(t,e){g({url:"/label/getAll",method:"get"}).then(function(e){var n=e.data;a("SET_LABELS",n.data),t(n)}).catch(function(t){e(t)})})},getTableData:function(t,e){t.commit;return new u.a(function(t,a){(function(t){return g({url:"/data/query",method:"get",params:t})})(e).then(function(e){var a=e.data;t(a)}).catch(function(t){a(t)})})},updateTableData:function(t,e){t.commit;return new u.a(function(t,a){var n;(n=e,g({url:"/data/modify",method:"post",data:n})).then(function(e){var a=e.data;t(a)}).catch(function(t){a(t)})})},addTableData:function(t,e){t.commit;return new u.a(function(t,a){var n;(n=e,g({url:"/data/add",method:"post",data:n})).then(function(e){var a=e.data;t(a)}).catch(function(t){a(t)})})}}};var b={state:{},mutations:{},actions:{getLabelCounts:function(t,e){t.commit;return new u.a(function(t,a){(function(t){return g({url:"/count/labels",method:"get",params:t})})(e).then(function(e){var a=e.data;t(a)}).catch(function(t){a(t)})})},getStatus:function(t,e){t.commit;return new u.a(function(t,a){(function(t){return g({url:"/count/status",method:"get",params:t})})(e).then(function(e){var a=e.data;t(a)}).catch(function(t){a(t)})})}}};n.default.use(o.a);var _=new o.a.Store({modules:{app:v,Dashboard:b},getters:l}),F=(a("j1ja"),a("vO7p")),k=a.n(F),D=a("zL8q"),y=a.n(D);a("tvR6");n.default.use(k.a),n.default.use(y.a),n.default.config.productionTip=!1,n.default.prototype.$formatTime=function(t,e){if(!t)return"";var a=new Date(t),n=a.getFullYear(),r=a.getMonth()+1;r=r<10?"0"+r:r;var i=a.getDate();i=i<10?"0"+i:i;var s=a.getHours();s=s<10?"0"+s:s;var o=a.getMinutes();o=o<10?"0"+o:o;var l=a.getSeconds();l=l<10?"0"+l:l;var c=n+"-"+r+"-"+i;return"yyyy-MM-dd"==e?c:c+" "+(s+":"+o+":"+l)},new n.default({el:"#app",router:s.a,store:_,components:{App:i},template:"<App/>"})},YaEn:function(t,e,a){"use strict";(function(t){var n=a("7+uW"),r=a("/ocq");a("JXTs");n.default.use(r.a);var i=[{path:"/",name:"/",redirect:"/Dashboard"},{path:"/Dashboard",name:"Dashboard",component:function(){return a.e(0).then(a.bind(null,"pRJt"))}},{path:"/GroupFeedback",name:"GroupFeedback",component:function(){return a.e(3).then(a.bind(null,"/yAa"))}},{path:"/ReportFeedback",name:"ReportFeedback",component:function(){return a.e(1).then(a.bind(null,"GEWs"))}},{path:"*",name:"404",component:function(){return a.e(2).then(a.bind(null,"VdfP"))}}];e.a=new r.a({mode:"history",linkActiveClass:"active",base:t,scrollBehavior:function(t,e,a){return a||{x:0,y:0}},routes:i})}).call(e,"/")},tvR6:function(t,e){}},[0]);
//# sourceMappingURL=app.1e1fa9d9b015bb18b402.js.map