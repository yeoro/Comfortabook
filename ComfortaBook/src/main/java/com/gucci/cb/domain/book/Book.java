package com.gucci.cb.domain.book;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "book")
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "book_no")
	private Long bookNo;
	
	private String isbn;
	
	private String title;
	
	@Column(name = "category_name")
	private String categoryName;
	
	private String author;
	
	private String publisher;
	
	private Date pubdate;
	
	private String description;
	
	private String cover;
	
//	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//	@JoinColumn(name = "member_no") // 양방향 연관관계의 주인만이 JoinCloumn, 외래키가 있는 곳을 주인으로
//	private Member member;
	
	@Builder
	public Book(String title, String author) {
		this.author = author;
		this.title = title;
	}
	
	public void update(String title, String author) {
		this.title = title;
		this.author = author;
	}
}
