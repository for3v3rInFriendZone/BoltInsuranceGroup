package com.bolt.insurance.group.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;
import com.bolt.insurance.group.app.service.UserOfInsuranceService;

@RestController
@RequestMapping(value = "/userOfInsurance")
public class ApiUserOfInsuranceController {

	@Autowired
	UserOfInsuranceService userOfInsuranceService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<UserOfInsurance> saveUserOfInsurance(@RequestBody UserOfInsurance userOfInsurance) {

		UserOfInsurance newUserOfInsurance = userOfInsuranceService.save(userOfInsurance);
		return new ResponseEntity<UserOfInsurance>(newUserOfInsurance, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<UserOfInsurance> getUserOfInsurance(@RequestBody UserOfInsuranceId id) {

		UserOfInsurance userOfInsurance = userOfInsuranceService.findOne(id);
		return new ResponseEntity<UserOfInsurance>(userOfInsurance, HttpStatus.OK);
	}

	@RequestMapping(value="/all", method = RequestMethod.GET)
	public ResponseEntity<List<UserOfInsurance>> getUsersOfInsurance() {

		List<UserOfInsurance> users = (List<UserOfInsurance>) userOfInsuranceService.findAll();
		return new ResponseEntity<List<UserOfInsurance>>(users, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE)
	public ResponseEntity<UserOfInsurance> deleteUserOfInsurance(@RequestBody UserOfInsuranceId id) {

		userOfInsuranceService.delete(id);
		return new ResponseEntity<UserOfInsurance>(HttpStatus.OK);
	}
	
}
