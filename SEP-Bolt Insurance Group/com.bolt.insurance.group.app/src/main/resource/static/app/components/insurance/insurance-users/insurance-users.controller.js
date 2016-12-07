(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.insurance-users')
		.controller('InsuranceUsersController', InsuranceUsersController);

	InsuranceUsersController.$inject = ['userModal', '$state', 'localStorageService'];
	function InsuranceUsersController(userModal, $state, localStorageService) {
		var iuc = this;
		
		iuc.users = [];
		iuc.preEditedUser = {};
		iuc.submitted = {
				kids: false,
				grownups: false,
				olds: false,
				yesKids: false,
				yesGrownups: false,
				yesOlds: false
		};
		
		iuc.kids = localStorageService.cookie.get('kidsNumber');
		iuc.grownups = localStorageService.cookie.get('grownupsNumber');
		iuc.olds = localStorageService.cookie.get('oldsNumber');
		
		/**
		 * Opening a modal dialog for a user
		 */
		iuc.newUser = function() {			
			userModal.open().then(function(data) {
				iuc.users.push(data);
				iuc.checkUserJMBG(data);
			});
		};
		
		/**
		 * When user informations are changed in database, it needs to be
		 * changed on view.
		 */
		iuc.editUser = function(userId) {
			
			iuc.preEditedUser = {};
			for (var i = 0; i < iuc.users.length; i++) {
				if (i == userId) {
					iuc.preEditedUser = angular.copy(iuc.users[i]);
				}
			}
			
			userModal.edit(iuc.users, userId).then(function(data) {
				for (var i = 0; i < iuc.users.length; i++) {
					if (iuc.users[i].id === data.id) {
						iuc.users[i] = data;
						break;
					}
				}
			}, function(){
				for (var i = 0; i < iuc.users.length; i++) {
					if (i == userId) {
						iuc.users[i] = iuc.preEditedUser;
						break;
					}
				}
			});
		}
		
		/**
		 * Removing a selected user.
		 */
		iuc.removeUser = function(index) {
			iuc.users.splice(index, 1);
		}
		
		
		iuc.back = function() {
			$state.go('total-price');
		}
		  
		/*
		iuc.next = function(){
			if($scope.homeCheckBox) {
				$state.go('homeinsurance');
			}
			else if($scope.roadCheckBox) {
				$state.go('vehicleinsurance');
			}
			
		}*/
		
		iuc.calculateYearsFromJMBG = function(user) {	
		    var bornDate = user.jmbg;
		    var status = {
		    		code: '',
		    		require: ''
		    };
				
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
				if(iuc.kids > 0) {
					iuc.kids = iuc.kids - 1;
					localStorageService.cookie.set('kidsNumber', iuc.kids, 1, true);
				}
				else {
					status.code ='noKids';
					
					if(iuc.grownups > 0) {
						status.require = 'yesGrownups';
					} else if(iuc.olds > 0) {
						status.require = 'yesOlds';
					}
				}
			}else if(years >= 18 && years < 60) {
				if(iuc.grownups > 0) {
					iuc.grownups = iuc.grownups - 1;
					localStorageService.cookie.set('grownupsNumber', iuc.grownups, 1, true);
				} else {
					status.code = 'noGrownups';
					
					if(iuc.kids > 0) {
						status.require = 'yesKids';
					} else if(iuc.olds > 0) {
						status.require = 'yesOlds';
					}
				}
			}else{
				if(iuc.olds > 0) {
					iuc.olds = iuc.olds - 1;
					localStorageService.cookie.set('oldsNumber', iuc.olds, 1, true);
				} else {
					status.code = 'noOlds';
					
					if(iuc.kids > 0) {
						status.require = 'yesKids';
					} else if(iuc.grownups > 0) {
						status.require = 'yesGrownups';
					}
				}
			}
			
			return status;
		}
		
		iuc.checkUserJMBG = function(user) {
			var status = iuc.calculateYearsFromJMBG(user);
			
			if(status.code === '') {
				return;
			} else {
				if(status.code === 'noKids') {
					iuc.submitted.kids = true;
					
					if(status.required === 'yesGrownups') {
						iuc.submitted.yesGrownups = true;
					} else {
						iuc.submitted.yesOlds = true;
					}
				} else if(status.code === 'noGrownups') {
					iuc.submitted.grownups = true;
					
					if(status.required === 'yesKids') {
						iuc.submitted.yesKids = true;
					} else {
						iuc.submitted.yesOlds = true;
					}
				} else {
					iuc.submitted.olds = true;
					
					if(status.required === 'yesKids') {
						iuc.submitted.yesKids = true;
					} else {
						iuc.submitted.yesGrownups = true;
					}
				}
			}
			
			return;
		}
		
	}
	
})();