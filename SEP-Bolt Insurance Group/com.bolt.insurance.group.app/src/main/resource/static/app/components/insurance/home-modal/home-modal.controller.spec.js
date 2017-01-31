describe('HomeModalController\n',function(){
	var hic,localStorageService,$state,InsuranceProgress,$httpBackend,$crypto;
	
	beforeEach(module('bolt-insurance-group.insurance'));
	
	beforeEach(inject(function($controller,MockGenerator,_$httpBackend_){
		$crypto = MockGenerator.$cryptoMock();
		localStorageService = MockGenerator.localStorageServiceMock();
		$state = MockGenerator.$stateMock();
		InsuranceProgress = MockGenerator.InsuranceProgressMock();
		$httpBackend = _$httpBackend_;

		$httpBackend.when('GET', 'https://localhost:8443/insurance/secret').respond({secret:"password"});
		localStorageService.cookie.set('listOfUsers',[ {
								address : "Bulevar Oslobodjenja ",
								email : "a@Q.COM",
								firstName : "name",
								jmbg : "0712986850023",
								passport : "323423445",
								phone : "234234",
								surname : "lastname"
							}])
		localStorageService.cookie.set('homeOwnerJmbg',"0712986850023")
		hic = $controller('HomeInsuranceController',{
			localStorageService: localStorageService,
			$state: $state,
			InsuranceProgress: InsuranceProgress,
			$crypto:$crypto
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
		expect(hic.submitted).toBe(true);
		expect($state.go).not.toHaveBeenCalled();
		
		//Test ok
		hic.form.$invalid = false;
		hic.roadCheckBox = false;
		spyOn($crypto,'encrypt').and.callThrough();
		$httpBackend.when('GET', 'https://localhost:8443/insurance/secret').respond({secret:"password"});

		hic.next();
		$httpBackend.flush();
		expect($crypto.encrypt).toHaveBeenCalled();
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