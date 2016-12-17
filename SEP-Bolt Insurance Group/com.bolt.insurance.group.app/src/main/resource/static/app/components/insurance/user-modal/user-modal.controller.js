(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.controller('UserModalController', UserModalController);

	UserModalController.$inject = ['$uibModalInstance', 'items', 'User', 'localStorageService'];
	function UserModalController($uibModalInstance, items, User, localStorageService) {
		var umc = this;
		
		umc.cancel = cancel;
		umc.submitForm = submitForm;
		umc.checkUserJMBG = checkUserJMBG;
		umc.calculateYearsFromJMBG = calculateYearsFromJMBG;
		umc.editId = items.id;
		umc.listOfUsers = items.list;
		umc.status = items.status;
		umc.removeErrors = removeErrors;
		umc.submitted = {
				kids: false,
				grownups: false,
				olds: false,
				yesKids: false,
				yesGrownups: false,
				yesOlds: false,
				jmbgValid: false
		};
		
		umc.kids = localStorageService.cookie.get('kidsNumber');
		umc.grownups = localStorageService.cookie.get('grownupsNumber');
		umc.olds = localStorageService.cookie.get('oldsNumber');
		
		/**
		 * This is because modal dialog is opened to insert new user OR to edit user.
		 * So it needs to know which operation is going to be.
		 */
		if(umc.editId === undefined){
			return;
		}

		umc.user = umc.listOfUsers[umc.editId];
		
		/**
		 * Cancel a modal dialog
		 */
		function cancel() {
			$uibModalInstance.dismiss();
		}
		
		/**
		 * Method for calculating year of birth by users JMBG
		 */
		function calculateYearsFromJMBG(user) {	
		    var bornDate = user.jmbg;
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
				if(umc.kids > 0) {
					umc.kids = umc.kids - 1;
					localStorageService.cookie.set('kidsNumber', umc.kids, 1, true);
				}
				else {
					status ='noKids';
				}
			}else if(years >= 18 && years < 60) {
				if(umc.grownups > 0) {
					umc.grownups = umc.grownups - 1;
					localStorageService.cookie.set('grownupsNumber', umc.grownups, 1, true);
				} else {
					status = 'noGrownups';
				}
			}else{
				if(umc.olds > 0) {
					umc.olds = umc.olds - 1;
					localStorageService.cookie.set('oldsNumber', umc.olds, 1, true);
				} else {
					status = 'noOlds';
				}
			}
			
			return status;
		}
		
		/**
		 * Method for checking which user is inserted and by that getting a informaton on view.
		 */
		function checkUserJMBG(status) {
			if(status === '') {
				return;
			} else {
				if(status === 'noKids') {
					umc.submitted.kids = true;
					
				} else if(status === 'noGrownups') {
					umc.submitted.grownups = true;
					
				} else if(status === 'noOlds'){
					umc.submitted.olds = true;
					
				} else {
					umc.submitted.kids = false;
					umc.submitted.grownups = false;
					umc.submitted.olds = false;
				}
			}
			
			return;
		}
		
		function jmbgValidation(user) {
			var jmbg = user.jmbg;
			
			var day = parseInt(jmbg.substring(0, 2));
			var month = parseInt(jmbg.substring(2, 4));
			
			if(day < 1 || day > 31) {
				umc.submitted.validJmbg = true;
				
			} else if(month < 1 || month > 12) {
				umc.submitted.validJmbg = true;
				
			}
			else {
				umc.submitted.validJmbg = false;
			}
			
			return umc.submitted.validJmbg;
		}
		
		function removeErrors() {
			umc.submitted.kids = false;
			umc.submitted.grownups = false;
			umc.submitted.olds = false;
			umc.submitted.validJmbg = false;
		}
		
		/**
		 * Method for submitting a form
		 */
		function submitForm() {
			
			if(jmbgValidation(umc.user)) {
				return;
			}
			
			var status = calculateYearsFromJMBG(umc.user);
			checkUserJMBG(status);
			
			if(status === '') {
				$uibModalInstance.close(umc.user);
			}
			
		}
	
	}
})();