package com.ssafy.cb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ssafy.cb.repository.UserPrincipalDetailsService;
import com.ssafy.cb.repository.UserRepository;

@Configuration
@EnableWebSecurity
//@RequiredArgsConstructor
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserPrincipalDetailsService userPrincipalDetailsService;
    private final UserRepository userRepository;

    public SecurityConfiguration(final UserPrincipalDetailsService userPrincipalDetailsService, final UserRepository userRepository) {
        this.userPrincipalDetailsService = userPrincipalDetailsService;
        this.userRepository = userRepository;
    }

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		//		auth.inMemoryAuthentication()
		//			.withUser("admin")
		//			.password(passwordEncoder().encode("admin"))
		//			.roles("ADMIN").authorities("ACCESS_TEST1", "ACCESS_TEST2")
		//			.and()
		//			.withUser("user")
		//			.password(passwordEncoder().encode("user"))
		//			.roles("USER")
		//			.and()
		//			.withUser("manager")
		//			.password(passwordEncoder().encode("manager"))
		//			.roles("MANAGER").authorities("ACCESS_TEST1");

		auth.authenticationProvider(authenticationProvider());
	}

	@Bean
	DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		daoAuthenticationProvider.setUserDetailsService(this.userPrincipalDetailsService);

		return daoAuthenticationProvider;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
		//			.anyRequest().authenticated()
		.antMatchers("/index.html").permitAll()
		.antMatchers("/profile/**").authenticated()
		.antMatchers("/admin/**").hasRole("ADMIN")
		.antMatchers("/manager/**").hasAnyRole("ADMIN", "MANAGER")
		.antMatchers("/api/public/test1").hasAnyRole("ACCESS_TEST1")
		.antMatchers("/api/public/test2").hasAnyRole("ACCESS_TEST2")
		.antMatchers("/api/public/users").hasRole("ADMIN")
		.and()
		.httpBasic();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
