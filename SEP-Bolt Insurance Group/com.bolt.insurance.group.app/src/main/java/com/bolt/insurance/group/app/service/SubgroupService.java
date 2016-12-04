package com.bolt.insurance.group.app.service;

import com.bolt.insurance.group.app.model.Subgroup;

public interface SubgroupService {
	
	public Subgroup save(Subgroup subgroup);
	
	public Subgroup findOne(long id);
	
	public Iterable<Subgroup> findAll();
	
	public void delete(long id);
	
	public void delete(Subgroup subgroup);
	
	public void deleteAll();
	
	public Subgroup findBySubname(String subname);
}
