package com.gucci.cb.domain.book;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.gucci.cb.domain.user.UserBooks;

import lombok.AllArgsConstructor;
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
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "book_isbn")
	private List<BookContents> bookContents = new ArrayList<>();
	
	@OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "book_no", foreignKey = @ForeignKey(name = "FK_book"))
	private Collection<UserBooks> userBooks;
	
//	@OneToMany(mappedBy = "bookNo")
//	private List<UserBooks> userBooks;
	
	public void update(String title, String author) {
		this.title = title;
		this.author = author;
	}
}
