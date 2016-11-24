(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

	$stateProvider
    .state('insurance_users', {
    	url: '/insurance/users',
    	views: {
    		navbar: {
    			 templateUrl: 'app/components/insurance/header.html'
    		},
    		content: {
    			 templateUrl: 'app/components/insurance/insurance_users.html',
    			 controller: 'InsuranceController',
    	         controllerAs: 'inc'
    		},
    		footer: {
    			 templateUrl: 'app/components/insurance/footer.html'
    		}
    	}
    });
	}
})();
