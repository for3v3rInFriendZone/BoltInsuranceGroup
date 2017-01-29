(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.insurance-users')
		.controller('InsuranceUsersController', InsuranceUsersController);


	InsuranceUsersController.$inject = ['$http', 'userModal', '$state', 'localStorageService','InsuranceProgress', '$crypto'];
	function InsuranceUsersController($http, userModal, $state, localStorageService,InsuranceProgress, $crypto) {

		var iuc = this;
		
		iuc.preEditedUser = {};
		iuc.noMoreUsers = true;
		iuc.submitForm = submitForm;
		
		if(localStorageService.cookie.get('world') == null || localStorageService.cookie.get('world') == undefined) {
			alert('Your session has been timed out. You will be redirected to home page');
			localStorageService.cookie.clearAll();
			$state.go('home');
		}
		
		iuc.users = localStorageService.cookie.get('listOfUsers');
		iuc.kids = localStorageService.cookie.get('kidsNumber');
		iuc.grownups = localStorageService.cookie.get('grownupsNumber');
		iuc.olds = localStorageService.cookie.get('oldsNumber');
		
		if((iuc.kids === '' || iuc.kids == 0 || iuc.kids === null) && (iuc.grownups === '' || iuc.grownups == 0 || iuc.grownups === null) && (iuc.olds === '' || iuc.olds == 0 || iuc.olds === null)) {
			iuc.noMoreUsers = false;
		}
		
		/**
		 * Opening a modal dialog for a user
		 */
		iuc.newUser = function() {			
			userModal.open().then(function(data) {
				if(iuc.users == null) {
					iuc.users = [];
				}
				
				$http.get('https://localhost:8443/insurance/secret')
				.then(function(response) {
					 data.jmbg = $crypto.encrypt(data.jmbg,  response.data.secret);
					 data.passport = $crypto.encrypt(data.passport,  response.data.secret);
					 iuc.users.push(data);
					 localStorageService.cookie.set('listOfUsers', iuc.users, 1, true); 
				});
				
				iuc.usersFlag = false;

				iuc.kids = localStorageService.cookie.get('kidsNumber');
				iuc.grownups = localStorageService.cookie.get('grownupsNumber');
				iuc.olds = localStorageService.cookie.get('oldsNumber');
				
				if((iuc.kids === '' || iuc.kids == 0 || iuc.kids === null) && (iuc.grownups === '' || iuc.grownups == 0 || iuc.grownups === null) && (iuc.olds === '' || iuc.olds == 0 || iuc.olds === null)) {
					iuc.noMoreUsers = false;
				}
			});
		};
		
		/**
		 * When user informations are changed in database, it needs to be
		 * changed on view.
		 */
//		iuc.editUser = function(userId) {
//			
//			iuc.preEditedUser = {};
//			for (var i = 0; i < iuc.users.length; i++) {
//				if (i == userId) {
//					iuc.preEditedUser = angular.copy(iuc.users[i]);
//				}
//			}
//			
//			userModal.edit(iuc.users, userId).then(function(data) {
//				for (var i = 0; i < iuc.users.length; i++) {
//					if (iuc.users[i].id === data.id) {
//						iuc.users[i] = data;
//						break;
//					}
//				}
//			}, function(){
//				for (var i = 0; i < iuc.users.length; i++) {
//					if (i == userId) {
//						iuc.users[i] = iuc.preEditedUser;
//						break;
//					}
//				}
//			});
//		}
		
		/**
		 * Removing a selected user.
		 */
		iuc.removeUser = function(index) {
			calculateYearsFromJMBG(iuc.users[index]);
			iuc.users.splice(index, 1);
			localStorageService.cookie.set('listOfUsers', iuc.users, 1, true);
			iuc.noMoreUsers = true;
		}
		
		
		iuc.back = function() {
			$state.go('total-price');
		}  
		
		function calculateYearsFromJMBG(user) {	
			$http.get('https://localhost:8443/insurance/secret')
			.then(function(response) {
				
				 	var bornDate = $crypto.decrypt(user.jmbg, response.data.secret);
				 	var status = '';
						
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
							iuc.kids = parseInt(iuc.kids);
							iuc.kids = iuc.kids + 1;
							localStorageService.cookie.set('kidsNumber', iuc.kids, 1, true);
					}else if(years >= 18 && years < 60) {
							iuc.grownups = parseInt(iuc.grownups);
							iuc.grownups = iuc.grownups + 1;
							localStorageService.cookie.set('grownupsNumber', iuc.grownups, 1, true);
					}else{
							iuc.olds = parseInt(iuc.olds);
							iuc.olds = iuc.olds + 1;
							localStorageService.cookie.set('oldsNumber', iuc.olds, 1, true);
					}
				
			});
		}
		
		iuc.calculateYearsFromJMBG = calculateYearsFromJMBG;
		
		InsuranceProgress.setCurrent(3);
		
		function submitForm() {
			
			iuc.sumbitted = true;
			
			if((iuc.kids != 0 && iuc.kids != null) || (iuc.grownups != 0 && iuc.grownups != null) || (iuc.olds != 0 && iuc.olds != null)) {
				iuc.usersFlag = true;
				return;
			} else {
				iuc.usersFlag = false;
			}
			
			var home = localStorageService.cookie.get('homeCheckBox');
			var road = localStorageService.cookie.get('roadCheckBox');
			
			if(home){
				$state.go('homeinsurance');
			}else if(road){
				$state.go('vehicleinsurance');
			}else{
				$state.go('payment');
			}
			
		}
		
	}
	
})();