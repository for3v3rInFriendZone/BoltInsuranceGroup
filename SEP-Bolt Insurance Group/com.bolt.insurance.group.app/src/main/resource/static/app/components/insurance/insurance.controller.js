(function() {
	'use strict';

	angular.module('bolt-insurance-group.insurance').controller(
			'InsuranceController', InsuranceController);

	InsuranceController.$inject = [ '$scope', 'userModal', 'homeModal',
			'vehicleModal', 'User', 'Restangular', '$translate' ];
	function InsuranceController($scope, userModal, homeModal, vehicleModal,
			User, Restangular, $translate) {

		var inc = this;
		inc.sports = [];
		inc.users = [];
		
		inc.preEditedUser = {};
		inc.preEditedHome = {};
		inc.preEditedVehicle = {};

		inc.homeindicator = 0;
		inc.vehicleindicator = 0;

		inc.homeInsurance = true;
		inc.roadInsurance = true;
		
		$scope.popup1 = {
			opened : false
		};

		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.popup2 = {
			opened : false
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		/**
		 * Options for a datepicker, in this instance, its for setting a min
		 * date.
		 */
		$scope.options = {
			minDate : new Date(),
			showWeeks : true
		};

		/**
		 * When first date is changed, the min date of second date must be of
		 * first date.
		 */
		$scope.$watch("dt1", function(newValue, oldValue) {
			$scope.options2 = {
				minDate : $scope.dt1,
				showWeeks : true
			};
		});

		/**
		 * This is for animations
		 */
		$scope.animateElementIn = function($el) {
			var animation = $el.attr('data-animation');

			// For some browsers, `attr` is undefined; for others, `attr` is
			// false. Check for both.
			if (typeof animation !== typeof undefined && animation !== false) {
				$el.removeClass('not-visible');
				$el.addClass('animated ' + animation);
			}
		}

		/**
		 * Opening a modal dialog for a user
		 */
		inc.newUser = function() {
			userModal.open().then(function(data) {
				inc.users.push(data);
			});
		};

		/**
		 * Opening modal dialog for a home
		 */
		inc.newHome = function() {
			homeModal.open().then(function(data) {
				inc.homeindicator = 1;
				inc.homeInsurance = false;
				inc.home = data;
			});
		};

		/**
		 * Opening modal dialog for a vehicle
		 */
		inc.newVehicle = function() {
			vehicleModal.open().then(function(data) {
				inc.vehicleindicator = 1;
				inc.roadInsurance = false;
				inc.vehicle = data;
			});
		}

		/**
		 * When user informations are changed in database, it needs to be
		 * changed on view.
		 */
		inc.editUser = function(userId) {
			
			inc.preEditedUser = {};
			for (var i = 0; i < inc.users.length; i++) {
				if (i == userId) {
					inc.preEditedUser = angular.copy(inc.users[i]);
				}
			}
			
			userModal.edit(inc.users, userId).then(function(data) {
				for (var i = 0; i < inc.users.length; i++) {
					if (inc.users[i].id === data.id) {
						inc.users[i] = data;
						break;
					}
				}
			}, function(){
				for (var i = 0; i < inc.users.length; i++) {
					if (i == userId) {
						inc.users[i] = inc.preEditedUser;
						break;
					}
				}
			});
		}

		/**
		 * Change locale language
		 */
		$scope.changeLanguage = function(key) {
			$translate.use(key);
		};

		inc.removeUser = function(index) {
			inc.users.splice(index, 1);
		}

		Restangular.all('subgroup').getList({
			'risk.id' : 3
		}).then(function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].risk.id === 3) {
					inc.sports.push(data[i]);
				}
			}
		});

		inc.editHome = function() {
			
			inc.preEditedHome = {};
			inc.preEditedHome = angular.copy(inc.home);
		
			homeModal.edit(inc.home).then(function(data) {
				inc.home = data;
			}, function(){
				inc.home = inc.preEditedHome;
			});
		}

		inc.removeHome = function() {
			inc.homeindicator = 0;
			inc.homeInsurance = true;
			inc.home = {};
		}

		inc.editVehicle = function() {
			
			inc.preEditedVehicle = {};
			inc.preEditedVehicle = angular.copy(inc.vehicle);
			
			vehicleModal.edit(inc.vehicle).then(function(data) {
				inc.vehicle = data;
			}, function(){
				inc.vehicle = inc.preEditedVehicle;
			});
		}

		inc.removeVehicle = function() {
			inc.vehicleindicator = 0;
			inc.roadInsurance = true;
			inc.vehicle = {};
		}
		
	}

})();
