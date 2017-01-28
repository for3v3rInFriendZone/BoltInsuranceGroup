package com.bolt.insurance.group.app.model;

import java.io.Serializable;
import java.util.ArrayList;
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
public class Insurance implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "START_DATE", nullable = false)
	private Date startDate;
	
	@NotNull
	@Column(name = "END_DATE")
	private Date endDate;
	
	@NotNull
	@Column(name = "AMOUNT")
	private double amount;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "TYPE", nullable = false)
	private Type type;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "HOME", nullable = true)
	private Home home;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "VEHICLE", nullable = true)
	private Vehicle vehicle;
	
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "SUBGROUP_RISK")
	private List<Subgroup> subgroups = new ArrayList<Subgroup>();

	public List<Subgroup> getSubgroups() {
		return subgroups;
	}

	public void setSubgroups(List<Subgroup> subgroups) {
		this.subgroups = subgroups;
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

	public Insurance(long id, Date startDate, Date endDate, double amount, Type type, Home home, Vehicle vehicle) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.amount = amount;
		this.type = type;
		this.home = home;
		this.vehicle = vehicle;
	}

	public Insurance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
