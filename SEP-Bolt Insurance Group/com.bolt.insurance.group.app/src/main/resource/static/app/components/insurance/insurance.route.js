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
    			 templateUrl: 'app/components/insurance/header.html',
    			 controller: 'InsuranceController',
    	         controllerAs: 'inc'
    		},
    		content: {			 
    			 templateUrl: 'app/components/insurance/insurance_users.html',   	
    			 controller: 'InsuranceController',
    	         controllerAs: 'inc'
    		},
    		footer: {
    			 templateUrl: 'app/components/insurance/footer.html',
    			 controller: 'InsuranceController',
    	         controllerAs: 'inc'
    		}
    	}
    })
    .state('total-price', {
    	url:'/insurance/total_price',
	    	views: {
	    		navbar: {
	   			 	templateUrl: 'app/components/insurance/header.html',
	   			 	controller: 'InsuranceController',
	   			 	controllerAs: 'inc'
	    		},
	    		content: {			 
	    			templateUrl: 'app/components/insurance/total-price/total-price.html',   	
	    			controller: 'TotalPriceController',
	    			controllerAs: 'inc'
	    		},
	    		footer: {
	    			templateUrl: 'app/components/insurance/footer.html',
	    			controller: 'InsuranceController',
	    			controllerAs: 'inc'
	    		}
    	}
    });
	
	}
})();
