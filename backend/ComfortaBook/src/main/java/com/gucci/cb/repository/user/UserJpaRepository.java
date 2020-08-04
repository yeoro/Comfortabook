package com.gucci.cb.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.user.User;


public interface UserJpaRepository extends JpaRepository<User, Long> {
	
	Optional<User> findByEmail(String id);
	
	Optional<User> findByEmailAndProvider(String email, String provider);

}
