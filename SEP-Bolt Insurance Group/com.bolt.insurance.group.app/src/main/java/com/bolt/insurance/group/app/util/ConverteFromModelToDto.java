package com.bolt.insurance.group.app.util;

import com.bolt.insurance.group.app.dto.RiskDto;
import com.bolt.insurance.group.app.model.Risk;

public class ConverteFromModelToDto {

	public RiskDto converteRisk(Risk risk){
		
		RiskDto riskDao = new RiskDto();
		riskDao.setName(risk.getName());
		riskDao.setPrice(risk.getPrice());
		
		return riskDao;
	}
}
