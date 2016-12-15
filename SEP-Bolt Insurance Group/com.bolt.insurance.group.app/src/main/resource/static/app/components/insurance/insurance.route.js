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
									templateUrl : 'app/components/insurance/header.html'
								},
								content : {
									templateUrl : 'app/components/insurance/insurance_users.html',
									controller : 'InsuranceController',
									controllerAs : 'inc'
									
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
									
								
								}
							}
						})
				.state(
						'homeinsurance',
						{
							url : '/insurance/home',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html'

								},
								content : {
									templateUrl : 'app/components/insurance/home-modal/home-modal.html',
									controller : 'HomeInsuranceController',
									controllerAs : 'hic'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
								
								}
							}
						})
				.state(
						'vehicleinsurance',
						{
							url : '/insurance/vehicle',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html'
								},
								content : {
									templateUrl : 'app/components/insurance/vehicle-modal/vehicle-modal.html',
									controller : 'VehicleInsuranceController',
									controllerAs : 'vic'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
									
								}
							}
						})
				.state(
						'total-price',
						{
							url : '/insurance/total_price',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html'
								},
								content : {
									templateUrl : 'app/components/insurance/total-price/total-price.html',
									controller : 'TotalPriceController',
									controllerAs : 'tpc'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
									
								}
							}
						})
				.state(
						'insurance-users',
						{
							url : '/insurance/users',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html'
								},
								content : {
									templateUrl : 'app/components/insurance/insurance-users/insurance-users.html',
									controller : 'InsuranceUsersController',
									controllerAs : 'iuc'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
									
								}
							}
						})
				.state(
						'payment-response-success',
						{
							url : '/insurance/payment_response_success',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/payment-response/navbar.html'
								},
								content : {
									templateUrl : 'app/components/insurance/payment-response/payment-response-success.html',
									controller : 'PaymentResponseController',
									controllerAs : 'prc'
								},
								footer : {
									templateUrl : 'app/components/insurance/payment-response/footer.html'
								}
							}
						})
				.state(
						'payment-response-error',
						{
							url : '/insurance/payment_response_error',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/payment-response/navbar.html'
								},
								content : {
									templateUrl : 'app/components/insurance/payment-response/payment-response-error.html',
									controller : 'PaymentResponseController',
									controllerAs : 'prc'
								},
								footer : {
									templateUrl : 'app/components/insurance/payment-response/footer.html'
								}
							}
						})
				.state(
						'payment',
						{
							url : '/insurance/payment',
							views : {
								navbar : {
									templateUrl : 'app/components/insurance/header.html'
								},
								content : {
									templateUrl : 'app/components/insurance/payment/payment.html',
									controller : 'PaymentInsuranceController',
									controllerAs : 'pic'
								},
								footer : {
									templateUrl : 'app/components/insurance/footer.html'
								}
							}
						});
	}
})();
