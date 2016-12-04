package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.Price;

@Repository
public interface PriceRepository extends CrudRepository<Price, Long>{

}
