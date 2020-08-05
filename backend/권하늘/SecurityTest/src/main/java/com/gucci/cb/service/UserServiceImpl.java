package com.gucci.cb.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gucci.cb.config.security.JwtTokenUtil;
import com.gucci.cb.entity.User;
import com.gucci.cb.error.CEmailSigninFailedException;
import com.gucci.cb.error.CUserNotFoundException;
import com.gucci.cb.repository.UserJpaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
	
	private final UserJpaRepository userJpaRepository;
	
	private final JwtTokenUtil jwtTokenUtil;
	
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public User signUp(User user) {
		userJpaRepository.save(user);
		return user;
		
	}

	@Override
	public String signIn(String id, String password) {
		User user = userJpaRepository.findByEmail(id).orElseThrow(CEmailSigninFailedException::new);
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new CEmailSigninFailedException();
		}
		
		return jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles());
	}

	@Override
	public List<User> findAllUser() {
		return userJpaRepository.findAll();
	}

	@Override
	public User findUser(String id) {
		return userJpaRepository.findByEmail(id).orElseThrow(CUserNotFoundException::new);
	}

	@Override
	@Transactional
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public void deleteUser(long userNo) {
		userJpaRepository.deleteById(userNo);
	}

}
