webpackJsonp([0],[function(a,b,c){"use strict";angular.module("app",["mm.foundation","angular-parallax","permission","ngLodash","angularMoment","ngSanitize","angulartics",c(1),"app.core","app.dashboard","app.homepage"]);c(3),c(14),c(26),angular.element(document).ready(function(){angular.bootstrap(document,["app"])})},function(a,b,c){c(2),a.exports="angulartics.google.analytics"},function(a,b){!function(a,b,c){"use strict";b.module("angulartics.google.analytics",["angulartics"]).config(["$analyticsProvider",function(d){d.settings.pageTracking.trackRelativePath=!0,d.settings.ga={additionalAccountNames:c,userId:null},d.registerPageTrack(function(c){a._gaq&&(_gaq.push(["_trackPageview",c]),b.forEach(d.settings.ga.additionalAccountNames,function(a){_gaq.push([a+"._trackPageview",c])})),a.ga&&(d.settings.ga.userId&&ga("set","&uid",d.settings.ga.userId),ga("send","pageview",c),b.forEach(d.settings.ga.additionalAccountNames,function(a){ga(a+".send","pageview",c)}))}),d.registerEventTrack(function(c,e){if(e&&e.category||(e=e||{},e.category="Event"),e.value){var f=parseInt(e.value,10);e.value=isNaN(f)?0:f}if(a.ga){for(var g={eventCategory:e.category,eventAction:c,eventLabel:e.label,eventValue:e.value,nonInteraction:e.noninteraction,page:e.page||a.location.hash.substring(1)||a.location.pathname,userId:d.settings.ga.userId},h=1;20>=h;h++)e["dimension"+h.toString()]&&(g["dimension"+h.toString()]=e["dimension"+h.toString()]),e["metric"+h.toString()]&&(g["metric"+h.toString()]=e["metric"+h.toString()]);ga("send","event",g),b.forEach(d.settings.ga.additionalAccountNames,function(a){ga(a+".send","event",g)})}else a._gaq&&_gaq.push(["_trackEvent",e.category,c,e.label,e.value,e.noninteraction])}),d.registerSetUsername(function(a){d.settings.ga.userId=a})}])}(window,window.angular)},function(a,b,c){"use strict";var d=angular.module("app.core",["ngCookies","ngAnimate","ngTouch","ui.router","base64"]);c(5)(d),c(6)(d),c(7)(d),c(8)(d),c(9)(d),c(4)(d),c(10)(d),c(11)(d),c(12)(d),c(13)(d)},function(a,b){"use strict";a.exports=function(a){a.value("datetimepickerConfig",{}),a.directive("datetimepicker",["$timeout","datetimepickerConfig","moment",function(a,b,c){Date.parseDate=function(a,b){return c(a,b).toDate()},Date.prototype.dateFormat=function(a){return c(this).format(a)};var d={inline:!0,minDate:0,startDate:new Date,todayButton:!0,format:"DD.MM.YYYY h:mm a",formatTime:"h:mm a",formatDate:"DD.MM.YYYY"};return b&&angular.extend(d,b),{restrict:"A",require:"ngModel",scope:{ngModel:"=",baseDate:"=",dateTimepicker:"="},link:function(b,c,e,f){a(function(){var a=angular.extend({},d);angular.element(c).datetimepicker(angular.extend(a,f.$modelValue?f.$modelValue:{}))})}}}])}},function(a,b){a.exports=function(a){a.run(["$rootScope","$state","$stateParams","$http","$cookies","Permission","session",function(a,b,c,d,e,f,g){f.defineRole("anonymous",function(a){return!g.exists()}),f.defineRole("admin",function(a){return g.is_admin}),f.defineRole("user",function(a){return g.exists()}),d.defaults.headers.common.Authorization="Bearer "+e.c2cCookie,a.$state=b,a.$stateParams=c,a.title="We care"}])}},function(a,b){"use strict";a.exports=function(a){a.config(["$locationProvider","$urlRouterProvider","$stateProvider","$controllerProvider","$compileProvider","$filterProvider","$provide","$analyticsProvider","sessionProvider",function(b,c,d,e,f,g,h,i,j){a.controller=e.register,a.directive=f.directive,a.filter=g.register,a.factory=h.factory,a.provider=h.provider,a.service=h.service,a.constant=h.constant,a.value=h.value,i.virtualPageviews(!1),console.log(j.$get().exists(),j.$get().is_admin,j.$get().url),c.otherwise(j.$get().url),d.state("default",{"abstract":!0,url:"",templateUrl:"modules/core/views/layouts/default.html"}).state("dashboard",{"abstract":!0,url:"",templateUrl:"modules/core/views/layouts/dashboard.html"})}])}},function(a,b){"use strict";a.exports=function(a){a.controller("coreSettingsCtrl",["$scope","$rootScope","$window","$timeout","$cookies","viewport","$state","session","$urlRouter",function(a,b,c,d,e,f,g,h,i){a.core={name:"ModerationPanel",version:"0.0.1",settings:{fullScreen:!1,pageLoading:!1,headerFixed:!0,headerSearchForm:!1,sidebarLeftOpen:!1,sidebarLeftFixed:!1,sidebarLeftCollapse:f.width()>=768&&f.width()<992?!0:!1},screen:{xs:f.width()<768?!0:!1,sm:f.width()>=768&&f.width()<992?!0:!1,md:f.width()>=992&&f.width()<1200?!0:!1,lg:f.width()>=1200?!0:!1,height:f.height(),width:f.width()}},b.$on("$stateChangeStart",function(b,c,d,e,f){a.core.settings.sidebarLeftOpen=!1,a.core.settings.pageLoading=!0}),b.$on("$stateChangeSuccess",function(c,d,e){a.core.settings.pageLoading=!1,b.title=d.title}),angular.element(c).on("resize",function(){d.cancel(a.resizing),a.resizing=d(function(){a.core.screen.xs=f.width()<768?!0:!1,a.core.screen.sm=f.width()>=768&&f.width()<992?!0:!1,a.core.screen.md=f.width()>=992&&f.width()<1200?!0:!1,a.core.screen.lg=f.width()>=1200?!0:!1,a.core.screen.height=f.height(),a.core.screen.width=f.width()},100)})}])}},function(a,b){"use strict";a.exports=function(a){a.directive("indicator",["$rootScope","$timeout",function(a,b){return{restrict:"A",replace:!0,templateUrl:"modules/core/views/partials/spinner.html",link:function(c,d,e){b(function(){var b=angular.element(d).parent(".spinner-wrapper");angular.element(d);a.$on("$stateChangeStart",function(){b.addClass("show")}),a.$on("$stateChangeSuccess",function(){b.removeClass("show")})})}}}])}},function(a,b){"use strict";a.exports=function(a){a.directive("particles",["$window",function(a){return{restrict:"A",replace:!0,template:'<div class="particleJs" id="particleJs"></div>',link:function(b,c,d,e){a.particlesJS("particleJs",{particles:{number:{value:100,density:{enable:!0,value_area:700}},color:{value:"#6d6d6d"},shape:{type:"circle",stroke:{width:0,color:"#2d2d2d"},polygon:{nb_sides:6},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.9,random:!1,anim:{enable:!1,speed:1,opacity_min:.5,sync:!1}},size:{value:4,random:!0,anim:{enable:!1,speed:40,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#000000",opacity:.4,width:1},move:{enable:!0,speed:6,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onhover:{enable:!0,mode:"grab"},onclick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{particles_nb:4,distance:140,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:8,speed:3},repulse:{distance:200,duration:.4},push:{particles_nb:4},remove:{particles_nb:2}}},retina_detect:!0})}}}]).directive("tree",["$window",function(a){return{restrict:"A",replace:!0,template:'<div class="chart" id="OrganiseChart6"></div>',link:function(a,b,c,d){function e(a,b){return"M"+a.source.y+","+a.source.x+"H"+a.target.y+"V"+a.target.x+(a.target.children?"":"h"+f.right)}var f={top:0,right:320,bottom:0,left:0},g=960-f.left-f.right,h=500-f.top-f.bottom,i=d3.layout.tree().separation(function(a,b){return a.parent===b.parent?1:.5}).children(function(a){return a.parents}).size([h,g]),j=d3.select(b).append("svg").attr("width",g+f.left+f.right).attr("height",h+f.top+f.bottom).append("g").attr("transform","translate("+f.left+","+f.top+")"),k={name:"Clifford Shanks",born:1862,died:1906,location:"Petersburg, VA",parents:[{name:"James Shanks",born:1831,died:1884,location:"Petersburg, VA",parents:[{name:"Robert Shanks",born:1781,died:1871,location:"Ireland/Petersburg, VA"},{name:"Elizabeth Shanks",born:1795,died:1871,location:"Ireland/Petersburg, VA"}]},{name:"Ann Emily Brown",born:1826,died:1866,location:"Brunswick/Petersburg, VA",parents:[{name:"Henry Brown",born:1792,died:1845,location:"Montgomery, NC"},{name:"Sarah Houchins",born:1793,died:1882,location:"Montgomery, NC"}]}]},l=i.nodes(k),m=(j.selectAll(".link").data(i.links(l)).enter().append("path").attr("class","link").attr("d",e),j.selectAll(".node").data(l).enter().append("g").attr("class","node").attr("transform",function(a){return"translate("+a.y+","+a.x+")"}));m.append("text").attr("class","name").attr("x",8).attr("y",-6).text(function(a){return a.name}),m.append("text").attr("x",8).attr("y",8).attr("dy",".71em").attr("class","about lifespan").text(function(a){return a.born+"–"+a.died}),m.append("text").attr("x",8).attr("y",8).attr("dy","1.86em").attr("class","about location").text(function(a){return a.location})}}}])}},function(a,b){"use strict";a.exports=function(a){a.filter("capitalize",function(){return function(a){return a?a.replace(/([^\W_]+[^\s-]*) */g,function(a){return a.charAt(0).toUpperCase()+a.substr(1).toLowerCase()}):""}})}},function(a,b){"use strict";a.exports=function(a){a.factory("viewport",["$window",function(a){return{height:function(){return window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},width:function(){return window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth}}}])}},function(a,b){"use strict";a.exports=function(a){a.factory("api",["$rootScope","$http",function(a,b){var c="http://api.askparrot.com",d={},e=function(a,b,d){return b&&d?c+"/"+a+"/"+b+"/"+d:b?c+"/"+a+"/"+b:c+"/"+a};return{post:function(a,c,f,g){b.post(e(a,c,!1),f,{headers:d}).success(function(a){g(null,a)}).error(function(a){g(!0,a||"Cannot submit data!")})},put:function(a,c,f,g,h){b.put(e(a,c,f),g,{headers:d}).success(function(a){h(null,a)}).error(function(a){h(!0,a||"There is some problem with your data.")})},get:function(a,c,f,g,h){var i={headers:d};g&&(i.params=g),b.get(e(a,c,f),i).success(function(a){h(null,a)}).error(function(a){h(!0,a||"Some error occured.")})},"delete":function(a,c,f,g){b["delete"](e(a,c,f),{headers:d}).success(function(a){g(null,a)}).error(function(a){g(!0,a||"Some error occured.")})}}}])}},function(a,b){"use strict";a.exports=function(a){a.factory("session",["$rootScope","api","$cookies","$base64","$state",function(a,b,c,d,e){return{exists:function(){function f(a){var b=a.replace("-","+").replace("_","/");switch(b.length%4){case 0:break;case 2:b+="==";break;case 3:b+="=";break;default:throw"Illegal base64url string!"}return d.decode(b)}function g(){var a=c.c2cCookie,b={};if("undefined"!=typeof a){var d=a.split(".")[1];b=JSON.parse(f(d))}else b=null,b=!1;return b}return a.user=g(),a.logout=function(){b.post("logout",!1,!1,function(){a.token=null,delete c.c2cCookie,e.go("default.homepage"),window.location.reload()})},a.token=c.c2cCookie,a.token&&a.user?!0:!1},url:a.token&&a.user?"dashboard":"/",is_admin:a.token&&a.user&&a.user.is_admin?!0:!1,state:a.token&&a.user?"dashboard.index":"default.homepage",allowedState:["default.homepage","default.login","default.signup","default.resources","default.faq","default.contact"],socket:function(){return a.socket=null,a.socket}}}])}},function(a,b,c){"use strict";var d=angular.module("app.dashboard",[]);c(15)(d)},function(a,b,c){"use strict";a.exports=function(a){a.config(["$locationProvider","$urlRouterProvider","$stateProvider","$controllerProvider","$compileProvider","$filterProvider","$provide",function(b,d,e,f,g,h,i){a.controller=f.register,a.directive=g.directive,a.filter=h.register,a.factory=i.factory,a.provider=i.provider,a.service=i.service,a.constant=i.constant,a.value=i.value,e.state("dashboard.index",{url:"/dashboard",templateUrl:"modules/dashboard/views/dashboard.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(1,function(){c(16)(a),c(17)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.reminders",{url:"/reminders",templateUrl:"modules/dashboard/views/reminders.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(2,function(){c(16)(a),c(18)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.members",{url:"/members",templateUrl:"modules/dashboard/views/members.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(3,function(){c(16)(a),c(19)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.ecards",{url:"/ecards",templateUrl:"modules/dashboard/views/ecards.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(4,function(){c(16)(a),c(20)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.history",{url:"/history",templateUrl:"modules/dashboard/views/history.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(5,function(){c(16)(a),c(21)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.account",{url:"/account",templateUrl:"modules/dashboard/views/account_settings.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(6,function(){c(16)(a),c(22)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.billing",{url:"/billing",templateUrl:"modules/dashboard/views/billing_settings.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(7,function(){c(16)(a),c(23)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.admin_users",{url:"/admin_users",templateUrl:"modules/dashboard/views/admin/users.html",data:{permissions:{only:["admin"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(8,function(){c(24)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.admin_plans",{url:"/admin_plans",templateUrl:"modules/dashboard/views/admin/plans.html",data:{permissions:{only:["admin"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(8,function(){c(24)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.admin_ecards",{url:"/admin_ecards",templateUrl:"modules/dashboard/views/admin/ecards.html",data:{permissions:{only:["admin"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(8,function(){c(24)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.admin_settings",{url:"/admin_settings",templateUrl:"modules/dashboard/views/admin/settings.html",data:{permissions:{only:["admin"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(8,function(){c(24)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.admin_index",{url:"/admin_index",templateUrl:"modules/dashboard/views/admin/index.html",data:{permissions:{only:["admin"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(8,function(){c(24)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.paypal",{url:"/paypalConfirm",templateUrl:"modules/dashboard/views/paypal.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(9,function(){c(25)(a),e.resolve()}),e.promise}]}}),e.state("dashboard.paypal_cancel",{url:"/paypalCancel",templateUrl:"modules/dashboard/views/paypal.html",data:{permissions:{only:["user"],redirectTo:"default.login"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(9,function(){c(25)(a),e.resolve()}),e.promise}]}})}])}},,,,,,,,,,,function(a,b,c){"use strict";var d=angular.module("app.homepage",[]);c(27)(d)},function(a,b,c){"use strict";a.exports=function(a){a.config(["$locationProvider","$urlRouterProvider","$stateProvider","$controllerProvider","$compileProvider","$filterProvider","$provide",function(b,d,e,f,g,h,i){a.controller=f.register,a.directive=g.directive,a.filter=h.register,a.factory=i.factory,a.provider=i.provider,a.service=i.service,a.constant=i.constant,a.value=i.value,e.state("default.homepage",{url:"/",templateUrl:"modules/homepage/views/home.html",resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(10,function(){c(28)(a),c(29)(a),c(30)(a),e.resolve()}),e.promise}]}}),e.state("default.login",{url:"/login",templateUrl:"modules/homepage/views/login.html",data:{permissions:{only:["anonymous"],redirectTo:"dashboard.index"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(11,function(){c(29)(a),e.resolve()}),e.promise}]}}),e.state("default.signup",{url:"/signup",templateUrl:"modules/homepage/views/signup.html",data:{permissions:{only:["anonymous"],redirectTo:"dashboard.index"}},resolve:{load:["$q","$rootScope",function(b,d){var e=b.defer();return c.e(12,function(){c(30)(a),e.resolve()}),e.promise}]}})}])}}]);