package com.bolt.insurance.group.app.dto;

import java.util.ArrayList;
import java.util.List;

public class InsuranceDto {

	private double amount;
	private double discountPrice;
	private double price;
	private List<RiskDto> risks = new ArrayList<RiskDto>();
	private PersonsDto persons;
	private int days;
	private double travelInsurancePrice;
	private double carInsurancePrice;
	private double homeInsurancePrice;
	
	public double getAmount() {
		return amount;
	}
	
	public void setAmount(double amount) {
		this.amount = amount;
	}
	
	public double getDiscountPrice() {
		return discountPrice;
	}

	public void setDiscountPrice(double discountPrice) {
		this.discountPrice = discountPrice;
	}
	
	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public List<RiskDto> getRisks() {
		return risks;
	}
	
	public void setRisks(List<RiskDto> risks) {
		this.risks = risks;
	}
	
	public PersonsDto getPersons() {
		return persons;
	}
	
	public void setPersons(PersonsDto persons) {
		this.persons = persons;
	}
	
	public int getDays() {
		return days;
	}
	
	public void setDays(int days) {
		this.days = days;
	}
	
	public double getTravelInsurancePrice() {
		return travelInsurancePrice;
	}
	
	public void setTravelInsurancePrice(double travelInsurancePrice) {
		this.travelInsurancePrice = travelInsurancePrice;
	}
	
	public double getCarInsurancePrice() {
		return carInsurancePrice;
	}
	
	public void setCarInsurancePrice(double carInsurancePrice) {
		this.carInsurancePrice = carInsurancePrice;
	}
	
	public double getHomeInsurancePrice() {
		return homeInsurancePrice;
	}
	
	public void setHomeInsurancePrice(double homeInsurancePrice) {
		this.homeInsurancePrice = homeInsurancePrice;
	}
	
	public InsuranceDto() {
		super();
	}

}
