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

import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.service.SubgroupService;

@RestController
@RequestMapping(value = "/subgroup")
public class ApiSubgroupController {

	@Autowired
	SubgroupService subgroupService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Subgroup> saveSubgroup(@RequestBody Subgroup subgroup) {

		Subgroup newSubgroup = subgroupService.save(subgroup);
		return new ResponseEntity<Subgroup>(newSubgroup, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Subgroup> getSubgroup(@PathVariable Long id) {

		Subgroup subgroup = subgroupService.findOne(id);
		return new ResponseEntity<Subgroup>(subgroup, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Subgroup>> getSubgrups() {

		List<Subgroup> subgroups = (List<Subgroup>) subgroupService.findAll();
		return new ResponseEntity<List<Subgroup>>(subgroups, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Subgroup> deleteSubgroup(@PathVariable("id") Long id) {

		subgroupService.delete(id);
		return new ResponseEntity<Subgroup>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Subgroup> editSubgroup(@RequestBody Subgroup subgroup) {

		Subgroup editedSubgroup = subgroupService.findOne(subgroup.getId());
		editedSubgroup.setCoefficient(subgroup.getCoefficient());
		editedSubgroup.setRisk(subgroup.getRisk());
		editedSubgroup.setSubname(subgroup.getSubname());
		subgroupService.save(editedSubgroup);
		return new ResponseEntity<Subgroup>(editedSubgroup, HttpStatus.OK);
	}
	
}
