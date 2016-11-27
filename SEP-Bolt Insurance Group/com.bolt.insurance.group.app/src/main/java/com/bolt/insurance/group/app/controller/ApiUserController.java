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

import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.service.UserService;

@RestController
@RequestMapping(value = "/user")
public class ApiUserController {
	
	@Autowired
	UserService userService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<User> saveUser(@RequestBody User user) {

		User newUser = userService.save(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> getUser(@PathVariable Long id) {

		User user = userService.findOne(id);
		return new ResponseEntity<User>(user, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<User>> getUsers() {

		List<User> users = (List<User>) userService.findAll();
		return new ResponseEntity<List<User>>(users, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<User> deleteUser(@PathVariable("id") Long id) {

		userService.delete(id);
		return new ResponseEntity<User>(HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<User> editUser(@PathVariable("id") Long id, @RequestBody User user) {

		User editedUser = userService.findOne(id);
		editedUser.setAddress(user.getAddress());
		editedUser.setFirstName(user.getFirstName());
		editedUser.setJmbg(user.getJmbg());
		editedUser.setMail(user.getMail());
		editedUser.setPassport(user.getPassport());
		editedUser.setPhone(user.getPhone());
		editedUser.setSurname(user.getSurname());
		userService.save(editedUser);
		return new ResponseEntity<User>(editedUser, HttpStatus.OK);
	}

}
