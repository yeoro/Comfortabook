package com.ssafy.cb.dto;

import lombok.Data;

@Data
public class User {
	int no;
	String id;
	String password;
	String name;
	String email;
	String phone_number;
	boolean is_manager;
	public User(int no, String id, String password, String name, String email, String phone_number,
			boolean is_manager) {
		super();
		this.no = no;
		this.id = id;
		this.password = password;
		this.name = name;
		this.email = email;
		this.phone_number = phone_number;
		this.is_manager = is_manager;
	}
	public User() {
		
	}
}

