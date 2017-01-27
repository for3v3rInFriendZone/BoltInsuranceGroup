package com.bolt.insurance.group.app.service;

import java.util.List;

import org.json.JSONObject;

import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;

public interface UserOfInsuranceService {

	public UserOfInsurance save(UserOfInsurance userOfInsurance);
	
	public UserOfInsurance findOne(UserOfInsuranceId id);
	
	public Iterable<UserOfInsurance> findAll();
	
	public void delete(UserOfInsuranceId id);
	
	public void delete(UserOfInsurance userOfInsurance);
	
	public void deleteAll();
	
	public List<User> createList(JSONObject json);
}
