package com.gucci.cb.service.email;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gucci.cb.domain.user.User;
import com.gucci.cb.dto.email.TempKey;
import com.gucci.cb.repository.user.UserJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService{
	
	private final JavaMailSender mailSender;
	
	private final UserJpaRepository userJpaRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	@Override
	@Transactional
	public void sendTempPassword(String email, String name) {
		
		String userName = name;
		String userEmail = email;
		String tempPassword = new TempKey().getKey(10, false);
		
		User user = userJpaRepository.findByEmailAndName(email, name).orElseThrow(() -> 
			new IllegalArgumentException("이메일을 혹은 이름을 확인해주세요."));
		
		
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(msg, true, "UTF-8");
			
			messageHelper.setSubject(userName+"님 비밀번호 찾기 메일입니다.");
			messageHelper.setText("임시 비밀번호는 "+tempPassword+" 입니다. 로그인 후 비밀번호를 변경 해주세요.");
			messageHelper.setTo(userEmail);
			msg.setRecipients(MimeMessage.RecipientType.TO , InternetAddress.parse(userEmail));
			
			mailSender.send(msg);
			
			user.updatePassword(passwordEncoder.encode(tempPassword));
			
			
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
}
