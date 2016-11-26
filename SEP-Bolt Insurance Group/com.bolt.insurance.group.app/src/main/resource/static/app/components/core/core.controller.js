(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.core')
		.controller('BigController', BigController);

	BigController.$inject = ['$scope', '$http', 'Restangular'];
	function BigController($scope, $http, Restangular) {

		$scope.animateElementIn = function($el) {

			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
		    	$el.removeClass('not-visible');
		     	$el.addClass('animated '+animation);
			}
			
			
  		};
  		
  		/* Ovo je bio test za RESTAngular
		var test = Restangular.all('user');
		test.getList().then(function(users) {
			  $scope.allAccounts = users;
			});
		*/
  		
	}
})();
