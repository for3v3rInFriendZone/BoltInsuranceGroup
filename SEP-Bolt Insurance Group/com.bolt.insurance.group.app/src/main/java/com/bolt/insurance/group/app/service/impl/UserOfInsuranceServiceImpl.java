package com.bolt.insurance.group.app.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;
import com.bolt.insurance.group.app.repository.UserOfInsuranceRepository;
import com.bolt.insurance.group.app.service.UserOfInsuranceService;

@Service
public class UserOfInsuranceServiceImpl implements UserOfInsuranceService{

	@Autowired
	UserOfInsuranceRepository userOfInsuranceRepository;

	@Override
	public UserOfInsurance save(UserOfInsurance userOfInsurance) {
		return userOfInsuranceRepository.save(userOfInsurance);
	}

	@Override
	public UserOfInsurance findOne(UserOfInsuranceId id) {
		return userOfInsuranceRepository.findOne(id);
	}

	@Override
	public Iterable<UserOfInsurance> findAll() {
		return userOfInsuranceRepository.findAll();
	}

	@Override
	public void delete(UserOfInsuranceId id) {
		userOfInsuranceRepository.delete(id);
	}

	@Override
	public void delete(UserOfInsurance userOfInsurance) {
		userOfInsuranceRepository.delete(userOfInsurance);
	}

	@Override
	public void deleteAll() {
		userOfInsuranceRepository.deleteAll();
	}

	@Override
	public List<User> createList(JSONObject json) {
		
		List<User> users = new ArrayList<User>();

		for(int i = 0; i < json.getJSONArray("userList").length(); i++){

			if(((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName").equals("") 
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg") == null 
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("address").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("address") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport") == null){
				return null;
			} 

			if(i == 0 && (((JSONObject)(json.getJSONArray("userList").get(i))).getString("email").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("email") == null)){
				return null;
			}

			users.add(new User(((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName"),
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname"), 
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg"), 
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("address"), 
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport"), 
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("phone"), 
					((JSONObject)(json.getJSONArray("userList").get(i))).getString("email")));

		}
		
		return users;
	}

}
