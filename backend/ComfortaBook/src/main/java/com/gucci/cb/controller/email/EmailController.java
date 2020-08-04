package com.gucci.cb.controller.email;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.service.email.EmailService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

@RestController
@Api(tags = {"Email"})
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {
	
	private final EmailService emailService;

	// 임시 비밀번호 전송
	@ApiOperation(value = "임시 비밀번호 전송", response = String.class)
	@PostMapping("/findPw")
	public ResponseEntity<Void> snedTempPassword (
			@ApiParam(value = "이메일", required = true) @RequestParam String email,
			@ApiParam(value = "이름", required = true) @RequestParam String name){
		
		emailService.snedTempPassword(email, name);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

}
