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

import com.bolt.insurance.group.app.model.Home;
import com.bolt.insurance.group.app.service.HomeService;

@RestController
@RequestMapping(value = "/home")
public class ApiHomeController {

	@Autowired
	HomeService homeService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Home> saveHome(@RequestBody Home home) {

		Home newHome = homeService.save(home);
		return new ResponseEntity<Home>(newHome, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Home> getHome(@PathVariable Long id) {

		Home home = homeService.findOne(id);
		return new ResponseEntity<Home>(home, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Home>> getHomes() {

		List<Home> homes = (List<Home>) homeService.findAll();
		return new ResponseEntity<List<Home>>(homes, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Home> deleteHome(@PathVariable("id") Long id) {

		homeService.delete(id);
		return new ResponseEntity<Home>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Home> editHome(@RequestBody Home home) {

		Home editedHome = homeService.findOne(home.getId());
		editedHome.setAddress(home.getAddress());
		editedHome.setJmbg(home.getJmbg());
		editedHome.setName(home.getName());
		editedHome.setSurname(home.getSurname());
		homeService.save(editedHome);
		return new ResponseEntity<Home>(editedHome, HttpStatus.OK);
	}

}
