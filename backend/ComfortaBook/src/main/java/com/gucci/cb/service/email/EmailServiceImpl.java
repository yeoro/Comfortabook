package com.gucci.cb.service.email;

import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.gucci.cb.domain.book.Book;
import com.gucci.cb.dto.email.TempKey;
import com.gucci.cb.repository.book.BookRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailServiceImpl implements EmailService{
	
	private JavaMailSender mailSender;
	private BookRepository bookRepository;
	
	@Override
	@Transactional
	public void sendEmail(String email, String name, Long no) {
		
		String USERNAME = name;
		String EMAIL = email;
		String PASSWORD = new TempKey().getKey(10, false);
		
		try {
			MimeMessage msg = mailSender.createMimeMessage();
			MimeMessageHelper messageHelper = new MimeMessageHelper(msg, true, "UTF-8");
			
			messageHelper.setSubject(USERNAME+"님 비밀번호 찾기 메일입니다.");
			messageHelper.setText("비밀번호는 "+PASSWORD+" 입니다.");
			messageHelper.setTo(EMAIL);
			msg.setRecipients(MimeMessage.RecipientType.TO , InternetAddress.parse(EMAIL));
			
			mailSender.send(msg);
			System.out.println("bookNo : " + no);
//			this.updatePw(no, PASSWORD);
			Book updateBook = bookRepository.findById(no)
					.orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다."));	
			System.out.println("update pw : " + PASSWORD + " " + no);
			updateBook.updatee(PASSWORD);
			
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}
	
	// 기존 비밀번호 수정
	@Override
	@Transactional
	public void updatePw(Long bookNo, String key) {
		Book updateBook = bookRepository.findById(bookNo)
				.orElseThrow(() -> new IllegalArgumentException("해당 도서가 존재하지 않습니다."));	
		System.out.println("update pw : " + key + " " + bookNo);
		updateBook.updatee(key);
	}
	
	
	
}
