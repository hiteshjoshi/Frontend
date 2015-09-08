webpackJsonp([1],{

/***/ 16:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Activities feed controller
	 * @module: app.dashboard
	 * @desc: Show some activity feed
	 */
	module.exports = function (module) {
	  module.controller('commonCtrl', ['$rootScope', 'api', function ($rootScope, api) {
	    	
	    	// $rootScope.logout = function (argument) {
	    	// 	api.post('logout',false,false,function (err,response){
	    	// 		console.log(err,response);
	    	// 	});
	    	// }


	  }]);
	};

/***/ },

/***/ 17:
/***/ function(module, exports) {

	'use strict';

	/**
	 * Activities feed controller
	 * @module: app.account
	 * @desc: Show some activity feed
	 */
	module.exports = function (module) {
	  module.controller('dashboardCtrl', ['$scope', 'api','$state','$http', function ($scope, api,$state,$http) {
	  	$scope.alerts = [];
	  	$scope.reminders = [];
	  	$scope.plan = null;

	    $scope.thedetails = null;

	    



	    $scope.loadSentiments = function(){
	      $http.get('http://api.artt.in/?q='+$scope.sentimentText)
	      .success(function(response){

	        $scope.thedetails = {
	                  "name": "Clifford Shanks",
	                  "born": 1862,
	                  "died": 1906,
	                  "location": "Petersburg, VA",
	                  "parents": [
	                    {
	                      "name": "James Shanks",
	                      "born": 1831,
	                      "died": 1884,
	                      "location": "Petersburg, VA",
	                      "parents": [
	                        {
	                          "name": "Robert Shanks",
	                          "born": 1781,
	                          "died": 1871,
	                          "location": "Ireland/Petersburg, VA"
	                        },
	                        {
	                          "name": "Elizabeth Shanks",
	                          "born": 1795,
	                          "died": 1871,
	                          "location": "Ireland/Petersburg, VA"
	                        }
	                      ]
	                    },
	                    {
	                      "name": "Ann Emily Brown",
	                      "born": 1826,
	                      "died": 1866,
	                      "location": "Brunswick/Petersburg, VA",
	                      "parents": [
	                        {
	                          "name": "Henry Brown",
	                          "born": 1792,
	                          "died": 1845,
	                          "location": "Montgomery, NC"
	                        },
	                        {
	                          "name": "Sarah Houchins",
	                          "born": 1793,
	                          "died": 1882,
	                          "location": "Montgomery, NC"
	                        }
	                      ]
	                    }
	                  ]
	                }

	                
	        $scope.sentimentScore = {
	          score : response.$.sentimentValue,
	          string:response.$.sentiment
	        };
	        $scope.sentimentVal = [];
	        $scope.errorMsg=null;

	        response.dependencies[1].dep.forEach(function(item,index){
	          $scope.sentimentVal.push({
	            type:item.$.type,
	            dependent:item.dependent._,
	            governor:item.governor._
	          });
	        });
	      })
	      .error(function(response){
	        $scope.errorMsg = response;
	        $scope.sentimentVal = null;
	      });

	    };


	  	api.get('ping',false,false,false,function (err,response){

	  		if(err){

	  		}
	      console.log(response);
	  		if(response.data && response.data.plan.paid) {
	  			$scope.plan = response.data;
	  		}
	  		else{
	  			$scope.alerts.push({type:'info',msg:'Your billing is pending. Please visit billing page and fix this.'});
	  		}
	      // if(response.data.plan.user_id.care_giver && response.data.plan.user_id.care_giver.length>0){
	      //   $scope.alerts.push({type:'info',msg:'You have no member in your network, you won\'t be able to add reminders.'});
	      // }
	  	});

	  	$scope.closeAlert = function(index) {
	  		$scope.alerts.splice(index, 1);
	  	};

	  	api.get('reminders',false,false,false,function (err,response){
	      
	  		if(err){

	  		}
	  		if(response.data) {
	  			$scope.reminders = response.data.reminders || [];
	        $scope.network = response.data.network || [];
	  		}
	  	});

	  }]);
	};


/***/ }

});