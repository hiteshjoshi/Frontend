webpackJsonp([12],{30:function(a,b){"use strict";a.exports=function(a){a.controller("signUpCtrl",["$scope","$modal","api",function(a,b,c){a.plans=[{_id:"55bfea62f3e913a6422c4df6",paypalId:"",active:!0,plan_type:1,updated:"2015-08-03T22:25:38.646Z",created:"2015-08-03T22:25:38.646Z",users:0,price:1,members:3,reminder:{voice:5,text:5,emails:5},description:"This is only plan I am adding right now, for testing.",name:"Test plan",__v:0},{_id:"55bfea62f3e913a6422c4df6",paypalId:"",active:!0,plan_type:1,updated:"2015-08-03T22:25:38.646Z",created:"2015-08-03T22:25:38.646Z",users:0,price:1,members:3,reminder:{voice:5,text:5,emails:5},description:"This is only plan I am adding right now, for testing.",name:"Test plan",__v:0},{_id:"55bfea62f3e913a6422c4df6",paypalId:"",active:!0,plan_type:1,updated:"2015-08-03T22:25:38.646Z",created:"2015-08-03T22:25:38.646Z",users:0,price:1,members:3,reminder:{voice:5,text:5,emails:5},description:"This is only plan I am adding right now, for testing.",name:"Test plan",__v:0}],a.open=function(a){b.open({templateUrl:"modules/homepage/views/signup-modal.html",controller:"signupModal",resolve:{plan_id:function(){return a}}})}}]),a.controller("signupModal",["$scope","$modalInstance","api","lodash","$cookieStore","plan_id",function(a,b,c,d,e,f){a.showConfirm=!1,a.alerts=[],a.newUser={email:"",password:"",plan_id:f},a.closeAlert=function(b){a.alerts.splice(b,1)},a.enterVerification=function(){a.showConfirm=!0},a.signup=function(){c.post("users",!1,a.newUser,function(b,c){b||(c.error?(a.alerts=[],d.each(c.errors,function(b,c){a.alerts.push({type:"danger",msg:b.msg})})):(a.alerts=[],a.showConfirm=!0))})},a.confirm=function(b){c.post("users","confirm",{validation_code:b},function(b,c){b||(c.error?(a.alerts=[],d.each(c.errors,function(b,c){a.alerts.push({type:"danger",msg:b.msg})})):c.data.token&&(e.put("c2cCookie",c.data.token),window.location.reload()))})},a.ok=function(){b.close(a.selected.item)},a.cancel=function(){b.dismiss("cancel")}}])}}});