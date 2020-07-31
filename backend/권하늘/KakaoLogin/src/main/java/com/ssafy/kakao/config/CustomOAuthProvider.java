package com.ssafy.kakao.config;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;


public enum CustomOAuthProvider {
	KAKAO {
		@Override
		public ClientRegistration.Builder getBuilder() {
			return getBuilder("kakao", ClientAuthenticationMethod.POST)
					.scope("profile", "account_email") // 요청할 권한
					//					.scope("name", "email")
					.authorizationUri("https://kauth.kakao.com/oauth/authorize") // authorization code 얻는 API
					.tokenUri("https://kauth.kakao.com/oauth/token") // access Token 얻는 API
					.userInfoUri("https://kapi.kakao.com/v2/user/me") // 유저 정보 조회 API
					.clientId("8a647c3f80248463971defaff4b4ac23")
					.clientSecret("GK2vss3qGnIJOAcG2Tg7rnBpyTA2qysk")
					.userNameAttributeName("id") // userInfo API Response 에서 얻어 올 ID 프로퍼티
					.clientName("kakao"); // spring 내에서 인식 할 OAuth2 Provider Name
		}
	};

	private static final String DEFAULT_LOGIN_REDIRECT_URL = "{baseUrl}/login/oauth2/code/{registrationId}";

	protected final ClientRegistration.Builder getBuilder(String registrationId, ClientAuthenticationMethod method)  {

		ClientRegistration.Builder builder = ClientRegistration.withRegistrationId(registrationId);
		builder.clientAuthenticationMethod(method);
		builder.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE);
		builder.redirectUriTemplate(CustomOAuthProvider.DEFAULT_LOGIN_REDIRECT_URL);

		System.out.println("builder : " + builder);
		System.out.println("registrationId : " + registrationId);
		System.out.println("DEFAULT_LOGIN_REDIRECT_URL : " + DEFAULT_LOGIN_REDIRECT_URL);
		System.out.println(builder.);
		
		return builder;
	}

	public abstract ClientRegistration.Builder getBuilder();
}
