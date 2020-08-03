package com.gucci.cb.controller.email;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.service.email.EmailService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class EmailController {
	
	private final EmailService emailService;

	// 임시 비밀번호 전송
	@ApiOperation(value = "임시 비밀번호 전송", response = String.class)
	@PostMapping("/email")
	public String sendEmailAction (
			@ApiParam(value = "이메일", required = true) @RequestParam String email,
			@ApiParam(value = "이름", required = true) @RequestParam String name,
			@RequestParam Long bookNo){
		System.out.println("email : " + email);
		System.out.println("name : " + name);
		emailService.sendEmail(email, name, bookNo);
		return "전송 완료";
	}

}
