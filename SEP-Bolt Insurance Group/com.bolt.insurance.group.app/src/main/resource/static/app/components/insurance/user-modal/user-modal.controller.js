(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.controller('UserModalController', UserModalController);

	UserModalController.$inject = ['$uibModalInstance', 'items', 'User', 'localStorageService'];
	function UserModalController($uibModalInstance, items, User, localStorageService) {
		var umc = this;
		
		umc.ok = ok;
		umc.cancel = cancel;
		umc.submitForm = submitForm;
		umc.checkUserJMBG = checkUserJMBG;
		umc.calculateYearsFromJMBG = calculateYearsFromJMBG;
		umc.editId = items.id;
		umc.listOfUsers = items.list;
		umc.status = items.status;
		umc.submitted = {
				kids: false,
				grownups: false,
				olds: false,
				yesKids: false,
				yesGrownups: false,
				yesOlds: false
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
		
		function ok() {
			$uibModalInstance.close(umc.user);
		}
			
		function cancel() {
			$uibModalInstance.dismiss();
		}
		
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
		
		function checkUserJMBG(status) {
			if(status === '') {
				return;
			} else {
				if(status === 'noKids') {
					umc.submitted.kids = true;
					
				} else if(status === 'noGrownups') {
					umc.submitted.grownups = true;
					
				} else {
					umc.submitted.olds = true;
					
				}
			}
			
			return;
		}
		
		function submitForm() {
			var status = calculateYearsFromJMBG(umc.user);
			checkUserJMBG(status);
			
			if(status === '') {
				$uibModalInstance.close(umc.user);
			}
			
		}	
		
	}
})();