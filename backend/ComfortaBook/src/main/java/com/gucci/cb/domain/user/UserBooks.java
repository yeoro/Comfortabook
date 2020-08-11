package com.gucci.cb.domain.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.gucci.cb.domain.book.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class UserBooks {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;

	@Column(name = "user_no", nullable = false)
	private Long userNo;
	
	@Column(name = "book_no", nullable = false)
	private Long bookNo;
	
	@Builder
	public UserBooks(User user, Book book) {
		this.userNo = user.getUserNo();
		this.bookNo = book.getBookNo();
	}
	
}
