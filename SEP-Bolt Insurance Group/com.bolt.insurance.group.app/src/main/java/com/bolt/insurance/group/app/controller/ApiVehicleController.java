package com.bolt.insurance.group.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bolt.insurance.group.app.model.Vehicle;
import com.bolt.insurance.group.app.service.VehicleService;

@RestController
@RequestMapping(value = "/vehicle")
public class ApiVehicleController {
	
	@Autowired
	VehicleService vehicleService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Vehicle> saveVehicle(@RequestBody Vehicle vehicle) {

		Vehicle newVehicle = vehicleService.save(vehicle);
		return new ResponseEntity<Vehicle>(newVehicle, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Vehicle> getVehicle(@PathVariable Long id) {

		Vehicle vehicle = vehicleService.findOne(id);
		return new ResponseEntity<Vehicle>(vehicle, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Vehicle>> getVehicles() {

		List<Vehicle> vehicles = (List<Vehicle>) vehicleService.findAll();
		return new ResponseEntity<List<Vehicle>>(vehicles, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Vehicle> deleteVehicle(@PathVariable("id") Long id) {

		vehicleService.delete(id);
		return new ResponseEntity<Vehicle>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Vehicle> editVehicle(@RequestBody Vehicle vehicle) {

		Vehicle editedVehicle = vehicleService.findOne(vehicle.getId());
		editedVehicle.setAddress(vehicle.getAddress());
		editedVehicle.setBrand(vehicle.getBrand());
		editedVehicle.setChassis(vehicle.getChassis());
		editedVehicle.setJmbg(vehicle.getJmbg());
		editedVehicle.setName(vehicle.getName());
		editedVehicle.setRegistration(vehicle.getRegistration());
		editedVehicle.setSurname(vehicle.getSurname());
		editedVehicle.setType(vehicle.getType());
		editedVehicle.setYearOfProduction(vehicle.getYearOfProduction());
		
		vehicleService.save(editedVehicle);
		
		return new ResponseEntity<Vehicle>(editedVehicle, HttpStatus.OK);
	}

}
