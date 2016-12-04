package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;

@Repository
public interface UserOfInsuranceRepository extends CrudRepository<UserOfInsurance, UserOfInsuranceId>{

}
