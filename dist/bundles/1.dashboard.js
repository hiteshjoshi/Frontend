webpackJsonp([1],{16:function(a,b){"use strict";a.exports=function(a){a.controller("commonCtrl",["$rootScope","api",function(a,b){}])}},17:function(a,b){"use strict";a.exports=function(a){a.controller("dashboardCtrl",["$scope","api","$state","$http",function(a,b,c,d){a.alerts=[],a.reminders=[],a.plan=null,a.thedetails=null,a.loadSentiments=function(){d.get("http://api.artt.in/?q="+a.sentimentText).success(function(b){a.thedetails={name:"Clifford Shanks",born:1862,died:1906,location:"Petersburg, VA",parents:[{name:"James Shanks",born:1831,died:1884,location:"Petersburg, VA",parents:[{name:"Robert Shanks",born:1781,died:1871,location:"Ireland/Petersburg, VA"},{name:"Elizabeth Shanks",born:1795,died:1871,location:"Ireland/Petersburg, VA"}]},{name:"Ann Emily Brown",born:1826,died:1866,location:"Brunswick/Petersburg, VA",parents:[{name:"Henry Brown",born:1792,died:1845,location:"Montgomery, NC"},{name:"Sarah Houchins",born:1793,died:1882,location:"Montgomery, NC"}]}]},a.sentimentScore={score:b.$.sentimentValue,string:b.$.sentiment},a.sentimentVal=[],a.errorMsg=null,b.dependencies[1].dep.forEach(function(b,c){a.sentimentVal.push({type:b.$.type,dependent:b.dependent._,governor:b.governor._})})}).error(function(b){a.errorMsg=b,a.sentimentVal=null})},b.get("ping",!1,!1,!1,function(b,c){console.log(c),c.data&&c.data.plan.paid?a.plan=c.data:a.alerts.push({type:"info",msg:"Your billing is pending. Please visit billing page and fix this."})}),a.closeAlert=function(b){a.alerts.splice(b,1)},b.get("reminders",!1,!1,!1,function(b,c){c.data&&(a.reminders=c.data.reminders||[],a.network=c.data.network||[])})}])}}});