package com.gucci.cb.service.email;

public interface EmailService {
	
	// 임시 비밀번호 전송
	void sendTempPassword(String email, String name);
}
