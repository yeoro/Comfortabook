package com.gucci.cb.repository.user;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.user.UserBooks;

public interface UserBookRepository extends JpaRepository<UserBooks, Long> {
	List<UserBooks> findAllByUserNoAndBookNo(Long userNo, Long BookNo);
}
