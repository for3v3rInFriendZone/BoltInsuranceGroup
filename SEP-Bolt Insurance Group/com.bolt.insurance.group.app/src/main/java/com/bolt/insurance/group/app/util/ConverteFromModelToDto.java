package com.bolt.insurance.group.app.util;

import com.bolt.insurance.group.app.dao.RiskDao;
import com.bolt.insurance.group.app.model.Risk;

public class ConverteFromModelToDto {

	public RiskDao converteRisk(Risk risk){
		
		RiskDao riskDao = new RiskDao();
		riskDao.setName(risk.getName());
		riskDao.setPrice(risk.getPrice());
		
		return riskDao;
	}
}
