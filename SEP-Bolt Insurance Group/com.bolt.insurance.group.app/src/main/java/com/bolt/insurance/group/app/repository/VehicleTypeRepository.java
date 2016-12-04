package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.VehicleType;

@Repository
public interface VehicleTypeRepository extends CrudRepository<VehicleType, Long>{

}
