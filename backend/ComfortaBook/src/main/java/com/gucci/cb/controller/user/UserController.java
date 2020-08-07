package com.gucci.cb.controller.user;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gucci.cb.config.security.JwtTokenUtil;
import com.gucci.cb.domain.user.User;
import com.gucci.cb.dto.social.KakaoProfile;
import com.gucci.cb.dto.user.UserDTO;
import com.gucci.cb.repository.user.UserJpaRepository;
import com.gucci.cb.service.social.KakaoAPIService;
import com.gucci.cb.service.social.KakaoService;
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
	private final KakaoService kakaoService;
	private final KakaoAPIService kakaoAPIService;
	private final UserJpaRepository userJpaRepository;
	private final JwtTokenUtil jwtTokenUtil;
	
	@ApiOperation(value = "회원가입", notes = "회원가입을 한다.")
	@PostMapping(value = "/signup")
	public ResponseEntity<User> signup(@RequestBody UserDTO userDTO) {
		
		User user = User.builder()
						.email(userDTO.getEmail())
						.password(userDTO.getPassword())
						.name(userDTO.getName())
						.phoneNumber(userDTO.getPhoneNumber())
						.roles(Collections.singletonList("ROLE_USER"))
						.build();
		
		
		return new ResponseEntity<User>(userService.signUp(user), HttpStatus.OK);
	}
	
	
	@ApiOperation(value = "소셜 계정 가입", notes = "소셜 계정 회원가입을 한다.")
    @PostMapping(value = "/signup/{provider}")
    public ResponseEntity<User> signupProvider( @PathVariable("provider") String provider, @RequestBody UserDTO userDTO) {

        KakaoProfile profile = kakaoService.getKakaoProfile(userDTO.getAccessToken());
        Optional<User> user = userJpaRepository.findByEmailAndProvider(String.valueOf(profile.getId()), provider);
        if (user.isPresent())
            throw new IllegalArgumentException("에러 메세지 입력");

        User inUser = User.builder()
                .email(String.valueOf(profile.getId()))
                .provider(provider)
                .name(userDTO.getName())
                .roles(Collections.singletonList("ROLE_USER"))
                .build();

        return new ResponseEntity<User>(userJpaRepository.save(inUser), HttpStatus.OK);
    }
	
	
	@ApiOperation(value = "로그인", notes = "이메일 회원 로그인을 한다.")
    @PostMapping(value = "/signin")
	public ResponseEntity<String> signin(@RequestBody UserDTO userDTO) {
		
		return new ResponseEntity<String>(userService.signIn(userDTO.getEmail(), userDTO.getPassword()), HttpStatus.OK);
	}
	
	
    @ApiOperation(value = "소셜 로그인", notes = "소셜 회원 로그인을 한다.")
    @PostMapping(value = "/signin/{provider}")
    public ResponseEntity<String> signinByProvider(
            @ApiParam(value = "서비스 제공자 provider", required = true, defaultValue = "kakao") @PathVariable String provider,
            @ApiParam(value = "소셜 access_token", required = true) @RequestBody String accessToken) {

    	HashMap<String, Object> userInfo = kakaoAPIService.getUserInfo(accessToken);
        User user = userJpaRepository.findByEmailAndProvider(String.valueOf(userInfo.get("email")), provider).orElseThrow(() -> new IllegalArgumentException("user controller 1"));
       
        return new ResponseEntity<String>(jwtTokenUtil.createToken(String.valueOf(user.getUserNo()), user.getRoles()), HttpStatus.OK);
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
	public ResponseEntity<Void> modifyUser(@RequestBody UserDTO userDTO) {
		
		// SecurityContext에서 인증 받은 회원의 정보를 얻어 온다.
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String id = authentication.getName();
		
		userService.updateUser(id, userDTO.getName(), userDTO.getPassword(), userDTO.getPhoneNumber());
		
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

