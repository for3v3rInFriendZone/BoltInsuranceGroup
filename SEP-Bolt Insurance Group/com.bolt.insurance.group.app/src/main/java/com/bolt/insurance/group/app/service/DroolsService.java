package com.bolt.insurance.group.app.service;

import java.net.URISyntaxException;

import org.drools.runtime.StatefulKnowledgeSession;

public interface DroolsService {

	public void makeSession() throws URISyntaxException;
	
	public StatefulKnowledgeSession getSession();
}
