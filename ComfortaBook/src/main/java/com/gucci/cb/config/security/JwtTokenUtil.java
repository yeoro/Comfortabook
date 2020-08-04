package com.gucci.cb.config.security;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;


/**
 * JWT 토큰 생성 및 검증
 */
@RequiredArgsConstructor
@Component
public class JwtTokenUtil { 

	@Value("spring.jwt.secret")
	private String secretKey;

	private long tokenValidTime = 1000L * 60 * 60; // 1시간 (ms)

	private final UserDetailsService userDetailsService;

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}


	/**
	 * JWT 토큰 생성
	 * Claims : Token 에 담을 정보
	 * Subject : Token 제목
	 */
	public String createToken(String userPk, List<String> roles) {
		Claims claims = Jwts.claims().setSubject(userPk);
		claims.put("roles", roles);
		Date now = new Date();

		return Jwts.builder()
				.setClaims(claims) // 데이터
				.setIssuedAt(now) // Token 발행일자
				.setExpiration(new Date(now.getTime() + tokenValidTime)) // Token 만료 시간
				.signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, secret 값 세팅
				.compact(); 
	}

	// JWT 토큰으로 인증 정보 조회
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// JWT 토큰에서 회원 구별 정보 추출
	public String getUserPk(String token) {
		return Jwts
				.parser()
				.setSigningKey(secretKey)
				.parseClaimsJws(token)
				.getBody()
				.getSubject();
	}

	// Request의 Header에서 Token 파싱 : "X-AUTH-TOKEN : JWT Token"
	public String resolveToken(HttpServletRequest request) {
		return request.getHeader("X-AUTH-TOKEN");
	}

	// JWT 토큰의 유효성 + 만료 일자 확인
	public boolean validateToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (Exception e) {
			return false;
		}
	}
}
