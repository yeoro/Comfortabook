package com.ssafy.kakao.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.ssafy.kakao.dto.Member;
import com.ssafy.kakao.repo.MemberRepository;

import lombok.RequiredArgsConstructor;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@Service
@RequiredArgsConstructor
public class MyAOAuth2AuthorizedClientService implements OAuth2AuthorizedClientService {

	private final MemberRepository memberRepository;
	
	
	@Override
	public <T extends OAuth2AuthorizedClient> T loadAuthorizedClient(String clientRegistrationId,
			String principalName) {
		throw new NotImplementedException();
	}

	@Override
	public void saveAuthorizedClient(OAuth2AuthorizedClient oAuth2AuthorizedClient, Authentication authentication) {
		String providerType = oAuth2AuthorizedClient.getClientRegistration().getRegistrationId();
		OAuth2AccessToken accessToken = oAuth2AuthorizedClient.getAccessToken();
		
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String id = oAuth2User.getName();
		String name = oAuth2User.getAttribute("name");
		
		Member member = new Member(id, name, providerType, accessToken.getTokenValue());
		memberRepository.save(member);
	}

	@Override
	public void removeAuthorizedClient(String clientRegistrationId, String principalName) {
		throw new NotImplementedException();
	}

}
