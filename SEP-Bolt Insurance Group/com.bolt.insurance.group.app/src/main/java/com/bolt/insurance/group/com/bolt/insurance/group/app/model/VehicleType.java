package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "VEHICLE_TYPE")
public class VehicleType {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@NotNull
	@Column(name = "NAME")
	private String name;

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

	public VehicleType(long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public VehicleType() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
