package com.bolt.insurance.group.app.model;

import java.io.Serializable;
import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity 
@Table(name = "VEHICLE")
public class Vehicle implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@NotNull
	@Column(name = "OWNER_NAME")
	private String name;
	
	@NotNull
	@Column(name = "OWNER_SURNAME")
	private String surname;
	
	@NotNull
	@Column(name = "OWNER_ADDRESS")
	private String address;
	
	@NotNull
	@Column(name = "OWNER_JMBG", unique = true, length = 13)
	private String jmbg;
	
	@NotNull
	@Column(name = "YEAR_OF_PRODUCTION")
	private long yearOfProduction;
	
	@NotNull
	@Column(name = "REGISTRATION")
	private String registration;
	
	@NotNull
	@Column(name = "CHASSIS")
	private String chassis;
	
	@NotNull
	@Column(name = "BRAND")
	private String brand;
	
	@NotNull
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "TYPE")
	private VehicleType type;

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

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getJmbg() {
		return jmbg;
	}

	public void setJmbg(String jmbg) {
		this.jmbg = jmbg;
	}

	public long getYearOfProduction() {
		return yearOfProduction;
	}

	public void setYearOfProduction(long yearOfProduction) {
		this.yearOfProduction = yearOfProduction;
	}

	public String getRegistration() {
		return registration;
	}

	public void setRegistration(String registration) {
		this.registration = registration;
	}

	public String getChassis() {
		return chassis;
	}

	public void setChassis(String chassis) {
		this.chassis = chassis;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public VehicleType getType() {
		return type;
	}

	public void setType(VehicleType type) {
		this.type = type;
	}

	public Vehicle(long id, String name, String surname, String address, String jmbg, long yearOfProduction,
			String registration, String chassis, String brand, VehicleType type) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.address = address;
		this.jmbg = jmbg;
		this.yearOfProduction = yearOfProduction;
		this.registration = registration;
		this.chassis = chassis;
		this.brand = brand;
		this.type = type;
	}

	public Vehicle() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
