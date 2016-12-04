package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Type;
import com.bolt.insurance.group.app.repository.TypeRepository;
import com.bolt.insurance.group.app.service.TypeService;

@Service
public class TypeServiceImpl implements TypeService{

	@Autowired
	TypeRepository typeRepository;
	
	@Override
	public Type save(Type type) {
		return typeRepository.save(type);
	}

	@Override
	public Type findOne(long id) {
		return typeRepository.findOne(id);
	}

	@Override
	public Iterable<Type> findAll() {
		return typeRepository.findAll();
	}

	@Override
	public void delete(long id) {
		typeRepository.delete(id);
	}

	@Override
	public void delete(Type type) {
		typeRepository.delete(type);
	}

	@Override
	public void deleteAll() {
		typeRepository.deleteAll();
	}

}
