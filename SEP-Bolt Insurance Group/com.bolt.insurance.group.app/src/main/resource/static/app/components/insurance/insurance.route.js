(function() {
	"use strict";

	angular.module('bolt-insurance-group.insurance').config(config);

	config.$inject = [ '$urlRouterProvider', '$stateProvider' ];
	function config($urlRouterProvider, $stateProvider) {

		$stateProvider
				.state(
						'insurance',
						{
							url : '/insurance',
							views : {

								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/insurance_users.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						})
				.state(
						'homeinsurance',
						{
							url : '/homeinsurance',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/home-modal/home-modal.html',
									controller : 'HomeInsuranceController',
									controllerAs : 'hic'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						})
				.state(
						'vehicleinsurance',
						{
							url : '/vehicleinsurance',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/vehicle-modal/vehicle-modal.html',
									controller : 'VehicleInsuranceController',
									controllerAs : 'vic'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						})
				.state(
						'total-price',
						{
							url : '/insurance/total_price',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/total-price/total-price.html',
									controller : 'TotalPriceController',
									controllerAs : 'tpc'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						})
				.state(
						'insurance-users',
						{
							url : '/insurance/users',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/insurance-users/insurance-users.html',
									controller : 'InsuranceUsersController',
									controllerAs : 'iuc'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						})
				.state(
						'payment-response',
						{
							url : '/insurance/payment_response',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								},
								content : {
									templateUrl : 'app/components/insurance/payment-response/payment-response.html',
									controller : 'PaymentResponseController',
									controllerAs : 'prc'
								},
								footer : {
									templateUrl : 'app/components/insurance/payment-response/footer.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
								}
							}
						});
	}
})();
