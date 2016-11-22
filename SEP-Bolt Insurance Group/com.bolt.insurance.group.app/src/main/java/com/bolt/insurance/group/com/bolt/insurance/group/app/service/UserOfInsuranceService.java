package com.bolt.insurance.group.com.bolt.insurance.group.app.service;

import org.springframework.data.repository.CrudRepository;

import com.bolt.insurance.group.com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.com.bolt.insurance.group.app.model.UserOfInsuranceId;

public interface UserOfInsuranceService extends CrudRepository<UserOfInsurance, UserOfInsuranceId>{

}
