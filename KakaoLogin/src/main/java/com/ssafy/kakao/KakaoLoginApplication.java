package com.ssafy.kakao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class KakaoLoginApplication {

	public static void main(String[] args) {
		SpringApplication.run(KakaoLoginApplication.class, args);
	}

}
