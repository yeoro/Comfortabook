package com.ssafy.kakao.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

import com.ssafy.kakao.config.kakao.KakaoOAuth2User;

import lombok.RequiredArgsConstructor;

@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
        		.antMatchers("/my").permitAll()
        		.antMatchers("/").permitAll()
                .antMatchers("/oauth2/**").permitAll()
                .antMatchers("/login/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .oauth2Login()
                	.userInfoEndpoint()
                	.customUserType(KakaoOAuth2User.class, "kakao");
    }
}
