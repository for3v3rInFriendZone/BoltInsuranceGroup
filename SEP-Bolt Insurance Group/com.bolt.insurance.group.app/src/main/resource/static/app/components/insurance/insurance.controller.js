(function() {
	'use strict';

	angular.module('bolt-insurance-group.insurance').controller(
			'InsuranceController', InsuranceController);

	InsuranceController.$inject = [ '$scope', '$state','userModal', 'homeModal',
			'vehicleModal', 'Insurance', 'Restangular', '$translate', '$fancyModal', 'localStorageService'];
	function InsuranceController($scope, $state, userModal, homeModal, vehicleModal,
			Insurance, Restangular, $translate, $fancyModal, localStorageService) {

		var inc = this;
		
		inc.world = localStorageService.cookie.get('world');
		inc.money = localStorageService.cookie.get('money');
		inc.kids = localStorageService.cookie.get('kids');
		inc.grownups = localStorageService.cookie.get('grownups');
		inc.olds = localStorageService.cookie.get('olds');
		inc.dt1 = new Date(parseInt(localStorageService.cookie.get('date1')));
		inc.dt2 = new Date(parseInt(localStorageService.cookie.get('date2')));
		inc.sportCheckBox = localStorageService.cookie.get('sportCheckBox');
		inc.selectedSport = localStorageService.cookie.get('selectedSport');
		inc.homeCheckBox = localStorageService.cookie.get('homeCheckBox');
		inc.roadCheckBox = localStorageService.cookie.get('roadCheckBox');
		inc.towing = localStorageService.cookie.get('towingCheckBox');
		inc.repair = localStorageService.cookie.get('repairCheckBox');
		inc.hotel = localStorageService.cookie.get('hotelCheckBox');
		inc.alternative = localStorageService.cookie.get('alternativeCheckBox');
		inc.fire = localStorageService.cookie.get('fireCheckBox');
		inc.flood = localStorageService.cookie.get('floodCheckBox');
		inc.theft = localStorageService.cookie.get('theftCheckBox');
		inc.earthshake = localStorageService.cookie.get('earthshakerCheckBox');
		inc.homearea = localStorageService.cookie.get('homeArea');
		inc.ageofhome = localStorageService.cookie.get('ageOfHome');
		inc.estimatedvalueofhome = localStorageService.cookie.get('estimatedValueOfHome');
		
		

		inc.sports = [];
		inc.users = [];
		inc.personCollection = {
		    	below18: 0,
		    	inBetween18And60: 0,
		    	after60: 0
		}
		
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
		$scope.$watch("inc.dt1", function(newValue, oldValue) {			
			if(inc.dt2.getTime() < inc.dt1.getTime()) {
				inc.dt2 = inc.dt1;
			}
			$scope.options2 = {
				minDate : inc.dt1,
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
				inc.calculateYearsFromJMBG(data);
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

		/**
		 * Removing a selected user.
		 */
		inc.removeUser = function(index) {
			inc.users.splice(index, 1);
		}

		/**
		 * Getting data for a sport risk.
		 */
		Restangular.all('subgroup').getList({
			'risk.id' : 4
		}).then(function(data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].risk.id === 4) {
					inc.sports.push(data[i]);
				}
			}
		});

		/**
		 * Method to edit a home.
		 */
		inc.editHome = function() {
			
			inc.preEditedHome = {};
			inc.preEditedHome = angular.copy(inc.home);
		
			homeModal.edit(inc.home).then(function(data) {
				inc.home = data;
			}, function(){
				inc.home = inc.preEditedHome;
			});
		}

		/**
		 * Removing a selected home.
		 */
		inc.removeHome = function() {
			inc.homeindicator = 0;
			inc.homeInsurance = true;
			inc.home = {};
		}

		/**
		 * Editing a selected vehicle
		 */
		inc.editVehicle = function() {
			
			inc.preEditedVehicle = {};
			inc.preEditedVehicle = angular.copy(inc.vehicle);
			
			vehicleModal.edit(inc.vehicle).then(function(data) {
				inc.vehicle = data;
			}, function(){
				inc.vehicle = inc.preEditedVehicle;
			});
		}

		/**
		 * Removing a selected vehicle
		 */
		inc.removeVehicle = function() {
			inc.vehicleindicator = 0;
			inc.roadInsurance = true;
			inc.vehicle = {};
		}
		  
		inc.calculateYearsFromJMBG = function(user){	
		    var bornDate = user.jmbg;
				
			if(parseInt(bornDate.substring(4,7)) < 800){
				bornDate = bornDate.substring(0,2) + "/" + bornDate.substring(2,4) + "/2" + bornDate.substring(4,7);
			}else{
				bornDate = bornDate.substring(0,2) + "/" + bornDate.substring(2,4) + "/1" + bornDate.substring(4,7);
			}
				
			bornDate = new Date(bornDate.substring(6,10), parseInt(bornDate.substring(3,5))-1, bornDate.substring(0,2));
			var today = new Date();
			var checkDate = today - bornDate;
				
			var years = Math.floor(checkDate / 31556952000);
				
			if(years < 18) {
				inc.personCollection.below18 = inc.personCollection.below18+1;
			}else if(years >= 18 && years < 60) {
				inc.personCollection.inBetween18And60 = inc.personCollection.inBetween18And60+1;
			}else{
				inc.personCollection.after60 = inc.personCollection.after60+1;
			}
		    
			
			return inc.personCollection;
				
		}
		
		/**
		 * Opens dialog for more information about vehicle insurance
		 */
		inc.openV = function(){
			 $fancyModal.open({ templateUrl: 'app/components/insurance/insurance-info/vehicleInfoInsurance.html'});   
		}
		
		inc.openH = function() {
			$fancyModal.open({ templateUrl: 'app/components/insurance/insurance-info/homeInsuranceInfo.html'});   
		}
		
		inc.submitForm = function() {
			inc.submitted = true;
			if(inc.form.$invalid) {
				return;
			}
			
			if((inc.kids === '' || inc.kids == 0) && (inc.grownups === '' || inc.grownups == 0) && (inc.olds === '' || inc.olds == 0)) {
				inc.submittedUsers = true;
				return;
			}
			
			if(localStorageService.cookie.isSupported){
				localStorageService.cookie.set('world', inc.world, 1, true);
				localStorageService.cookie.set('money', inc.money, 1, true);
				localStorageService.cookie.set('kids', inc.kids, 1, true);
				localStorageService.cookie.set('grownups', inc.grownups, 1, true);
				localStorageService.cookie.set('olds', inc.olds, 1, true);
				localStorageService.cookie.set('date1', inc.dt1.getTime(), 1, true);
				localStorageService.cookie.set('date2', inc.dt2.getTime(), 1, true);
				localStorageService.cookie.set('sportCheckBox', inc.sportCheckBox, 1, true);
				localStorageService.cookie.set('selectedSport', inc.selectedSport, 1, true);
				localStorageService.cookie.set('homeCheckBox', inc.homeCheckBox, 1, true);
				localStorageService.cookie.set('roadCheckBox', inc.roadCheckBox, 1, true);	
				localStorageService.cookie.set('towingCheckBox', inc.towing, 1, true);
				localStorageService.cookie.set('repairCheckBox', inc.repair, 1, true);
				localStorageService.cookie.set('hotelCheckBox', inc.hotel, 1, true);
				localStorageService.cookie.set('alternativeCheckBox', inc.alternative, 1, true);
				localStorageService.cookie.set('fireCheckBox', inc.fire, 1, true);
				localStorageService.cookie.set('floodCheckBox', inc.flood, 1, true);
				localStorageService.cookie.set('theftCheckBox', inc.theft, 1, true);
				localStorageService.cookie.set('earthshakerCheckBox', inc.earthshake, 1, true);
				localStorageService.cookie.set('homeArea', inc.homearea, 1, true);
				localStorageService.cookie.set('ageOfHome', inc.ageofhome, 1, true);
				localStorageService.cookie.set('estimatedValueOfHome', inc.estimatedvalueofhome, 1, true);
				
				localStorageService.cookie.set('kidsNumber', inc.kids, 1, true);
				localStorageService.cookie.set('grownupsNumber', inc.grownups, 1, true);
				localStorageService.cookie.set('oldsNumber', inc.olds, 1, true);
				
				
			}
			
			
			$state.go('total-price');
		}
		
		inc.closeOthers = function() {
			if(inc.homeCheckBox === false) {
				inc.fire = false;
				inc.flood = false;
				inc.theft = false;
				inc.earthshaker = false;
				inc.homearea = '';
				inc.ageofhome = '';
				inc.estimatedvalueofhome = '';
			}
			if(inc.roadCheckBox === false) {
				inc.towing = false;
				inc.repair = false;
				inc.hotel = false;
				inc.alternative = false;
			}
			if(inc.sportCheckBox === false) {
				inc.selectedSport = '';
			}
		}
		
		
		var getSteps = function(){
			var newSteps = $scope.progress.steps;
			if(inc.homeCheckBox){
				newSteps++;
			}
			if(inc.roadCheckBox){
				newSteps++;
			}
			return newSteps;
		}
		
		var getVehicleStepNumber = function(){
			return (inc.homeCheckBox)?5:4;
		}
		$scope.progress = {steps:4,current:1};
		if($state.current.name=='total-price'){
			$scope.progress = {steps:getSteps(),current:2};
		}
		if($state.current.name=='insurance-users'){
			$scope.progress = {steps:getSteps(),current:3};
		}
		if($state.current.name=='homeinsurance'){
			$scope.progress = {steps:getSteps(),current:4};
		}
		if($state.current.name=='vehicleinsurance'){
			$scope.progress = {steps:getSteps(),current:getVehicleStepNumber()};
		}
		
		
		
	}

})();
