(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$scope', 'insuranceModal'];
	function InsuranceController($scope, insuranceModal) {
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
  			insuranceModal.open().then(function(data) {
				alert('sadasds');
			});

  		};
	}
})();
