package com.gucci.cb.dto;

import com.gucci.cb.domain.Book;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {
	
	private String author;
	private String title;
	
	public Book toEntity() {
		return Book.builder()
				.author(author)
				.title(title)
				.build();
	}
	
	@Builder
	public BookDTO(Book book) {
		this.author = book.getAuthor();
		this.title = book.getTitle();
	}
}
