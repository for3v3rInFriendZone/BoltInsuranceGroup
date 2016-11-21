package com.bolt.insurance.group.com.bolt.insurance.group.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.bolt.insurance.group.com.bolt.insurance.group.app.dao.DataDao;
import com.bolt.insurance.group.com.bolt.insurance.group.app.model.Data;

@RestController
@RequestMapping("/core")
public class CoreController {
	
	@Autowired
	DataDao dataDao;
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<List<Data>> getAllData()
	{	
		List<Data> data = (List<Data>) dataDao.findAll();
		
		return new ResponseEntity<List<Data>>(data, HttpStatus.OK);
	}

}

