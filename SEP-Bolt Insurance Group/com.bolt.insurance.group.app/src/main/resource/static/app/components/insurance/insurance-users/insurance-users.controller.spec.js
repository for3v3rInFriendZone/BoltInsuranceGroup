describe(
		'InsuranceUsersController\n',
		function() {
			var iuc, InsuranceProgress, localStorageService, $state, userModal,$httpBackend,$crypto;
			beforeEach(module('bolt-insurance-group.insurance'));

			beforeEach(inject(function($controller, MockGenerator,_$httpBackend_) {
				$crypto = MockGenerator.$cryptoMock();
				$httpBackend = _$httpBackend_;
				InsuranceProgress = MockGenerator.InsuranceProgressMock();
				localStorageService = MockGenerator.localStorageServiceMock();
				$state = MockGenerator.$stateMock();
				userModal = MockGenerator.userModalMock();
				iuc = $controller("InsuranceUsersController", {

					InsuranceProgress : InsuranceProgress,
					localStorageService : localStorageService,
					$state : $state,
					userModal : userModal,
					$crypto:$crypto

				});

			}));

			beforeEach(function() {
				spyOn(userModal, 'open').and.callFake(function() {
					return {
						then : function(ok, err) {
							ok({
								address : "Bulevar Oslobodjenja ",
								email : "a@Q.COM",
								firstName : "name",
								jmbg : "0712986850023",
								passport : "323423445",
								phone : "234234",
								surname : "lastname"
							})
						}

					}
				});
			});

			it(' should open user-modal dialog and add new user', function() {

				expect(localStorageService.cookie.get('listOfUsers').length)
						.toBe(0);

				$httpBackend.expectGET('https://localhost:8443/insurance/secret').respond({secret:'password'});
				iuc.newUser();

				$httpBackend.flush();
				expect(userModal.open).toHaveBeenCalled();
				expect(localStorageService.cookie.get('listOfUsers').length)
						.toBe(1);

			});

			it(' should enable/disable button for adding users', function() {

				iuc.noMoreUsers = true;
				localStorageService.cookie.set('kidsNumber', '0');
				localStorageService.cookie.set('grownupsNumber', '0');
				localStorageService.cookie.set('oldsNumber', '0');

				iuc.newUser();

				expect(iuc.noMoreUsers).toBeFalsy();

				iuc.noMoreUsers = true;
				localStorageService.cookie.set('oldsNumber', '3');
				iuc.newUser();

				expect(iuc.noMoreUsers).not.toBeFalsy();
			});

			it(' <<-- should be able to edit user -->> NOT YET IMPLEMENTED',
					function() {

					});

			it(' should remove user', function() {
				var storage = localStorageService.cookie;
				spyOn(storage,'set');
				
				iuc.users = [ {
					address : "Bulevar Oslobodjenja ",
					email : "a@Q.COM",
					firstName : "name",
					jmbg : "0712986850023",
					passport : "323423445",
					phone : "234234",
					surname : "lastname"
				}, {
					address : "Bulevar Oslobodjenja 2",
					email : "e@Q.COM",
					firstName : "name2",
					jmbg : "0712986850023",
					passport : "323422225",
					phone : "23214",
					surname : "lastname"
				} ];
				
				iuc.removeUser(0);
				
				expect(iuc.grownups).toBe("0");
				expect(iuc.users.length).toBe(1);
				expect(iuc.noMoreUsers).toBe(true);
				expect(storage.set).toHaveBeenCalled();
			});
			
			it(' shold go to previous page',function(){
				spyOn($state,'go');
				iuc.back();
				expect($state.go).toHaveBeenCalledWith('total-price');
				
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
				
				iuc.grownups = '4';
				iuc.kids = '2';
				
				$httpBackend.expectGET('https://localhost:8443/insurance/secret').respond({secret:'password'});
				iuc.calculateYearsFromJMBG(user1);
				$httpBackend.flush();
				expect(iuc.grownups).toBe(5);
				
				$httpBackend.expectGET('https://localhost:8443/insurance/secret').respond({secret:'password'});
				iuc.calculateYearsFromJMBG(user2);
				$httpBackend.flush();
				expect(iuc.kids).toBe(3);
				
			});
			
			it(' should submit data and change state',function(){
			
				spyOn($state,'go');
				//3 users still needs to be inserted
				iuc.kids = '3';
				iuc.submitForm();
				expect(iuc.usersFlag).toBe(true);
				expect($state.go).not.toHaveBeenCalled();
				
				// All users have been inserted
				iuc.kids = '0';
				iuc.grownups = '0';
				iuc.olds = '0';
				
				localStorageService.cookie.set('homeCheckBox',false);
				localStorageService.cookie.set('roadCheckBox',false);
				
				iuc.submitForm();
				expect(iuc.usersFlag).toBe(false);
				expect($state.go).toHaveBeenCalledWith('payment');
				
				localStorageService.cookie.set('homeCheckBox',true);
				localStorageService.cookie.set('roadCheckBox',false);
				
				iuc.submitForm();
				expect($state.go).toHaveBeenCalledWith('homeinsurance');
				
				localStorageService.cookie.set('homeCheckBox',false);
				localStorageService.cookie.set('roadCheckBox',true);
				
				iuc.submitForm();
				expect($state.go).toHaveBeenCalledWith('vehicleinsurance');
				
				localStorageService.cookie.set('homeCheckBox',true);
				localStorageService.cookie.set('roadCheckBox',true);
				
				iuc.submitForm();
				expect($state.go).toHaveBeenCalledWith('homeinsurance');

			});
			

		});