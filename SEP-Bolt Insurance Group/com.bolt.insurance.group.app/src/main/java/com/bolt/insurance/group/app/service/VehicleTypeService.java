package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.VehicleType;

public interface VehicleTypeService {

	public VehicleType save(VehicleType vehicleType);
	
	public VehicleType findOne(long id);
	
	public Iterable<VehicleType> findAll();
	
	public void delete(long id);
	
	public void delete(VehicleType vehicleType);
	
	public void deleteAll();
	
	public VehicleType findByName(String name);
}
