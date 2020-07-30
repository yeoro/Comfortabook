package com.ssafy.kakao.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String oauthId;

	@Column
	private String name;

	@Column
	private String providerName;

	@Column
	private String accessToken;

	public Member(String oauthId, String name, String providerName, String accessToken) {

		this.oauthId = oauthId;
		this.name = name;
		this.providerName = providerName;
		this.accessToken = accessToken;
	}
}
