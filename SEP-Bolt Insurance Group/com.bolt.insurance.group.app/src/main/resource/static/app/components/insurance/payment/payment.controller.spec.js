describe("PaymentController\n",function(){
	var paymentCtrl;
	
	beforeEach(module('bolt-insurance-group.insurance.payment'));
	// Mock services
	beforeEach(module(function($provide){
		$provide.factory('localStorageService', function(){
			return {
				
				cookie: {
					count:0,
					get: function(mock){
						if(mock==='homeCheckBox'|| mock==='roadCheckBox'){
							return this.storage[mock];
						}else{
							return 'mock value ' + this.count++;
						}
					},
					storage:{
						homeCheckBox:true,
						roadCheckBox:true
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
				setCurrent(){}
			};
		});
	}));	
	// Create controller
	beforeEach(inject(function($rootScope,$controller,localStorageService, $state, InsuranceProgress) {
		
		paymentCtrl = $controller("PaymentInsuranceController", {
			localStorageService:localStorageService,
			$state:$state,
			InsuranceProgress:InsuranceProgress
		});
	}));
	
	
	it(' should change states',inject(function($state,localStorageService){
		
		localStorageService.cookie.set('homeCheckBox',true);
		localStorageService.cookie.set('roadCheckBox',true);
		paymentCtrl.back();
		
		expect($state.current).toEqual('vehicleinsurance');
		
		localStorageService.cookie.set('homeCheckBox',true);
		localStorageService.cookie.set('roadCheckBox',false);
		paymentCtrl.back();
		
		expect($state.current).toEqual('homeinsurance');
		
		localStorageService.cookie.set('homeCheckBox',false);
		localStorageService.cookie.set('roadCheckBox',true);
		paymentCtrl.back();
		
		expect($state.current).toEqual('vehicleinsurance');
		
		localStorageService.cookie.set('homeCheckBox',false);
		localStorageService.cookie.set('roadCheckBox',false);
		paymentCtrl.back();
		
		expect($state.current).toEqual('insurance-users');
		
	}));
	
	
});