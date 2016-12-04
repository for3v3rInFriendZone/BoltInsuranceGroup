package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Type;

public interface TypeService {

	public Type save(Type type);
	
	public Type findOne(long id);
	
	public Iterable<Type> findAll();
	
	public void delete(long id);
	
	public void delete(Type type);
	
	public void deleteAll();
}
