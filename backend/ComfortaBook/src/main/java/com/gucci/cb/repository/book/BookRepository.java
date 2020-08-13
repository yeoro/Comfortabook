package com.gucci.cb.repository.book;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.book.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
	Optional<Book> findByIsbn(String isbn);

	Page<Book> findByTitleContaining(String keyword, Pageable pageable);
	
	Page<Book> findByAuthorContaining(String keyword, Pageable pageable);
	
	Page<Book> findByCategoryNameContaining(String keyword, Pageable pageable);
}
