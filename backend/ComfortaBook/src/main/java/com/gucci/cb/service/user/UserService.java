package com.gucci.cb.service.user;

import java.util.List;

import com.gucci.cb.domain.user.User;


public interface UserService {
	
	// 회원 가입
	public User signUp(User user);
	
	// 로그인
	public String signIn(String id, String password);
	
	// 전체 회원 조회
	public List<User> findAllUser();
	
	// 회원 상세 조회
	public User findUser(String id);
	
	// 회원 정보 수정
	public void updateUser(String id, String name, String password, String phoneNumber);
	
	// 회원 탈퇴
	public void deleteUser(long userNo);
	
	// 아이디 찾기
	public User findId(String name, String phoneNumber);

	// 아이디 중복 체크
	public String duplicateCheck(String email);
	
}
