package com.gucci.cb.repository.user;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.user.UserBooks;

public interface UserBookRepository extends JpaRepository<UserBooks, Long> {
	List<UserBooks> findAllByBookNo(Long bookNo);
	
	List<UserBooks> findAllByUserNoAndBookNo(Long userNo, Long bookNo);
	
	Optional<UserBooks> findByUserNoAndBookNo(Long userNo, Long bookNo);
	
	Optional<UserBooks> findByUserNoAndRecentBook(Long userNo, int recentBook);
	
}
