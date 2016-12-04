package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Price;
import com.bolt.insurance.group.app.repository.PriceRepository;
import com.bolt.insurance.group.app.service.PriceService;

@Service
public class PriceServiceImpl implements PriceService{

	@Autowired
	PriceRepository priceRepository;
	
	@Override
	public Price save(Price price) {
		return priceRepository.save(price);
	}

	@Override
	public Price findOne(long id) {
		return priceRepository.findOne(id);
	}

	@Override
	public Iterable<Price> findAll() {
		return priceRepository.findAll();
	}

	@Override
	public void delete(long id) {
		priceRepository.delete(id);
	}

	@Override
	public void delete(Price price) {
		priceRepository.delete(price);
	}

	@Override
	public void deleteAll() {
		priceRepository.deleteAll();
	}

}
