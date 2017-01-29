(function() {
	"use strict";

	angular.module('bolt-insurance-group.insurance').service('MockGenerator',
			MockGenerator);

	MockGenerator.$inject = [ '$q' ];
	function MockGenerator($q) {

		return {

			InsuranceProgressMock : function() {

				return {
					setSteps : function() {
					},
					setCurrent : function() {
					},
					addStep : function() {
					},
					removeStep : function() {
					}
				}

			},

			localStorageServiceMock : function() {
				return {

					cookie : {
						count : 0,
						isSupported : true,
						get : function(mock) {

							var obj = this.storage[mock];

							if (typeof obj !== 'undefined') {
								return obj;
							} else {
								return 'mock value ' + this.count++;
							}

						},
						storage : {

							money : '',
							kids : '',
							grownups : '',
							olds : '',
							date1 : '',
							date2 : '',
							sportCheckBox : false,
							selectedSport : false,
							homeCheckBox : false,
							roadCheckBox : false,
							towingCheckBox : false,
							repairCheckBox : false,
							hotelCheckBox : false,
							alternativeCheckBox : false,
							fireCheckBox : false,
							floodCheckBox : false,
							theftCheckBox : false,
							earthshakerCheckBox : false,
							homeArea : '',
							ageOfHome : '',
							estimatedValueOfHome : '',
							kidsNumber : '0',
							grownupsNumber : '0',
							oldsNumber : '0',
							listOfUsers : []
						},
						set : function(name, value, a, b) {

							this.storage[name] = value;

						}

					}

				}
			},

			$stateMock : function() {
				return {
					current : 'payment',
					go : function(newState) {
						this.current = newState;
					}

				};

			},

			$translateMock : function() {
				return {
					current : 'en',
					use : function(key) {
						if (key) {
							this.current = key;
						} else {
							return this.current;
						}

					}

				};

			},

			$fancyModalMock : function() {
				return {
					open : function(obj) {

					}

				};

			},

			userModalMock : function() {
				// timeout returns promise
				return {
					open : function() {
					}
				}
			},

			$uibModalInstanceMock : function() {
				return {
					dismiss:function(){},
					close:function(){}
				}
			},
			itemsMock : function() {
				return {
					status : 'new'
				}
			},
			UserMock : function() {
			},
			$uibModalMock:function(){
				return{
					open:function(){}
				}
			}

		// $uibModalInstance, items, User

		}

	}

})();