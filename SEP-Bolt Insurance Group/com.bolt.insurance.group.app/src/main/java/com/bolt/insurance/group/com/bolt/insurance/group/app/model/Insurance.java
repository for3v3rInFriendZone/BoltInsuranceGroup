package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table
public class Insurance {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@NotNull
	@Column(name = "START_DATE")
	private Date startDate;
	
	@NotNull
	@Column(name = "END_DATE")
	private Date endDate;
	
	@NotNull
	@Column(name = "AMOUNT")
	private double amount;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TYPE")
	private Type type;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "HOME")
	private Home home;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "VEHICLE")
	private Vehicle vehicle;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "INSURANCE_RISK")
	private List<Risk> risks;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "USER_OF_INSURANCE", joinColumns = {
			@JoinColumn(name = "OWNER", columnDefinition = "VARCHAR(40)")
	})
	private List<User> users;
		
	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public Type getType() {
		return type;
	}

	public void setType(Type type) {
		this.type = type;
	}

	public Home getHome() {
		return home;
	}

	public void setHome(Home home) {
		this.home = home;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public List<Risk> getRisks() {
		return risks;
	}

	public void setRisks(List<Risk> risks) {
		this.risks = risks;
	}

	public Insurance(long id, Date startDate, Date endDate, double amount, Type type, Home home, Vehicle vehicle,
			List<Risk> risks, List<User> users) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
		this.home = home;
		this.vehicle = vehicle;
		this.risks = risks;
		this.users = users;
	}

	public Insurance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
