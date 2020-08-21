package com.gucci.cb.dto.book;

import java.util.Date;

import com.gucci.cb.domain.book.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
	
	private String isbn;
	private String author;
	private String title;
	private String categoryName;
	private String publisher;
	private Date pubdate;
	private String description;
	private String cover;
	
	
	@Builder
	public BookDTO(Book book) {
		this.author = book.getAuthor();
		this.title = book.getTitle();
	}
}
