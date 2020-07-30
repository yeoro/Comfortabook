package com.ssafy.cb.repository;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.cb.dto.User;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class DbInit implements CommandLineRunner {
	
	private UserRepository userRepository;
	private PasswordEncoder passwordEncoder;
	
	@Override
	public void run(String... args) throws Exception {
		// Delete all
		this.userRepository.deleteAll();
		
		//create users
		User sky = new User("sky", passwordEncoder.encode("sky"), "USER", "");
		User admin = new User("admin", passwordEncoder.encode("admin"), "ADMIN", "ACCESS_TEST1,ACCESS_TEST2");
		User manager = new User("manager", passwordEncoder.encode("manager"), "MANAGER", "ACCESS_TEST1");
		
		List<User> users = Arrays.asList(sky, admin, manager);
		
		// save to db
		this.userRepository.saveAll(users);
	}
	
	
}
