package com.bolt.insurance.group.app.service;

import java.util.Date;

import com.bolt.insurance.group.app.model.Insurance;

public interface InsuranceService {

	public Insurance save(Insurance insurance);
	
	public Insurance findOne(long id);
	
	public Iterable<Insurance> findAll();
	
	public void delete(long id);
	
	public void delete(Insurance insurance);
	
	public void deleteAll();
	
	public int calculateDays(Date statDate, Date endDate);
}
