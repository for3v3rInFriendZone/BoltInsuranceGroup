package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;


@Entity
public class Data {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	
	@NotNull
	private String name;
	
	@NotNull
	private String game;
	
	
	public Data(){
		
	}
	
	public Data(long id){
		this.id = id;
	}
	
	public Data(String name, String game) {
		super();
		this.name = name;
		this.game = game;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGame() {
		return game;
	}

	public void setGame(String game) {
		this.game = game;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	
	
	
}
