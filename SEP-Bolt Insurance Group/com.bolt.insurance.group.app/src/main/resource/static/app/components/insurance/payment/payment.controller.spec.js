describe("PaymentController\n",function(){
	var pic,localStorageService,$state,InsuranceProgress;
	
	beforeEach(module('bolt-insurance-group.insurance'));
	
	// Create controller
	beforeEach(inject(function($controller,MockGenerator) {
		localStorageService = MockGenerator.localStorageServiceMock();
		$state = MockGenerator.$stateMock();
		InsuranceProgress = MockGenerator.InsuranceProgressMock();
		
		localStorageService.cookie.set('listOfUsers',[ {
								address : "Bulevar Oslobodjenja ",
								email : "a@Q.COM",
								firstName : "name",
								jmbg : "0712986850023",
								passport : "323423445",
								phone : "234234",
								surname : "lastname"
							}]);
		
		pic = $controller("PaymentInsuranceController", {
			localStorageService:localStorageService,
			$state:$state,
			InsuranceProgress:InsuranceProgress
		});
	}));
	
	
	it(' should change states',inject(function(){
		
		localStorageService.cookie.set('homeCheckBox',true);
		localStorageService.cookie.set('roadCheckBox',true);
		pic.back();
		
		expect($state.current).toEqual('vehicleinsurance');
		
		localStorageService.cookie.set('homeCheckBox',true);
		localStorageService.cookie.set('roadCheckBox',false);
		pic.back();
		
		expect($state.current).toEqual('homeinsurance');
		
		localStorageService.cookie.set('homeCheckBox',false);
		localStorageService.cookie.set('roadCheckBox',true);
		pic.back();
		
		expect($state.current).toEqual('vehicleinsurance');
		
		localStorageService.cookie.set('homeCheckBox',false);
		localStorageService.cookie.set('roadCheckBox',false);
		pic.back();
		
		expect($state.current).toEqual('insurance-users');
		
	}));
	
	
});