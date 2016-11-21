package com.bolt.insurance.group.com.bolt.insurance.group.app.dao;

import javax.transaction.Transactional;
import org.springframework.data.repository.CrudRepository;
import com.bolt.insurance.group.com.bolt.insurance.group.app.model.Data;

@Transactional
public interface DataDao extends CrudRepository<Data, Long>{
	
}
