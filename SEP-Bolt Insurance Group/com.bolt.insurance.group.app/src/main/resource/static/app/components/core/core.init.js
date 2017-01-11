(function() {
	"use strict";

	angular
		.module("bolt-insurance-group.core")
		.run(BigRun);

		BigRun.$inject = ['$rootScope'];
		function BigRun($rootScope){

			$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error){
				console.log(error);
			});
		}


})();