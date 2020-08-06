//package com.gucci.cb.controller;
//
//import java.util.Collections;
//
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.gucci.cb.config.security.JwtTokenUtil;
//import com.gucci.cb.entity.User;
//import com.gucci.cb.error.CEmailSigninFailedException;
//import com.gucci.cb.model.response.CommonResult;
//import com.gucci.cb.model.response.SingleResult;
//import com.gucci.cb.repository.UserJpaRepository;
//import com.gucci.cb.service.ResponseService;
//
//import io.swagger.annotations.Api;
//import io.swagger.annotations.ApiOperation;
//import io.swagger.annotations.ApiParam;
//import lombok.RequiredArgsConstructor;
//
///**
// * 가입 / 로그인 컨트롤러
// * 로그인 성공 시 결과로 JWT 토큰 발급
// * 가입 시에는 패스워드 인코딩 사용
// */
//
//@Api(tags = {"1. Sign"})
//@RequiredArgsConstructor
//@RestController
//@RequestMapping("/v1")
//public class SignController {
//
//	private final UserJpaRepository userJpaRepository;
//	private final JwtTokenUtil jwtTokenUtil;
//	private final ResponseService responseService;
//	private final PasswordEncoder passwordEncoder;
//	
//	
//	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
//    @PostMapping(value = "/signin")
//	public SingleResult<String> signin(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
//									   @ApiParam(value = "비밀번호", required = true) @RequestParam String password) {
//		
//		User user = userJpaRepository.findByEmail(id).orElseThrow(CEmailSigninFailedException::new);
//		if(!passwordEncoder.matches(password, user.getPassword())) {
//			throw new CEmailSigninFailedException();
//		}
//		
//		return responseService.getSingleResult(jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles()));
//	}
//	
//	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
//	@PostMapping(value = "/signup")
//	public CommonResult signup(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
//							   @ApiParam(value = "비밀번호", required = true) @RequestParam String password,
//							   @ApiParam(value = "이름", required = true) @RequestParam String name) {
//		
//		
//		userJpaRepository.save(User.builder()
//						 .email(id)
//						 .password(passwordEncoder.encode(password))
//						 .name(name)
//						 .roles(Collections.singletonList("ROLE_USER"))
//						 .build());
//		
//		return responseService.getSuccessResult();
//	}
//}
