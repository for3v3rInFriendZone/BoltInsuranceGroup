package com.bolt.insurance.group.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "SUBGROUP")
public class Subgroup implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name = "COEFFICIENT", nullable = false)
	private String coefficient;
	
	@Column(name = "SUBNAME")
	private String subname;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "RISK")
	private Risk risk;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCoefficient() {
		return coefficient;
	}

	public void setCoefficient(String coefficient) {
		this.coefficient = coefficient;
	}

	public String getSubname() {
		return subname;
	}

	public void setSubname(String subname) {
		this.subname = subname;
	}

	public Risk getRisk() {
		return risk;
	}

	public void setRisk(Risk risk) {
		this.risk = risk;
	}

	public Subgroup(long id, String coefficient, String subname, Risk risk) {
		super();
		this.id = id;
		this.coefficient = coefficient;
		this.subname = subname;
		this.risk = risk;
	}

	public Subgroup() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
