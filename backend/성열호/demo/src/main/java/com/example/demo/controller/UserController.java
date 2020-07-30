package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserMapper mapper;
	
	@GetMapping
	public List<UserVO> userList(){
		System.out.println(mapper.userList());
		System.out.println("유저리스트 출력 성공");
		return mapper.userList();
	}
	
	@PostMapping
	void insertUser(@RequestBody UserVO user) {
		mapper.insertUser(user);
		System.out.println("유저 DB 저장 성공");
	}
	
	@GetMapping("/{id}")
	public UserVO fetchUserByID(@PathVariable int id) {
		System.out.println(mapper.fetchUserByID(id));
		UserVO fetchUser = mapper.fetchUserByID(id);
		return fetchUser;
	}
	
	@PutMapping("/{id}")
	public void updateUser(@PathVariable int id, @RequestBody UserVO user) {
		
		UserVO updateUser = user;
		System.out.println("업데이트유저 => " + updateUser);
		
		updateUser.setFirstName(user.getFirstName());
		updateUser.setLastName(user.getLastName());
		updateUser.setAge(user.getAge());
		updateUser.setSalary(user.getSalary());
		
		mapper.updateUser(updateUser);
	}
	
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable int id) {
		mapper.deleteUser(id);
		System.out.println("유저 삭제 성공");
	}
}
