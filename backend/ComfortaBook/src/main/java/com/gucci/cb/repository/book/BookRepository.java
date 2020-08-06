package com.gucci.cb.repository.book;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.book.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
}
