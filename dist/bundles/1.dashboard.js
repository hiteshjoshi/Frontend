webpackJsonp([1],{16:function(a,b){"use strict";a.exports=function(a){a.controller("commonCtrl",["$rootScope","api",function(a,b){}])}},17:function(a,b){"use strict";a.exports=function(a){a.controller("dashboardCtrl",["$scope","api","$state",function(a,b,c){a.alerts=[],a.reminders=[],a.plan=null,b.get("ping",!1,!1,!1,function(b,c){console.log(c),c.data&&c.data.plan.paid?a.plan=c.data:a.alerts.push({type:"info",msg:"Your billing is pending. Please visit billing page and fix this."})}),a.closeAlert=function(b){a.alerts.splice(b,1)},b.get("reminders",!1,!1,!1,function(b,c){c.data&&(a.reminders=c.data.reminders||[],a.network=c.data.network||[])})}])}}});