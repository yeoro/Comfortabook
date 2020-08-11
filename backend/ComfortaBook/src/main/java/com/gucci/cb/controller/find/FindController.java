package com.gucci.cb.controller.find;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.domain.user.User;
import com.gucci.cb.dto.user.UserDTO;
import com.gucci.cb.service.email.EmailService;
import com.gucci.cb.service.user.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@CrossOrigin
@RestController
@Api(tags = {"Find"})
@RequiredArgsConstructor
@RequestMapping("/find")
public class FindController {

	private final EmailService emailService;
	private final UserService userService;

	// 아이디 찾기
	@ApiOperation(value = "아이디 찾기", response = String.class)
	@PostMapping("/findId")
	public ResponseEntity<User> findId (@RequestBody UserDTO userDto){

		return new ResponseEntity<User>(userService.findId(userDto.getName(), userDto.getPhoneNumber()), HttpStatus.OK);
	}


	// 임시 비밀번호 전송
	@ApiOperation(value = "임시 비밀번호 전송", response = String.class)
	@PostMapping("/findPw")
	public ResponseEntity<Void> findPassword (@RequestBody UserDTO userDto){

		emailService.sendTempPassword(userDto.getEmail(), userDto.getName());
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	// 아이디(이메일) 중복체크
	@ApiOperation(value = "이메일 중복 체크", response = String.class)
	@PostMapping("/checkId")
	public ResponseEntity<String> duplicateCheckId (@RequestBody UserDTO userDto){
		
		return new ResponseEntity<String>(userService.duplicateCheck(userDto.getEmail()), HttpStatus.OK);
	}

}
