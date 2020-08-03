package com.gucci.cb.service.email;

public interface EmailService {
	
	// 임시 비밀번호 전송
	void sendEmail(String email, String name, Long no);
	
	// 기존 비밀번호 수정
	void updatePw(Long bookNo, String key);
}
