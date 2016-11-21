package com.bolt.insurance.group.com.bolt.insurance.group.app.model;

public class Data {

	private String name;
	private String game;
	
	public Data(){
		
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
	
	
}
