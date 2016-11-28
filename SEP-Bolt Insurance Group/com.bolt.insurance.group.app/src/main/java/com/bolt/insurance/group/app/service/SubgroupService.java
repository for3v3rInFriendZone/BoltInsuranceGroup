package com.bolt.insurance.group.app.service;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.bolt.insurance.group.app.model.Subgroup;

public interface SubgroupService extends CrudRepository<Subgroup, Long>{

	public Subgroup findBySubname(String subname);
}
