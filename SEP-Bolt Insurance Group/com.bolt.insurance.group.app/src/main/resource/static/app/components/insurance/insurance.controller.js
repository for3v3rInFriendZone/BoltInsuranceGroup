(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$scope', 'userModal', 'homeModal', 'vehicleModal'];
	function InsuranceController($scope, userModal, homeModal, vehicleModal) {
		var inc = this;
		 $scope.options = {
			minDate: new Date(),
			showWeeks: true
		 };
		 
		  $scope.popup1 = {
				    opened: false
		  };
		 
		 $scope.open1 = function() {
			    $scope.popup1.opened = true;
		 };
		 
		 $scope.popup2 = {
				    opened: false
		  };
		 
		 $scope.open2 = function() {
			    $scope.popup2.opened = true;
		 };

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
  		
  		inc.newHome = function() {
			homeModal.open();
		}
  		
  		inc.newVehicle = function() {
  			vehicleModal.open();
		}
  		
  		inc.today = new Date();
  		var now = new Date();
  		
  		
  		$scope.$watch("inc.today", function(newValue, oldValue) {
  		    if(inc.today.getTime() < now.getTime()) {
  		    	alert('nece da moze.');
  		    	inc.today = new Date();
  		    }
  		});

	}
})();
