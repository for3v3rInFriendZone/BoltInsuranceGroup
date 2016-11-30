package com.bolt.insurance.group.app.service;

import java.util.List;

import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.model.Subgroup;

public interface NewRiskService {

	public List<Risk> checkCarRisk(String risks);
	
	public Subgroup checkHouseSize(int size);
	
	public Subgroup checkHouseAge(int age);
	
	public Subgroup checkHouseEstimateValue(int price);
}
