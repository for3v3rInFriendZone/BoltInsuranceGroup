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

import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.service.InsuranceService;

@RestController
@RequestMapping(value = "/insurance")
public class ApiInsuranceController {

	@Autowired
	InsuranceService insuranceService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Insurance> saveInsurance(@RequestBody Insurance insurance) {

		Insurance newInsurance = insuranceService.save(insurance);
		return new ResponseEntity<Insurance>(newInsurance, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Insurance> getInsurance(@PathVariable Long id) {

		Insurance insurance = insuranceService.findOne(id);
		return new ResponseEntity<Insurance>(insurance, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Insurance>> getInsuracnes() {

		List<Insurance> insurances = (List<Insurance>) insuranceService.findAll();
		return new ResponseEntity<List<Insurance>>(insurances, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Insurance> deleteInsurance(@PathVariable("id") Long id) {

		insuranceService.delete(id);
		return new ResponseEntity<Insurance>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Insurance> editInsurance(@RequestBody Insurance insurance) {

		Insurance editedInsurance = insuranceService.findOne(insurance.getId());
		editedInsurance.setAmount(insurance.getAmount());
		editedInsurance.setEndDate(insurance.getEndDate());
		editedInsurance.setHome(insurance.getHome());
		editedInsurance.setRisks(insurance.getRisks());
		editedInsurance.setStartDate(insurance.getStartDate());
		editedInsurance.setType(insurance.getType());
		editedInsurance.setVehicle(insurance.getVehicle());
		return new ResponseEntity<Insurance>(editedInsurance, HttpStatus.OK);
	}
}
