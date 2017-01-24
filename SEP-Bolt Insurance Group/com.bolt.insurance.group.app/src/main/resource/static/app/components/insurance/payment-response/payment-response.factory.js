(function(){
	'use strict'
	
	angular
	.module('bolt-insurance-group.insurance.payment-response')
	.factory('PaymentFactory', PaymentFactory);
		
	PaymentFactory.$inject = ['$http'];
	function PaymentFactory($http){
		var getKey = function() {
			return $http({method:"GET", url:"https://localhost:8443/insurance/secret"})
		        	.then(function(result){
		        		return result.data.secret;
		        	});
		};
	
	
	    return { getKey: getKey };
	};
})();