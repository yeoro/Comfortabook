package com.gucci.cb.controller.user;

import java.util.Collections;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.domain.user.User;
import com.gucci.cb.service.user.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;

/**
 * 가입 / 로그인 컨트롤러
 * 로그인 성공 시 결과로 JWT 토큰 발급
 * 가입 시에는 패스워드 인코딩 사용
 * 
 * 유효한 JWT 토큰을 설정해야만 User 리소스를 사용할 수 있도록
 * Header에 X-AUTH-TOKEN을 인자로 받도록 선언
 */

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Api(tags = {"User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

	private final UserService userService;
	
	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
	@PostMapping(value = "/signup")
	public ResponseEntity<User> signup(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
							   @ApiParam(value = "비밀번호", required = true) @RequestParam String password,
							   @ApiParam(value = "이름", required = true) @RequestParam String name, 
							   @ApiParam(value = "전화번호", required = true) @RequestParam String phoneNumber) {
		
		User user = User.builder()
						.email(id)
						.password(password)
						.name(name)
						.phoneNumber(phoneNumber)
						.roles(Collections.singletonList("ROLE_USER"))
						.build();
		
		
		return new ResponseEntity<User>(userService.signUp(user), HttpStatus.OK);
	}
	
	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
    @PostMapping(value = "/signin")
	public ResponseEntity<String> login(@ApiParam(value = "회원ID : 이메일", required = true) @RequestParam String id,
									   @ApiParam(value = "비밀번호", required = true) @RequestParam String password) {
		
		return new ResponseEntity<String>(userService.signIn(id, password), HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "전체 회원 조회", notes = "모든 회원을 조회한다")
	@GetMapping(value = "/list")
	public ResponseEntity<List<User>> findAllUser() {
		
		return new ResponseEntity<List<User>>(userService.findAllUser(), HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 정보 조회", notes = "회원번호로 회원을 조회한다")
	@GetMapping("/detail")
	public ResponseEntity<User> findUser() {
		
		// SecurityContext에서 인증 받은 회원의 정보를 얻어 온다. (pk로 조회)
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String id = authentication.getName();
		
		return new ResponseEntity<User>(userService.findUser(id), HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 정보 수정", notes = "회원정보를 수정한다")
	@PutMapping(value = "/update/{userNo}")
	public ResponseEntity<Void> modifyUser(
			@ApiParam(value = "비밀번호", required = true) @RequestParam String password,
			@ApiParam(value = "전화번호", required = true) @RequestParam String phoneNumber,
			@ApiParam(value = "이름", required = true) @RequestParam String name) {
		
		// SecurityContext에서 인증 받은 회원의 정보를 얻어 온다.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String id = authentication.getName();
		
		userService.updateUser(id, name, password, phoneNumber);
//		User user = User.builder()
//				.name(name)
//				.password(password)
//				.phoneNumber(phoneNumber)
//				.build();
		
		return new ResponseEntity<Void>(HttpStatus.OK);
	}

	@ApiImplicitParams({
		@ApiImplicitParam(name = "X-AUTH-TOKEN", value = "로그인 성공 후 access_token", required = true, dataType = "String", paramType = "header")
	})
	@ApiOperation(value = "회원 삭제", notes = "회원번호로 회원정보를 삭제한다")
	@DeleteMapping(value = "/delete/{userNo}")
	public ResponseEntity<Void> deleteUser(
			@ApiParam(value = "회원번호", required = true) @PathVariable long userNo) {
		
		userService.deleteUser(userNo);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
}

