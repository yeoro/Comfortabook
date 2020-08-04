package com.ssafy.kakao.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import com.ssafy.kakao.service.MyAOAuth2AuthorizedClientService;

@Configuration
public class MyOAuth2Configuration {

	@Bean
	public OAuth2AuthorizedClientService authorizedClientService(MyAOAuth2AuthorizedClientService myAOAuth2AuthorizedClientService) {
		return myAOAuth2AuthorizedClientService;
	}
	
	@Bean
	public ClientRegistrationRepository clientRegistrationRepository() {
		final ClientRegistration clientRegistration = CustomOAuthProvider.KAKAO
				.getBuilder()
				.build();
		
		return new InMemoryClientRegistrationRepository(Collections.singletonList(clientRegistration));
	}
}
