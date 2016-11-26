(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.user-modal')
		.factory('User', User);

	User.$inject = ['Restangular'];
	function User(Restangular) {
		var collectionName = "user";
		return Restangular.all(collectionName);
	}
	
})();