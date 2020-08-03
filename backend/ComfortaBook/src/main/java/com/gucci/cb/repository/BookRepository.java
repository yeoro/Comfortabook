package com.gucci.cb.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.Book;

public interface BookRepository extends JpaRepository<Book, Long>{
}
