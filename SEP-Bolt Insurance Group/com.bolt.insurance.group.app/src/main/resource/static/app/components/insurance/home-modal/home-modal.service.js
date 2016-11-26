(function() {
	"use strict";

	angular
		.module('bolt-insurance-group.insurance.home-modal')
		.factory('Home', Home);

	Home.$inject = ['Restangular'];
	function Home(Restangular) {
		var collectionName = "home";
		return Restangular.all(collectionName);
	}
	
})();