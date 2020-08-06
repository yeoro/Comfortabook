package com.gucci.cb.dto.user;


import com.gucci.cb.domain.user.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
	
	private String email;
	private String password;
	private String name;
	private String phoneNumber;
	private String provider;
	private String accessToken;
	
	@Builder
	public UserDTO(User user) {
		this.name = user.getName();
		this.password = user.getPassword();
		this.phoneNumber = user.getPhoneNumber();
	}

}
