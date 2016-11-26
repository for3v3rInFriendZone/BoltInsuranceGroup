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
@Table(name = "INSURANCE_USER")
public class User implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private long id;
	
	@NotNull
	@Column(name = "FIRSTNAME")
	private String firstName;
	
	@NotNull
	@Column(name = "SURNAME")
	private String surname;
	
	@NotNull
	@Column(name = "JMBG", unique = true, length = 13)
	private String jmbg;
	
	@NotNull
	@Column(name = "ADDRESS")
	private String address;
	
	@NotNull
	@Column(name = "PASSPORT", unique = true, length = 9)
	private String passport;
	
	@Column(name = "PHONE")
	private String phone;

	@Column(name = "MAIL")
	private String mail;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
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

	public String getPassport() {
		return passport;
	}

	public void setPassport(String passport) {
		this.passport = passport;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public User(long id, String firstName, String surname, String jmbg, String address, String passport,
			String phone, String mail) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.surname = surname;
		this.jmbg = jmbg;
		this.address = address;
		this.passport = passport;
		this.phone = phone;
		this.mail = mail;
	}

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

}
