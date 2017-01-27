package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Insurance;

public interface MailService {
	
	public void send(Insurance insurance);
	
	public void errorMail(String email);
}
