(function() {
	'use strict';
	
	angular
	.module('bolt-insurance-group')
	.directive('bigProgressBar', bigProgressBar);

	bigProgressBar.$inject = ['$compile','InsuranceProgress'];
	function bigProgressBar($compile,InsuranceProgress) {
		
		return {
			restrict: 'E',
			link: function(scope, element, attrs){    
				var currentElement = element;
				scope.$watch(function () {
				       return InsuranceProgress.progressState;
			     }, function(newVal, oldVal){
	            	
	            		var state = InsuranceProgress.getProgressState();
					
						var width = 100/state.steps;
						
						var template = '<div class="progress" id="progressBar">';		
						for(var i=0;i<state.current;i++){
							template+='<div class="progress-bar progress-bar-success form-control" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+width+'%; background-color: green;">';
							
							var count = i+1;
							if(count==state.current){
								
								//template+='<b style="color: black;" translate="STEP"></b>' + '<b style="color: black;"> '+count+'</b>';
							}
							template+='</div>';
						}
						template+='</div>';		
						var el = $compile(template)(scope);
						// currentElement.replaceWith(el);
	     //        	 	currentElement = el;
	     				currentElement.empty();
	     				currentElement.append(el);
	            	 
				},true);
			}
		};
		
	}
})();