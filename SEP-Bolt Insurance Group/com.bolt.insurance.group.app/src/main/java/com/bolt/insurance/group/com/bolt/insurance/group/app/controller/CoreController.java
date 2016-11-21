package com.bolt.insurance.group.com.bolt.insurance.group.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bolt.insurance.group.com.bolt.insurance.group.app.model.Data;


@RestController
@RequestMapping("/core")
public class CoreController {
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Data> getAllData()
	{	
		Data d = new Data("Ola", "LALALA");
		
		return new ResponseEntity<Data>(d, HttpStatus.OK);
	}

}

