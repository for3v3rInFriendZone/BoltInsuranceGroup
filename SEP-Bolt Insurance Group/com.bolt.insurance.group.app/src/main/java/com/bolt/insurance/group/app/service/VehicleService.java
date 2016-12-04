package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Vehicle;

public interface VehicleService {

	public Vehicle save(Vehicle vehicle);
	
	public Vehicle findOne(long id);
	
	public Iterable<Vehicle> findAll();
	
	public void delete(long id);
	
	public void delete(Vehicle vehicle);
	
	public void deleteAll();
}
