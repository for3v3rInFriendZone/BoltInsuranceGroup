package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.repository.RiskRepository;
import com.bolt.insurance.group.app.service.RiskService;

@Service
public class RiskServiceImpl implements RiskService{

	@Autowired
	RiskRepository riskRepository;
	
	@Override
	public Risk save(Risk risk) {
		return riskRepository.save(risk);
	}

	@Override
	public Risk findOne(long id) {
		return riskRepository.findOne(id);
	}

	@Override
	public Iterable<Risk> findAll() {
		return riskRepository.findAll();
	}

	@Override
	public void delete(long id) {
		riskRepository.delete(id);
	}

	@Override
	public void delete(Risk risk) {
		riskRepository.delete(risk);
	}

	@Override
	public void deleteAll() {
		riskRepository.deleteAll();
	}

}
