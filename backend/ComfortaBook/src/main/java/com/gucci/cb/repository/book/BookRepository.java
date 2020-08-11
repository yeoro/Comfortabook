package com.gucci.cb.repository.book;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.book.Book;
import com.gucci.cb.domain.book.BookContents;

public interface BookRepository extends JpaRepository<Book, Long>{
}
