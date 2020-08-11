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
		User user = userJpaRepository.findByEmail(id).orElseThrow(() -> new IllegalArgumentException("아이디를 확인 해주세요."));
		if(!passwordEncoder.matches(password, user.getPassword())) {
			throw new IllegalArgumentException("비밀번호를 확인 해주세요.");
		}
		System.out.println(jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles()));
		return jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles());
	}

	@Override
	public List<User> findAllUser() {
		return userJpaRepository.findAll();
	}

	@Override
	public User findUser(String id) {
		return userJpaRepository.findByEmail(id).orElseThrow(() -> new IllegalArgumentException("찾을 수 없는 회원입니다."));
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

	@Override
	public User findId(String name, String phoneNumber) {
		return userJpaRepository.findByNameAndPhoneNumber(name, phoneNumber).orElseThrow(() -> new IllegalArgumentException("이름 혹은 전화번호를 확인해주세요."));
	}
}
