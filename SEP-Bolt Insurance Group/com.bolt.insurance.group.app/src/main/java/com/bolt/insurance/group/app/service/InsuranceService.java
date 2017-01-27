package com.bolt.insurance.group.app.service;

import org.json.JSONObject;

import com.bolt.insurance.group.app.model.Insurance;

public interface InsuranceService {

	public Insurance save(Insurance insurance);
	
	public Insurance findOne(long id);
	
	public Iterable<Insurance> findAll();
	
	public void delete(long id);
	
	public void delete(Insurance insurance);
	
	public void deleteAll();
	
	public int calculateDays(long statDate, long endDate);
	
	public Insurance createInsurance(JSONObject json);
}
