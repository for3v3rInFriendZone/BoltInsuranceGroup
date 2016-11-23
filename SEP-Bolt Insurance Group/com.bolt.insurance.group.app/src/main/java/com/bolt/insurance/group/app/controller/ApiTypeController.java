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

import com.bolt.insurance.group.app.model.Type;
import com.bolt.insurance.group.app.service.TypeService;

@RestController
@RequestMapping(value = "/type")
public class ApiTypeController {

	@Autowired
	TypeService typeService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Type> saveType(@RequestBody Type type) {

		Type newType = typeService.save(type);
		return new ResponseEntity<Type>(newType, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Type> getHome(@PathVariable Long id) {

		Type type = typeService.findOne(id);
		return new ResponseEntity<Type>(type, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Type>> getTypes() {

		List<Type> types = (List<Type>) typeService.findAll();
		return new ResponseEntity<List<Type>>(types, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Type> deleteType(@PathVariable("id") Long id) {

		typeService.delete(id);
		return new ResponseEntity<Type>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Type> editType(@RequestBody Type type) {

		Type editedType = typeService.findOne(type.getId());
		editedType.setName(type.getName());
		typeService.save(editedType);
		return new ResponseEntity<Type>(editedType, HttpStatus.OK);
	}
	
}
