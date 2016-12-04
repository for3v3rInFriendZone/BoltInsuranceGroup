package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Risk;

public interface RiskService {

	public Risk save(Risk risk);
	
	public Risk findOne(long id);
	
	public Iterable<Risk> findAll();
	
	public void delete(long id);
	
	public void delete(Risk risk);
	
	public void deleteAll();
	
}
