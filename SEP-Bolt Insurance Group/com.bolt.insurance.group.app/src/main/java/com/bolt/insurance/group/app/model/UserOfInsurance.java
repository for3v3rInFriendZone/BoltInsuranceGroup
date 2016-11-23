package com.bolt.insurance.group.app.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "USER_OF_INSURANCE")
public class UserOfInsurance implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@EmbeddedId
	private UserOfInsuranceId userOfInsuranceId;
	
	@Column(name = "OWNER", nullable = false)
	private boolean owner;

	public boolean isOwner() {
		return owner;
	}

	public void setOwner(boolean owner) {
		this.owner = owner;
	}

	public UserOfInsurance(UserOfInsuranceId userOfInsuranceId, boolean owner) {
		super();
		this.userOfInsuranceId = userOfInsuranceId;
		this.owner = owner;
	}

	public UserOfInsurance() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}
