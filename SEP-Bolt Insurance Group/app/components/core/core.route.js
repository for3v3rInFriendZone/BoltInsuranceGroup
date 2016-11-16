(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.core')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/main');

		$stateProvider
			.state('main', {
				abstract: true,
				views: {
					'header': {
						templateUrl: 'app/components/core/header.html'
					},
					'footer': {
						templateUrl: 'app/components/core/footer.html'
					},
					'core': {
						templateUrl: 'app/components/core/core.html'
					}
				}
			});
	}
})();
