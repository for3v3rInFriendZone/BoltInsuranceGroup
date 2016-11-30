package com.bolt.insurance.group.app.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "RISK")
public class Risk implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "RISK_NAME", nullable = false)
	private String name;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "RISK_TYPE", nullable = false)
	private Type type;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "PRICE", nullable = false)
	private Price price;
	
	@ManyToMany(fetch = FetchType.EAGER, mappedBy = "risks")
	private List<Insurance> insurances;
	
	@OneToMany
	private List<Subgroup> subgroup = new ArrayList<Subgroup>();
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Price getPrice() {
		return price;
	}

	public void setPrice(Price price) {
		this.price = price;
	}

	public List<Insurance> getInsurances() {
		return insurances;
	}

	public void setInsurances(List<Insurance> insurances) {
		this.insurances = insurances;
	}

	public List<Subgroup> getSubgroup() {
		return subgroup;
	}

	public void setSubgroup(List<Subgroup> subgroup) {
		this.subgroup = subgroup;
	}

	public Risk(long id, String name, Type type, Price price, List<Insurance> insurances) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.price = price;
		this.insurances = insurances;
	}

	public Risk() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
