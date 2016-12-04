package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.Insurance;

@Repository
public interface InsuranceRepository extends CrudRepository<Insurance, Long>{

}
