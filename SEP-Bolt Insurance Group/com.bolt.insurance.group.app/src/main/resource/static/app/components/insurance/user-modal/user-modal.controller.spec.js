describe('UserModalController\n',function(){
	var umc,$uibModalInstance,items,User,localStorageService;
	beforeEach(module('bolt-insurance-group.insurance'));

	beforeEach(inject(function($controller,MockGenerator){
		
		$uibModalInstance = MockGenerator.$uibModalInstanceMock();
		items = MockGenerator.itemsMock();
		User = MockGenerator.UserMock();
		localStorageService = MockGenerator.localStorageServiceMock();
		
		umc = $controller('UserModalController',{
			
			$uibModalInstance : $uibModalInstance,
			items : items,
			User : User,
			localStorageService: localStorageService
			
		});
		
		
	}));
	
	it(' should close dialog',function(){
		
		spyOn($uibModalInstance,'dismiss');
		umc.cancel();
		expect($uibModalInstance.dismiss).toHaveBeenCalled();
		
	});
	
	it(' should update number of users left for input',function(){
		
		var user1 =  {
				address : "Bulevar Oslobodjenja ",
				email : "a@Q.COM",
				firstName : "name",
				jmbg : "0712986850023",
				passport : "323423445",
				phone : "234234",
				surname : "lastname"
			};
		var user2 =  {
				address : "Bulevar Oslobodjenja ",
				email : "a@Q.COM",
				firstName : "name",
				jmbg : "0101005850029",
				passport : "323423445",
				phone : "234234",
				surname : "lastname"
			};
		var user3 =  {
				address : "Bulevar Oslobodjenja ",
				email : "a@Q.COM",
				firstName : "name",
				jmbg : "0101945850029",
				passport : "323423445",
				phone : "234234",
				surname : "lastname"
			};
		
		umc.grownups = '4';
		umc.kids = '1';
		
		umc.calculateYearsFromJMBG(user1);
		expect(umc.grownups).toBe(3);
		
		umc.calculateYearsFromJMBG(user2);
		expect(umc.kids).toBe(0);
		
		var status = umc.calculateYearsFromJMBG(user2);
		expect(status).toEqual('noKids');
		
		umc.grownups = '0';
		status = umc.calculateYearsFromJMBG(user1);
		expect(status).toEqual('noGrownups');
		
		umc.olds = '0';
		status = umc.calculateYearsFromJMBG(user3);
		expect(status).toEqual('noOlds');
	});
	
	it(' should set flag if inserting group of users is complete',function(){
	
		var status = 'noKids';
		
		umc.checkUserJMBG(status);
		expect(umc.submitted.kids).toBe(true);
		expect(umc.submitted.grownups).toBe(false);
		expect(umc.submitted.olds).toBe(false);
		
		status = 'noGrownups';
		umc.checkUserJMBG(status);
		expect(umc.submitted.kids).toBe(true);
		expect(umc.submitted.grownups).toBe(true);
		expect(umc.submitted.olds).toBe(false);
		
		status = '';
		umc.checkUserJMBG(status);
		expect(umc.submitted.kids).toBe(true);
		expect(umc.submitted.grownups).toBe(true);
		expect(umc.submitted.olds).toBe(false);
		
		status = 'noOlds';
		umc.checkUserJMBG(status);
		expect(umc.submitted.kids).toBe(true);
		expect(umc.submitted.grownups).toBe(true);
		expect(umc.submitted.olds).toBe(true);
	});
	
	it(' should validate user JMBG',function(){
		var user1 =  {
				address : "Bulevar Oslobodjenja ",
				email : "a@Q.COM",
				firstName : "name",
				jmbg : "0712986850023",
				passport : "323423445",
				phone : "234234",
				surname : "lastname"
			};
		
		var isInvalidJMBG = umc.jmbgValidation(user1);
		expect(isInvalidJMBG).toBe(false);
		
		user1.jmbg = "0732986850023"
		isInvalidJMBG = umc.jmbgValidation(user1);
		expect(isInvalidJMBG).toBe(true);
	});
	
	it(' should reset error flags',function(){
		umc.submitted.kids = true;
		umc.submitted.grownups = true;
		umc.submitted.olds = true;
		umc.submitted.invalidJmbg = true;
		
		umc.removeErrors();
		
		expect(umc.submitted.kids).toBeFalsy();
		expect(umc.submitted.grownups).toBeFalsy();
		expect(umc.submitted.olds).toBeFalsy();
		expect(umc.submitted.invalidJmbg).toBeFalsy();
	});
	
	it(' should submit form',function(){
		var user1 =  {
				address : "Bulevar Oslobodjenja ",
				email : "a@Q.COM",
				firstName : "name",
				jmbg : "0713986850023",
				passport : "323423445",
				phone : "234234",
				surname : "lastname"
			};
		//Invalid jmbg
		umc.user = user1;
		
		spyOn($uibModalInstance,'close');
		umc.submitForm();
		expect($uibModalInstance.close).not.toHaveBeenCalled();
		
		//Valid jmbg, already inserted all grownups
		umc.user.jmbg = "0712986850023";
		umc.grownups = "0";
		umc.submitForm();
		expect($uibModalInstance.close).not.toHaveBeenCalled();
		
		//Ok
		umc.grownups = "1";
		umc.submitForm();
		expect($uibModalInstance.close).toHaveBeenCalled();
	});
	
});


