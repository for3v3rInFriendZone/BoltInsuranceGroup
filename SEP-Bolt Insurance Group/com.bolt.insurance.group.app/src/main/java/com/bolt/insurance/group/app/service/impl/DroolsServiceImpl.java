package com.bolt.insurance.group.app.service.impl;

import java.io.File;
import java.net.URISyntaxException;

import javax.annotation.PostConstruct;

import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderError;
import org.drools.builder.KnowledgeBuilderErrors;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.service.DroolsService;

@Service
public class DroolsServiceImpl implements DroolsService{

	private ClassLoader classLoader; 
	private File file; 
	private KnowledgeBuilder kbuilder; 
	private StatefulKnowledgeSession ksession;
	private KnowledgeBase kbase;
	
	@PostConstruct
	@Override
	public void makeSession() throws URISyntaxException {
		classLoader = getClass().getClassLoader();
		file = new File(classLoader.getResource("Rules.drl").toURI());
		kbuilder = KnowledgeBuilderFactory.newKnowledgeBuilder();
		kbuilder.add(ResourceFactory.newFileResource(file),ResourceType.DRL);  
	    KnowledgeBuilderErrors errors = kbuilder.getErrors();  
	    if (errors.size() > 0) {  
	         for (KnowledgeBuilderError error : errors) {  
	              System.err.println(error);  
	         }  
	         throw new IllegalArgumentException("Could not parse knowledge.");  
	    }  
	    kbase = KnowledgeBaseFactory.newKnowledgeBase();  
	    kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
	}

	@Override
	public StatefulKnowledgeSession getSession() {
		// TODO Auto-generated method stub
		ksession = kbase.newStatefulKnowledgeSession();
		return ksession;
	}
	
	

}
