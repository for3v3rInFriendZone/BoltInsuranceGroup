package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.ClientComment;

public interface ClientCommentService {

	public ClientComment save(ClientComment comment);
	
	public Iterable<ClientComment> findAll();
}
