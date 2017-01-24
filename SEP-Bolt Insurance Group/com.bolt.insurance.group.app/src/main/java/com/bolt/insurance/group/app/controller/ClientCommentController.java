package com.bolt.insurance.group.app.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.bolt.insurance.group.app.model.ClientComment;
import com.bolt.insurance.group.app.service.ClientCommentService;

@RestController
@RequestMapping(value = "/comment")
public class ClientCommentController {

	@Autowired
	ClientCommentService clientService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<ClientComment>> getComments() {

		List<ClientComment> homes = (List<ClientComment>) clientService.findAll();
		return new ResponseEntity<List<ClientComment>>(homes, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<ClientComment> saveClientComment(@RequestBody ClientComment comment) {

		ClientComment newComment = clientService.save(comment);
		return new ResponseEntity<ClientComment>(newComment, HttpStatus.CREATED);
	}
}
