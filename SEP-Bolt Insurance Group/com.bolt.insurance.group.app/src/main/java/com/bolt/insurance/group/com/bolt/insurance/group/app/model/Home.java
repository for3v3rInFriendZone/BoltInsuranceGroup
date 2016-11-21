package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.node.BigIntegerNode;

@Entity
@Table(name = "HOME")
public class Home {

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
	@Column(name = "OWNER_JMBG", unique = true)
	private BigDecimal jmbg;
	
	@NotNull
	@Column(name = "ADDRESS")
	private String address;

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

	public BigDecimal getJmbg() {
		return jmbg;
	}

	public void setJmbg(BigDecimal jmbg) {
		this.jmbg = jmbg;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Home(long id, String name, String surname, BigDecimal jmbg, String address) {
		super();
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.jmbg = jmbg;
		this.address = address;
	}

	public Home() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}