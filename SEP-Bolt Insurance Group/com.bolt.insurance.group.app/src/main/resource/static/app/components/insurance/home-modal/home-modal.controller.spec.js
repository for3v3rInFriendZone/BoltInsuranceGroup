describe('HomeModalController\n',function(){
	var hic,localStorageService,$state,InsuranceProgress;
	
	beforeEach(module('bolt-insurance-group.insurance'));
	
	beforeEach(inject(function($controller,MockGenerator){
		localStorageService = MockGenerator.localStorageServiceMock();
		$state = MockGenerator.$stateMock();
		InsuranceProgress = MockGenerator.InsuranceProgressMock();
		hic = $controller('HomeInsuranceController',{
			localStorageService: localStorageService,
			$state: $state,
			InsuranceProgress: InsuranceProgress
		});
		
	}));
	
	//Test controller init
	it(' should validate, submit form and go to next state',function(){
		
		hic.home = {
				ownername : "ownerName",
				ownersurname : "lastName",
				ownerjmbg : "0713986850023",
				address : "ownerAddress"	
		}
		
		hic.form = {$invalid:false};
		
		//Invalid jmbg
		spyOn($state,'go');
		hic.next();
		expect($state.go).not.toHaveBeenCalled();
		
		//Valid jmbg, invalid form
		hic.home.ownerjmbg = "0712986850023";
		hic.form.$invalid = true;
		hic.next();
		expect($state.go).not.toHaveBeenCalled();
		
		//Test ok
		hic.form.$invalid = false;
		hic.roadCheckBox = false;
		
		hic.next();
		
		expect(localStorageService.cookie.get('homeOwnerName')).toEqual("ownerName");
		expect(localStorageService.cookie.get('homeOwnerSurname')).toEqual("lastName");
		expect(localStorageService.cookie.get('homeOwnerJmbg')).toEqual("0712986850023");
		expect(localStorageService.cookie.get('homeAdress')).toEqual("ownerAddress");
		expect($state.go).toHaveBeenCalledWith('payment');
		
		hic.roadCheckBox = true;
		hic.next();
		expect($state.go).toHaveBeenCalledWith('vehicleinsurance');
	});
	
	it(' should go to previous step',function(){
		spyOn($state,'go');
		hic.back();
		expect($state.go).toHaveBeenCalledWith('insurance-users');
	});
	
});