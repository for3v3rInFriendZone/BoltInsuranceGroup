package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;

public interface UserOfInsuranceService {

	public UserOfInsurance save(UserOfInsurance userOfInsurance);
	
	public UserOfInsurance findOne(UserOfInsuranceId id);
	
	public Iterable<UserOfInsurance> findAll();
	
	public void delete(UserOfInsuranceId id);
	
	public void delete(UserOfInsurance userOfInsurance);
	
	public void deleteAll();
}
