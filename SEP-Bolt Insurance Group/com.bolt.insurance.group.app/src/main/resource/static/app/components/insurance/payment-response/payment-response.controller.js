
(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.payment-response')
		.controller('PaymentResponseController', PaymentResponseController);

	PaymentResponseController.$inject = ['$scope', '$translate', 'localStorageService'];
	function PaymentResponseController($scope, $translate, localStorageService) {

		$scope.animateElementIn = function($el) {

			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
		    	$el.removeClass('not-visible');
		     	$el.addClass('animated '+animation);
			}	
  		};
  		
  		localStorageService.cookie.clearAll();
		
	}

})();