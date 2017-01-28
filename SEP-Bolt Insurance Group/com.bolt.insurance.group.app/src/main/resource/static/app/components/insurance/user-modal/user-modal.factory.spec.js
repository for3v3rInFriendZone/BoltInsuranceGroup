describe('UserModalFactory\n',function(){
	var userModal,$uibModal,arg;
	
	beforeEach(module('bolt-insurance-group.insurance'));

	beforeEach(module(function($provide){
		$provide.factory('$uibModal', function(){
			return{
				open:function(){}
			}
		});
	}));
	
	beforeEach(inject(function(_userModal_,_$uibModal_){
		$uibModal = _$uibModal_;
		userModal = _userModal_;
	}));
	
	beforeEach(function(){
		spyOn($uibModal,'open').and.callFake(function(){
			return{
				result:{
					then:function(callback){
						callback({});
					}
				}
			}
		});
		
	});
	
	it(' should open empty modal instance',function(){
		
		userModal.open();
		expect($uibModal.open).toHaveBeenCalled();
	});
	
	it(' should open modal instance for editing',function(){
		
		userModal.edit();
		expect($uibModal.open).toHaveBeenCalled();
	});
	
});