package com.gucci.cb.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.user.UserBooks;

public interface UserBookRepository extends JpaRepository<UserBooks, Long> {

}
