webpackJsonp([11],{27:function(a,b){"use strict";a.exports=function(a){a.controller("loginCtrl",["$scope","api","$http","$cookieStore",function(a,b,c,d){a.errors=!1,a.login=function(){b.post("users","login",{email:a.email,password:a.password},function(b,c){b||c.error?(a.errors=!0,a.success=!1,a.errorMessage=c.userMessage||"Server error."):(a.errors=!1,a.success=!0,a.successMessage=c.userMessage||"Success.",c.data&&c.data.token&&(d.put("c2cCookie",c.data.token),window.location.reload()))})}}])}}});