package com.bolt.insurance.group.app.dao;

import com.bolt.insurance.group.app.model.Subgroup;

public class PersonsDao {

	private int userUnder18;
	private int userBetween18And60;
	private int userOver60;
	private int numberOfUsers;
	private Subgroup under18Subgroup;
	private Subgroup between18And60Subgroup;
	private Subgroup over60Subgroup;
	
	public int getUserUnder18() {
		return userUnder18;
	}
	
	public void setUserUnder18(int userUnder18) {
		this.userUnder18 = userUnder18;
	}
	
	public int getUserBetween18And60() {
		return userBetween18And60;
	}
	
	public void setUserBetween18And60(int userBetween18And60) {
		this.userBetween18And60 = userBetween18And60;
	}
	
	public int getUserOver60() {
		return userOver60;
	}
	
	public void setUserOver60(int userOver60) {
		this.userOver60 = userOver60;
	}
	
	public int getNumberOfUsers() {
		return numberOfUsers;
	}
	
	public void setNumberOfUsers(int numberOfUsers) {
		this.numberOfUsers = numberOfUsers;
	}
	
	public Subgroup getUnder18Subgroup() {
		return under18Subgroup;
	}

	public void setUnder18Subgroup(Subgroup under18Subgroup) {
		this.under18Subgroup = under18Subgroup;
	}

	public Subgroup getBetween18And60Subgroup() {
		return between18And60Subgroup;
	}

	public void setBetween18And60Subgroup(Subgroup between18And60Subgroup) {
		this.between18And60Subgroup = between18And60Subgroup;
	}

	public Subgroup getOver60Subgroup() {
		return over60Subgroup;
	}

	public void setOver60Subgroup(Subgroup over60Subgroup) {
		this.over60Subgroup = over60Subgroup;
	}

	public PersonsDao() {
		super();
	}
}
