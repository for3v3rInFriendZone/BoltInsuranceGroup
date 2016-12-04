package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.repository.UserRepository;
import com.bolt.insurance.group.app.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	UserRepository userRepository;
	
	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public User findOne(long id) {
		return userRepository.findOne(id);
	}

	@Override
	public Iterable<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public void delete(long id) {
		userRepository.delete(id);
	}

	@Override
	public void delete(User user) {
		userRepository.delete(user);
	}

	@Override
	public void deleteAll() {
		userRepository.deleteAll();
	}

}
