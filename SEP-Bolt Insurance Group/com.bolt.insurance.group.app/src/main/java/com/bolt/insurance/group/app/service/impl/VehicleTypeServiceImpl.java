package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.VehicleType;
import com.bolt.insurance.group.app.repository.VehicleTypeRepository;
import com.bolt.insurance.group.app.service.VehicleTypeService;

@Service
public class VehicleTypeServiceImpl implements VehicleTypeService{

	@Autowired
	VehicleTypeRepository vehicleTypeRepository;
	
	@Override
	public VehicleType save(VehicleType vehicleType) {
		return vehicleTypeRepository.save(vehicleType);
	}

	@Override
	public VehicleType findOne(long id) {
		return vehicleTypeRepository.findOne(id);
	}

	@Override
	public Iterable<VehicleType> findAll() {
		return vehicleTypeRepository.findAll();
	}

	@Override
	public void delete(long id) {
		vehicleTypeRepository.delete(id);
	}

	@Override
	public void delete(VehicleType vehicleType) {
		vehicleTypeRepository.delete(vehicleType);
	}

	@Override
	public void deleteAll() {
		vehicleTypeRepository.deleteAll();
	}

}
