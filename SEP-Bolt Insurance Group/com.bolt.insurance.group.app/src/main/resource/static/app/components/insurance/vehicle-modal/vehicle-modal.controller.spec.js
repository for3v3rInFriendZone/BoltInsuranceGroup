describe('VehicleModalController\n',function(){
	var vic,localStorageService,$state,InsuranceProgress;
	
	beforeEach(module('bolt-insurance-group.insurance'));
	


	beforeEach(inject(function($controller,MockGenerator){
		localStorageService = MockGenerator.localStorageServiceMock();
		$state = MockGenerator.$stateMock();
		InsuranceProgress = MockGenerator.InsuranceProgressMock();
		$http = MockGenerator.$httpMock();
		$crypto = MockGenerator.$cryptoMock();
	
		localStorageService.cookie.set('listOfUsers',[ {
								address : "Bulevar Oslobodjenja ",
								email : "a@Q.COM",
								firstName : "name",
								jmbg : "0712986850023",
								passport : "323423445",
								phone : "234234",
								surname : "lastname"
							}]);
		localStorageService.cookie.set('vehicleOwnerJmbg',"0712986850023");


		vic = $controller('VehicleInsuranceController',{
			localStorageService: localStorageService,
			$state: $state,
			InsuranceProgress: InsuranceProgress,
			$http: $http,
			$crypto: $crypto
		});
	

	}));
	
	
	
	it(' should validate, submit form and go to next state',function(){
		vic.vehicle = {
				ownername:"name",
				ownersurname:"lastName",
				ownerjmbg:"0713986850023",
				typeofvehicle:"type",
				yearofmanufacture:"2013",
				licenceplatesnumber:"123456",
				numberofchassis:"123456"

		};
		vic.form = {$invalid:false};
		//Invalid jmbg
		spyOn($state,'go');
		vic.next();
		expect($state.go).not.toHaveBeenCalled();
		
		//Valid jmbg, invalid form
		vic.vehicle.ownerjmbg = "0712986850023";
		vic.form.$invalid = true;
		vic.next();
		expect($state.go).not.toHaveBeenCalled();
		
		//Test ok
		vic.form.$invalid = false;
		vic.next();
		expect(localStorageService.cookie.get('vehicleOwnerName')).toEqual("name");
		expect(localStorageService.cookie.get('vehicleOwnerSurname')).toEqual("lastName");
		expect(localStorageService.cookie.get('vehicleOwnerJmbg')).toEqual("0712986850023");
		expect(localStorageService.cookie.get('vehicleType')).toEqual("type");
		expect(localStorageService.cookie.get('vehicleYear')).toEqual("2013");
		expect(localStorageService.cookie.get('vehiclePlates')).toEqual("123456");
		expect(localStorageService.cookie.get('vehicleChassis')).toEqual("123456");
		expect($state.go).toHaveBeenCalledWith('payment');
	
		
	});
	
	
	it(' should go to previous step',function(){
		vic.homeCheckBox = true;
		spyOn($state,'go');
		vic.back();
		expect($state.go).toHaveBeenCalledWith('homeinsurance');
		
		vic.homeCheckBox = false;
		vic.back();
		expect($state.go).toHaveBeenCalledWith('insurance-users');
		
	});
	
});