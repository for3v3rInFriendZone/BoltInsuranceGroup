package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Vehicle;
import com.bolt.insurance.group.app.repository.VehicleRepository;
import com.bolt.insurance.group.app.service.VehicleService;

@Service
public class VehicleServiceImpl implements VehicleService{

	@Autowired
	VehicleRepository vehicleRepository;
	
	@Override
	public Vehicle save(Vehicle vehicle) {
		return vehicleRepository.save(vehicle);
	}

	@Override
	public Vehicle findOne(long id) {
		return vehicleRepository.findOne(id);
	}

	@Override
	public Iterable<Vehicle> findAll() {
		return vehicleRepository.findAll();
	}

	@Override
	public void delete(long id) {
		vehicleRepository.delete(id);
	}

	@Override
	public void delete(Vehicle vehicle) {
		vehicleRepository.delete(vehicle);
	}

	@Override
	public void deleteAll() {
		vehicleRepository.deleteAll();
	}

}
