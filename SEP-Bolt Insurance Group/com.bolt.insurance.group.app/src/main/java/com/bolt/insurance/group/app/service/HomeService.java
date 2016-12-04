package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Home;
import com.bolt.insurance.group.app.model.Subgroup;

public interface HomeService {

	public Home save(Home home);
	
	public Home findOne(long id);
	
	public Iterable<Home> findAll();
	
	public void delete(long id);
	
	public void delete(Home home);
	
	public void deleteAll();
	
	public Subgroup checkHouseSize(int size);
	
	public Subgroup checkHouseAge(int age);
	
	public Subgroup checkHouseEstimateValue(int price);
}
