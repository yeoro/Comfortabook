package com.gucci.cb.service.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gucci.cb.error.CUserNotFoundException;
import com.gucci.cb.repository.UserJpaRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class JwtUserDetailsService implements UserDetailsService{
	
	private final UserJpaRepository userJpaRepository;
	
	public UserDetails loadUserByUsername(String userPk) throws UsernameNotFoundException {
		return userJpaRepository.findById(Long.valueOf(userPk)).orElseThrow(CUserNotFoundException::new);
	}

}
