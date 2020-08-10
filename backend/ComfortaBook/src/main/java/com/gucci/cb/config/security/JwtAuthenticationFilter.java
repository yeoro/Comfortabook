package com.gucci.cb.config.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

/**
 * JWT가 유효한 Token인지 인증하기 위한 Filter
 * Security 설정 시 UsernamePasswordAuthenticationFilter 앞에 설정
 */

public class JwtAuthenticationFilter extends GenericFilterBean {
	
	private JwtTokenUtil jwtTokenUtil;
	
	// Jwt Provider 주입
	public JwtAuthenticationFilter(JwtTokenUtil jwtTokenProvider) {
		this.jwtTokenUtil = jwtTokenProvider;
	}

	// Request로 들어오는 JWT Token의 유효성을 검증
	// (jwtTokenProvider.validateToken)하는 filter를 filterChain에 등록합니다.
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		String token = jwtTokenUtil.resolveToken((HttpServletRequest)request);
		
		if(token != null && jwtTokenUtil.validateToken(token)) {
			Authentication auth = jwtTokenUtil.getAuthentication(token);
			SecurityContextHolder.getContext().setAuthentication(auth);
		}
		
		chain.doFilter(request, response);
	}

}
