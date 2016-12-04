package com.bolt.insurance.group.app.util;

import java.io.File;
import java.net.URISyntaxException;

import org.drools.KnowledgeBase;
import org.drools.KnowledgeBaseFactory;
import org.drools.builder.KnowledgeBuilder;
import org.drools.builder.KnowledgeBuilderError;
import org.drools.builder.KnowledgeBuilderErrors;
import org.drools.builder.KnowledgeBuilderFactory;
import org.drools.builder.ResourceType;
import org.drools.io.ResourceFactory;
import org.drools.runtime.StatefulKnowledgeSession;

public class DroolsFileReader {
	
	private ClassLoader classLoader; 
	private File file; 
	private KnowledgeBuilder kbuilder; 
	private StatefulKnowledgeSession ksession;
	
	public DroolsFileReader() {
		super();
		// TODO Auto-generated constructor stub
	}

	public StatefulKnowledgeSession getSession() throws URISyntaxException{
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
	    KnowledgeBase kbase = KnowledgeBaseFactory.newKnowledgeBase();  
	    kbase.addKnowledgePackages(kbuilder.getKnowledgePackages());
	    ksession = kbase.newStatefulKnowledgeSession();
	    
	    return ksession;
	}
	
}
