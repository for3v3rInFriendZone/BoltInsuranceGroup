(function() {
	'use strict';
	
	angular
	.module('bolt-insurance-group')
	.directive('bigProgressBar', bigProgressBar);

	bigProgressBar.$inject = ['$compile','$translate'];
	function bigProgressBar($compile,$translate) {
		
		return {
			restrict: 'E',
			scope: {
				bigProgress:'='
			},
			link: function(scope, element, attrs){    
				scope.$watch('bigProgress', function(newVal, oldVal){
	            	
	            	
						var width = 100/scope.bigProgress.steps;
						
						var template = '<div class="progress" id="progressBar">'		
						for(var i=0;i<scope.bigProgress.current;i++){
							template+='<div class="progress-bar form-control" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+width+'%; background-color: green;">';
							
							var count = i+1;
							if(count==scope.bigProgress.current){
								
								template+='<b style="color: black;" translate="STEP"></b>' + '<b style="color: black;"> '+count+'</b>';
							}
							template+='</div>';
						}
						template+='</div>';		
						var el = $compile(template)(scope);
						element.append(el);
	            	 
				},true);
			}
		}
		
	}
})();