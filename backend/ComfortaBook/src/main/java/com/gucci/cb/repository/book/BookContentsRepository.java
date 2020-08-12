package com.gucci.cb.repository.book;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.book.BookContents;

public interface BookContentsRepository extends JpaRepository<BookContents, Long> {
	List<BookContents> findAllByBookNo(Long bookNo);
}
