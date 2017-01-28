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

import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.service.RiskService;

@RestController
@RequestMapping(value = "/risk")
public class ApiRiskController {

	@Autowired
	RiskService riskService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Risk> saveRisk(@RequestBody Risk risk) {

		Risk newRisk = riskService.save(risk);
		return new ResponseEntity<Risk>(newRisk, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Risk> getRisk(@PathVariable Long id) {

		Risk risk = riskService.findOne(id);
		return new ResponseEntity<Risk>(risk, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Risk>> getRisks() {

		List<Risk> risks = (List<Risk>) riskService.findAll();
		return new ResponseEntity<List<Risk>>(risks, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Risk> deleteRisk(@PathVariable("id") Long id) {

		riskService.delete(id);
		return new ResponseEntity<Risk>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Risk> editRisk(@RequestBody Risk risk) {

		Risk editedRisk = riskService.findOne(risk.getId());
		editedRisk.setName(risk.getName());
		editedRisk.setPrice(risk.getPrice());
		editedRisk.setType(risk.getType());
		riskService.save(editedRisk);
		return new ResponseEntity<Risk>(editedRisk, HttpStatus.OK);
	}
	
}
