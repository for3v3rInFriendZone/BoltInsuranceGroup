(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance')
		.config(config);


	config.$inject = ['$urlRouterProvider', '$stateProvider'];
	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
    .state('insurance', {
      url: '/insurance',
      views: {
        navbar: {

          templateUrl: "app/components/insurance/header.html"

        },
        content: {

          templateUrl: "app/components/insurance/insuranceForm.html"

        },
        footer: {

          templateUrl: "app/components/insurance/footer.html"

        }
      }
    });
	}
})();
