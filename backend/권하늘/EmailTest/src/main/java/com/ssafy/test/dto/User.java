package com.ssafy.test.dto;

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
}
