package com.bolt.insurance.group.app.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.bolt.insurance.group.app.model.Subgroup;

@Repository
public interface SubgroupRepository extends CrudRepository<Subgroup, Long>{

	public Subgroup findBySubname(String subname);
}
