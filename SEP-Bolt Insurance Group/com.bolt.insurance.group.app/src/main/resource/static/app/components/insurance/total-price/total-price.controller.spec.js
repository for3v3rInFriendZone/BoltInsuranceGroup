describe('TotalPriceController\n',function(){
	var scope,tpc,$state;
	beforeEach(module('bolt-insurance-group.insurance'));
	
	// Create controller
	beforeEach(inject(function($rootScope,$controller,MockGenerator){
		
		scope = $rootScope.$new();
		$state = MockGenerator.$stateMock();
		tpc = $controller("TotalPriceController", {
			
			$scope:scope,
			$translate:MockGenerator.$translateMock(),
			InsuranceProgress: MockGenerator.InsuranceProgressMock(),
			localStorageService: MockGenerator.localStorageServiceMock(),
			$state: $state
		
		});
		
	}));
	
	it(' shold change state',function(){
		spyOn($state,'go');
		tpc.next();
		expect($state.go).toHaveBeenCalledWith('insurance-users');
		
	});
	
});
