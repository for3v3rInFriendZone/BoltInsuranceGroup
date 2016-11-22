package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Embeddable
public class UserOfInsuranceId implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@ManyToOne
	@JoinColumn(name = "USER_KEY")
	protected User user;
	
	@ManyToOne
	@JoinColumn(name = "INSURANCE")
	protected Insurance insurance;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Insurance getInsurance() {
		return insurance;
	}

	public void setInsurance(Insurance insurance) {
		this.insurance = insurance;
	}

	public UserOfInsuranceId(User user, Insurance insurance) {
		super();
		this.user = user;
		this.insurance = insurance;
	}

	public UserOfInsuranceId() {
		
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((insurance == null) ? 0 : insurance.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserOfInsuranceId other = (UserOfInsuranceId) obj;
		if (insurance == null) {
			if (other.insurance != null)
				return false;
		} else if (!insurance.equals(other.insurance))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}
	
}
