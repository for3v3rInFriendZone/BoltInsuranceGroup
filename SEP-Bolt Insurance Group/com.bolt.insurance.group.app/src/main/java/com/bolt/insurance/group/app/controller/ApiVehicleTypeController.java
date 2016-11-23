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

import com.bolt.insurance.group.app.model.VehicleType;
import com.bolt.insurance.group.app.service.VehicleTypeService;

@RestController
@RequestMapping(value = "/vehicleType")
public class ApiVehicleTypeController {

	@Autowired
	VehicleTypeService vehicleTypeService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<VehicleType> saveVehicleType(@RequestBody VehicleType vehicleType) {

		VehicleType newVehicleType = vehicleTypeService.save(vehicleType);
		return new ResponseEntity<VehicleType>(newVehicleType, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<VehicleType> getVehicleType(@PathVariable Long id) {

		VehicleType vehicleType = vehicleTypeService.findOne(id);
		return new ResponseEntity<VehicleType>(vehicleType, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<VehicleType>> getVehicleTypes() {

		List<VehicleType> types = (List<VehicleType>) vehicleTypeService.findAll();
		return new ResponseEntity<List<VehicleType>>(types, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<VehicleType> deleteVehicleType(@PathVariable("id") Long id) {

		vehicleTypeService.delete(id);
		return new ResponseEntity<VehicleType>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<VehicleType> editVehicleType(@RequestBody VehicleType vehicleType) {

		VehicleType editedVehicleType = vehicleTypeService.findOne(vehicleType.getId());
		editedVehicleType.setName(vehicleType.getName());
		vehicleTypeService.save(editedVehicleType);
		return new ResponseEntity<VehicleType>(editedVehicleType, HttpStatus.OK);
	}
}
