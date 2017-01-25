describe("InsuranceController\n",function(){
	var insuranceCtrl,scope,$httpBackend,$fancyModal,$state,InsuranceProgress;
	var spec = this;
	beforeEach(module('bolt-insurance-group.insurance'));
	// Mock services
	beforeEach(module(function($provide){
		$provide.factory('localStorageService', function(){
			return {
				
				cookie: {
					count:0,
					isSupported:true,
					get: function(mock){
						
						var obj = this.storage[mock];
						
						if(typeof obj !== 'undefined'){
							return obj;
						}else{
							return 'mock value ' + this.count++;
						}
					
					},
					storage:{
						
						money:'',
						kids:'',
						grownups:'',
						olds:'',
						date1:'',
						date2:'',
						sportCheckBox:false,
						selectedSport:false,
						homeCheckBox:false,
						roadCheckBox:false,
						towingCheckBox:false,
						repairCheckBox:false,
						hotelCheckBox:false,
						alternativeCheckBox:false,
						fireCheckBox:false,
						floodCheckBox:false,
						theftCheckBox:false,
						earthshakerCheckBox:false,
						homeArea:'',
						ageOfHome:'',
						estimatedValueOfHome:''
					},
					set: function(name,value){
						
						this.storage[name] = value;
						
					}
			
				}
				
			}
		});
		$provide.factory('$state', function(){
			return {
				current:'payment',
				go:function(newState){
					this.current = newState; 
				}
			
			};
				
		
		});
		$provide.factory('InsuranceProgress', function(){
			return {
				setSteps:function(){},
				setCurrent:function(){},
				addStep:function(){},
				removeStep:function(){}
			};
		});
		$provide.factory('$translate', function(){
			return {
				current:'en',
				use:function(key){
					if(key){
						this.current = key;
					}else{
						return this.current;
					}
					
				}
				
			};
		});
		$provide.factory('$fancyModal', function(){
			return {
				open:function(obj){
					
				}
			
			};
				
		
		});
	}));	
	
	beforeEach(inject(function(_$httpBackend_){
		$httpBackend = _$httpBackend_;
	}));
	
	
	// Create controller
	beforeEach(inject(function($rootScope,$controller,localStorageService, _$state_, _InsuranceProgress_,$translate,_$fancyModal_) {
		$fancyModal = _$fancyModal_;
		$state = _$state_;
		InsuranceProgress = _InsuranceProgress_;
		scope = $rootScope.$new();
		insuranceCtrl = $controller("InsuranceController", {
			
			$scope:scope,
			localStorageService:localStorageService,
			$state:$state,
			InsuranceProgress:InsuranceProgress,
			$translate:$translate,
			$fancyModal:$fancyModal
		});
	}));
	
	
	it(' should be able to change language',inject(function($state,localStorageService,$translate){
		
		expect($translate.use()).toEqual('en');
		scope.changeLanguage('sr');
		expect($translate.use()).toEqual('sr');
	
		
	}));
	
	it(' should open home info modal dialog',function(){
		spyOn($fancyModal, "open");
		insuranceCtrl.openH();
		expect($fancyModal.open).toHaveBeenCalledWith({ templateUrl: 'app/components/insurance/insurance-info/homeInsuranceInfo.html'});
	});
	it(' should open vehicle info modal dialog',function(){
		spyOn($fancyModal, "open");
		insuranceCtrl.openV();
		expect($fancyModal.open).toHaveBeenCalledWith({ templateUrl: 'app/components/insurance/insurance-info/vehicleInfoInsurance.html'});
	});
	
	it(' should validate form data',function(){
		
		//Prepare scope
		insuranceCtrl.submittedUsers = false;
		insuranceCtrl.grownups = '1'; //expect inc.submittedUsers=false
		insuranceCtrl.homeCheckBox = true;
		insuranceCtrl.fire = true; //expect  inc.homeInsuranceWarning=false
		insuranceCtrl.roadCheckBox = true;
		insuranceCtrl.repair = true; // expect inc.roadInsuranceWarning = false
		insuranceCtrl.form = {$invalid:false};
	
		//Test 
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.submittedUsers).toBe(false);
		expect(insuranceCtrl.homeInsuranceWarning).toBe(false);
		expect(insuranceCtrl.roadInsuranceWarning).toBe(false);
		
		
		insuranceCtrl.grownups = "";
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.submittedUsers).toBe(true);
		
		insuranceCtrl.homeInsuranceWarning = false;
		insuranceCtrl.fire = false;
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.homeInsuranceWarning).toBe(true);
		
		insuranceCtrl.homeInsuranceWarning = false;
		insuranceCtrl.homeCheckBox = false;
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.homeInsuranceWarning).toBe(false);
		
		insuranceCtrl.roadInsuranceWarning = false;
		insuranceCtrl.repair = false;
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.roadInsuranceWarning).toBe(true);
		
		insuranceCtrl.roadInsuranceWarning = false;
		insuranceCtrl.roadCheckBox = false;
		insuranceCtrl.submitForm();
		expect(insuranceCtrl.roadInsuranceWarning).toBe(false);
		
		
	});
	
	it(' should change state if the form is valid',function(){
		insuranceCtrl.form = {$invalid:false};
		spyOn($state, "go");
		insuranceCtrl.submitForm();
		expect($state.go).toHaveBeenCalledWith('total-price');
	});
	
	it(' should not change state if the form is invalid',function(){
		insuranceCtrl.form = {$invalid:true};
		spyOn($state, "go");
		insuranceCtrl.submitForm();
		expect($state.go).not.toHaveBeenCalled();
	});
	
	it(' should update checkbox and data states',function(){
		// Home data
		insuranceCtrl.fire = true;
		insuranceCtrl.flood = true;
		insuranceCtrl.theft = true;
		insuranceCtrl.earthshaker = true;
		insuranceCtrl.homearea = '60';
		insuranceCtrl.ageofhome = '2000';
		insuranceCtrl.estimatedvalueofhome = '50000';
		
		//Vehicle data
		insuranceCtrl.towing = true;
		insuranceCtrl.repair = true;
		insuranceCtrl.hotel = true;
		insuranceCtrl.alternative = true;
		
		//Sport data
		insuranceCtrl.selectedSport = 'Fudbal';
		
		
		insuranceCtrl.homeCheckBox = false;
		insuranceCtrl.roadCheckBox = false;
		insuranceCtrl.sportCheckBox = false;
		
		var event = {
				srcElement: {
					name:'home'
				}
		}
		 
		spyOn(InsuranceProgress,"removeStep");
		spyOn(InsuranceProgress,"addStep");
		spyOn(InsuranceProgress,"setSteps");
		spyOn(InsuranceProgress,"setCurrent");
		
		insuranceCtrl.closeOthers(event);
		expect(insuranceCtrl.fire).toBeFalsy();
		expect(insuranceCtrl.flood).toBeFalsy();
		expect(insuranceCtrl.theft).toBeFalsy();
		expect(insuranceCtrl.earthshaker).toBeFalsy();
		expect(insuranceCtrl.homearea).toBeFalsy();
		expect(insuranceCtrl.ageofhome).toBeFalsy();
		expect(insuranceCtrl.estimatedvalueofhome).toBeFalsy();
		expect(insuranceCtrl.towing).toBeFalsy();
		expect(insuranceCtrl.repair).toBeFalsy();
		expect(insuranceCtrl.hotel).toBeFalsy();
		expect(insuranceCtrl.alternative).toBeFalsy();
		expect(insuranceCtrl.selectedSport).toBeFalsy();
		expect(InsuranceProgress.removeStep).toHaveBeenCalled();
		expect(InsuranceProgress.addStep).not.toHaveBeenCalled();
		
		InsuranceProgress.removeStep.calls.reset();
		InsuranceProgress.addStep.calls.reset();
		insuranceCtrl.homeCheckBox = true;
		insuranceCtrl.closeOthers(event);
		expect(InsuranceProgress.removeStep).not.toHaveBeenCalled();
		expect(InsuranceProgress.addStep).toHaveBeenCalled();
		
		
	});
	
	
});