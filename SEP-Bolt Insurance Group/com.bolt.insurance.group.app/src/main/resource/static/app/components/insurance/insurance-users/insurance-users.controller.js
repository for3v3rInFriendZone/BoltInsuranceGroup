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
		
		iuc.kids = localStorageService.cookie.get('kids');
		iuc.grownups = localStorageService.cookie.get('grownups');
		iuc.olds = localStorageService.cookie.get('olds');
		
		
		
		
		/**
		 * Opening a modal dialog for a user
		 */
		iuc.newUser = function() {			
			userModal.open().then(function(data) {
				iuc.users.push(data);			
				//iuc.calculateYearsFromJMBG(data);
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
		
		
		iuc.calculateYearsFromJMBG = function(user){	
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
				iuc.personCollection.below18 = iuc.personCollection.below18+1;
			}else if(years >= 18 && years < 60) {
				iuc.personCollection.inBetween18And60 = iuc.personCollection.inBetween18And60+1;
			}else{
				iuc.personCollection.after60 = iuc.personCollection.after60+1;
			}
		    
			
			return iuc.personCollection;
				
		}
	}
	
})();