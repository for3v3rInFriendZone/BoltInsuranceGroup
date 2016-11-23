package com.bolt.insurance.group.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bolt.insurance.group.app.model.Price;
import com.bolt.insurance.group.app.service.PriceService;

@RestController
@RequestMapping(value = "/price")
public class ApiPriceControler {

	@Autowired
	PriceService priceService;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Price> savePrice(@RequestBody Price price) {

		Price newPrice = priceService.save(price);
		return new ResponseEntity<Price>(newPrice, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Price> getPrice(@PathVariable Long id) {

		Price price = priceService.findOne(id);
		return new ResponseEntity<Price>(price, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Price>> getPrices() {

		List<Price> prices = (List<Price>) priceService.findAll();
		return new ResponseEntity<List<Price>>(prices, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Price> deletePrice(@PathVariable("id") Long id) {

		priceService.delete(id);
		return new ResponseEntity<Price>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Price> editPrice(@RequestBody Price price) {

		Price editedPrice = priceService.findOne(price.getId());
		editedPrice.setStartDate(price.getStartDate());
		editedPrice.setEndDate(price.getEndDate());

		priceService.save(editedPrice);
		return new ResponseEntity<Price>(editedPrice, HttpStatus.OK);
	}

}
