package com.gucci.cb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.entity.User;

public interface UserJpaRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String id);
	
	Optional<User> findByEmailAndProvider(String email, String provider);

}
