describe('Service --> InsuranceProgress\n',function(){

	var InsuranceProgress;

	beforeEach(module('bolt-insurance-group'));

	beforeEach(inject(function(_InsuranceProgress_){
		InsuranceProgress = _InsuranceProgress_;

	}));

	it(' should initialize service',function(){

		expect(InsuranceProgress.getProgressState().steps).toBe(4);
		expect(InsuranceProgress.getProgressState().current).toBe(1);

	});

	it( ' should set number of steps',function(){

		expect(InsuranceProgress.getProgressState().steps).toBe(4);
		InsuranceProgress.setSteps(10);
		expect(InsuranceProgress.getProgressState().steps).toBe(10);

	});

	it( ' should set current step',function(){


		expect(InsuranceProgress.getProgressState().current).toBe(1);
		InsuranceProgress.setCurrent(3);
		expect(InsuranceProgress.getProgressState().current).toBe(3);

	});

	it( ' should increase number of steps',function(){


		expect(InsuranceProgress.getProgressState().steps).toBe(4);
		InsuranceProgress.addStep();
		expect(InsuranceProgress.getProgressState().steps).toBe(5);

	});

	it( ' should decrease number of steps',function(){


		expect(InsuranceProgress.getProgressState().steps).toBe(4);
		InsuranceProgress.removeStep();
		expect(InsuranceProgress.getProgressState().steps).toBe(3);

	});

});