(function() {
	"use strict";

	angular.module('bolt-insurance-group').service('InsuranceProgress',
			InsuranceProgress);

	function InsuranceProgress() {

		this.progressState = {
			steps : 4,
			current : 1
		};

		this.setSteps = function(newSteps) {
			this.progressState.steps = newSteps;
		};
		this.setCurrent = function(newCurrent) {
			this.progressState.current = newCurrent;
		};
		this.getProgressState = function() {
			return this.progressState;
		};
		this.addStep = function() {
			this.progressState.steps += 1;
		};
		this.removeStep = function() {
			this.progressState.steps--;
		};

	}

})();