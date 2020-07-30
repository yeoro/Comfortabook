package com.example.demo.vo;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserVO {
	
	private int id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private int age;
	private int salary;
	
}
