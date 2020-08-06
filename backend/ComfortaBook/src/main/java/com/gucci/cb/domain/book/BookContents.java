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
	private long seq;
	
	@Column(name = "book_isbn")
	private String bookIsbn;
	
	@Column(name = "page_no")
	private String pageNo;
	
	private String content;
	
	public BookContents(String pageNo) {
		this.pageNo = pageNo;
	}
}
