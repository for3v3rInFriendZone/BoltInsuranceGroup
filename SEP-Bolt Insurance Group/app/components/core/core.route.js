(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.core')
		.config(config);


	function config($urlRouterProvider, $stateProvider){
		$urlRouterProvider.otherwise("/home");

		$stateProvider
		.state("home", {
			url: '/home',
			views:{

				navbar: {

					templateUrl: "app/components/core/navbar.html"

				},
				content: {

					templateUrl: "app/components/core/main.html"

				},
				footer: {

					templateUrl: "app/components/core/footer.html"

				}

			}
			
			//abstract: true
		});
	}
})();

