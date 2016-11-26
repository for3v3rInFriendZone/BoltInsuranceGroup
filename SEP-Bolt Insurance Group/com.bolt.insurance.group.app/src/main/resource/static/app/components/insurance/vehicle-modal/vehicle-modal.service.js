(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.vehicle-modal')
		.factory('Vehicle', Vehicle);

	Vehicle.$inject = ['Restangular'];
	function Vehicle(Restangular) {
		var collectionName = "vehicle";
		return Restangular.all(collectionName);
	}
	
})();