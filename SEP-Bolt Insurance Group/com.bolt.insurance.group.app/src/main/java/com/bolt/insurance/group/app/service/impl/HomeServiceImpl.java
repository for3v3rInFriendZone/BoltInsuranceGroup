package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Home;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.repository.HomeRepository;
import com.bolt.insurance.group.app.service.HomeService;
import com.bolt.insurance.group.app.service.SubgroupService;

@Service
public class HomeServiceImpl implements HomeService{

	@Autowired
	HomeRepository homeRepository;
	
	@Autowired
	SubgroupService subgroupService;
	
	@Override
	public Home save(Home home) {
		return homeRepository.save(home);
	}

	@Override
	public Home findOne(long id) {
		return homeRepository.findOne(id);
	}

	@Override
	public Iterable<Home> findAll() {
		return homeRepository.findAll();
	}

	@Override
	public void delete(long id) {
		homeRepository.delete(id);
	}

	@Override
	public void delete(Home home) {
		homeRepository.delete(home);
	}

	@Override
	public void deleteAll() {
		homeRepository.deleteAll();
	}

	@Override
	public Subgroup checkHouseSize(int size) {
		
		Subgroup sub = new Subgroup();
		
		if (size < 30){
			sub = subgroupService.findBySubname("do 30m2");
		} else if (size >= 30 && size < 60) {
			sub = subgroupService.findBySubname("30m2 do 60m2");
		} else if (size >= 60){
			sub = subgroupService.findBySubname("preko 60m2");
		}
		
		return sub;
	}

	@Override
	public Subgroup checkHouseAge(int age) {
		
		Subgroup sub = new Subgroup();
		
		if (age < 10){
			sub = subgroupService.findBySubname("do 10");
		} else if (age >= 10 && age < 20) {
			sub = subgroupService.findBySubname("10 do 20");
		} else if (age >= 20){
			sub = subgroupService.findBySubname("preko 20");
		}
		
		return sub;
	}

	@Override
	public Subgroup checkHouseEstimateValue(int price) {
		
		Subgroup sub = new Subgroup();
		
		if (price < 25000){
			sub = subgroupService.findBySubname("do 25000");
		} else if (price >= 25000 && price < 50000) {
			sub = subgroupService.findBySubname("25000 do 50000");
		} else if (price >= 50000){
			sub = subgroupService.findBySubname("preko 50000");
		}
		
		return sub;
	}
}
