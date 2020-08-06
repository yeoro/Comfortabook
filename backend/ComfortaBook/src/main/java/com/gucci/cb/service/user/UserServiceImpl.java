package com.gucci.cb.service.user;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gucci.cb.config.security.JwtTokenUtil;
import com.gucci.cb.domain.user.User;
import com.gucci.cb.repository.user.UserJpaRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserJpaRepository userJpaRepository;
	
	private final JwtTokenUtil jwtTokenUtil;
	
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public User signUp(User user) {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userJpaRepository.save(user);
		return user;
		
	}

	@Override
	public String signIn(String id, String password) {
		User user = userJpaRepository.findByEmail(id).orElseThrow(() -> new IllegalArgumentException("에러 메세지 입력 "));
//		if(!passwordEncoder.matches(password, user.getPassword())) {
//			throw new IllegalArgumentException("에러 메세지 입력");
//		}
		
		return jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles());
	}

	@Override
	public List<User> findAllUser() {
		return userJpaRepository.findAll();
	}

	@Override
	public User findUser(String id) {
		return userJpaRepository.findByEmail(id).orElseThrow(() -> new IllegalArgumentException("에러 메세지 입력"));
	}

	@Override
	@Transactional
	public void updateUser(String id, String name, String password, String phoneNumber) {
		
		User user = userJpaRepository.findByEmail(id).orElseThrow(() -> new IllegalArgumentException("회원 정보 수정 중 오류가 발생하였습니다."));
		user.update(name, passwordEncoder.encode(password), phoneNumber);
		
	}

	@Override
	@Transactional
	public void deleteUser(long userNo) {
		userJpaRepository.deleteById(userNo);
	}

}
