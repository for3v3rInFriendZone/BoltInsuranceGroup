(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance')
		.factory('Insurance', Insurance);

	Insurance.$inject = ['Restangular'];
	function Insurance(Restangular) {
		var collectionName = "insurance";
		return Restangular.all(collectionName);
	}
	
})();