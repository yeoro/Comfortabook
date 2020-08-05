package com.gucci.cb.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.config.security.JwtTokenUtil;
import com.gucci.cb.entity.User;
import com.gucci.cb.error.CUserNotFoundException;
import com.gucci.cb.model.response.CommonResult;
import com.gucci.cb.model.response.SingleResult;
import com.gucci.cb.repository.UserJpaRepository;
import com.gucci.cb.service.ResponseService;
import com.gucci.cb.service.UserService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

/**
 * 유효한 JWT 토큰을 설정해야만 User 리소스를 사용할 수 있도록
 * Header에 X-AUTH-TOKEN을 인자로 받도록 선언
 */

@CrossOrigin(origins = { "*" }, maxAge = 6000)
//@Api(tags = {"2. User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1")
public class UserController {

	private final UserJpaRepository userJpaRepository;
	
	private final UserService userService;
	
	private final JwtTokenUtil jwtTokenUtil;
	
	private final PasswordEncoder passwordEncoder;

	private final ResponseService responseService;
	
	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
	@PostMapping(value = "/signup")
	public ResponseEntity<User> signup(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
							   @ApiParam(value = "비밀번호", required = true) @RequestParam String password,
							   @ApiParam(value = "이름", required = true) @RequestParam String name) {
		
		User user = User.builder()
						.email(id)
						.password(passwordEncoder.encode(password))
						.name(name)
						.roles(Collections.singletonList("ROLE_USER"))
						.build();
		
		
		return new ResponseEntity<User>(userService.signUp(user), HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
    @PostMapping(value = "/signin")
	public ResponseEntity<String> signin(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
									   @ApiParam(value = "비밀번호", required = true) @RequestParam String password) {
		
		return new ResponseEntity<String>(userService.signIn(id, password), HttpStatus.OK);
	}

	
	
	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "전체 회원 조회", notes = "모든 회원을 조회한다")
	@GetMapping(value = "/user/list")
	public ResponseEntity<List<User>> findAllUser() {
		
		return new ResponseEntity<List<User>>(userService.findAllUser(), HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 정보 조회", notes = "회원번호로 회원을 조회한다")
	@GetMapping("/user/detail")
	public ResponseEntity<User> findUser() {
		
		// SecurityContext에서 인증 받은 회원의 정보를 얻어 온다.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String id = authentication.getName();
		
		return new ResponseEntity<User>(userService.findUser(id), HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 수정", notes = "회원정보를 수정한다")
	@PutMapping(value = "/user/update")
	public SingleResult<User> modify(
			@ApiParam(value = "회원번호", required = true) @RequestParam long userNo,
			@ApiParam(value = "회원이름", required = true) @RequestParam String name) {
		User user = User.builder()
				.userNo(userNo)
				.name(name)
				.build();
		return responseService.getSingleResult(userJpaRepository.save(user));
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 삭제", notes = "회원번호로 회원정보를 삭제한다")
	@DeleteMapping(value = "/user/delete/{userNo}")
	public ResponseEntity<Void> delete(
			@ApiParam(value = "회원번호", required = true) @PathVariable long userNo) {
		
		userService.deleteUser(userNo);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}
