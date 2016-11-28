package com.bolt.insurance.group.app.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.service.NewUserService;
import com.bolt.insurance.group.app.service.SubgroupService;

@Service
public class NewUserServiceImpl implements NewUserService{

	@Autowired
	SubgroupService subgroupService;
	
	@Override
	public Subgroup setUserSubgroup(int age) {
		
		Subgroup sub = null;

		if(age < 18){
			sub = (Subgroup) subgroupService.findBySubname("do 18");
		}else if(18 <= age && age < 60){
			sub = subgroupService.findBySubname("18 do 60");
		}else if(age >= 60){
			sub = subgroupService.findBySubname("preko 60");
		}
		
		return sub;
	}

}
