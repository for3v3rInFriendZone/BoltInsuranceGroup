package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.Type;

@Repository
public interface TypeRepository extends CrudRepository<Type, Long>{

}
