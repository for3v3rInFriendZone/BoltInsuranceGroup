(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.core')
		.controller('BigController', BigController);

	BigController.$inject = ['$scope', '$http'];
	function BigController($scope, $http) {

		$http.get('http://localhost:8080/core')
		.success(function(data, status, header)
		{
			alert(data.name);
		});

		$scope.animateElementIn = function($el) {

			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
		    	$el.removeClass('not-visible');
		     	$el.addClass('animated '+animation);
			}


  		};
	}
})();
