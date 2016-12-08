package com.bolt.insurance.group.app.service.impl;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.repository.InsuranceRepository;
import com.bolt.insurance.group.app.service.InsuranceService;

@Service
public class InsuranceServiceImpl implements InsuranceService{

	@Autowired
	InsuranceRepository insuranceRepository;
	
	@Override
	public Insurance save(Insurance insurance) {
		return insuranceRepository.save(insurance);
	}

	@Override
	public Insurance findOne(long id) {
		return insuranceRepository.findOne(id);
	}

	@Override
	public Iterable<Insurance> findAll() {
		return insuranceRepository.findAll();
	}

	@Override
	public void delete(long id) {
		insuranceRepository.delete(id);
	}

	@Override
	public void delete(Insurance insurance) {
		insuranceRepository.delete(insurance);
	}

	@Override
	public void deleteAll() {
		insuranceRepository.deleteAll();
	}

	@Override
	public int calculateDays(long startDate, long endDate) {
		long milliseconds = endDate - startDate;
		return (int) TimeUnit.DAYS.convert(milliseconds, TimeUnit.MILLISECONDS);
	}


}
