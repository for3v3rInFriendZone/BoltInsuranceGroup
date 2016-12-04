package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Price;

public interface PriceService {

	public Price save(Price price);
	
	public Price findOne(long id);
	
	public Iterable<Price> findAll();
	
	public void delete(long id);
	
	public void delete(Price price);
	
	public void deleteAll();
}
