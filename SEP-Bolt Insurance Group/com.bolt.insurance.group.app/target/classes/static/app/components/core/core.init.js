(function() {
	"use strict";

	angular
		.module("bolt-insurance-group.core")
		.run(function($rootScope){
			$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
				console.log(error);
			});
		});
})();