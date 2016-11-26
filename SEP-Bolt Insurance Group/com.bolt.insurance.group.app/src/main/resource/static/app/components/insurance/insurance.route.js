(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){

	$stateProvider
    .state('insurance', {
    	url: '/insurance',
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
