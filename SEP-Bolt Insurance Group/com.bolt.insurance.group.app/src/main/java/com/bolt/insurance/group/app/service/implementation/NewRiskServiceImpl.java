package com.bolt.insurance.group.app.service.implementation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.service.NewRiskService;
import com.bolt.insurance.group.app.service.SubgroupService;

@Service
public class NewRiskServiceImpl implements NewRiskService{

	@Autowired
	SubgroupService subgroupService;
	
	@Override
	public List<Risk> checkCarRisk(String risks) {
		// TODO Auto-generated method stub
		//pronaci koje pakete je korisnik izabrao
		return null;
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
