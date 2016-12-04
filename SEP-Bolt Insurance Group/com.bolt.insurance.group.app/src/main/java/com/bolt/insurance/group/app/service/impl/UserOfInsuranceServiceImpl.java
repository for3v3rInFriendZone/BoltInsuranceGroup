package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

}
