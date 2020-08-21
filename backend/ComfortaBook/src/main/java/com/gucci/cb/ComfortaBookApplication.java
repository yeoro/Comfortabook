package com.gucci.cb;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.servlet.server.ServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class ComfortaBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComfortaBookApplication.class, args);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Bean
	public RestTemplate getRestTemplate() {
		return new RestTemplate();
	}
	
	// https 설정
	@Bean
    public ServletWebServerFactory serverFactory() {
        TomcatServletWebServerFactory tomcatServletWebServerFactory
                = new TomcatServletWebServerFactory();
        		tomcatServletWebServerFactory.addAdditionalTomcatConnectors(createStandardConnector());

        return tomcatServletWebServerFactory;
    }
	
	// 9999 포트로 http 접근 허가
    private Connector createStandardConnector() {
        Connector connector = new Connector("org.apache.coyote.http11.Http11NioProtocol");
        connector.setPort(9999);

        return connector;
    }

}

