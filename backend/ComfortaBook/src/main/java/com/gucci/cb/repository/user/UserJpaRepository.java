package com.gucci.cb.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gucci.cb.domain.user.User;

public interface UserJpaRepository extends JpaRepository<User, Long> {
	
	// 이메일로 찾기
	Optional<User> findByEmail(String id);
	
	// 이메일, 연동 api로 찾기
	Optional<User> findByEmailAndProvider(String email, String provider);

	// 이름, 폰번호로 찾기
	Optional<User> findByNameAndPhoneNumber(String name, String phoneNumber);
	
	// 이메일, 이름으로 찾기
	Optional<User> findByEmailAndName(String email, String name);
	
}
