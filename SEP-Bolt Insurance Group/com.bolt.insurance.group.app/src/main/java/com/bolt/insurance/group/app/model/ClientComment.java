package com.bolt.insurance.group.app.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "COMMENT_OF_CLIENT")
public class ClientComment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotNull
	@Column(name = "CLIENT_NAME")
	private String name;

	@NotNull
	@Column(name = "CLIENT_SURNAME")
	private String surname;

	@NotNull
	@Column(name = "COMMENT")
	private String comment;

	public ClientComment() {
		super();
	}

	public ClientComment(String name, String surname, String comment) {
		super();
		this.name = name;
		this.surname = surname;
		this.comment = comment;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public long getId() {
		return id;
	}

}
