package com.gucci.cb.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_no")
	private Long bookNo;
	
	private String isbn;
	private String title;
	
	@Column(name = "CategoryName")
	private String categoryName;
	private String author;
	private String publisher;
	private Date pubdate;
	private String description;
	private String cover;
	
	@Column(name = "member_no")
	private String memberNo;
	
}
