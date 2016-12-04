package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.repository.SubgroupRepository;
import com.bolt.insurance.group.app.service.SubgroupService;

@Service
public class SubgroupServiceImpl implements SubgroupService{

	@Autowired
	SubgroupRepository subgroupRepository;
		
	@Override
	public Subgroup save(Subgroup subgroup) {
		return subgroupRepository.save(subgroup);
	}

	@Override
	public Subgroup findOne(long id) {
		return subgroupRepository.findOne(id);
	}

	@Override
	public Iterable<Subgroup> findAll() {
		return subgroupRepository.findAll();
	}

	@Override
	public void delete(long id) {
		subgroupRepository.delete(id);
	}

	@Override
	public void delete(Subgroup subgroup) {
		subgroupRepository.delete(subgroup);
	}

	@Override
	public void deleteAll() {
		subgroupRepository.deleteAll();
	}

	@Override
	public Subgroup findBySubname(String subname) {
		return subgroupRepository.findBySubname(subname);
	}

}
