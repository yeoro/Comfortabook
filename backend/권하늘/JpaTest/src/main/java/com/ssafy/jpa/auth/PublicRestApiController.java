package com.ssafy.jpa.auth;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.jpa.user.User;
import com.ssafy.jpa.user.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/public")
@RequiredArgsConstructor
public class PublicRestApiController {
	
	private final UserRepository userRepository;
	
    @GetMapping("test1")
    public String test1(){
        return "API Test 1";
    }

    @GetMapping("test2")
    public String test2(){
        return "API Test 2";
    }
    
    @GetMapping("users")
    public List<User> allUsers() {
    	
    	return this.userRepository.findAll();
    }

}