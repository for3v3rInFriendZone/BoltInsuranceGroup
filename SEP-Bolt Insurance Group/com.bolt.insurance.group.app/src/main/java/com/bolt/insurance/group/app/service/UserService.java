package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.User;

public interface UserService {

	public User save(User user);
	
	public User findOne(long id);
	
	public Iterable<User> findAll();
	
	public void delete(long id);
	
	public void delete(User user);
	
	public void deleteAll();
}
