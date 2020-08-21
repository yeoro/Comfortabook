package com.gucci.cb.domain.book;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookContents {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long seq;
	
	@Column(name = "book_no", nullable = false)
	private Long bookNo;
	
	@Column(name = "page_no", nullable = false)
	private String pageNo;
	
	@Column(columnDefinition = "longtext")
	private String content;
	
	public BookContents(Book book) {
		this.bookNo = book.getBookNo();
	}
	
//	public BookContents(String pageNo) {
//		
//		this.pageNo = pageNo;
//	}
}
