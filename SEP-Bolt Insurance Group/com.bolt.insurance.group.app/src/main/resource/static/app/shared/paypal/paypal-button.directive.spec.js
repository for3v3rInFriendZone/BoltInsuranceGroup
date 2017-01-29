describe('Directive --> bigPaypalButton\n', function() {

	var scope,element,localStorageService,$compile,$rootScope; 

	beforeEach(module('bolt-insurance-group.insurance'));

//	beforeEach(inject(function(_$compile_,_$rootScope_) {
//		$compile = _$compile_;
//		$rootScope = _$rootScope_;
//		$scope = $rootScope;
//	}));

	beforeEach(module(function($provide){
		$provide.factory('localStorageService',function(){
			return{
				cookie:{
					get:function(a){
						return "123.23";
					}
				}
			}
		})
	}));
	
	beforeEach(inject(function(_$rootScope_, _$compile_,_localStorageService_) {
		localStorageService = _localStorageService_;
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	  }));
	
//	it('should compile element', function() {
//		var element = '<big-paypal-button business="acquier@gmail.com" '
//				+ 'language-code="en_US" currency-code="EUR"'
//				+ ' item-name="insurance"></big-paypal-button>';
//		
//		expect(function() {
//            $compile(element);
//        }).not.toThrow();
//	});
	
	it(' should generate form', function() {
	
		element = angular.element('<big-paypal-button business="acquier@gmail.com" '
				+ 'language-code="en_US" currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');

	    scope = $rootScope.$new();
	    $compile(element)(scope);
	    scope.$digest();

		var formElement = element.find('form');
		expect(formElement.length).toEqual(1);
		expect(formElement.attr('name')).toEqual("_xclick");
		expect(formElement.attr('action')).toEqual("https://www.sandbox.paypal.com/cgi-bin/webscr");
		expect(formElement.attr('method')).toEqual("post");
		
		var inputElements = formElement.find('input');
		expect(inputElements[0].name).toEqual('cmd');
		expect(inputElements[0].type).toEqual('hidden');
		expect(inputElements[0].value).toEqual('_xclick');
		
		expect(inputElements[1].name).toEqual('return');
		expect(inputElements[1].type).toEqual('hidden');
		expect(inputElements[1].value).toEqual('https://localhost:8443/#/insurance/payment_response_success');
		
		expect(inputElements[2].name).toEqual('cancel_return');
		expect(inputElements[2].type).toEqual('hidden');
		expect(inputElements[2].value).toEqual('https://localhost:8443/#/insurance/payment_response_error');
		
		expect(inputElements[3].name).toEqual('business');
		expect(inputElements[3].type).toEqual('hidden');
		expect(inputElements[3].value).toEqual('acquier@gmail.com');
		
		expect(inputElements[4].name).toEqual('currency_code');
		expect(inputElements[4].type).toEqual('hidden');
		expect(inputElements[4].value).toEqual('EUR');
		
		expect(inputElements[5].name).toEqual('item_name');
		expect(inputElements[5].type).toEqual('hidden');
		expect(inputElements[5].value).toEqual('insurance');

		expect(inputElements[6].name).toEqual('amount');
		expect(inputElements[6].type).toEqual('hidden');
		expect(inputElements[6].value).toEqual('1.2323');

		expect(inputElements[7].name).toEqual('submit');
		expect(inputElements[7].type).toEqual('image');
		
		
	});

	it(' should not generate form, [business] not specified ',function(){

		element = angular.element('<big-paypal-button '
				+ 'language-code="en_US" currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should not generate form, [item name] not specified ',function(){

		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ 'language-code="en_US" currency-code="EUR"'
				+ ' ></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should not generate form, [amount] not specified ',function(){
		spyOn(localStorageService.cookie,'get').and.callFake(function(){
			return null;
		});
		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ 'language-code="en_US" currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should not generate form, [amount] is not a number ',function(){
		spyOn(localStorageService.cookie,'get').and.callFake(function(){
			return "this is not a number";
		});
		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ 'language-code="en_US" currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should not generate form, [language-code] is invalid ',function(){
		
		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ 'language-code="invalidLangCode" currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should not generate form, [currency-code] is invalid ',function(){
		
		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ 'language-code="en_US" currency-code="invalidCurrCode"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
		var formElement = element.find('form');
		expect(formElement.length).toEqual(0);

	});

	it(' should set default language-code if not specified ',function(){
		
		element = angular.element('<big-paypal-button business="acquier@gmail.com"'
				+ ' currency-code="EUR"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
	
		var langCode = element.find('form').find('input')[7].src.split('/')[3];
		
		expect(langCode).toEqual('en_US');
	});

	it(' should set default currency-code if not specified ',function(){
		
		 element = angular.element('<big-paypal-button business="acquier@gmail.com" '
				+ 'language-code="en_US"'
				+ ' item-name="insurance"></big-paypal-button>');
		$compile(element)(scope);
	    scope.$digest();
	
		var currCode = element.find('form').find('input')[4].value;
		
		expect(currCode).toEqual('USD');
	});


});
