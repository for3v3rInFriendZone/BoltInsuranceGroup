(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$scope', 'userModal'];
	function InsuranceController($scope, userModal) {
		var inc = this;

		$scope.animateElementIn = function($el) {
			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
		    	$el.removeClass('not-visible');
		     	$el.addClass('animated '+animation);
			}
  		};
  		
  		inc.newUser = function(){
  			userModal.open();

  		};
  		
  		inc.today = new Date();

	}
})();
