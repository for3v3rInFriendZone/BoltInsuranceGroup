package com.bolt.insurance.group.app.dto;

import java.util.ArrayList;
import java.util.List;

import com.bolt.insurance.group.app.model.Price;
import com.bolt.insurance.group.app.model.Subgroup;

public class RiskDto {

	private String name;
	private Price price;
	private List<Subgroup> subgroup = new ArrayList<Subgroup>();
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Price getPrice() {
		return price;
	}
	
	public void setPrice(Price price) {
		this.price = price;
	}
	
	public List<Subgroup> getSubgroup() {
		return subgroup;
	}
	
	public void setSubgroup(List<Subgroup> subgroup) {
		this.subgroup = subgroup;
	}
	
	public RiskDto() {
		super();
	}
	
}
