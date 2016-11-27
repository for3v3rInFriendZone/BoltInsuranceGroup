package com.bolt.insurance.group.app.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.BigInteger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "HOME")
public class Home implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	@Column(name = "OWNER_NAME")
	private String name;
	
	@NotNull
	@Column(name = "OWNER_SURNAME")
	private String surname;
	
	@NotNull
	@Column(name = "OWNER_JMBG", unique = true, length = 13)
	private String jmbg;
	
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

	public String getJmbg() {
		return jmbg;
	}

	public void setJmbg(String jmbg) {
		this.jmbg = jmbg;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Home(long id, String name, String surname, String jmbg, String address) {
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
