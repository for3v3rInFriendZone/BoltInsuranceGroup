describe('Directive --> bigProgressBar\n',function(){


	var scope,element,InsuranceProgress,$compile,$rootScope; 

	beforeEach(module('bolt-insurance-group'));

	beforeEach(module(function($provide){
			$provide.factory('InsuranceProgress',function(){
				return{
					progressState:{
						steps:5,
						current:2
					},
					getProgressState:function(){
						return this.progressState;
					},
					setProgressState:function(state){
						this.progressState = state;
					}
				}
			})
		}));

	beforeEach(inject(function(_$compile_,_InsuranceProgress_,_$rootScope_) {
		InsuranceProgress = _InsuranceProgress_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	  }));

	it(' should generate progress bar',function(){

		element = angular.element('<big-progress-bar></big-progress-bar>');
		scope = $rootScope.$new();
	    $compile(element)(scope);
	    scope.$digest();

	    var progressBar = element[0].children[0];
	    expect(progressBar).toBeDefined();

	    var progressParts = progressBar.children;
	    expect(progressParts.length).toBe(2);

	    //Element changes dynamically
	    InsuranceProgress.setProgressState({ steps:5, current:4 });
	    scope.$digest();

	    progressParts = element[0].children[0].children;
	    expect(progressParts.length).toBe(4);

	});

});