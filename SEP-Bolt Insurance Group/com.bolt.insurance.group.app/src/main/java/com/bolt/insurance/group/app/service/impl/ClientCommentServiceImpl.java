package com.bolt.insurance.group.app.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.ClientComment;
import com.bolt.insurance.group.app.repository.ClientCommentRepository;
import com.bolt.insurance.group.app.service.ClientCommentService;

@Service
public class ClientCommentServiceImpl implements ClientCommentService{

	@Autowired
	ClientCommentRepository clientRepo;
	
	@Override
	public ClientComment save(ClientComment comment) {
		// TODO Auto-generated method stub
		return clientRepo.save(comment);
	}

	@Override
	public Iterable<ClientComment> findAll() {
		// TODO Auto-generated method stub
		return clientRepo.findAll();
	}

}
